import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../Loading/Loading'
import { cartContext } from '../../context/CartContext'
import { toast } from 'react-toastify'
import { wishlistContext } from '../../context/WishlistContext'

export default function ProductDetails() {

  

  let x = useParams()
  let [product, setProduct] = useState({})
  let [loading,setLoading] = useState(true)
  let { setCounter , addToCart} = useContext(cartContext)
  let {count ,setCount , addToWishlist} = useContext(wishlistContext)
  let [btnLoading,setBtnLoading] = useState(true)
  let [style,setStyle] = useState(true)

  async function addProductToCart(productId){
    setBtnLoading(false)
    let data = await addToCart(productId)
    if(data.status == 'success'){
      toast.success('Product added successfully')
      setCounter(data.numOfCartItems)
    }
    setBtnLoading(true)
   }

   async function addProductToWishlist(productId){
    let data = await addToWishlist(productId)
    if(data.status == 'success'){
      toast.success('Product added successfully to your wishlist')
      setStyle(false)
    }
   }

  async function getProduct(){
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${x.id}`)
    setProduct(data.data)
    setLoading(false)
  }

  useEffect(()=>{
    getProduct()
  },[])

  if(loading) return <Loading/>

  
  return (
    <>
      <div className="container">
        <div className="row my-5 d-flex align-items-center">
          <div className="col-md-3">
            <img src={product.imageCover} className='w-100' alt="" />
          </div>
          <div className="col-md-9">
            <h5 className='fw-semibold'>{product.title}</h5>
            <p className='fw-light mt-3'>{product.description}</p>
            <div className='d-flex justify-content-between position-relative mb-3'>
            <span className='text-main fw-semibold fs-6'>{product.category.name}</span>
            <button onClick={()=>addProductToWishlist(x.id)} className='position-absolute top-0 end-0 fs-3 border border-0 bg-transparent'>
            {style?<i className="fa-regular fa-heart"></i>:<i className="fa-solid fa-heart text-danger"></i>}
            </button>
            </div>
            <div className='d-flex justify-content-between mt-2'>
            <div>
              {product.price} EGP
            </div>
            <div>
            <i className="fa-solid fa-star rating-color"></i>
              {product.ratingsAverage}
            </div>
            </div>
            <button disabled={!btnLoading} onClick={() => addProductToCart(x.id)} className='btn bg-main w-100 text-white mt-3'>
            {btnLoading?'Add to cart':<i className='fa fa-spinner fa-spin'></i>}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
