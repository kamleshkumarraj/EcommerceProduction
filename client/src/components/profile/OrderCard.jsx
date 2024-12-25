import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";

function OrderCard({order}) {
  
  const navigate = useNavigate();

  const itemLength = order?.orderItems?.length;
  const createdAt = order?.createdAt?.slice(0, 10);

  const priceQty = useMemo(() => {
    const price =  order?.orderItems?.reduce((acc, item) => {
      return acc + (item.price * item.quantity)
    },0)
    const qty = order?.orderItems.reduce((acc , item) => {
      return acc + Number(item.quantity)
    },0)
    return { price : price.toFixed(2), qty}
  },[order])
  
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
              Order no: {order?._id || order?.productId}
            </h1>
            <p className="text-sm font-medium text-gray-500 font-roboto">
              Order Date: <span className="text-gray-400">{createdAt}</span>
            </p>
            <p className="text-sm font-medium text-gray-500 font-roboto">
              Estimated Delivery: <span className="text-gray-400">22/03/2024</span>
            </p>
          </div>
          <div id="right" className="flex flex-col gap-1 text-right">
            <p className="text-sm font-medium text-gray-500 font-roboto">
              Status: <span className="text-green-600">{order?.orderStatus}</span>
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
          <div id="img-section" className="flex items-center justify-center gap-4">
            <div id="img" className={`max-w-[120px] gap-[10px] ${itemLength == 1 ? 'w-full' : itemLength == 2 ? 'w-full grid grid-cols-2' : 'grid w-full grid-cols-2 grid-rows-2 justify-items-center'} `}>
            {
              order?.orderItems.slice(0 , itemLength > 4 ? 3 : itemLength).map(item => <img src={item.image} alt={item.name} key={item._id} className="object-cover w-full h-full rounded-lg shadow-sm" />)
              
            }{
              itemLength > 4 && <p className="self-center w-full mx-auto text-sm font-medium text-center text-gray-500 font-roboto">+{itemLength - 3} more</p>
            }
              
            </div>
            <div id="img-detail" className="flex flex-col gap-1">
              <p className="text-sm font-semibold text-gray-800 font-poppins">
                {order?.orderItems[0]?.name}
              </p>
              
              <p className="text-sm font-medium text-gray-500 font-roboto">
                Quantity: <span className="text-gray-400">{priceQty.qty}</span>
              </p>
              <p className="text-sm font-bold text-gray-700 font-roboto">
                Total: <span className="text-purple-600">${priceQty.price}</span>
              </p>
            </div>
          </div>
          <Link
            to={"/orderDetails"}
            state={{orders : order}}
            id="btn"
            className="px-3 py-2 text-center transition-transform transform bg-purple-500 rounded-lg cursor-pointer hover:bg-purple-600 hover:scale-105"
          >
            <p className="text-sm font-bold text-white font-poppins">
              View Details
            </p>
          </Link>
        </div>
      </div>
      <hr className="mt-4" />
    </>
  );
}

export default OrderCard;
