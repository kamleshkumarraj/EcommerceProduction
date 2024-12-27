
// import { FaStar } from "react-icons/fa";
import Pair_3 from "../button/Pair_3";
import PropTypes from "prop-types";
import { IoStar, IoStarOutline } from "react-icons/io5";

function MobileCard({ item }) {
  return (
    <div
      id="length-card"
      className="w-[280px] px-[20px] py-[10px] bg-white rounded-[10px] flex flex-col gap-[30px]"
    >
      <div id="image" className="w-[120px] h-[250px] flex justify-center items-center mx-auto">
        <img src={item?.images[0]} alt="products-image" />
      </div>
      <div id="details" className="flex flex-col items-center gap-[10px]">
        <h1 className="font-[500] text-center text-[24px] ">{item?.title}</h1>
        <div id="rating" className="flex gap-[10px] items-center">
                  <span className="text-[16px] flex gap-[5px] text-red-600">
                    {[[1,2,3,4,5] , [1,2,3,4,] , [1,2,3,] , [1,2] , [1]][5-Math.floor(item?.rating)].map(() => (
                      <IoStar key={Math.random()} size={20} color="#DC2626" />
                    ))}
                    {[[1,2,3,4,5] , [1,2,3,4,] , [1,2,3,] , [1,2] , [1]][Math.floor(item?.rating)].map(() => (
                      <IoStarOutline key={Math.random()} size={20} color="#DC2626" />
                    ))}
                  </span>
                  <h2 className="text-[15px] text-gray-500 font-[400]">
                    {item?.rating} Reviews
                  </h2>
                </div>
        <p className="text-[16px] font-[500] text-[#FF4035]">Sold Out</p>
        <div id="price" className="text-[18px] flex gap-[20px] font-[500]">
          <span className=" text-[#FF4035]">${item?.price}</span>
          <del className="text-gray-400">$500</del>
        </div>
        <div id="button">
          <Pair_3 bgColor={"bg-white"} item={item} key={item?._id} />
        </div>
      </div>
    </div>
  );
}
MobileCard.propTypes = {
  item: PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired, 
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    _id : PropTypes.string.isRequired
  }).isRequired,
};

export default MobileCard;
