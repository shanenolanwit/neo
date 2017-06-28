import firebase from 'firebase'

import { firebase_api_key, firebase_auth_domain, firebase_database_url,firebase_storage_bucket, firebase_messaging_sender_id } from '../_config';

const config = {
    apiKey: firebase_api_key,
    authDomain: firebase_auth_domain,
    databaseURL: firebase_database_url,
    storageBucket: firebase_storage_bucket,
    messagingSenderId: firebase_messaging_sender_id
}

firebase.initializeApp(config)

export const storageKey = 'KEY_FOR_LOCAL_STORAGE';



export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth()
export const isAuthenticated = () => {
    return !!firebaseAuth.currentUser || !!localStorage.getItem(storageKey);
}
export const timestamp = firebase.database.ServerValue.TIMESTAMP