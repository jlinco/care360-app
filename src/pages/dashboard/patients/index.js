import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { NavLink } from 'react-router-dom'
import { Table } from 'antd'
import ACL from '../../../components/@airui/system/ACL'
import { getPatientsOnce } from '../../../services/apis/patients'
// import { selectPatients } from '../../../redux/patients/selectors'
import Chart1 from '../../../components/@kit/widgets/Charts/1' // @kit/widgets/Charts/1
import Chart2 from '../../../components/@kit/widgets/Charts/2'
import Chart5 from '../../../components/@kit/widgets/Charts/5'
import Chart9 from '../../../components/@kit/widgets/Charts/9'
import Chart10 from '../../../components/@kit/widgets/Charts/10'
// import List12 from '../../../components/@kit/widgets/Lists/12'
// import airtableBase from '../../../services/airtable';
// import List15 from '../../../components/@kit/widgets/Lists/15'
const mapStateToProps = state => {
  // const patientsStore = selectPatients('patients', state);
  // console.log(state);
  return {
    appState: state,
    // patients: patientsStore
  }
}

const Patients = () => {
  const [patients, setPatients] = useState(null)

  useEffect(() => {
    const abortController = new AbortController()
    const { signal } = abortController

    getPatientsOnce({ signal }).then(patientss => {
      const multis = patientss.val()
      const multiArr = Object.keys(multis).map(key => ({
        id: key,
        ...multis[key],
      }))
      // localStorage.setItem('multiNationals', JSON.stringify(multiArr))
      setPatients(multiArr)
    })
    return function cleanup() {
      abortController.abort()
    }
  }, [])

  const patientColumns = [
    {
      title: 'Patient ID',
      dataIndex: 'id',
      key: 'id',
      className: 'text-gray-6',
    },
    {
      title: 'Email Address',
      dataIndex: 'PatientEmail',
      key: 'PatientEmail',
      className: 'text-gray-6',
    },
    {
      title: 'Contact Mode',
      dataIndex: 'ModeOfContact',
      key: 'ModeOfContact',
      className: 'text-gray-6',
    },
    {
      title: 'Phone Number',
      dataIndex: 'PhoneNumber',
      key: 'PhoneNumber',
      className: 'text-gray-6',
    },
    {
      title: 'Medical Condition',
      dataIndex: 'Ailment',
      key: 'Ailment',
      className: 'text-gray-6',
    },
    {
      dataIndex: 'action',
      key: 'action',
      render: (row, index) => {
        // console.log(index)
        // console.log(row)
        return (
          <div>
            <NavLink to={`/dashboard/patients/${index.id}`}>
              <button type="button" className="btn btn-outline-info mr-2 mb-2" data-row={row}>
                See More
              </button>
            </NavLink>
          </div>
        )
      },
    },
  ]
  return (
    <ACL roles={['admin', 'caregiver', 'multinational', 'support', 'manager']} redirect>
      <div>
        <Helmet title="Patients: Overview" />
        <div className="air__utils__heading">
          <h5>Patients: Overview</h5>
        </div>
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <h5 className="text-dark mb-4">Patient Analytics</h5>
            <div className="card">
              <div className="card-body">
                <div className="text-dark font-size-18 font-weight-bold mb-1">Current Patients</div>
                <Table columns={patientColumns} dataSource={patients} />
              </div>
            </div>
          </div>
          <div className="col-xl-8 col-lg-6">
            <div className="card">
              <Chart2 />
            </div>
            <div className="row">
              <div className="col-md-6 col-xl-6 col-lg-6">
                <div className="card">
                  <div className="card-body">
                    <Chart10 />
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-xl-6 col-lg-6">
                <div className="card">
                  <div className="card-body">
                    <Chart1 />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-6">
            <div className="card">
              <div className="card-body">
                <Chart9 />
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <Chart5 />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ACL>
  )
}

export default connect(mapStateToProps)(Patients)
