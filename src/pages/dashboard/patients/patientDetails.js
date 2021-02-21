import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
// import { Form, Input, Upload, Button, Tabs } from 'antd'
// import { InboxOutlined } from '@ant-design/icons';
import { getPatientById } from '../../../services/apis/patients'
import PatientIntro from '../../../components/care360/patients/patientIntro'
import PatientHeader from '../../../components/care360/patients/patientHeader'
import PatientContactPerson from '../../../components/care360/patients/patientContactPerson'
import TreatmentTimeline from '../../../components/care360/patients/treatmentTimeline'

const mapStateToProps = state => {
  return {
    appState: state,
  }
}

const PatientDetails = props => {
  const {
    match: {
      params: { patientId },
    },
  } = props
  const [patientData, setPatientData] = useState(null)

  useEffect(() => {
    const abortController = new AbortController()
    const { signal } = abortController

    getPatientById(patientId, { signal }).then(patient => {
      const patientInfo = patient.val()
      console.log(patientInfo)
      setPatientData(patientInfo)
    })
    return function cleanup() {
      abortController.abort()
    }
  }, [patientId])
  return (
    <div>
      <Helmet title="Dashboard: Patient Profile" />
      <div className="air__utils__heading">
        <h5>Dashboard: Patient Profile</h5>
      </div>
      <div className="row">
        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
          <div className="card">
            <div className="card-body">
              {patientData && <PatientIntro patientData={patientData} />}
            </div>
          </div>
          {patientData && <div className="badge-example">Contact Person Info</div>}
          <div className="card">
            <div className="card-body">
              {patientData && <PatientContactPerson patientData={patientData} />}
            </div>
          </div>
          {patientData && <div className="badge-example">Treatment Timeline</div>}
          <div className="card">
            <div className="card-body">{patientData && <TreatmentTimeline />}</div>
          </div>
        </div>
        <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12">
          <div className="card">
            <div className="card-header card-header-flex flex-column">
              {patientData && <PatientHeader patientData={patientData} patientId={patientId} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(PatientDetails)
