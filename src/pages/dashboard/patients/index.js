import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    appState: state,
  }
}

const Patients = () => {
  return <div>Patients here</div>
}

export default connect(mapStateToProps)(Patients)
