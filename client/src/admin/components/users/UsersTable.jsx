import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { apiCalling } from "../../../api/apiCalling.api";

const UsersTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  // const [filteredUsers, setFilteredUsers] = useState(userData);
  const [users, setUsers] = useState([]);

  const dispatch = useDispatch();
  // now we write code for getting all users from the database or server.
  useEffect(() => {
    const options = {
      method: "GET",
      url: "http://localhost:5000/api/v1/admin/all-users",
    };

    (async function getAllUser() {
      const response = await dispatch(apiCalling(options));
      if (response?.success) {
        setUsers(response?.data);
      } else {
        console.log(response?.message);
      }
    })();
  }, []);
  

  // const handleSearch = (e) => {
  //   const term = e.target.value.toLowerCase();
  //   setSearchTerm(term);
  //   const filtered = userData.filter(
  //     (user) =>
  //       user.name.toLowerCase().includes(term) ||
  //       user.email.toLowerCase().includes(term)
  //   );
  //   setFilteredUsers(filtered);
  // };

  return (
    <motion.div
      className="p-6 bg-gray-800 bg-opacity-50 border border-gray-700 shadow-lg backdrop-blur-md rounded-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[2rem] font-semibold text-gray-100">Users</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search users..."
            className="py-2 pl-10 pr-4 text-white placeholder-gray-400 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-[2.4rem] py-[1.2rem] text-left text-[1.4rem] font-medium text-gray-400 uppercase tracking-wider">
                Name
              </th>
              <th className="px-[2.4rem] py-[1.2rem] text-left text-[1.4rem] font-medium text-gray-400 uppercase tracking-wider">
                Email
              </th>
              <th className="px-[2.4rem] py-[1.2rem] text-left text-[1.4rem] font-medium text-gray-400 uppercase tracking-wider">
                Role
              </th>
              <th className="px-[2.4rem] py-[1.2rem] text-left text-[1.4rem] font-medium text-gray-400 uppercase tracking-wider">
                User Type
              </th>
              <th className="px-[2.4rem] py-[1.2rem] text-left text-[1.4rem] font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {users.length > 0
              ? users.map((user) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="px-[2.4rem] py-[1.6rem] whitespace-nowrap">
                      <div className="flex items-center gap-[2rem]">
                        <div className="flex-shrink-0 w-[4rem] h-[4rem]">
                          <div className="flex items-center justify-center min-w-[5rem] min-h-[5rem] font-semibold text-white rounded-full bg-gradient-to-r from-purple-400 to-blue-500">
                            <img
                              src={user?.avatar?.url}
                              className="rounded-full  h-[5rem] w-[5rem]"
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-[1.4rem] font-medium text-gray-100">
                            {`${user.firstname} ${
                              user.lastname != undefined ? user.lastname : ""
                            }`}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-[2.4rem] py-4 whitespace-nowrap">
                      <div className="text-[1.4rem] text-gray-300">
                        {user.email}
                      </div>
                    </td>
                    <td className="px-[2.4rem] py-4 whitespace-nowrap">
                      <span className="px-[1rem] py-[.5rem] text-center inline-flex text-[1.4rem] leading-5 font-semibold rounded-full bg-blue-800 text-blue-100 ">
                        {user.roles}
                      </span>
                    </td>

                    <td className="px-[2.4rem] py-[1.6rem] whitespace-nowrap">
                      <span
                        className={`px-[1rem] text-center inline-flex text-[1.4rem] leading-5 font-semibold rounded-full py-[.5rem] ${
                          user.userType === "reader"
                            ? "bg-green-800 text-green-100"
                            : "bg-red-800 text-red-100"
                        }`}
                      >
                        {user.userType}
                      </span>
                    </td>

                    <td className="px-[2.4rem] py-4 whitespace-nowrap text-[1.4rem] text-gray-300">
                      <button className="mr-2 text-indigo-400 hover:text-indigo-300">
                        Edit
                      </button>
                      <button className="text-red-400 hover:text-red-300">
                        Delete
                      </button>
                    </td>
                  </motion.tr>
                ))
              : "Loading...."}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};
export default UsersTable;
