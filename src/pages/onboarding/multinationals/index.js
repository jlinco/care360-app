import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import dayjs from 'dayjs'
import { Form, Input, Space, Select, Button, notification } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import StepPanel from './StepPanel'
import * as firebase from '../../../services/firebase'
import { getDiseasesApi } from '../../../services/apis/diseases'

const { Option } = Select
const { TextArea } = Input

const OnboardMultiNationals = () => {
  const [stepForm] = Form.useForm()
  // const [diseaseOptions, setDiseaseOptions] = useState([])

  useEffect(() => {
    // let mounted = true
    getDiseasesApi().then(item => {
      console.log(item)
    })
  }, [])

  const Step1Form = () => {
    return (
      <>
        <Form.Item
          name="Name"
          label="Name"
          rules={[{ required: true, message: 'Kindly enter a name for this Multinational' }]}
        >
          <Input placeholder="Enter corporation name here" />
        </Form.Item>
        <Form.Item
          name="Alias"
          label="Alias"
          rules={[{ required: true, message: 'Kindly enter an alias for this multi-national' }]}
        >
          <Input placeholder="Enter alias for this multinational" />
        </Form.Item>
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
                    <div className="col-xs-12 col-md-5 col-lg-5">
                      <Form.Item
                        {...field}
                        name={[field.name, 'Disease']}
                        fieldKey={[field.fieldKey, 'Disease']}
                        rules={[{ required: true, message: 'Select a disease area' }]}
                      >
                        <Select placeholder="Select a disease">
                          <Option key="malaria" value="malaria">
                            Malaria
                          </Option>
                          {/* {diseaseOptions.map(disease => (
                            <Option key={disease.id} value={disease.Name}>{disease.Name}</Option>
                          ))} */}
                        </Select>
                      </Form.Item>
                    </div>
                    <div className="col-xs-10 col-md-5 col-lg-5">
                      <Form.Item
                        {...field}
                        name={[field.name, 'Medication']}
                        fieldKey={[field.fieldKey, 'Medication']}
                        rules={[{ required: true, message: 'Enter medication for this disease' }]}
                      >
                        <Input placeholder="Medication name" />
                      </Form.Item>
                    </div>
                    <div className="col-xs-2 col-md-2 col-lg-2">
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
    multinationalsRef.child(postKey).set(
      {
        createdAt: dayjs().format(),
        ...formData,
      },
      function(err) {
        if (err) {
          notification.warning({
            message: err.code,
            description: err.message,
          })
        } else {
          notification.success({
            message: 'Success',
            description: 'Multinational was successfully added',
          })
          stepForm.resetFields()
        }
      },
    )
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
    <div>
      <Helmet title="Dashboard: Onboard Multinational" />
      <div className="air__utils__heading">
        <h5>Dashboard: Onboard Multinational</h5>
      </div>
      <div className="row">
        <div className="col-xs-12 col-md-12 col-lg-12">
          <div className="card">
            <div className="card-body">
              <p>Please fill out the form to complete the onboarding process for multinational</p>
              <Form layout="vertical" form={stepForm} onFinish={onFinish}>
                <StepPanel steps={steps} />
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OnboardMultiNationals
