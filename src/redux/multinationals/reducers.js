import actions from './actions'

const initialState = {
  multinationalsData: [],
  multinationals: null,
}

export default function multiNationalReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
