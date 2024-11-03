import { useDispatch } from 'react-redux';
import OrderCard from './OrderDetails';

function OrderDetails({orders , title}) {
  

  return (
    <div className="mt-8 text-[18px] font-poppins flex flex-col gap-8">
      <h2 className="mb-1 ml-2 text-2xl font-semibold text-gray-800">{title}</h2>
      <div className="space-y-6">
      {
        orders && orders.length > 0 && orders.map((order , idx) => {
          return <OrderCard key={idx} order={order} />
        })
      }
      </div>
    </div>
  );
}

export default OrderDetails;
