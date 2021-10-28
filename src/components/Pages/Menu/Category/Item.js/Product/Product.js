import React ,{ useState }from 'react'
import { connect } from 'react-redux'

import * as actions from '../../../../../../store/actions/actions'

import style from './product.module.css'

function Product(props) {
    const { name, desc, id, imgLink, price, index, 
        cat_name,
            rowSpan , unit_price,box_quantity } = props
    const [inputValue, setInputValue] = React.useState(0);
    
    if (id in props.itemMap ){
        if(props.cart[props.itemMap[id]].quantity != inputValue){
            setInputValue(props.cart[props.itemMap[id]].quantity);
        }
        
    }

    const item = {
        id: id,
        name: name,
        price: price,
        desc: desc,
        imgLink: imgLink,
        index: index,
        unit_price: unit_price,
        box_quantity: box_quantity
    }
    const onChangeHandler = event => {
        // setInputValue(event.target.value);
        props.addCustomItemToCart(item, event.target.value)
      };  
    if (index > -1) {
        const categorieName = index === 0 ? <td rowSpan={rowSpan }>{cat_name}</td> : null

        return (
           
                <>
                <tr className={cat_name}>
                {categorieName}
                <td >
                    {name}
                </td>
                <td>
                {box_quantity}
                </td>

                <td  >
                {price}
                </td>
                <td  >
                 {unit_price}
                </td>
               

                <td  >
                
                <input 
                    min='0'
                    max='150'
                    type="number"  className="center" 
                    name="quantity" onChange={onChangeHandler}
                    value={inputValue}/>


                </td>
                

                </tr>

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
    addCustomItemToCart: (item, quantity )=> dispatch(actions.addCustomItemToCart(item, quantity)),
    removeItemFromCart: item => dispatch(actions.removeItemFromCart(item)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Product)