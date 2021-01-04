import { all, put, call } from 'redux-saga/effects'
import { getAllMultiNationalsAPI } from './api'

export function* GET_DATA() {
  yield put({
    type: 'multinationals/SET_STATE',
    payload: {
      loading: true,
    },
  })
  try {
    const multinationals = yield call(getAllMultiNationalsAPI)
    console.log(multinationals)
    yield put({
      type: 'multinationals/SET_STATE',
      payload: {
        multinationals,
      },
    })
  } catch (error) {
    yield put({
      type: 'multinationals/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export default function* rootSaga() {
  yield all([GET_DATA()])
}
