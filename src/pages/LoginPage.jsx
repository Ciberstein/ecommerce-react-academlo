import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import defaultValues from '../utils/defaultValues'
import './styles/loginPage.css'

export const LoginPage = () => {
  
  const [token, setToken] = useState()

  const { register, handleSubmit,  reset } = useForm()

  const submit = data => {
    const url = 'https://e-commerce-api-v2.academlo.tech/api/v1/users/login'
    axios.post(url, data)
      .then(res =>{
        console.log(res)
        setToken(res.data.token)
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('name', `${res.data.user.firstName} ${res.data.user.lastName}`)
      })
      .catch(err => {
        console.log(err)
        localStorage.clear()
      })
      reset(defaultValues)
  }
  const handleClick = () => {
    localStorage.clear()
    setToken()
  }
 
  if(localStorage.getItem('token')) {
    return (
      <div className='loginPage__container'>
        <div className='loginPage__form'>
          <img width='150' src='https://assets.stickpng.com/thumbs/585e4beacb11b227491c3399.png' />
          <h2>{localStorage.getItem('name')}</h2>
          <button onClick={handleClick}>logout</button>          
        </div>
      </div>
    )
  }
  else {
    return (
      <div className='loginPage__container'>
        <form onSubmit={handleSubmit(submit)} className='loginPage__form'>
          <div className='loginPage__fields-container'>
            <label htmlFor='email'>Email</label>
            <input {...register('email')} id='email' type='email' />
          </div>
          <div className='loginPage__fields-container'>
            <label htmlFor='password'>Password</label>
            <input {...register('password')} id='password' type='password' />
          </div>
          <button>Login</button>
        </form>
        <Link to='/user/register'>Go to register</Link>
      </div>
    )
  }
}
