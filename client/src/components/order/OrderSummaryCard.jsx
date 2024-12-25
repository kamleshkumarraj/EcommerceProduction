
import { FiMinus, FiPlus } from "react-icons/fi";
import { decreaseOrderedProductsQty, increaseOrderedProductsQty, removeOrderedProductsQty } from "../../store/slices/orderItems";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

function OrderSummaryCard({ item }) {
  const dispatch = useDispatch();
  return (
    <div className="flex w-full px-4 py-2 order-summary-card gap-[20px] justify-between bg-white border-b">
      <div id="images-section" className="flex flex-col items-center justify-center w-[200px]">
        <div id="image" className="">
          <img className="w-[180px] px-[10px]" src={item?.thumbnail} alt="" />
        </div>
        <div id="button" className="mt-[10px]">
          <div
            id="quantity"
            className="flex gap-[1rem]  justify-center pr-[1rem] items-center"
          >
            <div
              id="decreaseBtn"
              className={`font-[600] rounded-full text-[28px] p-[5px] grid place-content-center py-[-2rem]  bg-gray-200  border-[1px] ${item.quantity > 1 ? 'hover:cursor-pointer' : 'hover:cursor-not-allowed opacity-40'} border-gray-400`}
              onClick={() => {
                if(item?.quantity > 1){
                  dispatch(decreaseOrderedProductsQty({_id : item?._id}))
                }
              }}
            >
              {" "}
              <FiMinus size={"20px"} />{" "}
            </div>
            <p className="text-[16px] font-[600] px-[18px] py-[2px] border-[1px] border-gray-400">{item?.quantity}</p>
            <div
              id="increaseBtn"
              className="font-[600] text-[28px] p-[5px] grid place-content-center py-[-2px] border-[1px] bg-gray-200 rounded-full hover:cursor-pointer border-gray-400"
              onClick={() => {
                dispatch(increaseOrderedProductsQty({_id : item?._id}))
              }}
            >
              <FiPlus size={"20px"} />
            </div>
          </div>
        </div>
      </div>
      <div id="details-section" className=" my-[10px] flex flex-col gap-[10px]">
            <h1 className="font-[600] text-[15px] text-gray-600" id="title">This products is very well and good for according to you use and your choice you can easily afford this products...</h1>
            <h2 className="text-[14px] text-gray-700 font-[500]" id="category">{item?.title}</h2>
            <h3 className="text-[13px] font-[500] text-gray-800">{item?.category}</h3>
            <p id="price">${item?.price.toFixed(2)}</p>
            <p onClick={() => {
              dispatch(removeOrderedProductsQty({_id : item?._id}))
            }}  className="font-[600] text-[16px] " ><span className="hover:cursor-pointer">REMOVE</span></p>
      </div>
      <div id="delivery-at-section" className="w-[270px] text-[15px] font-[500] text-gray-500 py-[10px]">
              <p>Delivery by Sat at Dec 28 | $120</p>
      </div>
      
    </div>
  );
}

OrderSummaryCard.propTypes = {
  item: PropTypes.object.isRequired.shape({
    _id: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }),
};

export default OrderSummaryCard;
