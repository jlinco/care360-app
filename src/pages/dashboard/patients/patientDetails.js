import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Form, Input } from 'antd'
import { getPatientByIdApi } from '../../../redux/patients/api'
// import { useParams } from 'react-router-dom'

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
    let mounted = true
    getPatientByIdApi(patientId).then(rec => {
      if (mounted) {
        setPatientData(rec)
      }
    })
    return function cleanup() {
      mounted = false
    }
  }, [patientId])
  return (
    <div>
      <Helmet title="Dashboard: Patient Details" />
      <div className="air__utils__heading">
        <h5>Dashboard: Patient Details</h5>
      </div>
      <div className="row">
        <div className="col-xl-6 col-md-6 col-xs-12 col-sm-12">
          <div className="card">
            <div className="card-body">
              {patientData && (
                <div>
                  <div className="d-flex flex-wrap align-items-center mb-2">
                    <div className="flex-shrink-0 kit__utils__avatar mr-4 mb-2">
                      <img src="resources/images/avatars/5.jpg" alt="Mary Stanform" />
                    </div>
                    <div className="mb-2">
                      <div className="text-dark font-size-18 font-weight-bold text-nowrap">
                        {patientData['First Name']} {patientData['Last Name']}
                        <i className="align-text-bottom fe fe-check-square text-success ml-2 font-size-24 " />
                      </div>
                      <div className="text-uppercase">Support team</div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <a className="btn btn-outline-primary mr-2">Contact</a>
                    <a className="btn btn-outline-danger">Unsubscribe</a>
                  </div>
                  <div className="table-responsive">
                    <table className="table table-borderless">
                      <tbody>
                        <tr>
                          <td className="text-gray-6 pl-0">Sex</td>
                          <td className="pr-0 text-right text-dark">{patientData.Sex}</td>
                        </tr>
                        <tr>
                          <td className="text-gray-6 pl-0">Medical Condition</td>
                          <td className="pr-0 text-right text-dark">
                            {patientData['Medical Condition']}
                          </td>
                        </tr>
                        <tr>
                          <td className="text-gray-6 pl-0">Phone</td>
                          <td className="pr-0 text-right text-dark">
                            {patientData['Phone Number']}
                          </td>
                        </tr>
                        <tr>
                          <td className="text-gray-6 pl-0">Email</td>
                          <td className="pr-0 text-right text-dark">
                            {patientData['Email Address']}
                          </td>
                        </tr>
                        <tr>
                          <td className="text-gray-6 pl-0">Contact Person</td>
                          <td className="pr-0 text-right text-dark">
                            {patientData['Contact Person']}
                          </td>
                        </tr>
                        <tr>
                          <td className="text-gray-6 pl-0">Mode of Contact</td>
                          <td className="pr-0 text-right text-dark">
                            {patientData['Contact Mode']}
                          </td>
                        </tr>
                        <tr>
                          <td className="text-gray-6 pl-0">Specialist / Physician</td>
                          <td className="pr-0 text-right text-dark">
                            {patientData['Specialist / Physician']}
                          </td>
                        </tr>
                        <tr>
                          <td className="text-gray-6 pl-0">Institution / Visiting Center</td>
                          <td className="pr-0 text-right text-dark">
                            {patientData['Institution / Visiting Center']}
                          </td>
                        </tr>
                        <tr>
                          <td className="text-gray-6 pl-0">Residence</td>
                          <td className="pr-0 text-right text-dark">
                            {patientData['Residence / Landmark']}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="row">
                    <div className="col-md-6 col-sm-12">
                      <button type="button" className="btn btn-outline-info btn-block mr-2 mb-2">
                        Update Patient Data
                      </button>
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <button type="button" className="btn btn-outline-primary btn-block mr-2 mb-2">
                        Follow Up
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-md-6 col-xs-12 col-sm-12">
          <div className="card">
            <div className="card-body">
              {patientData && (
                <div>
                  <h5 className="mb-4">
                    <strong>
                      Update Details for: {patientData['First Name']} {patientData['Last Name']}
                    </strong>
                  </h5>
                  <Form layout="vertical">
                    <div className="row">
                      <div className="col-md-6">
                        <Form.Item name="Last Name" label="Last Name">
                          <Input placeholder="Last Name" />
                        </Form.Item>
                      </div>
                      <div className="col-md-6">
                        <Form.Item name="First Name" label="First Name">
                          <Input placeholder="First Name" />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <Form.Item name="Phone Number" label="Phone Number">
                          <Input placeholder="Phone Number" />
                        </Form.Item>
                      </div>
                      <div className="col-md-4">
                        <Form.Item name="Email Address" label="Email Address">
                          <Input placeholder="Email Address" />
                        </Form.Item>
                      </div>
                      <div className="col-md-4">
                        <Form.Item name="Sex" label="Sex">
                          <Input placeholder="Sex" />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <Form.Item name="Medical Condition" label="Medical Condition">
                          <Input placeholder="Medical Condition" />
                        </Form.Item>
                      </div>
                      <div className="col-md-4">
                        <Form.Item name="Contact Person" label="Contact Person">
                          <Input placeholder="Contact Person" />
                        </Form.Item>
                      </div>
                      <div className="col-md-4">
                        <Form.Item name="Relationship" label="Relationship">
                          <Input placeholder="Relationship" />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <Form.Item name="Smartphone" label="Smartphone">
                          <Input placeholder="Smartphone" />
                        </Form.Item>
                      </div>
                      <div className="col-md-4">
                        <Form.Item name="Contact Mode" label="Contact Mode">
                          <Input placeholder="Contact Mode" />
                        </Form.Item>
                      </div>
                      <div className="col-md-4">
                        <Form.Item name="Specialist / Physician" label="Specialist / Physician">
                          <Input placeholder="Specialist / Physician" />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <Form.Item name="Residence / Landmark" label="Residence / Landmark">
                          <Input.TextArea placeholder="Residence / Landmark" />
                        </Form.Item>
                      </div>
                      <div className="col-md-6">
                        <Form.Item
                          name="Institution / Visiting Center"
                          label="Institution / Visiting Center"
                        >
                          <Input placeholder="Institution / Visiting Center" />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <Form.Item>
                          <button type="button" className="btn btn-block btn-info px-5">
                            Update Patient
                          </button>
                        </Form.Item>
                      </div>
                    </div>
                  </Form>
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
