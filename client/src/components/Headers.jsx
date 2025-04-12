// import { useContext, useState } from "react";
// import {
//   AiFillGithub,
//   AiFillHeart,
//   AiFillShopping,
//   AiOutlineTwitter,
// } from "react-icons/ai";
// import {
//   FaFacebookF,
//   FaLinkedinIn,
//   FaList,
//   FaLock,
//   FaUser,
// } from "react-icons/fa";
// import { GrMail } from "react-icons/gr";
// import { IoIosCall } from "react-icons/io";
// import { MdOutlineKeyboardArrowDown } from "react-icons/md";
// import { useSelector } from "react-redux";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import logo from "../assets/Img/logo.jpg";
// import { GlobalContext } from "../contexts/GlobalProvider";
// import { getAllCartItems } from "../store/slices/cart.slice";
// import { getAllCategories } from "../store/slices/productsHandler.slice";
// import { getSelf } from "../store/slices/selfHandler.slice";
// import { getAllWishlistItems } from "../store/slices/wishlist.slice";
// import { toast } from "react-toastify";

// const Headers = () => {
//   const navigate = useNavigate();
//   const categorys = useSelector(getAllCategories);
//   const userInfo = useSelector(getSelf);
//   const card_product_count = useSelector(getAllCartItems).length;
//   const wishlist_count = useSelector(getAllWishlistItems).length;

//   const { pathname } = useLocation();
//   const [showShidebar, setShowShidebar] = useState(true);
//   const [categoryShow, setCategoryShow] = useState(true);
//   const { searchQuery, setSearchQuery, setCategory, setEventLoading } =
//     useContext(GlobalContext);

//   const redirect_card_page = () => {
//     if (userInfo) {
//       navigate(`/cart`);
//     } else {
//       navigate(`/login`);
//     }
//   };

