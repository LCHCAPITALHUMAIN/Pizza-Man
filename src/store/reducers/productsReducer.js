import * as actionTypes from '../actions/actionTypes'

const initialState = {
    products: [],
    isLoading: false,
    error: null
}

const reducer = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case actionTypes.GET_PRODUCTS:
            return {
                ...state,
                isLoading: true,
                error: null
            }

        case actionTypes.GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: payload.products,
                isLoading: false
            }

        case actionTypes.GET_PRODUCTS_FAIL:
            return {
                ...state,
                isLoading: false,
                error: payload.error
            }

        default:
            return state;
    }
}

export default reducer