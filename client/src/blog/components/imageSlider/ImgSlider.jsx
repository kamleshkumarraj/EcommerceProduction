import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide   } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';

import './blog-slide.css';

// import required modules
import { EffectCube, Pagination , Autoplay} from 'swiper/modules';

export default function ImgSlider() {
  return (
    <>
      <Swiper style={{width : '100%' , height : '100%' , position : 'absolute'}}
      autoplay={{delay: 2000,
        disableOnInteraction: false,}}
        loop={true}
        grabCursor={true}
        modules={[ Pagination ,Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide style={{backgroundPosition : 'center' , overflow : 'hidden' , borderRadius : '1rem' , backgroundSize : 'cover'}} >
          <img alt='hii' src="https://swiperjs.com/demos/images/nature-1.jpg" />
        </SwiperSlide  >
        <SwiperSlide style={{backgroundPosition : 'center' , overflow : 'hidden' , borderRadius : '1rem' , backgroundSize : 'cover'}} >
          <img alt='hii' src="https://swiperjs.com/demos/images/nature-2.jpg" />
        </SwiperSlide  >
        <SwiperSlide style={{backgroundPosition : 'center' , overflow : 'hidden' , borderRadius : '1rem' , backgroundSize : 'cover'}} >
          <img alt='hii' src="https://swiperjs.com/demos/images/nature-3.jpg" />
        </SwiperSlide  >
        <SwiperSlide style={{backgroundPosition : 'center' , overflow : 'hidden' , borderRadius : '1rem' , backgroundSize : 'cover'}} >
          <img alt='hii' src="https://swiperjs.com/demos/images/nature-4.jpg" />
        </SwiperSlide  >
      </Swiper>
    </>
  );
}