import { FaStar } from "react-icons/fa"
import Pair_3 from "../button/Pair_3"
import PropTypes from "prop-types"

function TwoLayerCard({item}) {
  return (
    <div id="two-layer-card" className="w-[300px] mx-auto relative ">

        <div id="img-section" className="w-[300px] h-[300px] flex justify-center items-center rounded-[20px] bg-gray-400 shadow-lg z-[99] relative">
            <img className="w-[300px]  z-[-1] rounded-[20px]" src={item?.images[0]} alt="product-image" />
        </div>
        <div id="details" className="flex absolute pt-[180px] left-[50%] translate-x-[-50%]  flex-col gap-[5px] w-[340px] -translate-y-[50%] bg-white rounded-[20px] px-[20px] py-[10px] border-dotted border-[2.2px] border-gray-400 ">
        <h1 id="title" className="text-[18px] font-[500] ">
          {item?.title?.length > 32 ?  item?.title?.substring(0,32) + "..." : item?.title}
        </h1>
        <div id="rating" className="flex gap-[10px] items-center">
          <span className="text-[16px] flex gap-[5px] text-[#FFA31A]">
            {[1, 2, 3, 4, 5].map(() => (
              <FaStar key={Math.random()} size={18} color="#CC0D39" />
            ))}
          </span>
          <h2 className="text-[16px] text-gray-500 font-[400]">
            ({item?.rating} Reviews)
          </h2>
        </div>
        <div id="price" className="text-[18px] flex gap-[20px] font-[500]">
          <span className="text-gray-800">${item?.price}</span>
          <del className="text-gray-400">$500</del>
        </div>
        <Pair_3 item={item} bgColor={'bg-gray-200'} />
      </div>
    </div>
  )
}

TwoLayerCard.propTypes = {
  item: PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default TwoLayerCard
