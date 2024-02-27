import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../Loading/Loading'
import Product from '../Product/Product'

export default function ProductOfBrand() {

    let x = useParams()
    
    let [productsOF, setProductsOF] = useState({})
  let [loading,setLoading] = useState(true)

    async function getProductsFromBrand(){
        let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?brand=${x.id}`)
        setProductsOF(data.data)
    setLoading(false)
    }

    useEffect(()=>{
        getProductsFromBrand()
      },[])
    
      if(loading) return <Loading/>

  return (
    <>
      <div className="container">
        <div className="row my-4">
        {productsOF.map(item=>{
          return <Product item={item} key={item._id}/>
        })}
        </div>
      </div>
    </>
  )
}