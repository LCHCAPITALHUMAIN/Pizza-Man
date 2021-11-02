import React from 'react'
//import { Link, withRouter } from 'react-router-dom'
//import { connect } from 'react-redux'

import style from './footer.module.css'

function Footer(props) {
    //const { location, cart } = props
    // console.log(props)

    return (
        <footer className={`pt-4 pb-2 ${style.Footer}`}>
           
        </footer>
    )
}

/*const mapStateToProps = state => ({
    cart: state.cart.cart
})*/

// export default connect(mapStateToProps)(withRouter(Footer))
export default Footer