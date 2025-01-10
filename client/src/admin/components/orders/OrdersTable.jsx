import { motion } from "framer-motion";
import { Eye, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { useFilter } from "../../../hooks/useFilter.hook";
import { toast } from "react-toastify";
import { useUpdateOrderStatusMutation } from "../../../store/slices/adminApi";
import { toastUpdate } from "../../../helper/helper";

const OrdersTable = ({ orders }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpenUpdateStatus, setIsOpenUpdateStatus] = useState(false);
  console.log(isOpenUpdateStatus)
  const [filteredOrders, setSearchQuery] = useFilter(
    orders,
    (order) => order.paymentMethod
  );
  const orderStatus = ['pending' , 'cancelled' , 'delivered', 'shipping' , 'out for delivery' , 'confirmed']

  const [selectOrderToUpdate, setSelectOrderToUpdate] = useState({
    orderId : '',
    status : '',
    user : ''
  })

  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const handleUpdateStatus = async () => {
    if(selectOrderToUpdate.status ===  ''){
      toast.error("please select status for updating the order status")
      return
    }
    const toastId = toast.loading("Updating Order Status...")
    try {
      const {data} = await updateOrderStatus({orderId : selectOrderToUpdate.orderId , status : selectOrderToUpdate.status})
      if(data?.success){
        toastUpdate({toastId , message : data?.message ||  "Order Status Updated Successfully" , type :'success'})
        setIsOpenUpdateStatus(false)
      }else{
        toastUpdate({toastId , message : data?.message ||  "We get error during updating order status" , type : 'error'})
      }
    } catch (error) {
      toastUpdate({toastId , message : error.data.message || "We get error during updating order status" , type : 'error'})
    }
  }

  useEffect(() => {
    setSearchQuery(searchTerm || "");
  }, [searchTerm]);

  return (
    <motion.div
      className="p-6 bg-gray-800 bg-opacity-50 border border-gray-700 shadow-lg backdrop-blur-md rounded-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[2rem] font-semibold text-gray-100">Order List</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search orders..."
            className="py-2 pl-10 pr-4 text-white placeholder-gray-400 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      <div className="relative overflow-x-auto">
       {isOpenUpdateStatus && <div className="absolute top-[50%] left-[50%] px-[2rem] py-[1rem] rounded-[1rem] -translate-x-1/2 -translate-y-1/2 order-status-update w-[30rem] shadow-md bg-gray-700">
        <h3 className="mb-4 text-[1.6rem] font-semibold text-gray-100">Update Order Status</h3>
        <p className="mb-6 text-[1.4rem] text-gray-50">Order ID: <span className="font-semibold text-green-500" >{selectOrderToUpdate.orderId}</span> </p>
        <div className="mb-4">
          <label htmlFor="status-select" className="block mb-2 text-gray-200">
            Status
          </label>
          <select
            id="status-select"
            className="block text-[black] focus:border-none focus:outline-none w-full p-2 text-[1.4rem] border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            onClick={(e) => setSelectOrderToUpdate({...selectOrderToUpdate, status : e.target.value})}
          >
            {
              orderStatus.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))
            }
          </select>
        </div>
        <button onClick={handleUpdateStatus}
          className="w-full px-4 py-2 text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Update Status
        </button>
        </div>}
    
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-[2.4rem] py-[1.2rem] text-left text-[1.4rem] font-medium text-gray-400 uppercase tracking-wider">
                Order ID 
              </th>
              <th className="px-[2.4rem] py-[1.2rem] text-left text-[1.4rem] font-medium text-gray-400 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-[2.4rem] py-[1.2rem] text-left text-[1.4rem] font-medium text-gray-400 uppercase tracking-wider">
                Total
              </th>
              <th className="px-[2.4rem] py-[1.2rem] text-left text-[1.4rem] font-medium text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-[2.4rem] py-[1.2rem] text-left text-[1.4rem] font-medium text-gray-400 uppercase tracking-wider">
                Date
              </th>
              <th className="px-[2.4rem] py-[1.2rem] text-left text-[1.4rem] font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-gray-700 divide">
            {filteredOrders.map((order) => (
              <motion.tr
                key={order.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="px-[2.4rem] py-4 whitespace-nowrap text-[1.4rem] font-medium text-gray-100">
                  {order?._id}
                </td>
                <td className="px-[2.4rem] py-4 whitespace-nowrap text-[1.4rem] font-medium text-gray-100">
                  {order?.user?.firstname + " " + order?.user?.lastname}
                </td>
                <td className="px-[2.4rem] py-4 whitespace-nowrap text-[1.4rem] font-medium text-gray-100">
                  ${order?.totalPrice}
                </td>
                <td className="px-[2.4rem] py-4 whitespace-nowrap text-[1.4rem] text-gray-300">
                  <span
                    className={`px-4 py-2 inline-flex text-[1.4rem] leading-5 font-semibold rounded-full ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-800"
                        : order.status === "Processing"
                        ? "bg-yellow-100 text-yellow-800"
                        : order.status === "Shipped"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {order?.orderStatus}
                  </span>
                </td>
                <td className="px-[2.4rem] py-4 whitespace-nowrap text-[1.4rem] text-gray-300">
                  {new Date(order?.createdAt).toLocaleDateString("en-gb")}
                </td>
                <td className="px-[2.4rem] py-4 whitespace-nowrap text-[1.4rem] text-gray-300 flex justify-evenly ">
                  <button className="mr-2 text-indigo-400 hover:text-indigo-300">
                    <Eye size={18} />
                  </button>
                  <button onClick={() => {
                    setSelectOrderToUpdate({
                      orderId : order._id, 
                      status : '' , 
                      user : order.user._id
                    })
                    setIsOpenUpdateStatus(true)
                  }}  className="mr-2 text-green-400 hover:text-green-300">
                    <HiOutlinePencilAlt size={18} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    
    </motion.div>
  );
};
export default OrdersTable;
