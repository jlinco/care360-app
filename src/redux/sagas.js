import { all } from 'redux-saga/effects'
import user from './user/sagas'
import menu from './menu/sagas'
import settings from './settings/sagas'
import patients from './patients/sagas'
import multinationals from './multinationals/sagas'

export default function* rootSaga() {
  yield all([user(), menu(), settings(), patients(), multinationals()])
}
