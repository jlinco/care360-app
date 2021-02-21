import React from 'react'

const PatientContactPerson = props => {
  const { patientData } = props
  return (
    <div>
      <div className="d-flex flex-nowrap align-items-center flex-column pb-4">
        <div className="text-center mb-2">
          <i className="fa fa-phone font-size-40" />
        </div>
        <div className="text-center mb-2">
          <div className="font-weight-bold font-size-24 text-dark mb-1">
            {patientData.ContactPerson}
          </div>
          <div className="font-size-18">{patientData.ContactPersonNumber}</div>
        </div>
      </div>
      <div className="border-top text-center text-gray-4 pt-3">Relationshp to Patient</div>
      <div className="text-center font-weight-bold">{patientData.RelationshipToPatient}</div>
    </div>
  )
}

export default PatientContactPerson
