
import TwoLayerCard from "../card/TwoLayerCard";
import PropTypes from "prop-types";

function TopRatedProductsBody({ title , products }) {
  return (
    <div className="w-full">
      <div className="text-center flex justify-center items-center flex-col text-4xl mt-[20px] text-slate-600 font-bold relative pb-[45px]">
        <h2>{title}</h2>
        <div className="w-[200px] h-[4px] bg-[#7fad39] mt-4"></div>
      </div>
      <div
        className="grid grid-cols-1 gap-[20px] sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-y-[190px] pb-[160px]"
        id="item-body"
      >
        {products &&
          products.length > 0 &&
          products
            .slice(0, 8)
            .map((item) => <TwoLayerCard key={item?._id} item={item} />)}
      </div>
    </div>
  );
}

TopRatedProductsBody.propTypes = {
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
export default TopRatedProductsBody;
