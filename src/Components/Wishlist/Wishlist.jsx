import React, { useContext, useEffect, useState } from 'react'
import { wishlistContext } from '../../context/WishlistContext'
import Loading from '../Loading/Loading'
import { cartContext } from '../../context/CartContext'
import { toast } from 'react-toastify'

export default function Wishlist() {


  let {getWishlist, setCount , deleteFromWishlist} = useContext(wishlistContext)
  let [data, setData] = useState(null)
  let [loading , setLoading] = useState(true)
  let [btnLoading,setBtnLoading] = useState(true)
  let { count,setCounter , addToCart } = useContext(cartContext)



  async function addProductToCart(productId){
    setBtnLoading(false)
    let data = await addToCart(productId)
    if(data.status == 'success'){
      toast.success('Product added successfully')
      setCounter(data.numOfCartItems)
    }
    setBtnLoading(true)
   }


  useEffect(()=>{
    (async()=>{
    let data = await getWishlist()
    if(data?.count==0){
      setData(null)
    }else{
      setData(data)
    }
    
    setLoading(false)
    })()
  }, [])


  async function deleteProducts(productId){
    let data = await deleteFromWishlist(productId)
    if(data.status=="success"){
      toast.error('Product has been deleted from wishlist')
      setData(data)
    }
    }

  if(loading) return <Loading/>
  return (
    <>
      <div  className="container bg-main-light my-5 p-5">
        <div  className='mb-4'>
        <h2 className='fw-bold'>My Wishlist</h2>
        </div>
        {data.data.map(item=>{
          return <div key={item._id} className="row ">
          <div className="col-md-2">
            <img src={item.imageCover} className='w-100' alt="" />
          </div>
          <div className="col-md-10">
          <div className='d-flex justify-content-between align-items-center'>
              <div className='wid'>
            <p className='fw-bold'>{item.title}</p>
            <p className='text-main fw-semibold'>{item.price} EGP</p>
            <button onClick={()=>deleteProducts(item._id)} className='btn bg-main text-white'><i className="fa-solid fa-trash"></i> Remove</button>
            </div>
            <div>
            <button onClick={() => addProductToCart(item._id)} className='btn bg-main text-white'>
            Add to cart
            </button>
            </div>
            </div>
          </div>
          <hr className='my-4' />
        </div>
        })}
        
      </div>
    </>
  )
}
