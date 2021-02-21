import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Upload, message } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import { getMultinationalById } from '../../../services/apis/multinationals'

const { Dragger } = Upload

const draggerProps = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const { status } = info.file
    if (status !== 'uploading') {
      console.log(info.file, info.fileList)
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`)
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`)
    }
  },
}

const mapStateToProps = state => {
  return {
    appState: state,
  }
}

const MultiNationalDetails = props => {
  const {
    match: {
      params: { multinationalId },
    },
  } = props
  const [multinationalData, setMultinationalData] = useState(null)

  useEffect(() => {
    const abortController = new AbortController()
    const { signal } = abortController

    getMultinationalById(multinationalId, { signal }).then(multinational => {
      const multinationalInfo = multinational.val()
      console.log(multinationalInfo)
      setMultinationalData(multinationalInfo)
    })
    return function cleanup() {
      abortController.abort()
    }
  }, [multinationalId])

  return (
    <div>
      <Helmet title="Dashboard: Patient Details" />
      <div className="air__utils__heading">
        <h5>Dashboard: Multinational Details</h5>
      </div>
      <div className="row">
        <div className="col-xl-6 col-md-6 col-xs-12 col-sm-12">
          <div className="card">
            <div className="card-body">
              {multinationalData && (
                <div>
                  <div className="d-flex flex-wrap align-items-center mb-2">
                    <div className="flex-shrink-0 kit__utils__avatar mr-4 mb-2">
                      <img src="resources/images/avatars/2.jpg" alt="Mary Stanform" />
                    </div>
                    <div className="mb-2">
                      <div className="text-dark font-size-18 font-weight-bold text-nowrap">
                        {multinationalData.Name}
                        <i className="align-text-bottom fe fe-check-square text-success ml-2 font-size-24 " />
                      </div>
                      {/* <div className="text-uppercase">Support team</div> */}
                    </div>
                  </div>
                  {/* <div className="mb-3">
                    <a className="btn btn-outline-primary mr-2">Contact</a>
                    <a className="btn btn-outline-danger">Unsubscribe</a>
                  </div> */}
                  <div className="table-responsive">
                    <table className="table table-borderless">
                      <tbody>
                        <tr>
                          <td className="text-gray-6 pl-0">Description</td>
                          <td className="pr-0 text-right text-dark">
                            {multinationalData.Description}
                          </td>
                        </tr>
                        <tr>
                          <td className="text-gray-6 pl-0">Address</td>
                          <td className="pr-0 text-right text-dark">
                            {multinationalData.Address} {multinationalData['Address 2']}
                          </td>
                        </tr>
                        <tr>
                          <td className="text-gray-6 pl-0">City</td>
                          <td className="pr-0 text-right text-dark">{multinationalData.City}</td>
                        </tr>
                        <tr>
                          <td className="text-gray-6 pl-0">Email</td>
                          <td className="pr-0 text-right text-dark">
                            {multinationalData.PatientEmail}
                          </td>
                        </tr>
                        <tr>
                          <td className="text-gray-6 pl-0">Contact Person</td>
                          <td className="pr-0 text-right text-dark">
                            {multinationalData.ContactPerson}
                          </td>
                        </tr>
                        <tr>
                          <td className="text-gray-6 pl-0">Digital Address</td>
                          <td className="pr-0 text-right text-dark">
                            {multinationalData.DigitalAddress}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  {/* <div className="row">
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
                  </div> */}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-md-6 col-xs-12 col-sm-12">
          <div className="card">
            <div className="card-body">
              <h5 className="mb-4">
                <strong>Upload Documents</strong>
              </h5>
              <p className="text-secondary">
                Please upload any relevant documents relating to this multinational here. They could
                be pamphlets, product documents, etc...
              </p>
              <Dragger {...draggerProps}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">You can upload multiple files at once</p>
              </Dragger>
              <div className="my-3">
                <button type="button" className="btn btn-block btn-primary">
                  Upload Documents
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(MultiNationalDetails)
