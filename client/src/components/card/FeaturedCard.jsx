// import { FaStar } from "react-icons/fa";
import Pair_3 from "../button/Pair_3";
import PropTypes from "prop-types";
import { IoStar, IoStarOutline } from "react-icons/io5";
function FeaturedCard({ item }) {

 
  return (
    <div
      className="flex bg-white px-[15px] items-center py-[10px] border-[.5px] border-gray-200 relative hover:translate-y-[12px] hover:transition-transform hover:duration-[1500] gap-[20px] w-[450px] rounded-[10px] mx-auto"
      id="best-seller-card"
    >
      <div
        id="img"
        className="w-[180px] bg-gray-100 flex justify-center items-center rounded-[5px]"
      >
        <img
          className={` p-[15px] ${item.category == 'smartphones' ? 'w-[80px]' : 'min-w-[180px]'}`}
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
    images: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string, 
    price: PropTypes.number,
    rating: PropTypes.number,
    category: PropTypes.string,
    description: PropTypes.string,
    thumbnail: PropTypes.string,
  }),
};

export default FeaturedCard;
