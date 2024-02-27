
import axios from 'axios'
import React, { createContext, useState } from 'react'


export const wishlistContext = createContext(0)

function addToWishlist(productId){
    return axios.post('https://ecommerce.routemisr.com/api/v1/wishlist' , {productId} , 
    {
        headers : {token: localStorage.getItem('token')}
    }
    ).then(({data}) => data).catch(err => err)
}


function getWishlist(){
  return axios.get('https://ecommerce.routemisr.com/api/v1/wishlist' , 
  {
      headers : {token: localStorage.getItem('token')}
  }
  ).then(({data}) => data).catch(err => err)
}



function deleteFromWishlist(productId){
  return axios.delete('https://ecommerce.routemisr.com/api/v1/wishlist/' + productId , 
  {
      headers : {token: localStorage.getItem('token')}
  }
  ).then(({data}) => data).catch(err => err)
}



export default function WishlistContextProvider({children}) {

    let [count, setCount] = useState(0) 


  return <wishlistContext.Provider value={{count , setCount , addToWishlist , getWishlist , deleteFromWishlist}}>
    {children}
  </wishlistContext.Provider>
  
}

