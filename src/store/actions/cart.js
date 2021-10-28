import * as actionTypes from './actionTypes'

export const clearCart = () => {
    return {
        type: actionTypes.CLEAR_CART
    }
}

export const addItemToCart = item => {
    return {
        type: actionTypes.ADD_ITEM_TO_CART,
        payload: {
            item: item
        }
    }
}
export const addCustomItemToCart = (item, quantity)=> {
    return {
        type: actionTypes.ADD_CUSTOM_ITEM_TO_CART,
        payload: {
            item: item,
            quantity: quantity
        }
    }
}
export const removeItemFromCart = item => {
    return {
        type: actionTypes.REMOVE_ITEM_FROM_CART,
        payload: {
            item: item
        }
    }
}