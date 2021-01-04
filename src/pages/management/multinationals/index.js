import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    appState: state,
  }
}

const ManageMultiNationals = () => {
  return <div>manage multinationals</div>
}

export default connect(mapStateToProps)(ManageMultiNationals)
