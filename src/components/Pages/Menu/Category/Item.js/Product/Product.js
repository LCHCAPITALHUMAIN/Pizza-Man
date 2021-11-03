import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import * as actions from '../../../../../../store/actions/actions'

import style from './product.module.css'

function Product(props) {
    const { name, desc, id, imgLink, price, index,
        cat_name,
        rowSpan, unit_price, box_quantity } = props
    const [inputValue, setInputValue] = useState(0);
    const [totalTTC, setTotalTTC] = useState(0);
    useEffect(() => {
        if (id in props.itemMap === false) {

            setInputValue(0);
            setTotalTTC(0);
        }
    }, [id, props.cart, props.itemMap])

    const item = {
        id: id,
        name: name,
        price: parseFloat(price),
        desc: desc,
        imgLink: imgLink,
        index: index,
        unit_price: parseFloat(unit_price),
        box_quantity: box_quantity,
        itemTotal: 0
    }
    const onChangeHandler = event => {
        props.addCustomItemToCart(item, event.target.value);
        setTotalTTC((event.target.value * item.price).toFixed(2));
        setInputValue(event.target.value);
    }

    if (index > -1) {
        const categorieName = index === 0 ? <td rowSpan={rowSpan} className={`${style.Description}`}>{cat_name}</td> : null

        return (
                <tr className={cat_name}>
                    {categorieName}
                    <td >
                        {name}
                    </td>
                    <td className={`${style.right}`}>
                        {box_quantity}
                    </td>
                    <td className={`${style.right}`}>
                        {item.price.toFixed(2)}
                    </td>
                    <td className={`${style.right}`}>
                        {item.unit_price.toFixed(2)}
                    </td>
                    <td className={`${style.input}`}>
                        <input
                            min='0'
                            max='150'
                            type="number" className="center"
                            name="quantity" onChange={onChangeHandler}
                            value={inputValue} />
                    </td>
                    <td className={`${style.right}`}>{totalTTC}</td>
                </tr>
        )
    }
    else {
        return (
            <></>
        )
    }

}

const mapStateToProps = state => ({
    cart: state.cart.cart,
    itemMap: state.cart.itemMap
})

const mapDispatchToProps = dispatch => ({
    addItemToCart: item => dispatch(actions.addItemToCart(item)),
    addCustomItemToCart: (item, quantity) => dispatch(actions.addCustomItemToCart(item, quantity)),
    removeItemFromCart: item => dispatch(actions.removeItemFromCart(item)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Product)