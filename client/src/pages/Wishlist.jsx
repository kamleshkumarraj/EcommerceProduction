import { useDispatch, useSelector } from 'react-redux';
import { TbHeartX } from "react-icons/tb";
import { Link } from 'react-router-dom';
import { FiMinus, FiPlus } from 'react-icons/fi';
import FetchingLoading from '../components/cart/FetchingLoading';
import { MdArrowForwardIos } from 'react-icons/md';
import CartLoader from '../components/cart/CartLoader';
import { useEffect, useState } from 'react';
import Loader from '../components/cart/Loader';
import { getAllWishlistItems } from '../store/slices/wishlist.slice';
import { removeWishlistItem, updateWishlistQty } from '../utils/wishlist';

function Wishlist() {
    const wishlistItems = useSelector(getAllWishlistItems);
    const [apiStatus , setApiStatus] = useState(false)
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    
    useEffect(() => {
        const loadContent = setTimeout(() => {
          setLoading(false); // Set loading to false after 2 seconds (simulating data fetch or image loading)
        }, 1000);
    
        return () => clearTimeout(loadContent); // Cleanup timeout on component unmount
      }, []);
      
    if(wishlistItems.length == 0) return <CartLoader 
        icon={<TbHeartX  size={250} color="#E8E8E8" />} 
        heading={"Your wishlist is currently empty."}
        para={`Before proceed to view your wishlist, you must add some products to your wishlist.\n
        You will find a lot of interesting products on our "Shop" page.`}
        button={"RETURN TO SHOPPING"}
        />

        if (loading) {
            return (
              <div className="h-[100vh] w-[100vw] flex justify-center items-center ">
                <Loader />
              </div>
            ); // Render Loader component while loading
          }
    return (
        <div className="bg-white py-[20px]">
      <div className="p-4 my-auto mb-4 bg-gray-200">
        <h1 className="mb-2 text-3xl font-bold text-center">wishlist</h1>
        <nav className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <Link to="#" className="hover:underline">
            Ecommerce
          </Link>
          <MdArrowForwardIos size={10} />
          <span className="font-semibold text-black">wishlist</span>
        </nav>
      </div>

      <div className="flex items-start justify-center w-full px-5 md:px-10">
        {/* wishlist Items Section */}
        <div className="flex flex-col w-full max-w-[1220px]">
          <h2 className="mb-4 text-lg font-semibold">Your wishlist</h2>
          <div className="grid justify-between w-full grid-cols-5 gap-[230px]">
            <h1 className="w-[450px]  text-[22px] font-[700] text-[#00000086] text-center  col-span-2 ">Products</h1>
            <h1 className='text-center text-[22px] font-[700] text-[#00000086]'>Price</h1>
            <h1 className='text-center text-[22px] font-[700] text-[#00000086]'>Quantity</h1>
            <h1 className='text-center text-[22px] font-[700] text-[#00000086]'>Remove</h1>
          </div>

          {apiStatus ? (
            <FetchingLoading />
          ) : (
            wishlistItems &&
            wishlistItems.length > 0 &&
            wishlistItems.map(({ _id, thumbnail, price, quantity, title }) => (
              <div
                key={_id}
                className="grid items-center py-4 grid-cols-5 gap-[230px] border-b"
              >
              <div id="product" className='flex gap-[10px] w-[450px] items-center col-span-2'>
                <div id="img" className="w-[200px]">
                <img className="border-[.5px] rounded-[10px] border-[#1111110a]" src={thumbnail} alt="wishlist-image" />
                </div>
                <div className="flex flex-col flex-grow px-4 my-auto">
                  <p className="font-semibold">{title}</p>
                  <p className="text-[14px] text-gray-600">Price : ${price}</p>
                </div>
              </div>
                
                
                <p className="text-lg font-bold lg:pr-[100px]">${price*quantity}</p>
                <div
                  id="quantity"
                  className="flex gap-[1rem] justify-center pr-[1rem] items-center"
                >
                  <div
                    id="decreaseBtn"
                    className="font-[600] text-[28px] p-[5px] grid place-content-center py-[-2rem] border-[1px] rounded-[.5rem] hover:cursor-pointer"
                    onClick={() => {updateWishlistQty(dispatch , {_id} , 'decrease') }}
                  >
                    {" "}
                    <FiMinus size={"20px"} />{" "}
                  </div>
                  <p className="text-[18px] font-[600]">{quantity}</p>
                  <div
                    id="increaseBtn"
                    className="font-[600] text-[28px] p-[5px] grid place-content-center py-[-2px] border-[1px] rounded-[.5rem] hover:cursor-pointer"
                    onClick={() => {updateWishlistQty(dispatch , {_id} , 'increase')}}
                  >
                    <FiPlus size={"20px"} />
                  </div>
                </div>
                <button
                  onClick={() => {
                    removeWishlistItem(dispatch , {_id})
                  }}
                  className=" w-[30px] h-[30px] mx-[20px] rounded-[50%] bg-red-500 text-white hover:underline"
                >
                  X
                </button>
              </div>
            ))
          )}
        </div>

        {/* Order Summary Section */}
        
      </div>
    </div>
      );
}

export default Wishlist