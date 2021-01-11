import React from 'react'
import { Form, Input, Button, Space, Select } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
// import { getDiseaseMedicationsAPI } from 'redux/apis'

const { Option } = Select

const StepThree = () => {
  return (
    <>
      <Form.List name="diseases">
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
                      name={[field.name, 'Disease']}
                      fieldKey={[field.fieldKey, 'Disease']}
                      rules={[{ required: true, message: 'Select a disease area' }]}
                    >
                      <Select placeholder="Select a disease">
                        <Option key="Mlr" value="malaria">
                          Malaria
                        </Option>
                      </Select>
                    </Form.Item>
                  </div>
                  <div className="col-xs-10 col-md-5 col-lg-5">
                    <Form.Item
                      {...field}
                      name={[field.name, 'Medication']}
                      fieldKey={[field.fieldKey, 'Medication']}
                      rules={[{ required: true, message: 'Enter medication for this disease' }]}
                    >
                      <Input placeholder="Medication name" />
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
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </>
  )
}
export default StepThree
