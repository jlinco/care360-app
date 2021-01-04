import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    appState: state,
  }
}

const ManageHospitals = () => {
  return <div>manage hospitals</div>
}

export default connect(mapStateToProps)(ManageHospitals)
