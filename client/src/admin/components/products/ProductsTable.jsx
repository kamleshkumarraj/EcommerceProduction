import { motion } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useFilter } from "../../../hooks/useFilter.hook";
import { setIsCreateProductsFormOpen } from "../../../store/slices/misc.slice";
import { adminApi, useDeleteSingleProductsMutation } from "../../../store/slices/adminApi";
import { useError } from "../../../hooks/useError";
import {  toast } from "react-toastify";
import { toastUpdate } from "../../../helper/helper";
import { useSocket } from "../../../contexts/Socket";
import { DELETE_PRODUCT } from "../../../events";
import { useHandleSocket } from "../../../hooks/useHandleSocket";
import Pagination from "../../../components/common/Pagination";


const ProductsTable = ({products}) => {
  // pagination related state variables.
  const [startIdx , setStartIdx] = useState(0);
  const [endIdx , setEndIdx] = useState(20);
  const [startPageIdx , setStartPageIdx] = useState(0);
  const [endPageIdx , setEndPageIdx] = useState(7);
  const [selectIdx , setSelectIdx] = useState(1);

  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const [filteredProducts , setFilterQuery] = useFilter(products , (product) => product.title)
  const [deleteProducts , {isLoading : isDeletingLoading , error : deleteProductsError , isError : isDeleteProductsError}] = useDeleteSingleProductsMutation();
  const socket = useSocket();

  const pageData = useMemo(() => {
    const totalPage = Math.ceil(filteredProducts?.length / 20);
    return { totalPage };
  },[filteredProducts])

  useEffect(() => {
    // setStartIdx(0)
    // setEndIdx(20)
    // setSelectIdx(1)
    // setStartPageIdx(0)
    // setEndPageIdx(7)
  },[filteredProducts])
 

  useEffect(() => {
    setFilterQuery(searchTerm)
  },[searchTerm])


  const handleDeleteProducts = async (productId) => {
    const toastId = toast.loading("products is deleting ...");
    try {
      const {data} = await deleteProducts(productId);
      if(data?.success){
        toastUpdate({toastId , message : data?.message || "Product deleted successfully" , type : "success"})
        socket.emit(DELETE_PRODUCT , productId)
      }else{
        toastUpdate({toastId , message : data?.message || "We get error during deleting product" , type : "error"})
      }
    } catch (error) {
      console.log("We get error during deleting product")
      toastUpdate({toastId , message : error ||  "We get error during deleting product" , type : "error"})
    }
  }
  const deleteProductHandlerSocket = useCallback((productId) => {
    console.log(productId);
    dispatch(adminApi.util.updateQueryData("getTotalProducts" , undefined , (draft) => {
      return {
        ...draft,
        data : {
          ...draft.data,
          products : draft.data.products.filter((product) => product._id !== productId),
          productsLength : draft.data.products.length - 1
        }
      }
    }))
  },[])
  
  useHandleSocket({[DELETE_PRODUCT] : deleteProductHandlerSocket})
  
  useError([{error : deleteProductsError , isError : isDeleteProductsError}])
  
  return (
    <motion.div
      className="p-6 mb-8 bg-gray-800 bg-opacity-50 border border-gray-700 shadow-lg backdrop-blur-md rounded-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex items-center justify-between mb-6">
     
        <h2 className="text-[2rem] font-semibold text-gray-100">
          Product List
        </h2>
        <div id="create-prducts">
          <button onClick={() => dispatch(setIsCreateProductsFormOpen(true))}  className="px-4 py-2 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-400">Create Product</button>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            className="py-2 pl-10 pr-4 text-white placeholder-gray-400 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setSearchTerm(e.target.value.trim())}
            value={searchTerm}
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
                Category
              </th>
              <th className="px-[2.4rem] py-[1.2rem] text-left text-[1.4rem] font-medium text-gray-400 uppercase tracking-wider">
                Price
              </th>
              <th className="px-[2.4rem] py-[1.2rem] text-left text-[1.4rem] font-medium text-gray-400 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-[2.4rem] py-[1.2rem] text-left text-[1.4rem] font-medium text-gray-400 uppercase tracking-wider">
                Sales
              </th>
              <th className="px-[2.4rem] py-[1.2rem] text-left text-[1.4rem] font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {filteredProducts.slice(startIdx , endIdx).map((product) => (
              <motion.tr
                key={product.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="px-[2.4rem] py-4 whitespace-nowrap text-[1.4rem] font-medium text-gray-100 flex gap-2 items-center">
                  <img
                    src={product?.thumbnail?.url || product?.images[0]}
                    className="rounded-full w-[4rem] h-[4rem]"
                  />
                  {product.title}
                </td>

                <td className="px-[2.4rem] py-4 whitespace-nowrap text-[1.4rem] text-gray-300">
                  {product.category}
                </td>

                <td className="px-[2.4rem] py-4 whitespace-nowrap text-[1.4rem] text-gray-300">
                  ${product.price.toFixed(2)}
                </td>
                <td className="px-[2.4rem] py-4 whitespace-nowrap text-[1.4rem] text-gray-300">
                  {product.stock}
                </td>
                <td className="px-[2.4rem] py-4 whitespace-nowrap text-[1.4rem] text-gray-300">
                  {product.sales}
                </td>
                <td className="px-[2.4rem] py-4 whitespace-nowrap text-[1.4rem] text-gray-300">
                  <button className="mr-2 text-indigo-400 hover:text-indigo-300">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => {
                    handleDeleteProducts(product._id)
                  }}  className="text-red-400 hover:text-red-300">
                    <Trash2 size={18} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
          
        </table>
        <Pagination 
            endIdx={endIdx}
            endPageIdx={endPageIdx}
            pageData={pageData}
            selectIdx={selectIdx}
            setEndIdx={setEndIdx}
            setEndPageIdx={setEndPageIdx}
            setSelectIdx={setSelectIdx} 
            setStartIdx={setStartIdx}
            setStartPageIdx={setStartPageIdx}
            startIdx={startIdx}
            startPageIdx={startPageIdx}
            perPageData={20}
        />
      </div>
    </motion.div>
  );
};
export default ProductsTable;
