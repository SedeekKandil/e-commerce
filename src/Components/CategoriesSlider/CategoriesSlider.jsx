import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'


export default function CategoriesSlider() {
    const [categories, setCategories] = useState([])
    

 async  function getCategories(){
  let {data} = await  axios.get("https://ecommerce.routemisr.com/api/v1/categories")
  
  setCategories(data.data)
   }


   useEffect(()=>{
    getCategories()
   },[])
  
   
   var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay:true,
    autoplayspeed:1000,
    arrows:false,
  };
return (
<div className='my-5'>
  <h2 className='text-center mb-3  fw-bold'>Shop popular categories</h2>
<Slider {...settings}>
{
  categories.map((item)=>(
    <Link to={'/product-of-category/' + item._id } key={item._id} className='categoriy-slider '>
      <img className='w-100 cursor-pointer' src={item.image} alt="" />
    </Link>
    
  ))
}
</Slider>
</div>
)
}
