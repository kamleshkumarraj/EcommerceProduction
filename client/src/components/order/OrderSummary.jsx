import { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { RiArrowDownSLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { getAllOrderedProducts } from "../../store/slices/orderItems";
import OrderSummaryCard from "./OrderSummaryCard";
import PropTypes from "prop-types";


function OrderSummary({ checkSummaryClick , setCheckPayemntClick , setCheckSummaryClick }) {
  const orderedProduct = useSelector(getAllOrderedProducts)
  const [viewAll , setViewAll] = useState(false);
  return (
    <div id="order-summary-section">
    <div
      id="delivery-as"
      className={`w-full text-gray-400   shadow-2xl p-4  ${
        checkSummaryClick ? "py-[10px] bg-blue-600" : "py-[12px] bg-white "
      } flex justify-between`}
    >
      <div id="delivery-detail" className="flex items-start gap-[10px]">
        <div id="number">
          <p className="bg-gray-200 rounded-[5px] px-[10px] text-[16px] font-600 text-blue-600 mt-[2px]">
            3
          </p>
        </div>
        <div id="info" className="flex flex-col gap-[7px]">
          <div id="delivery" className="flex items-center gap-[15px]">
            <h1
              className={`text-[17px] ${
                checkSummaryClick ? "text-white" : "text-gray-400"
              } font-[500] text-gray-400`}
            >
              ORDER SUMMARY{" "}
            </h1>
          </div>
        </div>
      </div>
    </div>
    <div id="item-body" className="flex flex-col">
    {checkSummaryClick && orderedProduct && orderedProduct.length > 0 &&orderedProduct.slice(0,viewAll ? orderedProduct.length : 4 ).map((product) => <OrderSummaryCard key={product?._id} item={product} />)}
    </div>
    { orderedProduct.length > 4 &&checkSummaryClick && <div id="view-button-box" className="flex items-start bg-white p-4 gap-[10px]">
        <div onClick={() => setViewAll(!viewAll)} id="info" className="flex hover:cursor-pointer gap-[7px]">
        <p className=" rounded-[5px] px-[10px] text-[16px] font-600 text-blue-600 mt-[2px]">
          {viewAll ? <IoIosArrowUp size={25} /> : <RiArrowDownSLine size={25} color="blue"  />}
          </p>
           <div id="view-button" className="flex items-center gap-[15px]">
            <h1
              className={`text-[17px] text-gray-400
               font-[500]`}
            >
              {viewAll ? 'View less' :  `View All ${orderedProduct.length} items`}
            </h1>
          </div>
        </div>
      </div>}

      {checkSummaryClick && <div id="place-rder-button" className="flex px-4 py-2 bg-white mt-[10px] justify-between items-center">
              <h1 className="text-[16px] font-[500] text-gray-600">Order Confirmation email will be send to kamlesh.22jics061@jietjodhpur.ac.in </h1>
              <p onClick={() => {
                setCheckPayemntClick(true);
                setCheckSummaryClick(false)
              }}  className="px-[60px] py-[15px] bg-[#FB641B] text-center text-white font-700 text-[18px] cursor-pointer hover:bg-[#FB641B] hover:text-white" >PLACE ORDER</p>
      </div>}
    </div>
  );
}

OrderSummary.propTypes = {
  checkDileveryClick: PropTypes.bool,
  checkSummaryClick: PropTypes.bool,
  setCheckPayemntClick: PropTypes.func,
  setCheckSummaryClick: PropTypes.func,
};

export default OrderSummary;
