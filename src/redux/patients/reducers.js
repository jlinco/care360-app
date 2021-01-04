import actions from './actions'

const initialState = {
  patientData: [],
  patients: null,
  patient: null,
}

export default function patientReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
