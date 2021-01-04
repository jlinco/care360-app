import React from 'react'
import { Form, Input } from 'antd'
// import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
// import { getDiseaseMedicationsAPI } from 'redux/apis'

const StepThree = () => {
  // const
  return (
    <Form>
      <Form.Item
        name="Name"
        label="Name"
        rules={[{ required: true, message: 'Kindly enter a name for this Multinational' }]}
      >
        <Input placeholder="Enter corporation name here" />
      </Form.Item>
      {/* <Form.List name="dis_meds">
        {(fields, { add, remove }) => (
          <>
            {fields.map(field => (
              <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...field}
                  name={[field.name, 'Disease']}
                  fieldKey={[field.fieldKey, 'Disease']}
                  rules={[{ required: true, message: 'Select a disease area' }]}
                >
                  <Input placeholder='Select disease area' />
                </Form.Item>
              </Space>
            ))}
          </>
        )}
      </Form.List>   */}
    </Form>
  )
}
export default StepThree
