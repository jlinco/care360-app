import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Tabs, Calendar, Badge } from 'antd'
// import { InboxOutlined } from '@ant-design/icons';
import { getPatientById } from '../../../services/apis/patients'
import PatientIntro from '../../../components/care360/patients/patientIntro'
import PatientHeader from '../../../components/care360/patients/patientHeader'
import PatientContactPerson from '../../../components/care360/patients/patientContactPerson'
import TreatmentTimeline from '../../../components/care360/patients/treatmentTimeline'
// import TreatmentCalendar from '../../../components/care360/patients/treatmentCalendar'
import PatientProfile from '../../../components/care360/patients/patientProfile'

const { TabPane } = Tabs
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
  const [tabKey, setTabKey] = useState('1')

  useEffect(() => {
    const abortController = new AbortController()
    const { signal } = abortController

    getPatientById(patientId, { signal }).then(patient => {
      const patientInfo = patient.val()
      // console.log(patientInfo)
      setPatientData(patientInfo)
    })
    return function cleanup() {
      abortController.abort()
    }
  }, [patientId])

  const changeTab = key => {
    setTabKey(key)
  }

  function getListData(value) {
    let listData
    switch (value.date()) {
      case 8:
        listData = [
          { type: 'warning', content: 'Two yellow tablets in the morning' },
          { type: 'success', content: 'Two green tablets in the evening.' },
        ]
        break
      case 10:
        listData = [
          { type: 'warning', content: 'Two yellow tablets in the morning' },
          { type: 'success', content: 'Two green tablets in the evening.' },
        ]
        break
      case 15:
        listData = [
          { type: 'warning', content: 'Two yellow tablets in the morning' },
          { type: 'success', content: 'Two green tablets in the evening。。....' },
        ]
        break
      default:
    }
    return listData || []
  }

  function dateCellRender(value) {
    const listData = getListData(value)
    return (
      <ul className="events">
        {listData.map(item => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    )
  }

  function getMonthData(value) {
    return value.month() === 8 ? 1394 : 0
    // if (value.month() === 8) {
    //   return 1394;
    // }
  }

  function monthCellRender(value) {
    const num = getMonthData(value)
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null
  }

  return (
    <div>
      <Helmet title="Dashboard: Patient Profile" />
      <div className="air__utils__heading">
        <h5>Dashboard: Patient Profile</h5>
      </div>
      <div className="row">
        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
          <div className="card card-top-primary">
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
          <div className="card card-top-primary">
            <div className="card-header card-header-flex flex-column">
              {patientData && <PatientHeader patientData={patientData} patientId={patientId} />}
              <Tabs activeKey={tabKey} className="mr-auto kit-tabs-bold" onChange={changeTab}>
                <TabPane tab="Treatment Calendar" key="1" />
                <TabPane tab="Medical Profile" key="2" />
              </Tabs>
            </div>
            <div className="card-body">
              {tabKey === '1' && (
                <div>
                  <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
                </div>
              )}
              {tabKey === '2' && (
                <div>
                  <PatientProfile patientData={patientData} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(PatientDetails)
