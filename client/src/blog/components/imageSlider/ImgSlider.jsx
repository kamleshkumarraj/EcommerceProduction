import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';

import './blog-slide.css';

// import required modules
import { Autoplay, Pagination } from 'swiper/modules';
import { useGetAllBlogsQuery } from '../../../store/slices/blogApi';

export default function ImgSlider() {
 const {data : allBlogs} = useGetAllBlogsQuery();
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
        
        {
          allBlogs && allBlogs?.data?.length > 0 && allBlogs?.data?.slice(20,30).map((blog, index) => ( <SwiperSlide key={blog?._id} style={{backgroundPosition : 'center' , overflow : 'hidden' , borderRadius : '1rem' , backgroundSize : 'cover'}} >
            <img alt='hii' src={blog?.thumbnail?.url} />
          </SwiperSlide  >))
        }
      </Swiper>
    </>
  );
}