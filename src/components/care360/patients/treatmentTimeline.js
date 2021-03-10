import React from 'react'
import style from './style.module.scss'

const TreatmentTimeline = () => {
  //   const {patientData} = props
  return (
    <ul className="list-unstyled">
      <li className={style.item}>
        <div className={`${style.itemTime} mr-3`}>16:00</div>
        <div className={style.itemSeparator}>
          <div className={`${style.donut} ${style.primary} mr-3`} />
        </div>
        <div>Patient went through with medication. No issues encountered</div>
      </li>
      <li className={style.item}>
        <div className={`${style.itemTime} mr-3`}>15:28</div>
        <div className={style.itemSeparator}>
          <div className={`${style.donut} ${style.primary} mr-3`} />
        </div>
        <div>Patient went through with medication. No issues encountered</div>
      </li>
      <li className={style.item}>
        <div className={`${style.itemTime} mr-3`}>14:26</div>
        <div className={style.itemSeparator}>
          <div className={`${style.donut} ${style.warning} mr-3`} />
        </div>
        <div>Patient missed medication due to some issue. follow up required</div>
      </li>
      <li className={style.item}>
        <div className={`${style.itemTime} mr-3`}>13:22</div>
        <div className={style.itemSeparator}>
          <div className={`${style.donut} ${style.danger} mr-3`} />
        </div>
        <div>Patient missed medication two consecutive days. Follow up important!</div>
      </li>
    </ul>
  )
}

export default TreatmentTimeline
