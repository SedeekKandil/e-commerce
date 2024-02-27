import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../../context/CartContext'
import Loading from '../Loading/Loading'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

export default function Cart() {


  let { getCart , deletFromCart , setCounter , updateCart , deleteCart } = useContext(cartContext)
  let [data, setData] = useState(null)
  let [loading , setLoading] = useState(true)

  useEffect(()=>{
    (async()=>{
    let data = await getCart()
    if(data?.response?.data.statusMsg=="fail"){
      setData(null)
    }else{
      setData(data)
    }
    
    setLoading(false)
    })()
  }, [])

  async function deleteProduct(productId){
  let data = await deletFromCart(productId)
  if(data.status=="success"){
    toast.error('Product has been deleted')
    setCounter(data.numOfCartItems)
    setData(data)
  }
  }


  async function updateProductQuantity(productId,count){
    let data = await updateCart(productId , count)
    if(data.status=="success"){
      toast.success('Product has been updated successfully')
      setCounter(data.numOfCartItems)
      setData(data)
    }
    }


    // async function clearCart(){
    //   let data = await deleteCart()
    //   console.log(data)
    //   if(data.message=="success"){
    //     toast.success('Cart has been cleared successfully')
    //     setCounter(data.numOfCartItems)
    //     setData(data)
    //   }
    //   }



  if(loading) return <Loading/>
  if(data==null || data.numOfCartItems==0) return <h2 className='text-center my-5 text-main'>No items on cart.</h2>
  return (
    <>
      <div className="container bg-main-light my-5 p-5">
        <div className='mb-4 d-flex justify-content-between'>
        <h2 className='fw-bold'>Cart Shop</h2>
        {/* <button onClick={()=>clearCart()} className='btn bg-main text-white'>Clear Cart</button> */}
        </div>
        
        <div className='mb-4 d-flex justify-content-between'>
          <p className='fw-bold'>Total price: <span className='text-main'>{data?.data.totalCartPrice} Egp</span></p>
          <p className='fw-bold'>Total number of items: <span className='text-main'>{data?.numOfCartItems}</span></p>
        </div>

        {data?.data.products.map(item=>{
          return <div key={item._id} className="row ">
          <div className="col-md-2">
            <img src={item.product.imageCover} className='w-100' alt="" />
          </div>
          <div className="col-md-10">
          <div className='d-flex justify-content-between'>
              <div className='wid'>
            <p className='fw-bold'>{item.product.title}</p>
            <p className='text-main fw-semibold'>{item.price} EGP</p>
            <button onClick={()=>deleteProduct(item.product._id)}  className='btn bg-main text-white'><i className="fa-solid fa-trash"></i> Remove</button>
            </div>
            <div className=''>
              <button onClick={()=>updateProductQuantity(item.product._id,item.count+1)} className='brdr'>+</button>
              <span className='px-3'>{item.count}</span>
              <button disabled={item.count<=1} onClick={()=>updateProductQuantity(item.product._id,item.count-1)} className='brdr'>-</button>
            </div>
            </div>
          </div>
          <hr className='my-4' />
        </div>
        })}
        <div className='d-flex justify-content-center'>
        <Link to={`/address/${data.data._id}`} className='btn bg-main text-white w-25 fw-bold py-2 mt-3'>Check Out</Link>
        </div>
        
      </div>
    </>
  )
}
