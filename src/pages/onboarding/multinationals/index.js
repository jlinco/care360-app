import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Form, Input, Button, notification, Table } from 'antd'
import { createNewMultiNational } from '../../../redux/multinationals/api'

const { TextArea } = Input

const mapStateToProps = state => {
  return {
    appState: state,
  }
}

const OnboardMultiNationals = props => {
  const { appState } = props
  const {
    multinationals: { multinationals },
  } = appState
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  // console.log(appState)
  const onFinish = values => {
    setLoading(true)
    const data = {
      fields: values,
    }
    createNewMultiNational(data).then(rec => {
      console.log(rec)
      setLoading(false)
      form.resetFields()
      notification.success({
        message: 'Multinational Added',
        description: `You have successfully added a Multinational: ${rec[0].Name}`,
      })
    })
  }
  const vendorColumns = [
    {
      title: 'Name',
      dataIndex: 'Name',
      className: 'text-gray-6',
    },
    {
      title: 'Disease Area',
      dataIndex: 'Disease Area',
      className: 'text-gray-6',
    },
    {
      title: 'Medication',
      dataIndex: 'Medication',
      className: 'text-gray-6',
    },
    {
      dataIndex: 'action',
      render: (row, index) => {
        return (
          <div>
            <NavLink to={`/management/multinationals/${index.id}`}>
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
    <div>
      <Helmet title="Onboard MultiNationals" />
      <div className="air__utils__heading">
        <h5>Onboarding: Multi Nationals</h5>
      </div>
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
          <div className="card">
            <div className="card-body">
              <p>Please fill out the form below for the new MultiNational you will like to add</p>
              <Form layout="vertical" onFinish={onFinish}>
                <div className="row">
                  <div className="col-md-12">
                    <Form.Item name="Name" label="Name">
                      <Input placeholder="Name" />
                    </Form.Item>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-12 col-md-6">
                    <Form.Item name="Location" label="Location">
                      <TextArea rows={4} placeholder="Location/Address" />
                    </Form.Item>
                  </div>
                  <div className="col-xs-12 col-md-6">
                    <Form.Item name="Description" label="Description">
                      <TextArea rows={4} placeholder="Company description" />
                    </Form.Item>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-12 col-md-6">
                    <Form.Item name="Disease Area" label="Disease Area">
                      <Input placeholder="Please provide the disease area you are targeting" />
                    </Form.Item>
                  </div>
                  <div className="col-xs-12 col-md-6">
                    <Form.Item name="Medication" label="Medication">
                      <Input placeholder="Please provide the medication used for the target disease area" />
                    </Form.Item>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="btn btn-block btn-primary px-5"
                        loading={loading}
                      >
                        Add MultiNational
                      </Button>
                    </Form.Item>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
          <div className="card">
            <div className="card-body">
              <div className="text-dark font-size-18 font-weight-bold mb-1">
                Existing Multinationals
              </div>
              <Table columns={vendorColumns} dataSource={multinationals} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(OnboardMultiNationals)
