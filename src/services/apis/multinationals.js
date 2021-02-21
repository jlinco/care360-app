import { firebaseDatabase } from '../firebase'

export async function getMultinationalsOnce() {
  return firebaseDatabase.ref('multinationals').once('value')
}

export async function getMultinationalsLive() {
  return firebaseDatabase.ref('multinationals').on('value')
}

export async function getMultinationalById(id) {
  return firebaseDatabase
    .ref('multinationals')
    .child(id)
    .once('value')
}

// export async function writeMultinationals(data) {

// }
