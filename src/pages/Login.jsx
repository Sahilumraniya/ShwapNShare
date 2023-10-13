import React from 'react'
import {Login as LoginComponent} from '../components'

const Login = () => {
  console.log('Login');
  return (
    <div className='py-20 text-black'>
      {/* <h1>Login</h1> */}
        <LoginComponent />
    </div>
  )
}

export default Login