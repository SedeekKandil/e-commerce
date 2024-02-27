import axios from 'axios'
import React from 'react'
import Loading from '../Loading/Loading'
import { useQuery } from 'react-query'
import Brand from '../Brand/Brand'

export default function Brands() {

  function getBrands(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/brands')
  }


  let {data, isLoading} = useQuery('getBrands', getBrands)


  if(isLoading) return <Loading/>
  return (
    <>
     <div className="container">
      <div className="row my-4">
        {data?.data.data.map(item=>{
          return <Brand item={item} key={item._id}/>
        })}
      </div>
     </div>
    </>
  )
}
