import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import dayjs from 'dayjs'
import moment from 'moment'
import { Form, Input, Select, Spin, Space, DatePicker, Button, notification } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import StepPanel from '../../../components/care360/wizardPanel/StepPanel'
import ACL from '../../../components/@airui/system/ACL'
import * as firebase from '../../../services/firebase'
// import { getDiseasesApi } from '../../../services/apis/diseases'
import { getMultinationalsOnce } from '../../../services/apis/multinationals'
// const mapStateToProps = state => {
//   return {
//     appState: state,
//   }
// }
const { Option } = Select
const { TextArea } = Input
const { RangePicker } = DatePicker
const dateFormat = 'YYYY/MM/DD'

// const normFile = (e) => {
//   console.log('upload event: ', e)
//   if (Array.isArray(e)) {
//     return e;
//   }

//   return e && e.fileList
// }

// const dummyUploadRequest = ({ file, onSuccess }) => {
//   console.log(file)
//   setTimeout(() => {
//     onSuccess("ok")
//   }, 0)
// }

const OnboardPatients = () => {
  // const allInputs = {imgUrl: ''}
  const [patientForm] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [diseaseOptions, setDiseaseOptions] = useState([])
  const [multinationals, setMultinationals] = useState([])
  const [isProviderPrivate, setIsProviderPrivate] = useState(true)
  // const [selectedFile, setSelectedFile] = useState(null)
  // const [selectedFileList, setSelectedFileList] = useState([])
  // const [AvatarUrl, setAvatarUrl] = useState('')

  useEffect(() => {
    const abortController = new AbortController()
    const { signal } = abortController

    getMultinationalsOnce({ signal }).then(providers => {
      const multis = providers.val()
      const multiArr = Object.keys(multis).map(key => ({
        id: key,
        ...multis[key],
      }))
      localStorage.setItem('multiNationals', JSON.stringify(multiArr))
      setMultinationals(multiArr)
    })
    return function cleanup() {
      abortController.abort()
    }
  }, [])

  // const getBase64 = (img, cb) => {
  //   const reader = new FileReader()
  //   reader.addEventListener('load', () => cb(reader.result))
  //   reader.readAsDataURL(img)
  // }

  // const beforeUpload = (file) => {
  //   const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png'
  //   if (!isJpgOrPng) {
  //     message.error('You can only upload a JPG/PNG file')
  //   }
  //   const isLt2M = file.size / 1024 / 1024 < 2
  //   if (!isLt2M) {
  //     message.error('Image size must be less than 2MB')
  //   }
  //   return isJpgOrPng && isLt2M
  // }

  // const uploadButton = (
  //   <div>
  //     {imgLoading ? <LoadingOutlined /> : <PlusOutlined />}
  //     <div style={{ marginTop: 8 }}>Upload Patient Profile Photo</div>
  //   </div>
  // )

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
            <Form.Item
              name="PatientEmail"
              label="Email Address"
              rules={[{ type: 'email', message: 'Please enter a valid email address' }]}
            >
              <Input placeholder="email@address.com" />
            </Form.Item>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
            <Form.Item
              name="Age"
              label="Age"
              rules={[
                { required: true, message: "Please provide patient's age" },
                { pattern: /[0-9]/, message: 'Please enter a valid number' },
                { max: 3, message: 'Please enter a valid figure' },
              ]}
            >
              <Input placeholder="Enter patient's age. eg: 45" />
            </Form.Item>
            <Form.Item
              name="PhoneNumber"
              label="Phone Number"
              rules={[
                { required: true, message: "Please provide patient's phone number" },
                { pattern: /[0-9]/, message: 'Please enter a valid number' },
                { len: 10, message: 'Your number is invalid' },
              ]}
            >
              <Input placeholder="Enter patient's number. eg: 0244123123" />
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
            <Form.Item
              name="WhatsAppNumber"
              label="WhatsApp Number (if different from Phone Number)"
              rules={[
                { pattern: /[0-9]/, message: 'Please enter a valid phone number' },
                { len: 10, message: 'Your number is invalid' },
              ]}
            >
              <Input placeholder="Enter patient's whatsapp number. eg: 0244123123" />
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
                { pattern: /[0-9]/, message: 'Please enter a valid phone number' },
                { len: 10, message: 'Your number is invalid' },
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
              name="Multinational"
              label="Multinational"
              rules={[{ required: true, message: 'Please select the appropriate Multinational' }]}
            >
              <Select placeholder="Select multinational" onChange={onMultinationalChange}>
                {multinationals.map(multi => (
                  <Option key={multi.id} value={multi.id}>
                    {multi.Name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
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
              <Select placeholder="Please select a multinational first" onChange={onDiseaseChange}>
                {diseaseOptions.map(disease => (
                  <Option key={disease.Disease} value={disease.Disease}>
                    {disease.Disease}
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
              <Input
                placeholder="Medication/s: Auto-filled after selecting an ailment"
                value="Pepto Bismol"
              />
            </Form.Item>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
            <Form.Item
              name="Physician"
              label="Physician"
              rules={[{ required: true, message: "Please enter the consulting Physican's name" }]}
            >
              <Input placeholder="Attending/Consulting Physician" />
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
              name="Pharmacy"
              label="Pharmacy"
              rules={[{ required: true, message: 'Please enter name of Pharmacy' }]}
            >
              <Input placeholder="Pharmacy" />
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
        {/* <div className="row">
          <div className="col-xs-12 col-md-6">
            <Form.Item label="Upload Profile Photo">
              <Form.Item name="ProfilePhoto" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                <Upload.Dragger name="profilePhotos" beforeUpload={beforeUpload} customRequest={dummyUploadRequest} onChange={imageChange}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">Click or drag file to this area to upload</p>
                  <p className="ant-upload-hint">Please select a JPG/PNG file not more than 2MB</p>
                </Upload.Dragger>
              </Form.Item>
            </Form.Item>
          </div>
          <div className="col-xs-12 col-md-6">
            <p>Another drag and drop element here</p>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Form.Item
              valuePropName="checked"
              name='consent'
              rules={[{ required: true, message: 'Please check this box to proceed' }]}
            >
              <Checkbox className="text-uppercase">
                I CONSENT TO HAVING MDTK SOFT COLLECT MY PERSONAL DETAILS.
              </Checkbox>
            </Form.Item>
          </div>
        </div> */}
      </>
    )
  }

  const Step3Form = () => {
    return (
      <>
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <Form.Item
              name="PaymentSource"
              label="Source of Payment"
              rules={[
                {
                  required: true,
                  message: "Please select a payment source for this patient's treatment",
                },
              ]}
            >
              <Select placeholder="Select Payment/Funding Source" onChange={onProviderChange}>
                <Option key="self-paid" value="self-paid">
                  Self-Paid
                </Option>
                <Option key="NHIS" value="NHIS">
                  NHIS (Government)
                </Option>
                <Option key="privateInsurer" value="privateInsurer">
                  Private Insurer
                </Option>
              </Select>
            </Form.Item>
          </div>
          <div className="col-xs-12 col-md-6">
            <Form.Item
              name="InsurerName"
              label="Insurer's Name(If source of payment is Private Insurer)"
            >
              <Input placeholder="Enter Insurer Name" disabled={isProviderPrivate} />
            </Form.Item>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-12">
            <Form.List name="treatmentPlan">
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
                            name={[field.name, 'DateOfDosage']}
                            fieldKey={[field.fieldKey, 'DateOfDosage']}
                            rules={[
                              {
                                required: true,
                                message: 'Please set a date for this treatment plan',
                              },
                            ]}
                          >
                            <RangePicker style={{ width: '100%' }} format={dateFormat} />
                          </Form.Item>
                        </div>
                        <div className="col-xs-10 col-md-5 col-lg-5">
                          <Form.Item
                            {...field}
                            name={[field.name, 'Dosage']}
                            fieldKey={[field.fieldKey, 'Dosage']}
                            rules={[
                              {
                                required: true,
                                message: 'Please set dosage for this treatment plan',
                              },
                            ]}
                          >
                            <Input placeholder="Enter dosage. eg: 2 tabs 3x daily" />
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
                      Add Treatment Plan
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </div>
        </div>
      </>
    )
  }

  // const sendUserData = (data, url) => {
  //   data.profilePhoto = url

  // }

  // const uploadAvatar = (formdata, file) => {
  //   const uploadTask = firebase.firebaseStorage.ref(`/images/patients/${file.name}`).put(file)
  //   uploadTask.on("state_changed",
  //     (snapshot) => {
  //       console.log(snapshot)
  //     },
  //     (error) => {
  //       console.log(error)
  //       setLoading(false)
  //       notification.error({
  //         message: error.code,
  //         description: 'Please try again or contact admin'
  //       })
  //     },
  //     () => {
  //     firebase.firebaseStorage.ref("image/patients").child(file.name).getDownloadURL().then((url) => {
  //       setAvatarUrl(url)
  //       setSelectedFileList(null)
  //       sendUserData(formdata, AvatarUrl)
  //     }).ca
  //   })
  // }
  // const imageChange = info => {
  //   console.log(info)
  //   if (info.file.status === 'uploading') {
  //     setSelectedFile(info.file)
  //     return
  //   }
  //   if (info.file.status === 'done') {
  //     setSelectedFile(info.file)
  //     setSelectedFileList([info.file])
  //     // getBase64(info.file.originFileObj, imageUrl =>
  //     //   setImageAsUrl(imageUrl),
  //     //   setImgLoading(false)
  //     // )
  //   }
  // }

  const onFinish = () => {
    setLoading(true)
    const formData = patientForm.getFieldsValue()
    const medication = formData.Medication.split(',')
    formData.Medication = medication
    formData.createdAt = dayjs().format()
    if (formData.InsurerName === undefined) formData.InsurerName = 'N/A'
    if (formData.Notes === undefined) formData.Notes = 'N/A'
    if (formData.WhatsAppNumber === undefined) formData.WhatsAppNumber = 'N/A'
    const { treatmentPlan } = formData
    const tp = treatmentPlan.map(ttp => ({
      dosage: ttp.Dosage,
      dosageStartDate: moment(ttp.DateOfDosage[0]).format('YYYY-MM-DD'),
      dosageEndDate: moment(ttp.DateOfDosage[1]).format('YYYY-MM-DD'),
    }))
    const newData = { ...formData, treatmentPlan: tp }
    const multinational = formData.Multinational
    const newPostKey = firebase.firebaseDatabase.ref('patients').push().key
    const updates = {}
    updates[`/patients/${newPostKey}`] = newData
    updates[`/multinationals/${multinational}/patients/${newPostKey}`] = newData
    console.log(newData)
    firebase.firebaseDatabase.ref().update(updates, err => {
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
  }

  // const onValuesChange = (changedValues, allValues) => {
  //   console.log(changedValues)
  //   console.log(allValues)
  // }
  const onProviderChange = value => {
    if (value === 'privateInsurer') {
      setIsProviderPrivate(false)
    } else {
      setIsProviderPrivate(true)
    }
  }

  const onMultinationalChange = value => {
    setDiseaseOptions(null)
    const localMultis = JSON.parse(localStorage.getItem('multiNationals'))
    const diseaseArr = localMultis
      .filter(local => local.id === value)
      .map(filteredLocal => filteredLocal.diseases)
    localStorage.setItem('selectedDiseases', JSON.stringify(diseaseArr[0]))
    setDiseaseOptions(diseaseArr[0])
  }

  const onDiseaseChange = value => {
    const formData = patientForm.getFieldsValue()
    const selectedDisease = JSON.parse(localStorage.getItem('selectedDiseases'))
    const diseaseMedication = selectedDisease.filter(sd => sd.Disease === value)
    formData.Medication = diseaseMedication[0].Medication
    console.log(formData)
    patientForm.setFieldsValue(formData)
    // setMedication(diseaseMedication[0].Medication)
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
    {
      step: 3,
      title: 'Treatment Information',
      content: <Step3Form />,
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
