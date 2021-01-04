import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import user from './user/reducers'
import menu from './menu/reducers'
import settings from './settings/reducers'
import patients from './patients/reducers'
import multinationals from './multinationals/reducers'

export default history =>
  combineReducers({
    router: connectRouter(history),
    user,
    menu,
    settings,
    patients,
    multinationals,
  })
