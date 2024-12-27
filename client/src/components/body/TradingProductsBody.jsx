import CategoryCard from "../card/CategoryCard";
import PropTypes from "prop-types";

function TradingProductsBody({ title, products }) {
  return (
    <div className="w-full">
      <div className="text-center flex justify-center items-center flex-col text-[3.6rem] mt-[20px] text-slate-600 font-bold relative pb-[45px]">
        <h2>{title}</h2>
        <div className="w-[200px] h-[4px] bg-[#7fad39] mt-4"></div>
      </div>
      <div
        id="product-body"
        className="grid grid-cols-2 2xl:grid-cols-4 xl:grid-cols-3 sm:grid-cols-2 gap-[20px]"
      >
        {products &&
          products.length > 0 &&
          products
            .slice(0, 8)
            .map((item) => <CategoryCard key={item._id} item={item} />)}
      </div>
    </div>
  );
}
TradingProductsBody.propTypes = {
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
export default TradingProductsBody;