//   return (
//     { /* <div className="w-full bg-white pb-[1rem] sticky top-0 z-[9999]">
//       <div className="header-top bg-[#adadad] ">
//         <div className="w-[85%] lg:w-[98%] mx-auto">
//           <div className="flex w-full justify-between items-center h-[5rem] text-slate-500">
//             <ul className="flex items-center justify-start gap-[3.2rem]">
//               <li className="flex relative justify-center items-center gap-2 text-[1.4rem] after:absolute after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px]">
//                 <span>
//                   <GrMail />
//                 </span>
//                 <span>kamlesh.22jics061@jietjodhpur.ac.in</span>
//               </li>
//               <span>Multi vendor ecommerce</span>
//             </ul>
//             <div>
//               <div className="flex items-center justify-center gap-10">
//                 {userInfo ? (
//                   <Link
//                     className="flex items-center justify-center gap-2 text-[1.4rem] cursor-pointer"
//                     to="/my-account/my-info"
//                   >
//                     <div>
//                       <img
//                         className="w-[40px] h-[40px] rounded-full"
//                         src={userInfo?.avatar?.url}
//                         alt="profile-image"
//                       />
//                     </div>
//                     <span>{userInfo?.firstname}</span>
//                   </Link>
//                 ) : (
//                   <Link
//                     to="/login"
//                     className="flex items-center justify-center gap-2 text-[1.4rem] cursor-pointer"
//                   >
//                     <span>
//                       <FaLock />
//                     </span>
//                     <span>Login</span>
//                   </Link>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="w-white">
//         <div className="w-[85%] lg:w-[90%] mx-auto">
//           <div className="h-[80px] md-lg:h-[100px] flex justify-between items-center flex-wrap">
//             <div className="w-3/12 md-lg:w-full md-lg:pt-4">
//               <div className="flex items-center justify-between">
//                 <Link to="/">
//                   <img
//                     src={logo}
//                     className="w-[3rem] rounded-full"
//                     alt="logo"
//                   />
//                 </Link>
//                 <div
//                   className="justify-center items-center w-[30px] h-[30px] bg-white text-slate-600 border border-slate-600 rounded-sm cursor-pointer lg:hidden md-lg:flex xl:hidden hidden"
//                   onClick={() => setShowShidebar(false)}
//                 >
//                   <span>
//                     <FaList />
//                   </span>
//                 </div>
//               </div>
//             </div>
//             <div className="w-9/12 md-lg:w-full">
//               <div className="flex flex-wrap items-center justify-between w-full pl-8 md-lg:justify-center">
//                 <ul className="sm:flex hidden items-start justify-start gap-[3.2rem] text-[1.4rem] font-bold uppercase md-lg:hidden">
//                   <li>
//                     <Link
//                       className={`p-2 block ${
//                         pathname === "/" ? "text-[#7fad39]" : "text-slate-600"
//                       }`}
//                     >
//                       Home
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/shopping"
//                       className={`p-2 block ${
//                         pathname === "/shop"
//                           ? "text-[#7fad39]"
//                           : "text-slate-600"
//                       }`}
//                     >
//                       Shop
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/blog"
//                       className={`p-2 block ${
//                         pathname === "/blog"
//                           ? "text-[#7fad39]"
//                           : "text-slate-600"
//                       }`}
//                     >
//                       Blog
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                     to={'/about'}
//                       className={`p-2 block ${
//                         pathname === "/about"
//                           ? "text-[#7fad39]"
//                           : "text-slate-600"
//                       }`}
//                     >
//                       About
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                     to={'/contact'}
//                       className={`p-2 block ${
//                         pathname === "/contact"
//                           ? "text-[#7fad39]"
//                           : "text-slate-600"
//                       }`}
//                     >
//                       Contact
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                     to={'/admin/dashboard/overview'}
//                       className={`p-2 block ${
//                         pathname === "/contact"
//                           ? "text-[#7fad39]"
//                           : "text-slate-600"
//                       }`}
//                     >
//                      {userInfo && userInfo?.roles == 'admin' && 'Dashboard'}
//                     </Link>
//                   </li>
//                 </ul>
//                 <div className="flex items-center justify-center gap-5 md-lg:hidden">
//                   <div className="flex justify-center gap-5 ml-auto">
//                     <div
//                       onClick={() =>
//                         navigate(userInfo ? "/wishlist" : "/login")
//                       }
//                       className="relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]"
//                     >
//                       <span className="text-[2rem] text-red-500">
//                         <AiFillHeart />
//                       </span>
//                       {wishlist_count !== 0 && (
//                         <div className="w-[20px] h-[20px] absolute bg-green-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]">
//                           {wishlist_count}
//                         </div>
//                       )}
//                     </div>
//                     <div
//                       onClick={redirect_card_page}
//                       className="relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]"
//                     >
//                       <span className="text-[2rem] text-orange-500">
//                         <AiFillShopping />
//                       </span>
//                       {card_product_count !== 0 && (
//                         <div className="w-[20px] h-[20px] absolute bg-green-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]">
//                           {card_product_count}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="hidden md-lg:block">
//         <div
//           onClick={() => setShowShidebar(true)}
//           className={`fixed duration-200 transition-all ${
//             showShidebar ? "invisible" : "visible"
//           } hidden md-lg:block w-screen h-screen bg-[rgba(0,0,0,0.5)] top-0 left-0 z-20`}
//         ></div>
//         <div
//           className={`w-[300px] z-[9999] transition-all duration-200 fixed  ${
//             showShidebar ? "-left-[300px]" : "left-0"
//           } top-0 overflow-y-auto bg-white h-screen py-6 px-8`}
//         >
//           <div className="flex flex-col justify-start gap-6">
//             <Link to="/">
//               <img src="" alt="logo" />
//             </Link>
//             <div className="flex items-center gap-10 justify-star">
//               <div className="flex group cursor-pointer text-slate-800 text-[1.4rem] justify-center items-center gap-1 relative after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px] after:absolute">
//                 <img src="" alt="" />
//                 <span>
//                   <MdOutlineKeyboardArrowDown />
//                 </span>
                
