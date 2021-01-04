import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    appState: state,
  }
}

const OnboardHospitals = () => {
  return <div>onboard hospitals</div>
}

export default connect(mapStateToProps)(OnboardHospitals)
