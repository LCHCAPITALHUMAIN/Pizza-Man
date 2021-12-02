import { combineReducers } from 'redux'

import menuReducer from './menuReducer'
import cartReducer from './cartReducer'
import orderReducer from './orderReducer'
import authReducer from './authReducer'
import addressReducer from './addressReducer'
import pastOrdersReducer from './pastOrdersReducer'
import productsReducer from './productsReducer'
const rootReducer = combineReducers({
    auth: authReducer,
    address: addressReducer,
    menu: menuReducer,
    cart: cartReducer,
    order: orderReducer,
    products: productsReducer,
    pastOrders: pastOrdersReducer
})

export default rootReducer