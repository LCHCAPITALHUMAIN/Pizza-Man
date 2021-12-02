import firebase from 'firebase/app'
import 'firebase/database'; // If using Firebase database
import 'firebase/auth';
import 'firebase/firestore'

import firebaseConfig from './config'

firebase.initializeApp(firebaseConfig)

export default firebase