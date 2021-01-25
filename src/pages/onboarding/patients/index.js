import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import dayjs from 'dayjs'
import { Form, Input, Select, Spin, notification } from 'antd'
import StepPanel from '../../../components/care360/onboarding/wizardPanel/StepPanel'
import ACL from '../../../components/@airui/system/ACL'
import * as firebase from '../../../services/firebase'
import { getDiseasesApi } from '../../../services/apis/diseases'
// const mapStateToProps = state => {
//   return {
//     appState: state,
//   }
// }
const { Option } = Select
const { TextArea } = Input

const OnboardPatients = () => {
  const [patientForm] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [diseaseOptions, setDiseaseOptions] = useState([])

  useEffect(() => {
    getDiseasesApi().then(diseases => {
      const formattedDiseases = diseases.map(rec => ({
        id: rec.id,
        ...rec.fields,
      }))
      setDiseaseOptions(formattedDiseases)
    })
  }, [])

  const Step1Form = () => {
    return (
      <>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
            <Form.Item
              name="FullName"
              label="Full Name"
              rules={[{ required: true, message: "Please enter patient's full name" }]}
            >
              <Input placeholder="Patient full name eg: John Doe" />
            </Form.Item>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
            <Form.Item
              name="Age"
              label="Age"
              rules={[{ required: true, message: "Please provide patient's age" }]}
            >
              <Input placeholder="Enter patient's age. eg: 45" />
            </Form.Item>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
            <Form.Item
              name="Sex"
              label="Sex"
              rules={[{ required: true, message: "Plesae select patient's sex" }]}
            >
              <Select placeholder="Select a patient's sex">
                <Option key="Male" value="Male">
                  Male
                </Option>
                <Option key="Female" value="Female">
                  Female
                </Option>
              </Select>
            </Form.Item>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3">
            <Form.Item
              name="ContactPerson"
              label="Contact Person"
              rules={[
                { required: true, message: 'Please provide a contact person for this patient' },
              ]}
            >
              <Input placeholder="Name of Contact person" />
            </Form.Item>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3">
            <Form.Item
              name="RelationshipToPatient"
              label="Relationship To Patient"
              rules={[{ required: true, message: 'Please provide relationship to contact person' }]}
            >
              <Input placeholder="Relationship to Patient" />
            </Form.Item>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3">
            <Form.Item
              name="ContactPersonNumber"
              label="Phone Number (Contact Person)"
              rules={[
                { required: true, message: 'Please provide a number for the contact person' },
              ]}
            >
              <Input placeholder="Contact Person Number" />
            </Form.Item>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3">
            <Form.Item
              name="SmartPhone"
              label="SmartPhone?"
              rules={[
                { required: true, message: 'Please choose if patient has smartphone or not' },
              ]}
            >
              <Select placeholder="Does patient have smartphone">
                <Option key="yes" value="yes">
                  Yes
                </Option>
                <Option key="no" value="no">
                  No
                </Option>
              </Select>
            </Form.Item>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3">
            <Form.Item
              name="ModeOfContact"
              label="Mode of Contact"
              rules={[{ required: true, message: 'We need a way to contact this patient' }]}
            >
              <Select placeholder="Select mode of contact">
                <Option key="call" value="call">
                  Call
                </Option>
                <Option key="sms" value="sms">
                  SMS (Text)
                </Option>
                <Option key="whatsapp" value="whatsapp">
                  WhatsApp
                </Option>
                <Option key="email" value="email">
                  Email
                </Option>
              </Select>
            </Form.Item>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3">
            <Form.Item
              name="City"
              label="City"
              rules={[{ required: true, message: 'Please enter City where Patient resides' }]}
            >
              <Input placeholder="City of residence" />
            </Form.Item>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3">
            <Form.Item
              name="Town"
              label="Town"
              rules={[{ required: true, message: ' Please enter Town where Patient resides' }]}
            >
              <Input placeholder="Town of residence" />
            </Form.Item>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3">
            <Form.Item
              name="HouseNumber"
              label="House Number"
              rules={[
                {
                  required: true,
                  message: "Please provide patient's house number or digital address",
                },
              ]}
            >
              <Input placeholder="House Number (Digital Address)" />
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
          <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
            <Form.Item
              name="Ailment"
              label="Ailment"
              rules={[
                {
                  required: true,
                  message: 'Please select an ailment this patient was diagnosed with',
                },
              ]}
            >
              <Select placeholder="Select ailment">
                {diseaseOptions.map(disease => (
                  <Option key={disease.id} value={disease.Name}>
                    {disease.Name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
            <Form.Item
              name="Medication"
              label="Medication/s prescribed"
              rules={[
                {
                  required: true,
                  message: 'Please provide prescribed medication for this patient',
                },
              ]}
            >
              <Input placeholder="Medication/s: (Paracetamol,Pepto Bismol,Nugel)" />
            </Form.Item>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
            <Form.Item
              name="Physician"
              label="Physician"
              rules={[{ required: true, message: "Please enter the consulting Physican's name" }]}
            >
              <Input placeholder="Attending/Consulting Physician" />
            </Form.Item>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
            <Form.Item
              name="Multinational"
              label="Medicinal Provider"
              rules={[{ required: true, message: 'Please select the appropriate Multinational' }]}
            >
              <Select placeholder="Select multinational">
                <Option key="nvt" value="Novartis">
                  Novartis
                </Option>
              </Select>
            </Form.Item>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
            <Form.Item
              name="Institution"
              label="Institution/Health Center/Visiting Center"
              rules={[{ required: true, message: 'Please enter name of medical facility' }]}
            >
              <Input placeholder="Medical Institution" />
            </Form.Item>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
            <Form.Item
              name="Pharmacist"
              label="Pharmacist"
              rules={[
                { required: true, message: 'Please provide pharmacist info for this patient' },
              ]}
            >
              <Input placeholder="Pharmacist" />
            </Form.Item>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
            <Form.Item
              name="Description"
              label="Description (Medical Condition)"
              rules={[
                {
                  required: true,
                  message: "Provide a description of the patient's medical condition",
                },
              ]}
            >
              <TextArea placeholder="Description of medical condition" rows={4} />
            </Form.Item>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
            <Form.Item
              name="Diagnosis"
              label="Medical Diagnosis"
              rules={[
                { required: true, message: 'Please provide full medical diagnosis by Physician' },
              ]}
            >
              <TextArea placeholder="Physician's full diagnosis" rows={4} />
            </Form.Item>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
            <Form.Item name="Notes" label="Notes">
              <TextArea placeholder="Notes(additional information" rows={4} />
            </Form.Item>
          </div>
        </div>
      </>
    )
  }

  const onFinish = () => {
    setLoading(true)
    const formData = patientForm.getFieldsValue()
    const medication = formData.Medication.split(',')
    formData.Medication = medication
    formData.createdAt = dayjs().format()
    const patientsRef = firebase.firebaseDatabase.ref('patients')
    const postKey = patientsRef.push().key
    patientsRef.child(postKey).set(formData, err => {
      setLoading(false)
      if (err) {
        notification.warning({
          message: err.code,
          description: err.message,
        })
        patientForm.resetFields()
      } else {
        notification.success({
          message: 'Success',
          description: 'Patient has been successfully onboarded',
        })
        patientForm.resetFields()
      }
    })
    // patientsRef.child(postKey).set(formData, function(err) {
    //   setLoading(false)

    // })
  }

  const steps = [
    {
      step: 1,
      title: 'Patient Contact Information',
      content: <Step1Form />,
    },
    {
      step: 2,
      title: 'Medical Information',
      content: <Step2Form />,
    },
  ]

  return (
    <ACL roles={['admin']} redirect>
      <div>
        <Helmet title="Dashboard: Onboard Patients" />
        <div className="air__utils__heading">
          <h5>Dashboard: Onboard Patients</h5>
        </div>
        <Spin size="large" spinning={loading}>
          <div className="row">
            <div className="col-xs-12 col-md-12 col-lg-12">
              <div className="card">
                <div className="card-body">
                  <p>Please fill out the form to complete the onboarding process for patient</p>
                  <Form layout="vertical" form={patientForm} onFinish={onFinish}>
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

export default OnboardPatients
