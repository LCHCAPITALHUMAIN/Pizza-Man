import React from 'react'
import { connect } from 'react-redux'

import { Redirect } from 'react-router'

import style from './home.module.css'
import PageTitle from '../../UI/PageTitle/PageTitle'
import LoginForm from '../Login/LoginForm/LoginForm'

import BG from '../../../static/img/HomeBg/diaporama-01_n.jpeg'

function Home(props) {
    return (
        <>
            <div
                className={`pt-5 ${style.BodyContainer}`}
                style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${BG}')` }}>
                <div className="container mt-5 pt-5">
                    <h2 className={style.H2}>Guigal</h2>
                   
                    {props.user ? <Redirect to="/menu" /> : null}

                    <PageTitle>
                        Login
                    </PageTitle>

                    <LoginForm />
                </div>
                <div className={style.LandscapeOverlay} />
            </div>
        </>
    )
}
const mapStateToProps = state => ({
    user: state.auth.user
})
export default connect(mapStateToProps)(Home)