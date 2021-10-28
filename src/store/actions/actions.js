import axios from '../../axios/axios'

export {
    initMenu
} from './menu'
export {
    clearCart,
    addItemToCart,
    addCustomItemToCart,
    removeItemFromCart
} from './cart'
export {
    placeOrder,
    placeOrderInitialize,
    placeOrderFail
} from './order'
export {
    authChangedHandler,
    emailAuthFail,
    emailAuth,
    emailRegister,
    emailRegisterFail
} from './auth'
export {
    getAddress,
    addAddress,
    addAddressFail,
    clearAddress
} from './address'
export {
    updateOrder,
    clearOrders
} from './pastOrders'

export function getProduct(){
	return (dispatch, getState)=>{
		axios.get("../menu.json")
            .then(response => (
                
                
                dispatch({
					type : 'SET_PRODUCTS',
					value : response.data
				})
            ))
	
	}
}