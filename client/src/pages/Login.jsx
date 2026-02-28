// import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { apiCalling } from "../api/apiCalling.api";
import googleLogo from "../assets/login/google.svg";
import hideLogo from "../assets/login/hideLogo.svg";
import Or from "../assets/login/or.svg";
import signIn1 from "../assets/login/signin.jpeg";
import twitterLogo from "../assets/login/twitter.svg";
import visible from "../assets/login/visible.svg";
import { useSocket } from "../contexts/Socket";
import { LOGIN_EVENT } from "../events";
import { setUser } from "../store/slices/selfHandler.slice";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const apiStatus = false;
  const socket = useSocket();

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
    };
    console.log(data);
    const options = {
      url: "http://internal-backend-internal-alb-1173943540.ap-south-1.elb.amazonaws.com/api/v2/auth/login",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      formData: data,
    };
    const response = await dispatch(apiCalling(options));
    if (response?.success) {
      console.log(response);
      dispatch(setUser(response.user));
      toast.success(response.message);
      socket.emit(LOGIN_EVENT, response?.user);
      navigate("/");
    } else {
      toast.error(response?.message);
      console.log(response.message);
    }
  };

  return (
    <>
      {/* <button className="w-16 px-2 py-3 my-3 text-white bg-red-600 rounded-lg mx-7">
        <Link to="/login">Login</Link>
      </button> */}

      <div className="flex items-center justify-center w-full mx-auto my-7">
        <div className="container flex flex-wrap items-center justify-center w-full h-full md:space-x-14">
          <div className="md:w-[50%]  xl:w-[40%]  h-full hidden lg:flex justify-center items-center ">
            <img
              src={signIn1}
              alt=""
              className="w-[1100px] h-full object-contain"
            />
          </div>
          <div className="w-[90%] lg:w-[40%] xl:w-[45%] h-[70%] xl:h-[100%] flex justify-center items-center my-8 p-5">
            <div className="flex flex-col w-full space-y-12">
              <div className="my-6 space-y-2">
                <h1 className="text-[3.6rem] font-extrabold">Sign In</h1>
                {/* <p className="text-gray-400">
                  Sign up for free to access to in any of our products
                </p> */}
              </div>
              <div className="flex flex-col space-y-3">
                <div className="py-4 text-center border border-black rounded-md cursor-pointer">
                  <button className="flex items-center justify-center w-full space-x-2 text-[2rem] text-blue-500">
                    <img src={googleLogo} alt="" className="size-6" />
                    <span className="">Continue with Google</span>
                  </button>
                </div>
                <div className="py-4 text-center border border-black rounded-md cursor-pointer">
                  <button className="flex items-center justify-center w-full space-x-2 text-[2rem] text-blue-500 cursor-pointer">
                    <img src={twitterLogo} alt="" className="size-6" />
                    <span className="cursor-pointer">
                      Continue with Twitter
                    </span>
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img src={Or} alt="" />
              </div>
              <div className="">
                <form action="" method="POST">
                  <div className="flex flex-col space-y-10 lg:space-y-8 xl:space-y-10 ">
                    <div className="relative flex flex-col space-y-2">
                      <label className="text-[20px]" htmlFor="email">
                        Email Or Username*
                      </label>
                      <input
                        id="email"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="designer@gmail.com"
                        className="px-3 py-2 border border-black rounded-md text-[16px]"
                      />
                      <span className="absolute -bottom-6 ml-1 text-red-500 text-[13px]">
                        Error Message
                      </span>
                    </div>
                    <div className="relative flex flex-col space-y-2 ">
                      <div className="flex items-center justify-between ">
                        <label className="text-[20px]" htmlFor="password">
                          Password<sup className="text-[18px]">*</sup>
                        </label>
                        <div className="flex">
                          {!showPassword && (
                            <img
                              src={visible}
                              alt="Show Password"
                              className="mr-2 cursor-pointer size-6"
                              onClick={() => setShowPassword(true)} // Step 2: Show password when clicked
                            />
                          )}
                          {showPassword && (
                            <img
                              src={hideLogo}
                              alt="Hide Password"
                              className="mr-2 cursor-pointer size-6"
                              onClick={() => setShowPassword(false)}
                            />
                          )}
                        </div>
                      </div>
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="******"
                        className="px-3 py-2 border border-black rounded-md text-[16px]"
                      />
                      <span className="ml-1 text-red-500 text-[13px] absolute -bottom-6 lg:-bottom-10 xl:-bottom-6">
                        Use 8 or more characters with a mix of letters, numbers
                        & symbols
                      </span>
                      <span className="absolute right-0 text-[1.4rem] underline -bottom-7">
                        <Link to={"/reset"}>Forger Your Password?</Link>
                      </span>
                    </div>

                    {/*    <div className=" flex flex-col space-y-2 !mt-12 ">
                      <div className="space-x-2">
                        <input type="checkbox" id="tc1" />
                        <label htmlFor="tc1">
                          Agree to our Terms of use and Privacy Policy
                        </label>
                      </div>
                      <div className="space-x-2">
                        <input type="checkbox" id="tc2" />
                        <label htmlFor="tc2">
                          Subscribe to our monthly newsletter
                        </label>
                      </div>
                    </div> */}

                    <div className="flex flex-col space-y-2 ">
                      {apiStatus ? (
                        <button
                          disabled
                          className="bg-[#524bad] w-28 text-white px-6 py-2 rounded-lg  cursor-not-allowed"
                        >
                          Login...
                        </button>
                      ) : (
                        <button
                          onClick={handleLogin}
                          className="bg-[#524bad] w-28 text-white px-6 py-2 rounded-lg cursor-pointer"
                        >
                          Login
                        </button>
                      )}
                      <span>
                        Don’t have an account?{"  "}
                        <Link
                          to={"/signup"}
                          className="text-blue-400 underline"
                        >
                          Sign Up
                        </Link>
                      </span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
