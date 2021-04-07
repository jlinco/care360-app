import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import dayjs from 'dayjs'
import { Form, Input, Space, Select, Button, notification, Spin } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import StepPanel from '../../../components/care360/wizardPanel/StepPanel'
import ACL from '../../../components/@airui/system/ACL'
import * as firebase from '../../../services/firebase'
// import { getDiseasesApi } from '../../../services/apis/diseases'

const { Option } = Select
const { TextArea } = Input

const OnboardOrganizations = () => {
  const [stepForm] = Form.useForm()
  // const [diseaseOptions, setDiseaseOptions] = useState([])
  const [loading, setLoading] = useState(false)

  // useEffect(() => {
  //   // let mounted = true
  //   getDiseasesApi().then(diseases => {
  //     const formattedDiseases = diseases.map(rec => ({
  //       id: rec.id,
  //       ...rec.fields,
  //     }))
  //     setDiseaseOptions(formattedDiseases)
  //   })
  // }, [])

  const Step1Form = () => {
    return (
      <>
        <div className="row">
          <div className="col-xs-12 col-md-4">
            <Form.Item
              name="Name"
              label="Name"
              rules={[{ required: true, message: 'Kindly enter a name for this Multinational' }]}
            >
              <Input placeholder="Enter corporation name here" />
            </Form.Item>
          </div>
          <div className="col-xs-12 col-md-4">
            <Form.Item
              name="Alias"
              label="Alias"
              rules={[{ required: true, message: 'Kindly enter an alias for this multi-national' }]}
            >
              <Input placeholder="Enter alias for this multinational" />
            </Form.Item>
          </div>
          <div className="col-xs-12 col-md-4">
            <Form.Item
              name="ContactPerson"
              label="Contact Person"
              rules={[
                {
                  required: true,
                  message: 'Kindly enter a contact person for this multi-national',
                },
              ]}
            >
              <Input placeholder="Enter alias for this multinational" />
            </Form.Item>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <Form.Item
              name="Email"
              label="Email Address"
              rules={[
                { required: true, type: 'email', message: 'Please enter a valid email address' },
              ]}
            >
              <Input placeholder="Multinational Email Address" />
            </Form.Item>
          </div>
          <div className="col-md-4">
            <Form.Item
              name="PhoneNumber"
              label="Phone Number"
              rules={[
                { required: true, message: 'Please provide a working contact number' },
                { pattern: /[0-9]/, message: 'Please enter a valid phone number' },
                { len: 10, message: 'Your number is invalid' },
              ]}
            >
              <Input placeholder="Contact number" />
            </Form.Item>
          </div>
          <div className="col-md-4">
            <Form.Item name="Website" label="Website">
              <Input placeholder="https://www.website.com" />
            </Form.Item>
          </div>
        </div>
      </>
    )
  }

  const Step2Form = () => {
    return (
      <>
        <div className="row">
          <div className="col-xs-12 col-md-12">
            <Form.Item
              name="Description"
              label="Description"
              rules={[
                { required: true, message: 'Kindly provide a description for this Multinational' },
              ]}
            >
              <TextArea
                rows={4}
                placeholder="Please provide text that best describes this corporation"
              />
            </Form.Item>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <Form.Item
              name="Address"
              label="Address (Line 1)"
              rules={[
                {
                  required: true,
                  message: 'Kindly enter a location/address for this multi-national',
                },
              ]}
            >
              <Input placeholder="Address Line 1" />
            </Form.Item>
          </div>
          <div className="col-xs-12 col-md-6">
            <Form.Item name="Address 2" label="Address (Line 2)">
              <Input placeholder="Address Line 2" />
            </Form.Item>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <Form.Item
              name="City"
              label="City"
              rules={[
                { required: true, message: 'Please enter the city this corporation is located' },
              ]}
            >
              <Input placeholder="City" />
            </Form.Item>
          </div>
          <div className="col-xs-12 col-md-6">
            <Form.Item
              name="Digital Address"
              label="Digital Address"
              rules={[{ required: true, message: 'Kindly provide this business digital address' }]}
            >
              <Input placeholder="Digital address (Eg: GHA-334433)" />
            </Form.Item>
          </div>
        </div>
      </>
    )
  }

  const Step3Form = () => {
    return (
      <>
        <Form.List name="diseases">
          {(fields, { add, remove }) => (
            <>
              {fields.map(field => (
                <Space
                  key={field.key}
                  style={{ display: 'flex', marginBottom: 8, width: '100%' }}
                  align="baseline"
                >
                  <div className="row">
                    <div className="col-xs-12 col-md-4 col-lg-4">
                      <Form.Item
                        {...field}
                        name={[field.name, 'Disease']}
                        label="Disease Area"
                        fieldKey={[field.fieldKey, 'Disease']}
                        rules={[{ required: true, message: 'Select a disease area' }]}
                      >
                        <Input placeholder="Please enter disease area eg: Malaria" />
                      </Form.Item>
                    </div>
                    <div className="col-xs-10 col-md-3 col-lg-3">
                      <Form.Item
                        {...field}
                        name={[field.name, 'Medication']}
                        fieldKey={[field.fieldKey, 'Medication']}
                        label="Medication"
                        rules={[{ required: true, message: 'Enter medication for this disease' }]}
                      >
                        <Input placeholder="Medication name" />
                      </Form.Item>
                    </div>
                    <div className="col-xs-10 col-md-3 col-lg-3">
                      <Form.Item
                        {...field}
                        name={[field.name, 'DiseaseType']}
                        fieldKey={[field.fieldKey, 'DiseaseType']}
                        label="Disease Type"
                        rules={[{ required: true, message: 'Please select the disease type' }]}
                      >
                        <Select placeholder="Select disease type">
                          <Option key="Chronic" value="Chronic">
                            Chronic
                          </Option>
                          <Option key="Acute" value="Acute">
                            Acute
                          </Option>
                        </Select>
                      </Form.Item>
                    </div>
                    <div className="col-xs-2 col-md-2 col-lg-2 mt-4 pt-2">
                      <MinusCircleOutlined onClick={() => remove(field.name)} />
                    </div>
                  </div>
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Add field
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </>
    )
  }

  const onFinish = () => {
    const multinationalsRef = firebase.firebaseDatabase.ref('multinationals')
    const postKey = multinationalsRef.push().key
    const formData = stepForm.getFieldsValue()
    setLoading(true)
    multinationalsRef.child(postKey).set({ createdAt: dayjs().format(), ...formData }, err => {
      setLoading(false)
      if (err) {
        notification.warning({
          message: err.code,
          description: err.message,
        })
        stepForm.resetFields()
      } else {
        notification.success({
          message: 'Success',
          description: 'Multinational was successfully added',
        })
        stepForm.resetFields()
      }
    })
    // multinationalsRef.child(postKey).set(
    //   {
    //     createdAt: dayjs().format(),
    //     ...formData,
    //   },
    //   function(err) {
    //     setLoading(false)

    //   },
    // )
  }

  const steps = [
    {
      step: 1,
      title: 'Introduction',
      content: <Step1Form />,
    },
    {
      step: 2,
      title: 'Details',
      content: <Step2Form />,
    },
    {
      step: 3,
      title: 'Disease Area',
      content: <Step3Form />,
    },
  ]

  return (
    <ACL roles={['admin']} redirect>
      <div>
        <Helmet title="Dashboard: Onboard Organization" />
        <div className="air__utils__heading">
          <h5>Dashboard: Onboard Organization</h5>
        </div>
        <Spin size="large" spinning={loading}>
          <div className="row">
            <div className="col-xs-12 col-md-12 col-lg-12">
              <div className="card">
                <div className="card-body">
                  <p>
                    Please fill out the form to complete the onboarding process for multinational
                  </p>
                  <Form layout="vertical" form={stepForm} onFinish={onFinish}>
                    <StepPanel steps={steps} />
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

export default OnboardOrganizations
