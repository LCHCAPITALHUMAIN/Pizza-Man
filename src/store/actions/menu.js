import axios from '../../axios/axios'

import * as actionTypes from './actionTypes'

import firebase from '../../firebase/firebase'

import React,{useState,useEffect} from 'react';

const db = firebase.firestore()
export const getMenu = () => {
    return {
        type: actionTypes.GET_MENU
    }
}

export const getMenuSuccess = menu => {
    
    return {
        type: actionTypes.GET_MENU_SUCCESS,
        payload: {
            menu: menu
        }
    }
}
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
export const getMenuFail = error => {
    return {
        type: actionTypes.GET_MENU_FAIL,
        payload: {
            error: error
        }
    }
}
export const initMenu2 = () => {
    return dispatch => {
        dispatch(getMenu())
        axios.get("../menu.json")
            .then(response => (
                
                dispatch(getMenuSuccess(response.data))
            ))
            .catch(error => dispatch(getMenuFail(error.message)))
    }
}
export const initMenu = () => {
    return dispatch => {
        dispatch(getMenu())
        // const dbRef = db.collection("orders")
        db.collection("produits")
        .get()
        .then(function(snapshot) {
            const data = []
            snapshot.forEach(function(doc) {
                let product = doc.data()
                product.id = doc.id
                data.push(product)
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
            });
            if (snapshot.docs.length > 0) {
                dispatch(getMenuSuccess(data))
            } else {
                dispatch(getMenuFail(data))
            }
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
    }
}

export const initMenu3 = () => {
    return dispatch => {
        dispatch(getMenu())
        axios.get("../menu.json")
            .then(response => (
                
                dispatch(getMenuSuccess(response.data))
            ))
            .catch(error => dispatch(getMenuFail(error.message)))
    }
}