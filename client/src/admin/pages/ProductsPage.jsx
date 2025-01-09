import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";

import { AlertTriangle, DollarSign, Package, TrendingUp } from "lucide-react";
import CategoryDistributionChart from "../components/overview/CategoryDistributionChart";
import SalesTrendChart from "../components/products/SalesTrendChart";
import ProductsTable from "../components/products/ProductsTable";
import { useGetTotalProductsQuery } from "../../store/slices/adminApi";
import { useError } from "../../hooks/useError";
import CreateProductForm from "../components/products/CreateProductsForm";
import SkeletonTable from "./TableSkeletonLoader";
import { useSelector } from "react-redux";
import { getMiscData } from "../../store/slices/misc.slice";

const ProductsPage = () => {
  const {isCreateProductsFormOpen} = useSelector(getMiscData)
  const {
    data: totalProducts,
    isLoading: isProductsLoading,
    error: productsError,
    isError: isProductsError,
  } = useGetTotalProductsQuery();
  
  useError([
    { error: productsError, isError: isProductsError }
  ]);
  
  return (
    <div className="relative z-10 flex-1 overflow-auto">
      <Header title="Products" />

      <main className="max-w-[120rem] mx-auto py-[2.4rem] px-[1.6rem] lg:px-[3.2rem] relative">
        {/* STATS */}
        
        <motion.div
          className="grid grid-cols-1 gap-5 mb-8 sm:grid-cols-2 lg:grid-cols-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
        { isCreateProductsFormOpen && <div id="form-component" className="absolute top-[50%] z-[99999999] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full h-full bg-gray-900 bg-opacity-50 backdrop-blur-sm rounded-xl my-[2rem]" >
        <CreateProductForm />
      </div>}
          <StatCard
            name="Total Products"
            icon={Package}
            value={1234}
            color="#6366F1"
          />
          <StatCard
            name="Top Selling"
            icon={TrendingUp}
            value={89}
            color="#10B981"
          />
          <StatCard
            name="Low Stock"
            icon={AlertTriangle}
            value={23}
            color="#F59E0B"
          />
          <StatCard
            name="Total Revenue"
            icon={DollarSign}
            value={"$543,210"}
            color="#EF4444"
          />
        </motion.div>

        { isProductsLoading ? <SkeletonTable /> : (!isProductsError && <ProductsTable products = {totalProducts?.data?.products} />)}

        {/* CHARTS */}
        <div className="grid grid-col-1 lg:grid-cols-2 gap-[3.2rem]">
          <SalesTrendChart />
          <CategoryDistributionChart />
        </div>
      </main>
    </div>
  );
};
export default ProductsPage;
