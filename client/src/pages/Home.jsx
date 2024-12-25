import { useSelector } from "react-redux";
import Advertisement from "../components/Advertisment1";
import Banner from "../components/Banner";
import Categorys from "../components/Categorys";
import OfferBanner from "../components/OfferBanner";
import FeaturedProductsBody from "../components/body/FeaturedProductsBody";
import LaptopComputerBody from "../components/body/LaptopComputerBody";
import LatestProductsBody from "../components/body/LatestProductsBody";
import TopRatedProductsBody from "../components/body/TopRatedProductsBody";
import TradingProductsBody from "../components/body/TradingProductsBody";
import {
  getAllProducts,
  getDiscountedProducts,
  getTopRatedProducts,
} from "../store/slices/productsHandler.slice";
import TestimonialSection from "../components/body/TestomonialSection";
import WhyChooseUs from "../components/body/ChooseWhy";
import DiscountedProductsBody from "../components/body/DiscountedProductsBody";
const Home = () => {
  const products = useSelector(getAllProducts);
  const topRated_product = useSelector(getTopRatedProducts);
  const discount_product = useSelector(getDiscountedProducts);

  return (
    <div className="w-full">
      <Banner />
      <div className="my-4">
        <Categorys />
      </div>
      <div id="latest-products-body"  className="py-[45px] px-[20px] lg:px-[40px] w-[100%]">
        <LatestProductsBody title={"Latest Products"} products={products.slice(0, 24)} />
      </div>
      <div id="offer-banner">
        <OfferBanner />
      </div>
      <div id="featured-products-body" className="overflow-hidden bg-gray-200 w-[100%] px-[20px] lg:px-[40px]">
        {topRated_product.length > 0 && (
          <FeaturedProductsBody title="Featured Products" products={discount_product} />
        )}
      </div>
      <div
        id="laptop-computer-body"
        className="bg-gray-200 width-[100%] mx-auto px-[20px] lg:px-[40px] py-[20px]"
      >
        <LaptopComputerBody />
      </div>
      <div id="advertisement-banner" className="w-[100%]">
        <Advertisement />
      </div>
      <div
        id="top-rated-products-body"
        className="w-[100%] mx-auto px-[20px] lg:px-[40px] py-[20px] bg-gray-200"
      >
        {topRated_product && topRated_product.length > 0 && (
          <TopRatedProductsBody title={"Top Rated Products"} products={topRated_product} />
        )}
      </div>
      <div
        id="latest-products"
        className="w-[100%] mx-auto px-[20px] lg:px-[40px] py-[20px] bg-gray-200"
      >
        {products && products.length > 0 && (
          <TradingProductsBody title={"Trading Products"} products={products.slice(85,100)} />
        )}
      </div>
      <div id="why-we-choose" className="">
        <WhyChooseUs />
      </div>
      <div id="discountableProduct" className=" bg-gray-200 px-[20px] lg:px-[40px] py-[40px]" >
        {products && products.length > 0 && (
          <DiscountedProductsBody title={"Discountable Products"} products={products.slice(120,140)} />
        )}
      </div>
      <div id="testimonial-section" className="px-[20px] my-[30px]" >
        <TestimonialSection />
      </div>
    </div>
  );
};

export default Home;
