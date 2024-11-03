import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import {Navigation , Autoplay} from 'swiper/modules'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';

// import required modules

import ProductsSliderCards from './ProductsSliderCards';

export default function ProductsSlider({products}) {
  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        navigation={true}
        loop={true}
        autoplay={{ delay: 1500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        breakpoints={{
            1500 : {
                slidesPerView: 4,
                spaceBetween: 20,
                },
            1200 : {
            slidesPerView: 3,
            spaceBetween: 20,
            },
          600: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          400: {
            slidesPerView: 1,
            spaceBetween: 10,
          }
        }}
        modules={[Navigation , Autoplay]}
        
        
        className="mySwiper"
      >
       
        {
        products && products.length > 0 && products.map((product, index) => (   
            <SwiperSlide key={index}  className='rounded-[10px] overflow-hidden' ><ProductsSliderCards product={product} /> </SwiperSlide>
        ))
        }
      </Swiper>
    </>
  );
}