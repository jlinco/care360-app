import React from 'react'
import TreatmentSchedule from './treatmentSchedule'

const PatientProfile = props => {
  const { patientData } = props
  const {
    patientData: { treatmentPlan },
  } = props
  console.log(patientData)
  console.log(treatmentPlan)

  return (
    <div>
      <div className="row">
        <div className="col-xs-12 col-md-6">
          <div className="mb-4">
            <h5 className="font-weight-bold">Medical Diagnosis</h5>
            <p>{patientData.Diagnosis}</p>
          </div>
        </div>
        <div className="col-xs-12 col-md-6">
          <div className="mb-4">
            <h5 className="font-weight-bold">Description</h5>
            <p>{patientData.Description}</p>
          </div>
        </div>
        <div className="col-xs-12 col-md-12">
          <div className="mb-4">
            <h5 className="font-weight-bold">Treatment Schedule</h5>
            <TreatmentSchedule patientData={patientData} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatientProfile
