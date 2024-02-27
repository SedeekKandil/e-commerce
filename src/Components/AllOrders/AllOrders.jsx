import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../Loading/Loading'

export default function AllOrders() {

  

  let [data, setData] = useState({})
  let [loading,setLoading] = useState(true)

  async function getOrders(){
    let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/orders/')
    setData(data.data)
    console.log(data.data)
    setLoading(false)
  }

  useEffect(()=>{
    getOrders()
  },[])

  if(loading) return <Loading/>

  
  return (
    <>
      {data.map(item=>{
          return <div key={item._id}  className="row ">
          <div className="col-md-2">
            <img src={item.cartItems.imageCover} className='w-100' alt="" />
          </div>
          <div className="col-md-10">
              <div>
            <p className='fw-bold'>{item.cartItems.title}</p>
            <p className='text-main fw-semibold'>{item.cartItems.price} EGP</p>
            <p className='fw-bold'>{item.cartItems.category}</p>
            </div>
            
          </div>
          <hr className='my-4' />
        </div>
        })}
    </>
  )
}
