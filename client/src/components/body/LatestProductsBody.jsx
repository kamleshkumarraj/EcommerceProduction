
import FeaturedCard from "../card/FeaturedCard";
import PropTypes from "prop-types";

const LatestProductsBody = ({ title, products }) => {
  return (
    <div className="flex flex-wrap">
      <div className="w-full">
        <div className="text-center flex justify-center items-center flex-col text-4xl text-slate-600 font-bold relative pb-[45px]">
          <h2>{title}</h2>
          <div className="w-[200px] h-[4px] bg-[#7fad39] mt-4"></div>
        </div>
      </div>
      <div className="grid w-full gap-6 2xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
        {products && products?.length > 0 &&
          products.map((item) => <FeaturedCard key={item._id} item={item} />)}
      </div>
    </div>
  );
};

LatestProductsBody.propTypes = {
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
export default LatestProductsBody;
