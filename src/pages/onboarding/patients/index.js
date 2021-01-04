import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    appState: state,
  }
}

const OnboardPatients = () => {
  return <div>onboard patients</div>
}

export default connect(mapStateToProps)(OnboardPatients)
