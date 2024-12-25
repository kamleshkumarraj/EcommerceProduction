import PropTypes from "prop-types";
import OfferedProductCard from "../card/OffredProductCard"

function DiscountedProductsBody({ title, products }) {
  return (
    <div id="featured-product-body" className=" py-[10px] ">
      <div className="text-center flex justify-center items-center flex-col text-4xl mt-[20px] text-slate-600 font-bold relative pb-[45px]">
        <h2>{title}</h2>
        <div className="w-[200px] h-[4px] bg-[#7fad39] mt-4"></div>
      </div>
      <div className="grid 2xl:grid-cols-3 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[20px]">
        {products &&
          products.length > 0 &&
          products
            .slice(0, 9)
            .map((item) => <OfferedProductCard key={item._id} item={item} />)}
      </div>
    </div>
  )
}

DiscountedProductsBody.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      thumbnail: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default DiscountedProductsBody
