import React from 'react'
import { connect } from 'react-redux'
import { Input, Button, Form } from 'antd'
import { Link } from 'react-router-dom'
import style from '../style.module.scss'

const mapStateToProps = ({ user, settings, dispatch }) => ({
  dispatch,
  user,
  authProvider: settings.authProvider,
})

const Login = ({ dispatch, user }) => {
  const onFinish = values => {
    dispatch({
      type: 'user/LOGIN',
      payload: values,
    })
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  // const changeAuthProvider = value => {
  //   dispatch({
  //     type: 'settings/CHANGE_SETTING',
  //     payload: {
  //       setting: 'authProvider',
  //       value
  //     },
  //   })
  // }

  return (
    <div>
      <div className={`card border-0 ${style.container}`}>
        <div className="text-dark font-size-32 mb-3">Sign In</div>
        {/* <div className="mb-4">Login and password - demo@sellpixels.com / demo123</div> */}
        {/* <div className="mb-4">
          <Radio.Group onChange={e => changeAuthProvider(e.target.value)} value={authProvider}>
            <Radio.Button value="firebase">Caregiver</Radio.Button>
            <Radio.Button value="firebase">Doctor</Radio.Button>
            <Radio.Button value="firebase">Pharmacy</Radio.Button>
          </Radio.Group>
        </div> */}
        <Form
          layout="vertical"
          hideRequiredMark
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="mb-4"
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your e-mail address' }]}
          >
            <Input size="large" placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password' }]}
          >
            <Input size="large" type="password" placeholder="Password" />
          </Form.Item>
          <Button
            type="primary"
            size="large"
            className="text-center w-100 btn btn-success"
            htmlType="submit"
            loading={user.loading}
          >
            <strong>Sign in</strong>
          </Button>
        </Form>
        <Link to="/auth/forgot-password" className="kit__utils__link font-size-16">
          Forgot Password?
        </Link>
      </div>
      <div className="text-center pt-2 mb-auto">
        <span className="mr-2">Don&#39;t have an account?</span>
        <Link to="/auth/register" className="kit__utils__link font-size-16">
          Sign up
        </Link>
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(Login)
