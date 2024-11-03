import { useNavigate } from "react-router-dom";
import orderimage from "../../assets/Img/order-image.svg";
// import OrderDetails from "../OrderDetails.jsx/OrderDetails";

function OrderCard({order}) {
  const navigate = useNavigate();
  console.log(order)
  return (
    <>
      <div
        id="order-1"
        className="p-4 mx-2 transition-transform duration-300 transform shadow-md bg-gradient-to-r from-gray-50 to-gray-200 rounded-xl"
      >
        <div
          id="order-details"
          className="flex flex-wrap items-end justify-between gap-2 p-4 bg-white rounded-lg shadow-sm"
        >
          <div id="left" className="flex flex-col gap-1">
            <h1 className="text-lg font-bold text-purple-700 font-poppins">
              Order no: {order._id}
            </h1>
            <p className="text-sm font-medium text-gray-500 font-roboto">
              Order Date: <span className="text-gray-400">28/08/2020</span>
            </p>
            <p className="text-sm font-medium text-gray-500 font-roboto">
              Estimated Delivery: <span className="text-gray-400">22/03/2024</span>
            </p>
          </div>
          <div id="right" className="flex flex-col gap-1 text-right">
            <p className="text-sm font-medium text-gray-500 font-roboto">
              Status: <span className="text-green-600">Active</span>
            </p>
            <p className="text-sm font-medium text-gray-500 font-roboto">
              Payment: <span className="text-gray-400">Online</span>
            </p>
          </div>
        </div>

        <div
          id="order-image"
          className="flex flex-wrap items-center justify-between gap-3 mt-4"
        >
          <div id="img-section" className="flex items-center gap-2">
            <div id="img" className="max-w-[120px]">
              <img
                className="w-full transition-transform duration-200 transform rounded-lg shadow-sm hover:scale-105"
                src={orderimage}
                alt="Order item"
              />
            </div>
            <div id="img-detail" className="flex flex-col gap-1">
              <p className="text-sm font-semibold text-gray-800 font-poppins">
                Black Printed T-shirt
              </p>
              <p className="text-sm font-medium text-gray-500 font-roboto">
                Color: <span className="text-gray-400">Black</span>
              </p>
              <p className="text-sm font-medium text-gray-500 font-roboto">
                Quantity: <span className="text-gray-400">1</span>
              </p>
              <p className="text-sm font-bold text-gray-700 font-roboto">
                Total: <span className="text-purple-600">$233</span>
              </p>
            </div>
          </div>
          <div
            onClick={() => {
              navigate("/orderDetails");
            }}
            id="btn"
            className="px-3 py-2 text-center transition-transform transform bg-purple-500 rounded-lg cursor-pointer hover:bg-purple-600 hover:scale-105"
          >
            <p className="text-sm font-bold text-white font-poppins">
              View Details
            </p>
          </div>
        </div>
      </div>
      <hr className="mt-4" />
    </>
  );
}

export default OrderCard;
