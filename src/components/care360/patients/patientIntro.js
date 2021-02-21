import React from 'react'
import style from './style.module.scss'

const PatientIntro = props => {
  const { patientData } = props
  return (
    <div className="d-flex flex-wrap flex-column align-items-center">
      <div className="kit__utils__avatar kit__utils__avatar--size64 mb-3">
        <img src="resources/images/avatars/5.jpg" alt={`${patientData.FullName}`} />
      </div>
      <div className="text-center">
        <div className="text-dark font-weight-bold font-size-18">{patientData.FullName}</div>
        <div className="text-uppercase font-size-12 mb-3">
          <strong>AILMENT:</strong> {patientData.Ailment}
        </div>
        <button type="button" className={`btn btn-primary ${style.btnWithAddon}`}>
          <span className={`${style.btnAddon}`}>
            <i className={`${style.btnAddonIcon} fa fa-address-card`} />
          </span>
          Contact Patient
        </button>
      </div>
    </div>
  )
}

export default PatientIntro
