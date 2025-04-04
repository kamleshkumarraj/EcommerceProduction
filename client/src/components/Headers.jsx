import { useContext, useState } from "react";
import {
  AiFillGithub,
  AiFillHeart,
  AiFillShopping,
  AiOutlineTwitter,
} from "react-icons/ai";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaList,
  FaLock,
  FaUser,
} from "react-icons/fa";
import { GrMail } from "react-icons/gr";
import { IoIosCall } from "react-icons/io";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
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
  const categorys = useSelector(getAllCategories);
  const userInfo = useSelector(getSelf);
  const card_product_count = useSelector(getAllCartItems).length;
  const wishlist_count = useSelector(getAllWishlistItems).length;

  const { pathname } = useLocation();
  const [showShidebar, setShowShidebar] = useState(true);
  const [categoryShow, setCategoryShow] = useState(true);
  const { searchQuery, setSearchQuery, setCategory, setEventLoading } =
    useContext(GlobalContext);

  const redirect_card_page = () => {
    if (userInfo) {
      navigate(`/cart`);
    } else {
      navigate(`/login`);
    }
  };

  return (
    <div className="w-full bg-white pb-[1rem] sticky top-0 z-[9999]">
      <div className="header-top bg-[#adadad] ">
        <div className="w-[85%] lg:w-[98%] mx-auto">
          <div className="flex w-full justify-between items-center h-[5rem] text-slate-500">
            <ul className="flex items-center justify-start gap-[3.2rem]">
              <li className="flex relative justify-center items-center gap-2 text-[1.4rem] after:absolute after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px]">
                <span>
                  <GrMail />
                </span>
                <span>kamlesh.22jics061@jietjodhpur.ac.in</span>
              </li>
              <span>Multi vendor ecommerce</span>
            </ul>
            <div>
              <div className="flex items-center justify-center gap-10">
                {userInfo ? (
                  <Link
                    className="flex items-center justify-center gap-2 text-[1.4rem] cursor-pointer"
                    to="/my-account/my-info"
                  >
                    <div>
                      <img
                        className="w-[40px] h-[40px] rounded-full"
                        src={userInfo?.avatar?.url}
                        alt="profile-image"
                      />
                    </div>
                    <span>{userInfo?.firstname}</span>
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="flex items-center justify-center gap-2 text-[1.4rem] cursor-pointer"
                  >
                    <span>
                      <FaLock />
                    </span>
                    <span>Login</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-white">
        <div className="w-[85%] lg:w-[90%] mx-auto">
          <div className="h-[80px] md-lg:h-[100px] flex justify-between items-center flex-wrap">
            <div className="w-3/12 md-lg:w-full md-lg:pt-4">
              <div className="flex items-center justify-between">
                <Link to="/">
                  <img
                    src={logo}
                    className="w-[3rem] rounded-full"
                    alt="logo"
                  />
                </Link>
                <div
                  className="justify-center items-center w-[30px] h-[30px] bg-white text-slate-600 border border-slate-600 rounded-sm cursor-pointer lg:hidden md-lg:flex xl:hidden hidden"
                  onClick={() => setShowShidebar(false)}
                >
                  <span>
                    <FaList />
                  </span>
                </div>
              </div>
            </div>
            <div className="w-9/12 md-lg:w-full">
              <div className="flex flex-wrap items-center justify-between w-full pl-8 md-lg:justify-center">
                <ul className="sm:flex hidden items-start justify-start gap-[3.2rem] text-[1.4rem] font-bold uppercase md-lg:hidden">
                  <li>
                    <Link
                      className={`p-2 block ${
                        pathname === "/" ? "text-[#7fad39]" : "text-slate-600"
                      }`}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/shopping"
                      className={`p-2 block ${
                        pathname === "/shop"
                          ? "text-[#7fad39]"
                          : "text-slate-600"
                      }`}
                    >
                      Shop
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/blog"
                      className={`p-2 block ${
                        pathname === "/blog"
                          ? "text-[#7fad39]"
                          : "text-slate-600"
                      }`}
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                    to={'/about'}
                      className={`p-2 block ${
                        pathname === "/about"
                          ? "text-[#7fad39]"
                          : "text-slate-600"
                      }`}
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                    to={'/contact'}
                      className={`p-2 block ${
                        pathname === "/contact"
                          ? "text-[#7fad39]"
                          : "text-slate-600"
                      }`}
                    >
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link
                    to={'/admin/dashboard/overview'}
                      className={`p-2 block ${
                        pathname === "/contact"
                          ? "text-[#7fad39]"
                          : "text-slate-600"
                      }`}
                    >
                     {userInfo && userInfo?.roles == 'admin' && 'Dashboard'}
                    </Link>
                  </li>
                </ul>
                <div className="flex items-center justify-center gap-5 md-lg:hidden">
                  <div className="flex justify-center gap-5 ml-auto">
                    <div
                      onClick={() =>
                        navigate(userInfo ? "/wishlist" : "/login")
                      }
                      className="relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]"
                    >
                      <span className="text-[2rem] text-red-500">
                        <AiFillHeart />
                      </span>
                      {wishlist_count !== 0 && (
                        <div className="w-[20px] h-[20px] absolute bg-green-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]">
                          {wishlist_count}
                        </div>
                      )}
                    </div>
                    <div
                      onClick={redirect_card_page}
                      className="relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]"
                    >
                      <span className="text-[2rem] text-orange-500">
                        <AiFillShopping />
                      </span>
                      {card_product_count !== 0 && (
                        <div className="w-[20px] h-[20px] absolute bg-green-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]">
                          {card_product_count}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md-lg:block">
        <div
          onClick={() => setShowShidebar(true)}
          className={`fixed duration-200 transition-all ${
            showShidebar ? "invisible" : "visible"
          } hidden md-lg:block w-screen h-screen bg-[rgba(0,0,0,0.5)] top-0 left-0 z-20`}
        ></div>
        <div
          className={`w-[300px] z-[9999] transition-all duration-200 fixed  ${
            showShidebar ? "-left-[300px]" : "left-0"
          } top-0 overflow-y-auto bg-white h-screen py-6 px-8`}
        >
          <div className="flex flex-col justify-start gap-6">
            <Link to="/">
              <img src="" alt="logo" />
            </Link>
            <div className="flex items-center gap-10 justify-star">
              <div className="flex group cursor-pointer text-slate-800 text-[1.4rem] justify-center items-center gap-1 relative after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px] after:absolute">
                <img src="" alt="" />
                <span>
                  <MdOutlineKeyboardArrowDown />
                </span>
                
              </div>
              {userInfo ? (
                <Link
                  className="flex items-center justify-center gap-2 text-[1.4rem] cursor-pointer"
                  to="/dashboard"
                >
                  <span>
                    <FaUser />
                  </span>
                  <span>{userInfo.name}</span>
                </Link>
              ) : (
                <div className="flex items-center justify-center gap-2 text-[1.4rem] cursor-pointer">
                  <span>
                    <FaLock />
                  </span>
                  <span>Login</span>
                </div>
              )}
            </div>
            <ul className="flex flex-col items-start justify-start font-semibold uppercase text-md">
              <li>
                <Link
                  className={`py-2 block ${
                    pathname === "/" ? "text-[#7fad39]" : "text-slate-600"
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to={"/shops"}
                  className={`py-2 block ${
                    pathname === "/shops" ? "text-[#7fad39]" : "text-slate-600"
                  }`}
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  className={`py-2 block ${
                    pathname === "/blog" ? "text-[#7fad39]" : "text-slate-600"
                  }`}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  className={`py-2 block ${
                    pathname === "/about" ? "text-[#7fad39]" : "text-slate-600"
                  }`}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  className={`py-2 block ${
                    pathname === "/contact"
                      ? "text-[#7fad39]"
                      : "text-slate-600"
                  }`}
                >
                  Contact
                </Link>
              </li>
            </ul>
            <div className="flex items-center justify-start gap-4">
              <a href="#">
                <FaFacebookF />
              </a>
              <a href="#">
                <AiOutlineTwitter />
              </a>
              <a href="#">
                <FaLinkedinIn />
              </a>
              <a href="#">
                <AiFillGithub />
              </a>
            </div>
            <div className="flex items-center justify-end w-full gap-3 md-lg:justify-start">
              <div className="w-[48px] h-[48px] rounded-full flex bg-[#f5f5f5] justify-center items-center">
                <span>
                  <IoIosCall />
                </span>
              </div>
              <div className="flex flex-col justify-end gap-1">
                <h2 className="text-[1.4rem] font-medium text-slate-700">
                  +8803242343243
                </h2>
                <span className="text-xs">support 33/45 time</span>
              </div>
            </div>
            <ul className="flex flex-col justify-start items-start gap-3 text-[#1c1c1c]">
              <li className="flex items-center justify-start gap-2 text-[1.4rem]">
                <span>
                  <GrMail />
                </span>
                <span>kamlesh.22jics061@jietjodhpur.ac.in</span>
              </li>
              <span className="text-[1.4rem]">Multi vendor ecommerce</span>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-[85%] hidden md:block lg:w-[90%] mx-auto">
        <div className="flex flex-wrap w-full md-lg:gap-[3.2rem]">
          <div className="w-3/12 md-lg:w-full">
            <div className="relative bg-white">
              <div
                onClick={() => setCategoryShow(!categoryShow)}
                className="h-[50px] bg-violet-400 text-white flex justify-center md-lg:justify-between md-lg:px-6 items-center gap-3 font-bold text-md cursor-pointer"
              >
                <div className="flex items-center justify-center gap-3">
                  <span>
                    <FaList />
                  </span>
                  <span>All Category</span>
                </div>
                <span className="pt-1">
                  <MdOutlineKeyboardArrowDown />
                </span>
              </div>
              <div
                className={`${
                  categoryShow ? "h-0" : "h-[400px]"
                } overflow-hidden transition-all md-lg:relative duration-500 absolute z-[99999] hidden md:block bg-white w-full border-x`}
              >
                <ul className="h-full py-2 overflow-auto font-medium text-slate-600">
                  {categorys.map((c, i) => {
                    return (
                      <li
                        key={i}
                        className="flex justify-start items-center gap-2 px-[24px] py-[6px]"
                      >
                        <img
                          src={c.image}
                          className="w-[30px] h-[30px] rounded-full overflow-hidden"
                          alt={c.name}
                        />
                        <Link
                          onClick={() => {
                            setSearchQuery("");
                            setEventLoading(true);
                            setTimeout(() => {
                              setEventLoading(false);
                              navigate(
                                `/category/searching/category=${c.name}`,
                                { state: { category: c.name } }
                              );
                            }, 500);
                          }}
                          className="block text-[1.4rem]"
                        >
                          {c.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
          <div className="w-9/12 pl-8 md-lg:pl-0 md-lg:w-full">
            <div className="flex-wrap items-center justify-between hidden w-full md:flex md-lg:gap-6">
              <div className="w-8/12 md-lg:w-full">
                <div className=" border md:flex hidden h-[50px] items-center relative gap-5">
                  <input
                    className="relative hidden w-full h-full px-3 bg-transparent md:block text-slate-500 outline-0"
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCategory("");
                    }}
                    type="text"
                    value={searchQuery}
                    name=""
                    id=""
                    placeholder="what do you need"
                  />
                  <button
                    onClick={() => {
                      if (searchQuery.trim()) {
                        setEventLoading(true);
                        setTimeout(() => {
                          setEventLoading(false);
                          navigate(`/category/searching/query=${searchQuery}`);
                        }, 500);
                      } else {
                        toast.error("Please enter something to search !");
                      }
                    }}
                    className="absolute right-0 h-full px-8 font-semibold text-white uppercase bg-violet-400"
                  >
                    Search
                  </button>
                </div>
              </div>
              <div className="block w-4/12 pl-2 md-lg:hidden md-lg:w-full md-lg:pl-0">
                <div className="flex items-center justify-end w-full gap-3 md-lg:justify-start">
                  <div className="w-[48px] h-[48px] rounded-full flex bg-[#f5f5f5] justify-center items-center">
                    <span>
                      <IoIosCall />
                    </span>
                  </div>
                  <div className="flex flex-col justify-end gap-1">
                    <h2 className="font-medium text-md text-slate-700">
                      +91 8603416388
                    </h2>
                    <span className="text-[1.4rem]">support 24/7 time</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Headers;
