import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import PageTitle from '../../UI/PageTitle/PageTitle'
import LoginForm from './LoginForm/LoginForm'
import style from '../Home/home.module.css'
// import commonStyle from '../../../static/style/common.module.css'
import BG from '../../../static/img/Wine_Daniel.png'

function Login(props) {
    return (
        <div 
        className={`pt-5 ${style.BodyContainer}`}
        style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${BG}')` }}>
            {props.user ? <Redirect to="/bon-de-commande" /> : null}
            <div className="container mt-5 pt-5">
                    <h2 className={style.H2}>LMPV Wineclub</h2>
            <PageTitle>
                Login
            </PageTitle>

            <LoginForm />
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.auth.user
})

export default connect(mapStateToProps)(Login)