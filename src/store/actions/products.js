
import * as actionTypes from './actionTypes'

// import firebase from '../../firebase/firebase'
import firebase from '../../firebase/firebase';
import 'firebase/database';


export const getProducts = () => {
    return {
        type: actionTypes.GET_PRODUCTS
    }
}

export const getProductsSuccess = products => {
    return {
        type: actionTypes.GET_PRODUCTS_SUCCESS,
        payload: {
            products: products
        }
    }
}

export const getProductsFail = error => {
    return {
        type: actionTypes.GET_PRODUCTS_FAIL,
        payload: {
            error: error
        }
    }
}



export const initProducts = () => {
    const db = firebase.firestore();
    return dispatch => {
        dispatch(getProducts())
        // const dbRef = db.collection("orders")
        db.collection("produits")
            .get()
            .then(function (snapshot) {
                const data = []
                snapshot.forEach(function (doc) {
                    let product = doc.data()
                    product.id = doc.id
                    data.push(product)
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                });
                if (snapshot.docs.length > 0) {
                    // dispatch(getMenuSuccess(data))

                    dispatch(getProductsSuccess(data))
                } else {
                    // dispatch(getProductsFail(data))
                }
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
                dispatch(getProductsFail(error))
            });
    }
}