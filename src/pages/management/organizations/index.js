import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    appState: state,
  }
}

const ManageOrganizations = () => {
  return <div>manage multinationals</div>
}

export default connect(mapStateToProps)(ManageOrganizations)
