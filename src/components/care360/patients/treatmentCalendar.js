import React from 'react'
import { Calendar, Badge } from 'antd'

const TreatmentCalendar = props => {
  const {
    patientData: { treatmentPlan },
  } = props

  console.log(treatmentPlan)

  const renderCalendarData = value => {
    let listData
    switch (value.date()) {
      case value:
        break

      default:
        break
    }
    return listData || []
  }

  const dateCellRender = value => {
    const listData = renderCalendarData(value)
    return (
      <ul className="event">
        {listData.map(item => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div>
      <Calendar dateCellRender={dateCellRender} />
    </div>
  )
}

export default TreatmentCalendar