//               </div>
//               {userInfo ? (
//                 <Link
//                   className="flex items-center justify-center gap-2 text-[1.4rem] cursor-pointer"
//                   to="/dashboard"
//                 >
//                   <span>
//                     <FaUser />
//                   </span>
//                   <span>{userInfo.name}</span>
//                 </Link>
//               ) : (
//                 <div className="flex items-center justify-center gap-2 text-[1.4rem] cursor-pointer">
//                   <span>
//                     <FaLock />
//                   </span>
//                   <span>Login</span>
//                 </div>
//               )}
//             </div>
//             <ul className="flex flex-col items-start justify-start font-semibold uppercase text-md">
//               <li>
//                 <Link
//                   className={`py-2 block ${
//                     pathname === "/" ? "text-[#7fad39]" : "text-slate-600"
//                   }`}
//                 >
//                   Home
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to={"/shops"}
//                   className={`py-2 block ${
//                     pathname === "/shops" ? "text-[#7fad39]" : "text-slate-600"
//                   }`}
//                 >
//                   Shop
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   className={`py-2 block ${
//                     pathname === "/blog" ? "text-[#7fad39]" : "text-slate-600"
//                   }`}
//                 >
//                   Blog
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   className={`py-2 block ${
//                     pathname === "/about" ? "text-[#7fad39]" : "text-slate-600"
//                   }`}
//                 >
//                   About
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   className={`py-2 block ${
//                     pathname === "/contact"
//                       ? "text-[#7fad39]"
//                       : "text-slate-600"
//                   }`}
//                 >
//                   Contact
//                 </Link>
//               </li>
//             </ul>
//             <div className="flex items-center justify-start gap-4">
//               <a href="#">
//                 <FaFacebookF />
//               </a>
//               <a href="#">
//                 <AiOutlineTwitter />
//               </a>
//               <a href="#">
//                 <FaLinkedinIn />
//               </a>
//               <a href="#">
//                 <AiFillGithub />
//               </a>
//             </div>
//             <div className="flex items-center justify-end w-full gap-3 md-lg:justify-start">
//               <div className="w-[48px] h-[48px] rounded-full flex bg-[#f5f5f5] justify-center items-center">
//                 <span>
//                   <IoIosCall />
//                 </span>
//               </div>
//               <div className="flex flex-col justify-end gap-1">
//                 <h2 className="text-[1.4rem] font-medium text-slate-700">
//                   +8803242343243
//                 </h2>
//                 <span className="text-xs">support 33/45 time</span>
//               </div>
//             </div>
//             <ul className="flex flex-col justify-start items-start gap-3 text-[#1c1c1c]">
//               <li className="flex items-center justify-start gap-2 text-[1.4rem]">
//                 <span>
//                   <GrMail />
//                 </span>
//                 <span>kamlesh.22jics061@jietjodhpur.ac.in</span>
//               </li>
//               <span className="text-[1.4rem]">Multi vendor ecommerce</span>
//             </ul>
//           </div>
//         </div>
//       </div>
//       <div className="w-[85%] hidden md:block lg:w-[90%] mx-auto">
//         <div className="flex flex-wrap w-full md-lg:gap-[3.2rem]">
//           <div className="w-3/12 md-lg:w-full">
//             <div className="relative bg-white">
//               <div
//                 onClick={() => setCategoryShow(!categoryShow)}
//                 className="h-[50px] bg-violet-400 text-white flex justify-center md-lg:justify-between md-lg:px-6 items-center gap-3 font-bold text-md cursor-pointer"
//               >
//                 <div className="flex items-center justify-center gap-3">
//                   <span>
//                     <FaList />
//                   </span>
//                   <span>All Category</span>
//                 </div>
//                 <span className="pt-1">
//                   <MdOutlineKeyboardArrowDown />
//                 </span>
//               </div>
//               <div
//                 className={`${
//                   categoryShow ? "h-0" : "h-[400px]"
//                 } overflow-hidden transition-all md-lg:relative duration-500 absolute z-[99999] hidden md:block bg-white w-full border-x`}
//               >
//                 <ul className="h-full py-2 overflow-auto font-medium text-slate-600">
//                   {categorys.map((c, i) => {
//                     return (
//                       <li
//                         key={i}
//                         className="flex justify-start items-center gap-2 px-[24px] py-[6px]"
//                       >
//                         <img
//                           src={c.image}
//                           className="w-[30px] h-[30px] rounded-full overflow-hidden"
//                           alt={c.name}
//                         />
//                         <Link
//                           onClick={() => {
//                             setSearchQuery("");
//                             setEventLoading(true);
//                             setTimeout(() => {
//                               setEventLoading(false);
//                               navigate(
//                                 `/category/searching/category=${c.name}`,
//                                 { state: { category: c.name } }
//                               );
//                             }, 500);
//                           }}
//                           className="block text-[1.4rem]"
//                         >
//                           {c.name}
//                         </Link>
//                       </li>
//                     );
//                   })}
//                 </ul>
//               </div>
//             </div>
//           </div>
//           <div className="w-9/12 pl-8 md-lg:pl-0 md-lg:w-full">
//             <div className="flex-wrap items-center justify-between hidden w-full md:flex md-lg:gap-6">
//               <div className="w-8/12 md-lg:w-full">
//                 <div className=" border md:flex hidden h-[50px] items-center relative gap-5">
//                   <input
//                     className="relative hidden w-full h-full px-3 bg-transparent md:block text-slate-500 outline-0"
//                     onChange={(e) => {
//                       setSearchQuery(e.target.value);
//                       setCategory("");
//                     }}
//                     type="text"
//                     value={searchQuery}
//                     name=""
//                     id=""
//                     placeholder="what do you need"
//                   />
//                   <button
//                     onClick={() => {
//                       if (searchQuery.trim()) {
//                         setEventLoading(true);
//                         setTimeout(() => {
//                           setEventLoading(false);
//                           navigate(`/category/searching/query=${searchQuery}`);
//                         }, 500);
//                       } else {
//                         toast.error("Please enter something to search !");
//                       }
//                     }}
//                     className="absolute right-0 h-full px-8 font-semibold text-white uppercase bg-violet-400"
//                   >
//                     Search
//                   </button>
//                 </div>
//               </div>
//               <div className="block w-4/12 pl-2 md-lg:hidden md-lg:w-full md-lg:pl-0">
//                 <div className="flex items-center justify-end w-full gap-3 md-lg:justify-start">
//                   <div className="w-[48px] h-[48px] rounded-full flex bg-[#f5f5f5] justify-center items-center">
//                     <span>
//                       <IoIosCall />
//                     </span>
//                   </div>
//                   <div className="flex flex-col justify-end gap-1">
//                     <h2 className="font-medium text-md text-slate-700">
//                       +91 8603416388
//                     </h2>
//                     <span className="text-[1.4rem]">support 24/7 time</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div> /*}
//   );
// };

