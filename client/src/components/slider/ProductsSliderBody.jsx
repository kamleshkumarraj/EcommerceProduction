// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./style.css";

// import required modules
import { Navigation } from "swiper/modules";
import CategoryCard from "../card/CategoryCard";
import TwoLayerCard from "../card/TwoLayerCard";
import FeaturedCard from "../card/FeaturedCard";
import OfferedProductCard from "../card/OffredProductCard";

export default function ProductsSliderBody({ productsList , title }) {
  return (
    <div className="px-[40px]">
      <div className="flex mx-[40px] flex-col text-4xl mt-[20px] text-slate-600 font-bold relative pb-[45px]">
        <h2>{title}</h2>
        <div className="w-[200px] h-[4px] bg-[#7fad39] mt-4"></div>
      </div>
      <div className="" id="products-slider">
      <Swiper
      slidesPerView={title =='Featured Products' ? 3 : 4}
      spaceBetween={20}
      navigation = {true}
      loop = {true}
      modules={[  Navigation]}
      className={`${title == 'Top Rated Products' ? 'pb-[160px]' : 'pb-[20px] ' } bg-gray-200`}
      style={title == 'Top Rated Products' ? { paddingBottom : '190px'} : {paddingBottom : '20px'} }
    >
      {productsList &&
        productsList?.length > 0 &&
        productsList.map((item) => (
          <SwiperSlide style={{backgroundColor : '#E5E7EB'}} key={item._id}>
            {title == 'Latest Products' ?  <CategoryCard item={item} /> : title == 'Top Rated Products' ? <TwoLayerCard item={item} /> : <OfferedProductCard item={item} />}
          </SwiperSlide>
        ))}
    </Swiper>
      </div>
     
    </div>
  );
}
