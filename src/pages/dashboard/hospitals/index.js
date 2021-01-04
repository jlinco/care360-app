import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    appState: state,
  }
}

const Hospitals = () => {
  return <div>hospitals</div>
}

export default connect(mapStateToProps)(Hospitals)
