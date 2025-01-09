import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import SalesOverviewChart from "../components/overview/SalesOverviewChart";
import CategoryDistributionChart from "../components/overview/CategoryDistributionChart";
import SalesChannelChart from "../components/overview/SalesChannelChart";
import { useGetAllSalesDataQuery, useGetTotalUsersQuery , useGetTotalProductsQuery } from "../../store/slices/adminApi";
import { useError } from "../../hooks/useError";
import ThreeDotProgressLoader from "../components/loader/ThreeDotProgressLoader";

const OverviewPage = () => {
	const { data : salesData, isLoading : salesLoading, isError : salesIsError, error : salesError } = useGetAllSalesDataQuery();
	const { data : usersData , isLoading : usersLoading , isError : usersIsError , error : usersError } = useGetTotalUsersQuery();
	const { data : productsData , isLoading : productsLoading , isError : productsIsError , error : productsError } = useGetTotalProductsQuery();
	
	useError([{error : salesError , isError : salesIsError} , {error : usersError , isError : usersIsError} , {error : productsError , isError : productsIsError}])
	return (
		<div className='relative z-10 flex-1 overflow-auto'>
			<Header title='Overview' />

			<main className='max-w-[128rem] mx-auto py-[2.4rem] px-[1.6rem] lg:px-[3.2rem]'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-[2rem] mb-[3.2rem] sm:grid-cols-2 lg:grid-cols-4'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					{ salesLoading ? (
						(<ThreeDotProgressLoader />)
					) : (
						(<StatCard name='Total Sales' icon={Zap} value={` $ ${salesData.data.totalSalesAmount}`} color='#6366F1' />)
					) }

					{ usersLoading ? (
						(<ThreeDotProgressLoader />)
					) : (
						(<StatCard name='Total Users' icon={Users} value={`${usersData.data.usersLength}`} color='#8B5CF6' />)
					) }

					{
						productsLoading ? (
							(<ThreeDotProgressLoader />)
						) : (
							(<StatCard name='Total Products' icon={ShoppingBag} value={`${productsData.data.productsLength}`} color='#EC4899' />)
						)
					}

					<StatCard name='Conversion Rate' icon={BarChart2} value='12.5%' color='#10B981' />
				</motion.div>

				{/* CHARTS */}

				<div className='grid grid-cols-1 gap-[3.2rem] lg:grid-cols-2'>
					<SalesOverviewChart />
					<CategoryDistributionChart />
					<SalesChannelChart />
				</div>
			</main>
		</div>
	);
};
export default OverviewPage;
