import React from 'react'
import { Form, Input } from 'antd'

const StepOne = () => {
  return (
    <Form layout="vertical">
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
    </Form>
  )
}

export default StepOne
