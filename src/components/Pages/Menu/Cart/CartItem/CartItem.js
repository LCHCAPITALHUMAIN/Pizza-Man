import React from 'react'
import { connect } from 'react-redux'

import * as actions from '../../../../../store/actions/actions'

import style from './cartItem.module.css'

function CartItem(props) {
    const { id, name, price, desc, imgLink } = props

    const item = {
        id: id,
        name: name,
        price: price,
        desc: desc,
        imgLink: imgLink
    }
    let itemPrice = item.price;
    if(id in props.itemMap ){
        itemPrice = props.cart[props.itemMap[id]].quantity * price
    }
    return (
        <div className={style.Body}>
            <div>
                <strong> {name} </strong>
            </div>
            <div className={`font-italic font-weight-lighter text-muted ${style.Description}`}>
                {desc}
            </div>
            <div className="row mt-2">
                <div className={style.Price}>
                    Prix TTC : € {itemPrice.toFixed(2)}
                </div>
                <div className={`my-auto ml-auto d-inline-block ${style.BtnHolder}`}>
                    <span className={`my-auto mx-1 font-weight-light ${style.Quantity}`}>
                        <strong> {id in props.itemMap ?
                            props.cart[props.itemMap[id]].quantity : 0} </strong>
                    </span>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    cart: state.cart.cart,
    itemMap: state.cart.itemMap
})

const mapDispatchToProps = dispatch => ({
    addItemToCart: item => dispatch(actions.addItemToCart(item)),
    removeItemFromCart: item => dispatch(actions.removeItemFromCart(item)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CartItem)