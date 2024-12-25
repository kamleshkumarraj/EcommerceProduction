
import { FaStar } from "react-icons/fa"
import Pair_3 from "../button/Pair_3"
import PropTypes from "prop-types";


function CategoryCard({item}) {
  return (
    <div className="product-card px-[15px] py-[10px] flex flex-col gap-[20px] border-[.5px] border-[#8080807a] rounded-[20px] w-[350px] group bg-[white]" >
      <div id="image-section" className="w-[300px] h-[250px]  rounded-[20px]   relative transition-all duration-500">
        <div id="image" className="absolute flex items-center justify-center w-full h-full">
          <img className="w-[550px]" src={item?.images[0]} alt="" />
        </div>
        <div className="absolute top-[5px] left-[5px] transition-all duration-2500" id="offer"><h1 className="px-[15px] py-[6px] font-[600] text-white bg-[#FF4035] text-[16px]  rounded-[30px] text-center ">TRADING</h1></div>
        <div id="button" className="absolute bottom-[-40px] left-[50%] translate-x-[-50%] group-hover:bottom-[20px] opacity-0 group-hover:opacity-100 group-hover:transition-all group-hover:duration-500">
            <Pair_3
            bgColor={'bg-white'}
            item={item} />
        </div>
      </div>
      <div id="details" className="flex flex-col gap-[5px] mb-[15px]">
        <div id="sub-heading">
          <h2 className="text-[15px] uppercase font-[400] text-gray-500" >{item?.category}</h2>
        </div>
        <h1 id="title" className="text-[18px] font-[500] ">
          {item?.title}
        </h1>
        <div id="rating" className="flex gap-[10px] items-center">
          <span className="text-[16px] flex gap-[5px] text-[#FFA31A]">
            {[1, 2, 3, 4, 5].map(() => (
              <FaStar key={Math.random()} size={22} color="#FFA31A" />
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

CategoryCard.propTypes = {
  item: PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
  }).isRequired,
};

export default CategoryCard

