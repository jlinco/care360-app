import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Form, Input, Select, Button, notification } from 'antd'
import { createNewPatient } from '../../../redux/patients/api'

const { Option } = Select

const mapStateToProps = state => {
  return {
    appState: state,
  }
}

const NewPatient = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const onFinish = values => {
    setLoading(true)
    const data = {
      fields: values,
    }
    createNewPatient(data).then(rec => {
      setLoading(false)
      form.resetFields()
      notification.success({
        message: 'Patient Created!',
        description: `Patient ${rec[0]['Last Name']} has been successfully created`,
      })
    })
  }
  return (
    <div>
      <Helmet title="Dashboard: New Patient" />
      <div className="air__utils__heading">
        <h5>Dashboard: New Patient</h5>
      </div>
      <div className="row">
        <div className="col-xs-12 col-md-8 col-lg-10">
          <div className="card">
            <div className="card-body">
              <p>
                Please fill out the form below for the new patient you will like to support using
                Care360
              </p>
              <Form layout="vertical" onFinish={onFinish}>
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
                      <Select placeholder="Select Patient sex">
                        <Option value="Male">Male</Option>
                        <Option value="Female">Female</Option>
                      </Select>
                    </Form.Item>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <Form.Item name="Medical Condition" label="Medical Condition">
                      <Select placeholder="Select Medical Condition">
                        <Option value="Malaria">Malaria</Option>
                        <Option value="Breast Cancer">Breast Cancer</Option>
                      </Select>
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
                      <Select placeholder="Does patient have smartphone">
                        <Option value="Yes">Yes</Option>
                        <Option value="No">No</Option>
                      </Select>
                    </Form.Item>
                  </div>
                  <div className="col-md-4">
                    <Form.Item name="Contact Mode" label="Contact Mode">
                      <Select placeholder="Select preferred contact mode">
                        <Option value="Call">Call</Option>
                        <Option value="Email">Email</Option>
                        <Option value="SMS">SMS</Option>
                        <Option value="WhatsApp">WhatsApp</Option>
                      </Select>
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
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="btn btn-block btn-info px-5"
                        loading={loading}
                      >
                        Update Patient
                      </Button>
                    </Form.Item>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(NewPatient)
