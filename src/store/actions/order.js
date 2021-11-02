import firebase from '../../firebase/firebase'
import axios from '../../axios/axios'
import * as actionTypes from './actionTypes'


const db = firebase.firestore()

export const placeOrderInitialize = () => {
    return {
        type: actionTypes.PLACE_ORDER_INIT
    }
}

export const placeOrderInit = () => {
    return {
        type: actionTypes.PLACE_ORDER
    }
}

export const placeOrderSuccess = () => {
    return {
        type: actionTypes.PLACE_ORDER_SUCCESS
    }
}

export const placeOrderFail = (error) => {
    return {
        type: actionTypes.PLACE_ORDER_FAIL,
        payload: {
            error: error
        }
    }
}

export const placeOrder = (data) => {
    return dispatch => {
        dispatch(placeOrderInit())
        const dataRef = db.collection('orders').doc()
        console.log(data)
        
        dataRef.set({
            ...data,
            ts: Math.round(new Date().getTime())
        })
            .then(() => {
                console.log('Document written with ID: ', dataRef.id)
                data.order_id = dataRef.id;
                axios({
                    method: 'POST',
                    maxRedirects: 2,
                    url: 'https://script.google.com/macros/s/AKfycbwohedlqrqm9IkxahjI-kLDwzpTcGwqw8Z5vGDLK032-2oKShupfuBuhVrDxUAIppl0/exec?action=create',
                    data: data
                    ,
                    headers: {
                       'Content-Type': 'application/x-www-form-urlencoded',
                    },
                 }).then(function(response) {
                    console.log(response);
                 }).catch(function(error) {
                    console.log(error);
                 });
                dispatch(placeOrderSuccess())
            })
            .catch((error) => dispatch(placeOrderFail(error.message)))
    }
}