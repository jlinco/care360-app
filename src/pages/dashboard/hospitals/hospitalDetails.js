import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    appState: state,
  }
}

const HospitalDetails = () => {
  return <div>hospital details</div>
}

export default connect(mapStateToProps)(HospitalDetails)
