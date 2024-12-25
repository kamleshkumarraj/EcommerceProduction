import { FaStar } from "react-icons/fa";
import Pair_3 from "../button/Pair_3";
import PropTypes from "prop-types";
function FeaturedCard({ item }) {

 
  return (
    <div
      className="flex bg-white px-[15px] items-center py-[10px] border-[.5px] border-gray-200 relative hover:translate-y-[12px] hover:transition-transform hover:duration-[1500] gap-[20px] w-[450px] rounded-[10px]"
      id="best-seller-card"
    >
      <div
        id="img"
        className="w-[180px] bg-gray-100 flex justify-center items-center rounded-[5px]"
      >
        <img
          className="min-w-[180px] p-[15px]"
          src={item?.thumbnail}
          alt="object-images"
        />
      </div>
      <div id="details" className="flex flex-col gap-[10px]">
        <h1 onCopy={() => {
          window.navigator.clipboard.writeText('Lora copy kar le ')
        }} id="title" className="text-[18px] font-[500] ">
          {item?.title}
        </h1>
        <div id="rating" className="flex gap-[10px] items-center">
          <span className="text-[16px] flex gap-[5px] text-[#FFA31A]">
            {[1, 2, 3, 4, 5].map(() => (
              <FaStar key={Math.random()} size={18} color="#FFA31A" />
            ))}
          </span>
          <h2 className="text-[16px] text-gray-500 font-[400]">
            {item?.rating} Reviews
          </h2>
        </div>
        <div id="price" className="text-[18px] flex gap-[20px] font-[500]">
          <span className="text-gray-800">${item?.price}</span>
          <del className="text-gray-400">$500</del>
        </div>
        <Pair_3 item={item} bgColor={'bg-gray-200'} />
      </div>
    </div>
  );
}

FeaturedCard.propTypes = {
  item: PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired, 
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
  }).isRequired,
};

export default FeaturedCard;
