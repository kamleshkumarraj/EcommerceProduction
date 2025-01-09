import PropTypes from "prop-types";
import { IoStar, IoStarOutline } from "react-icons/io5";
import Pair_3 from "../button/Pair_3";

function ProductCard({item}) {
  return (
    <div className="product-card px-[15px] py-[10px] flex flex-col gap-[20px] w-[320px] group" >
      <div id="image-section" className="w-[320px] h-[350px] bg-[#F6F6F6] rounded-[20px] group-hover:border-[1px]  group-hover:border-red-600 relative transition-all duration-500">
        <div id="image" className="absolute flex items-center justify-center w-full h-full">
          <img className={`${item.category == 'smartphones' ? 'w-[80px]' : 'w-[250px]'} `} src={item?.thumbnail?.url || item?.images[0]} alt="" />
        </div>
        <div className="absolute opacity-0 group-hover:opacity-100 top-[25px] left-[30px] transition-all duration-2500" id="offer"><h1 className="px-[8px] py-[6px] font-[600] text-white bg-[#FF4035] text-[16px] w-[80px] rounded-[30px] text-center ">10% OFF</h1></div>
        <div id="button" className="absolute bottom-[-40px] left-[50%] translate-x-[-50%] group-hover:bottom-[20px] opacity-0 group-hover:opacity-100 group-hover:transition-all group-hover:duration-500">
            <Pair_3
            bgColor={'bg-white'}
            item={item} />
        </div>
      </div>
      <div id="details" className="flex flex-col gap-[15px]">
        <h1 id="title" className="text-[18px] font-[500] ">
          {item?.title}
        </h1>
        <div id="rating" className="flex gap-[10px] items-center">
                  <span className="text-[16px] flex gap-[5px] text-red-600">
                    {[[1,2,3,4,5] , [1,2,3,4,] , [1,2,3,] , [1,2] , [1] , []][5-Math.floor(item?.rating)].map(() => (
                      <IoStar key={Math.random()} size={20} color="#DC2626" />
                    ))}
                    {[[1,2,3,4,5] , [1,2,3,4,] , [1,2,3,] , [1,2] , [1] , []][Math.floor(item?.rating)].map(() => (
                      <IoStarOutline key={Math.random()} size={20} color="#DC2626" />
                    ))}
                  </span>
                  <h2 className="text-[15px] text-gray-500 font-[400]">
                    {item?.rating} Reviews
                  </h2>
                </div>
        <div id="price" className="text-[18px] flex gap-[20px] font-[500]">
          <span className=" text-[#FF4035]">USD ${item?.price}</span>
          <del className="text-gray-400">$500</del>
        </div>
      </div>
    </div>
  )
}

ProductCard.propTypes = {
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

export default ProductCard
