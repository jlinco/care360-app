import React, { useState } from 'react'
import { Button, Steps } from 'antd'
import './style.scss'

const StepPanel = props => {
  const { steps } = props
  const [activeStep, setActiveStep] = useState(0)
  //   const [loading, setLoading] = useState(false)

  const next = () => {
    const nextStep = activeStep + 1
    setActiveStep(nextStep)
  }
  const prev = () => {
    const prevStep = activeStep - 1
    setActiveStep(prevStep)
  }

  return (
    <div className="row">
      <div className="col-12">
        <Steps current={activeStep} style={{ width: 1024, marginBottom: 20 }}>
          {steps.map(item => (
            <Steps.Step key={item.step} title={item.title} />
          ))}
        </Steps>
      </div>
      <div className="col-12">
        {steps.map(item => (
          <div className={`steps-content ${item.step !== activeStep + 1 && 'hidden'}`}>
            {item.content}
          </div>
        ))}
      </div>
      <div className="col-12">
        <div className="steps-action">
          {activeStep < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {activeStep === steps.length - 1 && (
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          )}
          {activeStep > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
              Previous
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default StepPanel
