import React from 'react'
import { Form, Input } from 'antd'

const { TextArea } = Input

const StepTwo = () => {
  return (
    <Form layout="vertical">
      <div className="row">
        <div className="col-xs-12 col-md-12">
          <Form.Item
            name="Description"
            label="Description"
            rules={[
              { required: true, message: 'Kindly provide a description for this Multinational' },
            ]}
          >
            <TextArea
              rows={4}
              placeholder="Please provide text that best describes this corporation"
            />
          </Form.Item>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12 col-md-6">
          <Form.Item
            name="Address"
            label="Address (Line 1)"
            rules={[
              {
                required: true,
                message: 'Kindly enter a location/address for this multi-national',
              },
            ]}
          >
            <Input placeholder="Address Line 1" />
          </Form.Item>
        </div>
        <div className="col-xs-12 col-md-6">
          <Form.Item name="Address 2" label="Address (Line 2)">
            <Input placeholder="Address Line 2" />
          </Form.Item>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12 col-md-6">
          <Form.Item
            name="City"
            label="City"
            rules={[
              { required: true, message: 'Please enter the city this corporation is located' },
            ]}
          >
            <Input placeholder="City" />
          </Form.Item>
        </div>
        <div className="col-xs-12 col-md-6">
          <Form.Item
            name="Digital Address"
            label="Digital Address"
            rules={[{ required: true, message: 'Kindly provide this business digital address' }]}
          >
            <Input placeholder="Digital address (Eg: GHA-334433)" />
          </Form.Item>
        </div>
      </div>
    </Form>
  )
}

export default StepTwo
