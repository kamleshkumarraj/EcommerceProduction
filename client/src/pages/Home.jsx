
import { useSelector } from "react-redux";
import Advertisment1 from "../components/Advertisment1";
import Banner from "../components/Banner";
import Categorys from "../components/Categorys";
import FeatureProducts from "../components/products/FeatureProducts";
import Products from "../components/products/Products";
import { getAllProducts, getDiscountedProducts, getLatestProducts, getTopRatedProducts } from "../store/slices/productsHandler.slice";
const Home = () => {
  const products = useSelector(getAllProducts)
  const latest_product = useSelector(getLatestProducts)
  const topRated_product = useSelector(getTopRatedProducts);
  const discount_product = useSelector(getDiscountedProducts);

 

  return (
    <div className="w-full">
      <Banner />
      <div className="my-4">
        <Categorys />
      </div>
      <div className="py-[45px]">
        <FeatureProducts products={products.slice(0,20)} />
      </div>
      <div id="advertisment">
        <Advertisment1 />
      </div>
      <div className="py-10">
        <div className="w-[85%] flex flex-wrap mx-auto">
          <div className="grid w-full grid-cols-3 md-lg:grid-cols-2 md:grid-cols-1 gap-7">
            <div className="overflow-hidden">
              {latest_product.length > 0 && <Products title="Latest Product" products={latest_product} />}
            </div>
            <div className="overflow-hidden">
              {topRated_product.length > 0 &&  <Products title="Top Rated Product" products={topRated_product} />}
            </div>
            <div className="overflow-hidden">
              {discount_product.length > 0 &&  <Products title="Discount Product" products={discount_product} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