// export default Headers;

import { useContext, useState } from "react";
import {
  AiFillHeart,
  AiFillShopping,
} from "react-icons/ai";
import { FaList, FaLock } from "react-icons/fa";
import { GrMail } from "react-icons/gr";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/Img/logo.jpg";
import { GlobalContext } from "../contexts/GlobalProvider";
import { getAllCartItems } from "../store/slices/cart.slice";
import { getAllCategories } from "../store/slices/productsHandler.slice";
import { getSelf } from "../store/slices/selfHandler.slice";
import { getAllWishlistItems } from "../store/slices/wishlist.slice";
import { toast } from "react-toastify";

const Headers = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const categories = useSelector(getAllCategories);
  const userInfo = useSelector(getSelf);
  const cartProductCount = useSelector(getAllCartItems).length;
  const wishlistCount = useSelector(getAllWishlistItems).length;

  const { searchQuery, setSearchQuery, setCategory, setEventLoading } = useContext(GlobalContext);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showCategoryList, setShowCategoryList] = useState(false);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setEventLoading(true);
      setTimeout(() => {
        setEventLoading(false);
        navigate(`/category/searching/query=${searchQuery}`);
      }, 500);
    } else {
      toast.error("Please enter something to search!");
    }
  };

  const goToCart = () => navigate(userInfo ? "/cart" : "/login");
  const goToWishlist = () => navigate(userInfo ? "/wishlist" : "/login");

  return (
    <header className="w-full sticky top-0 bg-white z-[9999] shadow-sm">
      {/* Top Bar */}
      <div className="bg-gray-300 text-slate-600 text-[1.4rem] py-[1rem]">
        <div className="max-w-[120rem] mx-auto flex justify-between items-center px-[1rem]">
          <div className="flex items-center gap-[2rem]">
            <div className="flex items-center gap-[1rem]">
              <GrMail />
              <span>kamlesh.22jics061@jietjodhpur.ac.in</span>
            </div>
            <span className="hidden md:inline-block">Multi vendor ecommerce</span>
          </div>
          <div>
            {userInfo ? (
              <Link to="/my-account/my-info" className="flex items-center gap-[1rem]">
                <img src={userInfo.avatar?.url} alt="avatar" className="w-[3rem] h-[3rem] rounded-full" />
                <span>{userInfo.firstname}</span>
              </Link>
            ) : (
              <Link to="/login" className="flex items-center gap-[1rem]">
                <FaLock />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-[120rem] mx-auto px-[1rem] py-[1.4rem] flex justify-between items-center flex-wrap">
        <div className="flex items-center gap-[1.4rem] w-full md:w-auto">
          <Link to="/">
            <img src={logo} alt="Logo" className="w-[4rem] rounded-full" />
          </Link>
          <button className="md:hidden text-[2rem]" onClick={() => setShowSidebar(!showSidebar)}>
            <FaList />
          </button>
        </div>

        <nav className="hidden md:flex gap-[2rem] text-[1.4rem] font-semibold uppercase">
          {["/", "/shopping", "/blog", "/about", "/contact"].map((path, index) => (
            <Link
              key={index}
              to={path}
              className={`p-[1rem] ${pathname === path ? "text-[#7fad39]" : "text-slate-600"}`}
            >
              {path.replace("/", "") || "Home"}
            </Link>
          ))}

          {userInfo?.roles === "admin" && (
            <Link
              to="/admin/dashboard/overview"
              className={`p-[1rem] ${pathname.includes("/admin") ? "text-[#7fad39]" : "text-slate-600"}`}
            >
              Dashboard
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-[1.4rem] mt-[1.4rem] md:mt-0">
          <div onClick={goToWishlist} className="relative cursor-pointer">
            <AiFillHeart className="text-[2.4rem] text-red-500" />
            {wishlistCount > 0 && (
              <span className="absolute -top-[1rem] -right-[1rem] bg-green-500 text-white text-[1.2rem] rounded-full px-[0.6rem]">
                {wishlistCount}
              </span>
            )}
          </div>
          <div onClick={goToCart} className="relative cursor-pointer">
            <AiFillShopping className="text-[2.4rem] text-orange-500" />
            {cartProductCount > 0 && (
              <span className="absolute -top-[1rem] -right-[1rem] bg-green-500 text-white text-[1.2rem] rounded-full px-[0.6rem]">
                {cartProductCount}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {showSidebar && (
        <div className="fixed md:hidden inset-0 bg-black bg-opacity-40 z-[999]">
          <div className="w-[25rem] h-full bg-white p-[1rem] overflow-auto">
            <button onClick={() => setShowSidebar(false)} className="mb-[1rem] text-right block w-full">
              Close
            </button>
            {["/", "/shopping", "/blog", "/about", "/contact"].map((path, index) => (
              <Link
                key={index}
                to={path}
                onClick={() => setShowSidebar(false)}
                className={`block mb-[1rem] ${pathname === path ? "text-[#7fad39]" : "text-slate-600"}`}
              >
                {path.replace("/", "") || "Home"}
              </Link>
            ))}
            {userInfo?.roles === "admin" && (
              <Link
                to="/admin/dashboard/overview"
                onClick={() => setShowSidebar(false)}
                className="block mb-[1rem] text-slate-600"
              >
                Dashboard
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Headers;
