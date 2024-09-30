import { BarChart2, DollarSign, Menu, Settings, ShoppingBag, ShoppingCart, TrendingUp, Users } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

const SIDEBAR_ITEMS = [
	{
		name: "Overview",
		icon: BarChart2,
		color: "#6366f1",
		href: "/admin/dashbord/overview",
	},
	{ name: "Products", icon: ShoppingBag, color: "#8B5CF6", href: "/admin/dashbord/products" },
	{ name: "Users", icon: Users, color: "#EC4899", href: "/admin/dashbord/users" },
	{ name: "Sales", icon: DollarSign, color: "#10B981", href: "/admin/dashbord/sales" },
	{ name: "Orders", icon: ShoppingCart, color: "#F59E0B", href: "/admin/dashbord/orders" },
	{ name: "Analytics", icon: TrendingUp, color: "#3B82F6", href: "/admin/dashbord/analytics" },
	{ name: "Settings", icon: Settings, color: "#6EE7B7", href: "/admin/dashbord/settings" },
];

const Sidebar = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);

	return (
		<motion.div
			className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
				isSidebarOpen ? "w-64" : "w-20"
			}`}
			animate={{ width: isSidebarOpen ? 256 : 80 }}
		>
			<div className='flex flex-col h-full p-4 bg-gray-800 bg-opacity-50 border-r border-gray-700 backdrop-blur-md'>
				<motion.button
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					onClick={() => setIsSidebarOpen(!isSidebarOpen)}
					className='p-2 transition-colors rounded-full hover:bg-gray-700 max-w-fit'
				>
					<Menu size={24} />
				</motion.button>

				<nav className='flex-grow mt-8'>
					{SIDEBAR_ITEMS.map((item) => (
						<Link key={item.href} to={item.href}>
							<motion.div className='flex items-center p-4 mb-2 text-[1.8rem] font-medium transition-colors rounded-lg hover:bg-gray-700'>
								<item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
								<AnimatePresence>
									{isSidebarOpen && (
										<motion.span
											className='ml-4 whitespace-nowrap'
											initial={{ opacity: 0, width: 0 }}
											animate={{ opacity: 1, width: "auto" }}
											exit={{ opacity: 0, width: 0 }}
											transition={{ duration: 0.2, delay: 0.3 }}
										>
											{item.name}
										</motion.span>
									)}
								</AnimatePresence>
							</motion.div>
						</Link>
					))}
				</nav>
			</div>
		</motion.div>
	);
};
export default Sidebar;
