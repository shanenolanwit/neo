import { ref, firebaseAuth } from './constants'

export function auth (email, pw) {
    return firebaseAuth.createUserWithEmailAndPassword(email, pw)
        .then(saveUser)
        .catch((error) => console.log('Error authenticating', error))
}

export function logout () {
    return firebaseAuth.signOut()
}

export function getCurrentUser(){
    return firebaseAuth.currentUser ? firebaseAuth.currentUser.email : ''
}

export function login (email, pw) {
    return firebaseAuth.signInWithEmailAndPassword(email, pw)
}

export function saveUser (user) {
    return ref.child(`users/${user.uid}/info`)
        .set({
            email: user.email,
            uid: user.uid
        })
        .then(() => user)
}

