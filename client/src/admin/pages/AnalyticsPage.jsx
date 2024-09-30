import Header from "../components/common/Header";

import OverviewCards from "../components/analytics/OverviewCards";
import RevenueChart from "../components/analytics/RevenueChart";
import ChannelPerformance from "../components/analytics/ChannelPerformance";
import ProductPerformance from "../components/analytics/ProductPerformance";
import UserRetention from "../components/analytics/UserRetention";
import CustomerSegmentation from "../components/analytics/CustomerSegmentation";
import AIPoweredInsights from "../components/analytics/AIPoweredInsights";

const AnalyticsPage = () => {
	return (
		<div className='relative z-10 flex-1 overflow-auto bg-gray-900'>
			<Header title={"Analytics Dashboard"} />

			<main className='max-w-[128rem] mx-auto py-[2.4rem] px-[1.6rem] lg:px-[3.2rem]'>
				<OverviewCards />
				<RevenueChart />

				<div className='grid grid-cols-1 gap-[3.2rem] mb-[3.2rem] lg:grid-cols-2'>
					<ChannelPerformance />
					<ProductPerformance />
					<UserRetention />
					<CustomerSegmentation />
				</div>

				<AIPoweredInsights />
			</main>
		</div>
	);
};
export default AnalyticsPage;
