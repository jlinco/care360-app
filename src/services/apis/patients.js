import { firebaseDatabase } from '../firebase'

export async function getPatientsOnce() {
  return firebaseDatabase.ref('patients').once('value')
}

export async function getPatientsLive() {
  return firebaseDatabase.ref('patients').on('value')
}

export async function getPatientById(id) {
  return firebaseDatabase
    .ref('patients')
    .child(id)
    .once('value')
}
