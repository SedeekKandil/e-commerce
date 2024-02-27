import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'


export default function Signup() {


    let navigate = useNavigate()

    const [errorMsg,setErrorMsg]=useState('')
    const [loading,setLoading]=useState(true)

     function sendDataToApi(values){
        setLoading(false)
         axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup' , values).then(({data})=>{
            if(data.message=='success'){
                navigate('/signin')
            }
         }).catch((err)=>{
            setErrorMsg(err.response.data.message)
            setLoading(true)
         })
    }

    function validationSchema(){
        let schema = new Yup.object({
            name: Yup.string().min(3).max(20).required(),
            email: Yup.string().email().required(),
            password: Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/ , 'You need Minimum eight characters, at least one uppercase letter, one lowercase letter and one number').required(),
            rePassword: Yup.string().oneOf([Yup.ref('password')] , "rePassword doesn't match the password").required(),
            phone: Yup.string().matches( /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/ , 'Phone number is not valid').required()
        })

        return schema
    }


    let signup=useFormik({
        initialValues : {
            name:'',
            email:'',
            password:'',
            rePassword:'',
            phone:'',
        },
        validationSchema,
        onSubmit: (values)=>{
            sendDataToApi(values)
        }  
    })
  return (
    <>
    <div className="container my-5">
    <div className='w-75 mx-auto'>
        <h3>Register Now:</h3>
        <form onSubmit={signup.handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input onBlur={signup.handleBlur} value={signup.values.name} onChange={signup.handleChange} type="text" name='name' className='form-control mb-3' id='name'/>


            
            {signup.errors.name && signup.touched.name?<div className="alert alert-danger">{signup.errors.name}</div>:''}

            <label htmlFor="email">Email:</label>
            <input onBlur={signup.handleBlur} value={signup.values.email} onChange={signup.handleChange} type="email" name='email' className='form-control mb-3' id='email'/>

            {signup.errors.email && signup.touched.email?<div className="alert alert-danger">{signup.errors.email}</div>:''}

            <label htmlFor="password">Password:</label>
            <input onBlur={signup.handleBlur} value={signup.values.password} onChange={signup.handleChange} type="password" name='password' className='form-control mb-3' id='password'/>

            {signup.errors.password && signup.touched.password?<div className="alert alert-danger">{signup.errors.password}</div>:''}

            <label htmlFor="rePassword">rePassword:</label>
            <input onBlur={signup.handleBlur} value={signup.values.rePassword} onChange={signup.handleChange} type="password" name='rePassword' className='form-control mb-3' id='rePassword'/>

            {signup.errors.rePassword && signup.touched.rePassword?<div className="alert alert-danger">{signup.errors.rePassword}</div>:''}

            <label htmlFor="phone">Phone:</label>
            <input onBlur={signup.handleBlur} value={signup.values.phone} onChange={signup.handleChange} type="number" name='phone' className='form-control mb-3' id='phone'/>

            {signup.errors.phone && signup.touched.phone?<div className="alert alert-danger">{signup.errors.phone}</div>:''}

            


            {errorMsg?<div className="alert alert-danger">{errorMsg}</div>:''}




            <button disabled={!(signup.dirty && signup.isValid)} type='submit' className='btn bg-main text-white'>
                {loading?'Signup':<i className='fa fa-spinner fa-spin'></i>}
            </button>
        </form>
      </div>
    </div>
      
    </>
  )
}