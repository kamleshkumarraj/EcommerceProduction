import PropTypes from "prop-types";
import { IoStar, IoStarOutline } from "react-icons/io5";
import Pair_3 from "../button/Pair_3";

function ProductCard({item}) {
  return (
    <div className="product-card px-[15px] py-[10px] flex flex-col gap-[20px] 2xl:w-[320px] xl:w-[300px] md:w-[270px] w-[250px] group" >
      <div id="image-section" className="2xl:w-[320px] xl:w-[300px] md:w-[270px] w-[250px] 2xl:h-[350px] xl:h-[320px] md:h-[300px] h-[280px] bg-[#F6F6F6] rounded-[20px] group-hover:border-[1px]  group-hover:border-red-600 relative transition-all duration-500">
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
      <div id="details" className="flex flex-col 2xl:gap-[15px] lg:gap-[12.5px] gap-[10px] ">
        <h1 id="title" className="2xl:text-[18px] text-[13px] lg:text-[15px] font-[500] ">
          {item?.title}
        </h1>
        <div id="rating" className="flex flex-col sm:flex-row xl:gap-[10px] md:gap-[7.5px] gap-[5px] sm:items-center">
                  <span className="2xl:text-[16px] lg:text-[14px] sm:text-[12px] text-[10px] flex gap-[5px] text-red-600">
                    {[[1,2,3,4,5] , [1,2,3,4,] , [1,2,3,] , [1,2] , [1] , []][5-Math.floor(item?.rating)].map(() => (
                      <IoStar key={Math.random()} size={20} color="#DC2626" />
                    ))}
                    {[[1,2,3,4,5] , [1,2,3,4,] , [1,2,3,] , [1,2] , [1] , []][Math.floor(item?.rating)].map(() => (
                      <IoStarOutline key={Math.random()} size={20} color="#DC2626" />
                    ))}
                  </span>
                  <h2 className="2xl:text-[15px] md:text-[13px] text-[12px] text-gray-500 font-[400]">
                    {item?.rating} Reviews
                  </h2>
                </div>
        <div id="price" className="2xl:text-[18px] text-[13px] lg:text-[15px] flex 2xl:gap-[20px] md:gap-[15px] gap-[10px] font-[500]">
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
