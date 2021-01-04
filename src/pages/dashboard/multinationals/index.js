import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    appState: state,
  }
}

const MultiNationals = () => {
  return <div>Multinationals</div>
}

export default connect(mapStateToProps)(MultiNationals)
