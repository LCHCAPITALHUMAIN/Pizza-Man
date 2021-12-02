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

const defaultPath = 'counter';

export async function getIncrement(args) {

  let result = args.startAt ?? 1;
  const counterRef = args.path
    ? args.path.doc(args.counterName)
    : db().doc(`${defaultPath}`);

  const counterDoc = await args.transaction.get<any>(counterRef);

  if (counterDoc.exists) {
    console.log(`Counter ${args.counterName} exists`);
    const { counterValue } = counterDoc.data();
    result = counterValue + (args.incrementValue ?? 1);
    args.transaction.update(counterRef, { counterValue: result });
  } else {
    const counterValue = result;
    console.log(`Counter ${args.counterName} created with next value ${counterValue}`);
    args.transaction.create(counterRef, { counterValue });
  }

  console.log(`Counter ${args.counterName} result ${result}`);
  return result;
}


export const placeOrder = (data) => {
    return dispatch => {
        dispatch(placeOrderInit())
        console.log(data)
        return db.runTransaction(async (transaction)  => {
            return db.collection("organisation").doc("orders").get().then((orgDoc) => {
                
                // eslint-disable-next-line no-throw-literal
                if (!orgDoc.exists) throw  "Document does not exist!";
        // Increment one serialNumberGenerated to the organisations.
                const nextSerial = orgDoc.data().serialNumberGenerated + 1;
                const dataRef = db.collection('orders').doc();
                dataRef.set({
                    ...data,
                    ts: Math.round(new Date().getTime()),
                    serialNumber: nextSerial
                })
                db.collection("organisation").doc("orders").update({ serialNumberGenerated: nextSerial });
                console.log('Document written with ID: ', dataRef.id)
                data.order_id = nextSerial;
                data.key = dataRef.id;
                
                return data;
                });
        }).then((order) => {
            console.log(order);
            axios({
                method: 'POST',
                maxRedirects: 2,
                url: 'https://script.google.com/macros/s/AKfycbx0qKQnXvrP17GpdaQmVjsy2k4uWsw9kWPBjYoUk_n0OE3mAWQ0jzoaZds3F9gQoG7U/exec?action=create',
                data: order
                ,
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                },
            }).then(function(response) {
                console.log(response);
                dispatch(placeOrderSuccess())
            }).catch(function(error) {
                console.log(error);
                dispatch(placeOrderFail(error.message))
            });
            // dispatch(placeOrderSuccess())
        })
        .catch((error) => dispatch(placeOrderFail(error.message))) 
       /* dataRef.set({
            ...data,
            ts: Math.round(new Date().getTime())
        })
            .then(() => {
                console.log('Document written with ID: ', dataRef.id)
                data.order_id = dataRef.id;
                axios({
                    method: 'POST',
                    maxRedirects: 2,
                    url: 'https://script.google.com/macros/s/AKfycbx0qKQnXvrP17GpdaQmVjsy2k4uWsw9kWPBjYoUk_n0OE3mAWQ0jzoaZds3F9gQoG7U/exec?action=create',
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
            .catch((error) => dispatch(placeOrderFail(error.message)))*/
    }
}