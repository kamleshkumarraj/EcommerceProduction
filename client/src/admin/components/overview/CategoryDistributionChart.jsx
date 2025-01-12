import { motion } from "framer-motion";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { getRandomColor } from "../../../helper/helper";
import { useError } from "../../../hooks/useError";
import { useGetAllProductsCategoriesWiseQuery } from "../../../store/slices/adminApi";

// const categoryData = [
// 	{ name: "Electronics", value: 4500 },
// 	{ name: "Clothing", value: 3200 },
// 	{ name: "Home & Garden", value: 2800 },
// 	{ name: "Books", value: 2100 },
// 	{ name: "Sports & Outdoors", value: 1900 },
// ];

const COLORS = [
  "#6366F1",
  "#8B5CF6",
  "#EC4899",
  "#10B981",
  "#F59E0B",
  "#2D7AE5",
  "#2D43E5",
  "#4F2DE5",
  "#862DE5",
  "#BD2DE5",
  "#E52DD6",
  "#E52D9F",
  "#E52D68",
  "#E52D30",
  "#E5612D",
  "#E5992D",
  "#E5D02D",
  "#C3E52D",
  "#8CE52D",
  "#55E",
  "#2DE53D",
  "#2DE574",
  "#2DE5AB",
  "#2DE5E2",
  "#2DB1E5",
];

const CategoryDistributionChart = () => {
  const {
    data: categoryData,
    isLoading: categoriesWiseIsLoading,
    isError: categoriesWiseIsError,
    error: categoriesWiseError,
  } = useGetAllProductsCategoriesWiseQuery();

  useError([{ error: categoriesWiseError, isError: categoriesWiseIsError }]);

  console.log(categoryData?.data);

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-[1.5rem] border border-gray-700 w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="mb-[1.6rem] text-[1.8rem] font-medium text-gray-100">
        Category Distribution
      </h2>
      <div className="h-[60rem]">
        {categoryData?.data && categoryData?.data?.length > 0 && (
          <ResponsiveContainer width={"100%"} height={"100%"}>
            <PieChart>
              <Pie
                data={categoryData?.data?.slice(0,10)}
                cx={"50%"}
                cy={"50%"}
                labelLine={false}
                outerRadius={200}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {categoryData?.data &&
                  categoryData?.data?.length > 0 &&
                  categoryData?.data?.slice(0,10)?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(31, 41, 55, 0.8)",
                  borderColor: "#4B5563",
                }}
                itemStyle={{ color: "#E5E7EB" }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </motion.div>
  );
};
export default CategoryDistributionChart;
