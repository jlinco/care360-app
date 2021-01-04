import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    appState: state,
  }
}

const MultiNationalDetails = () => {
  return <div>multinational details</div>
}

export default connect(mapStateToProps)(MultiNationalDetails)
