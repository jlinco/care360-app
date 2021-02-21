import React from 'react'
// import style from './style.module.scss'

const PatientHeader = props => {
  const { patientData } = props
  const { patientId } = props

  return (
    <div className="d-flex flex-wrap border-bottom pt-3 pb-4 mb-3">
      <div className="mr-5">
        <div className="text-dark font-size-18 font-weight-bold">{patientData.FullName}</div>
        <div className="text-gray-6">{patientId}</div>
      </div>
      <div className="mr-5 text-center">
        <div className="text-dark font-size-18 font-weight-bold">{patientData.Age}</div>
        <div className="text-gray-6">Age</div>
      </div>
      <div className="mr-5 text-center">
        <div className="text-dark font-size-18 font-weight-bold">{patientData.HouseNumber}</div>
        <div className="text-gray-6">Address</div>
      </div>
    </div>
  )
}

export default PatientHeader
