import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import CartItem from './CartItem/CartItem'
import Button from '../../../UI/Button/Button'
import * as BtnTypes from '../../../UI/Button/types'

import * as actions from '../../../../store/actions/actions'

import style from './cart.module.css'

function Cart(props) {
    const display = props.cart.map(item => (
        <CartItem key={item.id} {...item} />
    ))

    return (
        <>
            <div className={`mt-4 ${style.Body}`}>
                <div className="mt-4 mx-2"><h1 >Commande</h1></div>
                <div className="mx-2">
                    {props.cart.length > 0 ?
                        //     <button className={`my-2 mx-2 btn btn-danger ${style.ClearCartBtn}`} onClick={props.clearCart}>

                        // </button>
                        <span className={`my-2 mx-2 ${style.ClearCartBtn}`}>
                            
                        </span>
                        : <div className={style.EmptyBody}>
                            <i className="fa fa-shopping-cart" aria-hidden="true" />
                            <span>
                                Panier vide!
                            </span>
                        </div>}
                </div>
                {props.cart.length > 0 ?
                    <>
                        <div className={`mx-2 ${style.CartItemBody}`}>
                            {display}
                        </div>
                        <div className={style.CartUtil}>
                            <strong className={`mx-2 ${style.Price}`}> Total: € {props.price.toFixed(2)}</strong>
                            <Link to="/checkout">
                                <button className={style.CheckoutBtn}>
                                    Commander
                                </button>
                            </Link>
                        </div>
                    </> : null}
            </div>
            {props.cart.length > 0 ?
                <Link to="/cart">
                    <div className={style.BodyMobile}>
                        Commander
                    </div>
                </Link> : null}
        </>
    )
}

const mapStateToProps = state => ({
    cart: state.cart.cart,
    price: state.cart.totalPrice
})

const mapDispatchToProps = dispatch => ({
    clearCart: () => dispatch(actions.clearCart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)