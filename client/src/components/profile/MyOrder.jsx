import { useSelector } from "react-redux";
import { getAllOrders } from "../../store/slices/order.slice";
import OrderCard from "./OrderCard";

function MyOrder() {
  const allOrders = useSelector(getAllOrders);
  return (
    <div
      id="my-order"
      className="w-full p-[3.2rem] rounded-lg shadow-xl md:col-start-2 md:col-end-4 bg-gradient-to-b from-white to-gray-50"
    >
      <h1 className="mb-8 text-[2.4rem] font-bold leading-tight tracking-tight text-left text-gray-900 font-poppins lg:text-[3rem] xl:text-[3.6rem]">
        My Orders
      </h1>

      <div className="mt-10">
        {allOrders &&
          allOrders.length > 0 &&
          allOrders.map((order) => {
            return <OrderCard key={order._id} order={order} />;
          })}
      </div>
    </div>
  );
}

export default MyOrder;
