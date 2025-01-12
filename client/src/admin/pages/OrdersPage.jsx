import { CheckCircle, Clock, DollarSign, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import DailyOrders from "../components/orders/DailyOrders";
import OrderDistribution from "../components/orders/OrderDistribution";
import OrdersTable from "../components/orders/OrdersTable";
import { useGetAllProductsCategoriesWiseQuery, useGetTotalOrdersDataQuery } from "../../store/slices/adminApi";
import { useError } from "../../hooks/useError";
import SkeletonTable from "./TableSkeletonLoader";
import { useSocket } from "../../contexts/Socket";
import { useEffect } from "react";
import { UPDATE_ORDER_STATUS } from "../../events";

const orderStats = {
  totalOrders: "1,234",
  pendingOrders: "56",
  completedOrders: "1,178",
  totalRevenue: "$98,765",
};

const OrdersPage = () => {
  
  
  
  const {
    data: ordersData,
    isLoading: ordersLoading,
    isError: ordersIsError,
    error: ordersError,
    refetch
  } = useGetTotalOrdersDataQuery();

  const socket = useSocket();

  const handleUpdateSocketStatus = () => {
    console.log("We update the status event calling ...")
    refetch();
  }

  useEffect(() => {
    socket.on(UPDATE_ORDER_STATUS , handleUpdateSocketStatus);
    return () => socket.off(UPDATE_ORDER_STATUS , handleUpdateSocketStatus);
  },[socket])

  useError([{ error: ordersError, isError: ordersIsError } , { error: categoriesWiseError, isError: categoriesWiseIsError }]);

  return (
    <div className="relative z-10 flex-1 overflow-auto">
      <Header title={"Orders"} />

      <main className="max-w-[120rem]  mx-auto py-[2.4rem] px-[1.6rem] lg:px-[3.2rem]">
        <motion.div
          className="grid grid-cols-1 gap-5 mb-8 sm:grid-cols-2 lg:grid-cols-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Total Orders"
            icon={ShoppingBag}
            value={orderStats.totalOrders}
            color="#6366F1"
          />
          <StatCard
            name="Pending Orders"
            icon={Clock}
            value={orderStats.pendingOrders}
            color="#F59E0B"
          />
          <StatCard
            name="Completed Orders"
            icon={CheckCircle}
            value={orderStats.completedOrders}
            color="#10B981"
          />
          <StatCard
            name="Total Revenue"
            icon={DollarSign}
            value={orderStats.totalRevenue}
            color="#EF4444"
          />
        </motion.div>

        <div className="grid grid-cols-1 gap-[3.2rem] mb-8 lg:grid-cols-2">
          <DailyOrders />
          <OrderDistribution />
        </div>

        {ordersLoading ? (
          <SkeletonTable />
        ) : (
          ordersData?.data && ordersData?.data?.orders.length > 0 && <OrdersTable orders={ordersData?.data?.orders} />
        )}
      </main>
    </div>
  );
};
export default OrdersPage;
