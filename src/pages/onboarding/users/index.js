import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import dayjs from 'dayjs'
import { Form, Input, Button, notification, Spin, Select } from 'antd'
import ACL from '../../../components/@airui/system/ACL'
import * as firebase from '../../../services/firebase'

const { Option } = Select

const OnboardUsers = () => {
  const [userForm] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const onFinish = values => {
    setLoading(true)
    const formData = {
      createdAt: dayjs().format(),
      ...values,
    }
    const usersRef = firebase.firebaseDatabase.ref('users')
    return firebase.firebaseAuth
      .createUserWithEmailAndPassword(formData.email, formData.password)
      .then(response => {
        if (response.user) {
          const { uid } = response.user
          usersRef.child(uid).set({
            role: formData.role,
            email: formData.email,
            name: formData.name,
            hospital: formData.hospital,
            multinational: formData.multinational,
            phone: formData.phoneNumber,
          })
        }
        setLoading(false)
        notification.success({
          message: 'Success!',
          description: 'User has been successfully added',
        })
        userForm.resetFields()
        return true
      })
      .catch(error => {
        notification.warning({
          message: error.code,
          description: error.message,
        })
        userForm.resetFields()
        setLoading(false)
      })
  }

  return (
    <ACL roles={['admin']} redirect>
      <div>
        <Helmet title="Dashboard: Onboard User" />
        <div className="air__utils__heading">
          <h5>Dashboard: Onboard Patients</h5>
        </div>
        <Spin spinning={loading} size="large">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-8">
              <div className="card">
                <div className="card-body">
                  <p>Please fill out the form below to register a new user</p>
                  <Form
                    form={userForm}
                    layout="vertical"
                    name="userRegistration"
                    onFinish={onFinish}
                  >
                    <div className="row">
                      <div className="col-xs-12 col-md-6">
                        <Form.Item
                          name="name"
                          label="Full Name"
                          rules={[
                            {
                              required: true,
                              message: 'Please provide a full name for this user',
                            },
                          ]}
                        >
                          <Input placeholder="eg: John Doe" />
                        </Form.Item>
                      </div>
                      <div className="col-xs-12 col-md-6">
                        <Form.Item
                          name="role"
                          label="Role"
                          rules={[
                            { required: true, message: 'You need to assign a role to this user' },
                          ]}
                        >
                          <Select placeholder="Select user role">
                            <Option value="admin">Admin</Option>
                            <Option value="caregiver">Caregiver</Option>
                            <Option value="multinational">Multinational</Option>
                            <Option value="manager">Manager</Option>
                            <Option value="support">Support</Option>
                          </Select>
                        </Form.Item>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xs-12 col-md-6">
                        <Form.Item
                          name="email"
                          label="Email"
                          rules={[
                            {
                              type: 'email',
                              message: 'Please provide a valid email',
                            },
                            {
                              required: true,
                              message: 'Please enter an email address',
                            },
                          ]}
                        >
                          <Input placeholder="eg: johndoe@email.com" />
                        </Form.Item>
                      </div>
                      <div className="col-xs-12 col-md-6">
                        <Form.Item
                          name="phoneNumber"
                          label="Phone Number"
                          rules={[
                            { required: true, message: 'Please input an active phone number' },
                          ]}
                        >
                          <Input placeholder="eg: 02451231234" />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xs-12 col-md-6">
                        <Form.Item
                          name="password"
                          label="Password"
                          rules={[
                            {
                              required: true,
                              message: 'Please enter a password',
                            },
                          ]}
                          hasFeedback
                        >
                          <Input.Password placeholder=".........." />
                        </Form.Item>
                      </div>
                      <div className="col-xs-12 col-md-6">
                        <Form.Item
                          name="confirm"
                          label="Confirm Password"
                          dependencies={['password']}
                          hasFeedback
                          rules={[
                            {
                              required: true,
                              message: "Please confirm user's password",
                            },
                            ({ getFieldValue }) => ({
                              validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                  return Promise.resolve()
                                }
                                return Promise.reject(
                                  new Error('The two passwords you entered do not match!'),
                                )
                              },
                            }),
                          ]}
                        >
                          <Input.Password placeholder=".........." />
                        </Form.Item>
                      </div>
                    </div>
                    <Form.Item
                      name="hospital"
                      label="Hospital"
                      rules={[{ required: true, message: 'Please input an active phone number' }]}
                    >
                      <Input placeholder="eg: Korle-Bu Teaching Hospital" />
                    </Form.Item>
                    <Form.Item
                      name="multinational"
                      label="Multinational"
                      rules={[{ required: true, message: 'Please input an active phone number' }]}
                    >
                      <Input placeholder="eg: Novartis" />
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Register User
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </Spin>
      </div>
    </ACL>
  )
}

export default OnboardUsers
