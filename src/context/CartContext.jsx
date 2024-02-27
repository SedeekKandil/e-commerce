import axios from 'axios'
import React, { createContext, useState } from 'react'

export const cartContext = createContext(0)



function addToCart(productId){
    return axios.post('https://ecommerce.routemisr.com/api/v1/cart' , {productId} , 
    {
        headers : {token: localStorage.getItem('token')}
    }
    ).then(({data}) => data).catch(err => err)
}


function getCart(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/cart' , 
    {
        headers : {token: localStorage.getItem('token')}
    }
    ).then(({data}) => data).catch(err => err)
}


function deletFromCart(productId){
    return axios.delete('https://ecommerce.routemisr.com/api/v1/cart/' + productId , 
    {
        headers : {token: localStorage.getItem('token')}
    }
    ).then(({data}) => data).catch(err => err)
}



function updateCart(productId , count){
    return axios.put('https://ecommerce.routemisr.com/api/v1/cart/' + productId , {count} ,
    {
        headers : {token: localStorage.getItem('token')}
    }
    ).then(({data}) => data).catch(err => err)
}



function deleteCart(){
    return axios.delete('https://ecommerce.routemisr.com/api/v1/cart' , 
    {
        headers : {token: localStorage.getItem('token')}
    }
    ).then(({data}) => data).catch(err => err)
}


function pay(cartId, shippingAddress){
    return axios.post('https://ecommerce.routemisr.com/api/v1/orders/checkout-session/' + cartId , {shippingAddress},
    {
        headers : {token: localStorage.getItem('token')}
    }
    ).then(({data}) => data).catch(err => err)
}


export default function CartContextProvider({children}) {

    let [counter, setCounter] = useState(0) 


  return <cartContext.Provider value={{counter , setCounter , addToCart , getCart , deletFromCart , updateCart , deleteCart , pay}}>
    {children}
  </cartContext.Provider>
  
}
