import { UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import UsersTable from "../components/users/UsersTable";
import UserGrowthChart from "../components/users/UserGrowthChart";
import UserActivityHeatmap from "../components/users/UserActivityHeatmap";
import UserDemographicsChart from "../components/users/UserDemographicsChart";
import { useGetTotalUsersQuery } from "../../store/slices/adminApi";
import { useError } from "../../hooks/useError";
import ThreeDotProgressLoader from "../components/loader/ThreeDotProgressLoader";
import { useSocket } from "../../contexts/Socket";
import { useEffect } from "react";
import { NEW_USER_REGISTERED } from "../../events";

const userStats = {
  totalUsers: 152845,
  newUsersToday: 243,
  activeUsers: 98520,
  churnRate: "2.4%",
};



const UsersPage = () => {
  const {data : usersData , isLoading : isUsersLoading , error : usersError , isError : isUsersError} = useGetTotalUsersQuery();
  const socket = useSocket();

  const newUserSocketHandler = (data) => {
    console.log(data);
  }

  useEffect(() => {
    socket.on(NEW_USER_REGISTERED , newUserSocketHandler);
    return () => socket.off(NEW_USER_REGISTERED , newUserSocketHandler);
  } , [socket])
  
  useError([{error : usersError , isError : isUsersError}]);
  return (
    <div className="relative z-10 flex-1 overflow-auto">
      <Header title="Users" />

      <main className="max-w-[120rem] mx-auto py-[2.4rem] px-[1.6rem] lg:px-[3.2rem]">
        {/* STATS */}
        <motion.div
          className="grid grid-cols-1 gap-5 mb-8 sm:grid-cols-2 lg:grid-cols-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Total Users"
            icon={UsersIcon}
            value={userStats.totalUsers.toLocaleString()}
            color="#6366F1"
          />
          <StatCard
            name="New Users Today"
            icon={UserPlus}
            value={userStats.newUsersToday}
            color="#10B981"
          />
          <StatCard
            name="Active Users"
            icon={UserCheck}
            value={userStats.activeUsers.toLocaleString()}
            color="#F59E0B"
          />
          <StatCard
            name="Churn Rate"
            icon={UserX}
            value={userStats.churnRate}
            color="#EF4444"
          />
        </motion.div>

        {isUsersLoading ? (
          <ThreeDotProgressLoader />
        ) : (
          !isUsersError && <UsersTable users={usersData?.data?.users} />
        )}

        {/* USER CHARTS */}
        <div className="grid grid-cols-1 gap-6 mt-8 lg:grid-cols-2">
          <UserGrowthChart />
          <UserActivityHeatmap />
          <UserDemographicsChart />
        </div>
      </main>
    </div>
  );
};
export default UsersPage;
