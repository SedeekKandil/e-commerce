import React from 'react'
import { Link } from 'react-router-dom'



export default function Footer() {
  return (
    <>
      <footer className='px-5 text-bg-light p-3'>
        <h2>Get theFreshCart app</h2>
        <p>We will send you a link,open it on your phone to download the app</p>
        <div className='d-flex justify-content-center mb-4'>
        <input type="email" placeholder='Email' className='form-control w-75' />
        <div className="btn bg-main text-white ms-4">Share App Link</div>
        </div>
        <hr/>
        <div className='d-flex'>
          <h4>Payment Partners</h4>
          <Link to='https://pay.amazon.com/' target='_blank'><i className="fa-brands fa-amazon-pay mx-2 text-success"></i></Link>
          <Link to='https://www.mastercard.us/en-us.html' target='_blank'><i className="fa-brands fa-cc-mastercard mx-2 text-success"></i></Link>
          <Link to='https://www.paypal.com/eg/home' target='_blank'><i className="fa-brands fa-cc-paypal mx-2 text-success"></i></Link>
        </div>
      </footer>
    </>
  )
}
