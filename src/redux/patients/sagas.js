import { all, put, call } from 'redux-saga/effects'
import { getPatientsApi } from './api'
// import actions from './actions'

export function* GET_DATA() {
  yield put({
    type: 'patients/SET_STATE',
    payload: {
      loading: true,
    },
  })
  try {
    const patients = yield call(getPatientsApi)
    yield put({
      type: 'patients/SET_STATE',
      payload: {
        patients,
      },
    })
  } catch (error) {
    yield put({
      type: 'patients/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export default function* rootSaga() {
  yield all([GET_DATA()])
}
