import React from 'react'
import { connect } from 'react-redux'

import * as actions from '../../../../../store/actions/actions'

import style from './item.module.css'
import Product from './Product/Product'
 function Item(props) {
    const { name, index, products } = props
    const subcat = {
        name: name,
        index: index,
        item: products
    }

    // const categorieName = index === 0 ? <td rowSpan={subcat.item.length + 1}>{subcat.name}</td> : null
    const display_product = subcat.item.map((product, index) => {
        console.log(product)
        const idx = index+'_prod';
        return <Product
            cat_name = {subcat.name}
            rowSpan = {subcat.item.length}
            name={product.name}
            id={product.id}
            price={product.price}
            desc={product.desc}
            imgLink={product.imgLink}
            index={index}
            unit_price={product.price_unit}
            box_quantity={product.quantity_box}
            key={idx} />
    })
         
     

    if (index > -1) {
        const display = subcat.item.map((product, index) => {
            return <Product

                name={product.name}
                id = {product.id}
                price = {product.price}
                desc = {product.desc}
                imgLink = {product.imgLink}
                index = {index}
                unit_price= {product.unit_price}
                box_quantity= {product.box_quantity}
                key={index} />
            }
        );
        return (
            <>
            
            {display_product}
             
            </>
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
    removeItemFromCart: item => dispatch(actions.removeItemFromCart(item)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Item)