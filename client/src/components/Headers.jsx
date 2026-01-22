
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
