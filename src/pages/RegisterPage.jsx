import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import defaultValues from '../utils/defaultValues'
import './styles/registerPage.css'

export const RegisterPage = () => {

    const { register, handleSubmit, reset } = useForm()

    const submit = data => {
        const url = `https://e-commerce-api-v2.academlo.tech/api/v1/users`
        axios.post(url , data)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
        reset(defaultValues)
    }

    return (
        <div className='registerPage__container'>
            <form onSubmit={handleSubmit(submit)} className='registerPage__form'>
                <div className='registerPage__fields-container'>
                    <label htmlFor='firstName'>First Name</label>
                    <input { ...register('firstName') } type='text' id='firstName' />
                </div>
                <div className='registerPage__fields-container'>
                    <label htmlFor='lastName'>Last Name</label>
                    <input { ...register('lastName') } type='text' id='lastName' />
                </div>
                <div className='registerPage__fields-container'>
                    <label htmlFor='email'>Email</label>
                    <input { ...register('email') } type='email' id='email' />
                </div>
                <div className='registerPage__fields-container'>
                    <label htmlFor='password'>Password</label>
                    <input { ...register('password') } type='password' id='password' />
                </div>
                <div className='registerPage__fields-container'>
                    <label htmlFor='phone'>Phone</label>
                    <input { ...register('phone') } type='number' id='phone' />
                </div>
                <button>Register</button>
            </form>
        </div>
    )
}
