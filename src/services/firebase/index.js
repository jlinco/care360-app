import firebase from 'firebase/app'
import { notification } from 'antd'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyDDa1LHcD5SLbvjVfy5YN7E2P3KaCmmQeE',
  authDomain: 'care360-ed4e5.firebaseapp.com',
  databaseURL: 'https://care360-ed4e5.firebaseio.com',
  projectId: 'care360-ed4e5',
  storageBucket: 'care360-ed4e5.appspot.com',
  messagingSenderId: '762524575359',
  appId: '1:762524575359:web:56ea50ec7d75bffd10c14a',
  measurementId: 'G-YQCEWE9X0G',
}

firebase.initializeApp(firebaseConfig)
// firebase.analytics()
export const firebaseAuth = firebase.auth()
export const firebaseDatabase = firebase.database()
export const firebaseStorage = firebase.storage()

export async function login(email, password) {
  return firebaseAuth
    .signInWithEmailAndPassword(email, password)
    .then(() => true)
    .catch(error => {
      notification.warning({
        message: error.code,
        description: error.message,
      })
    })
}

export async function register(email, password, name, role) {
  return firebaseAuth
    .createUserWithEmailAndPassword(email, password)
    .then(response => {
      if (response.user) {
        const { uid } = response.user
        firebaseDatabase
          .ref('users')
          .child(uid)
          .set({
            role,
            name,
            email,
          })
      }
      return true
    })
    .catch(error => {
      notification.warning({
        message: error.code,
        description: error.message,
      })
    })
}

export async function currentAccount() {
  let userLoaded = false
  function getCurrentUser(auth) {
    return new Promise((resolve, reject) => {
      if (userLoaded) {
        resolve(firebaseAuth.currentUser)
      }
      const unsubscribe = auth.onAuthStateChanged(user => {
        userLoaded = true
        unsubscribe()
        const getUserData = async () => {
          if (user) {
            const userFields = await firebaseDatabase
              .ref('users')
              .child(user.uid)
              .once('value')
              .then(snapshot => {
                return snapshot.val()
              })
            const mergedUser = Object.assign(user, {
              id: user.uid,
              name: userFields.name,
              role: userFields.role,
              avatar: user.photoUrl,
              // email: userFields.email
            })
            return mergedUser
          }
          return user
        }
        resolve(getUserData())
      }, reject)
    })
  }
  return getCurrentUser(firebaseAuth)
}

export async function logout() {
  return firebaseAuth.signOut().then(() => true)
}
