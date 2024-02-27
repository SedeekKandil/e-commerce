import React from 'react'
import img1 from '../../assets/images/a4f4b458-c1f1-424c-aa1f-fd5bd2a8d41f.png'
import img2 from '../../assets/images/082dff41-7249-4196-9229-1d70c60d1103.png'
import img3 from '../../assets/images/cddaf249-2389-404b-90e9-fa18e96c23a8.png'
import Slider from 'react-slick'


export default function MainSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true,
        autoplayspeed:1000,
        arrows:false,
      };
  return (
    <>
    <div>
    <Slider {...settings}>
      <div>
        <img src={img1} className='w-100' alt="" />
      </div>
      <div>
        <img src={img2} className='w-100' alt="" />
      </div>
      <div>
        <img src={img3} className='w-100' alt="" />
      </div>
    </Slider>
    </div>
    </>
  )
}
