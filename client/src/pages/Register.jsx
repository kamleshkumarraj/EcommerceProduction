import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import signup1 from "../assets/login/signup1.webp";
import googleLogo from "../assets/login/google.svg";
import twitterLogo from "../assets/login/twitter.svg";
import hideLogo from "../assets/login/hideLogo.svg";
import visible from "../assets/login/visible.svg";
import OR from "../assets/login/or.svg";

import { useNavigate } from "react-router-dom";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { apiCalling } from "../api/apiCalling.api";
import { setUser } from "../store/slices/selfHandler.slice";
import { toastUpdate } from "../helper/helper";
import { useSocket } from "../contexts/Socket";
import { NEW_USER_REGISTERED } from "../events";

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [file, setFile] = useState("");
  const dispatch = useDispatch();
  const socket = useSocket();
  const [formDataLocal, setFormDataLocal] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: "",
  });
  console.log(formDataLocal);

  const formData = new FormData();

  const handleSubmit = async (e) => {
    e.preventDefault();
    Object.entries(formDataLocal).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (!file) {
      toast.error("Please upload a profile picture");
      return;
    }
    console.log(formData);
    e.preventDefault();
    const options = {
      url: "http://localhost:2000/api/v2/auth/register",
      method: "POST",
      formData,
      contentType: "multipart/form-data",
    };
    const toastId = toast.loading("Creating account ...")
    const data = await dispatch(apiCalling(options));

    if (data.success) {
      toastUpdate({toastId , message : data.message || "Account created successfully" , type : "success"})
      socket.emit(NEW_USER_REGISTERED , data?.data)
      navigate("/login");
      dispatch(setUser(data.user));
    } else {
      toastUpdate({toastId , message : data.message || "Something went wrong" , type : "error"})
    }
  };

  const inputHandler = (e) => {
    setFormDataLocal((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <>
      <div className="flex items-center justify-center w-full mx-auto my-7">
        <div className="container flex flex-wrap items-center justify-center w-full h-full lg:space-x-14">
          <div className="md:w-[50%]  xl:w-[40%]  h-full hidden lg:flex justify-center items-center ">
            <img
              src={signup1}
              alt=""
              className="w-[1100px] h-full object-contain"
            />
          </div>
          <div className="w-[90%] lg:w-[40%] xl:w-[45%] h-[70%] xl:h-[100%] flex justify-center items-center my-8  p-5  ">
            <div className="flex flex-col w-full space-y-7">
              <div className="my-6 space-y-2">
                <h1 className="text-[3.6rem] font-extrabold">Sign Up</h1>
                <p className="text-gray-400">
                  Sign up for free to access to in any of our products
                </p>
              </div>
              <div className="flex flex-col space-y-3">
                <div className="py-4 text-center border border-black rounded-md cursor-pointer">
                  <button className="flex items-center justify-center w-full space-x-2 text-[2rem] text-blue-500">
                    <img src={googleLogo} alt="" className="size-5" />
                    <span className="">Continue with Google</span>
                  </button>
                </div>
                <div className="py-4 text-center border border-black rounded-md cursor-pointer">
                  <button className="flex items-center justify-center w-full space-x-2 text-[2rem] text-blue-500 cursor-pointer">
                    <img src={twitterLogo} alt="" className="size-5" />
                    <span className="cursor-pointer">
                      Continue with Twitter
                    </span>
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img src={OR} alt="" />
              </div>
              <div className="">
                <form
                  method="post"
                  encType="multipart/form-data"
                  action="http://localhost:2000/api/v1/auth/register"
                >
                  <div className="relative flex flex-col space-y-10 lg:space-y-8 xl:space-y-4">
                    <div id="upload-file">
                      <div
                        id="file-upload"
                        className="flex flex-col w-full gap-[10px]  py-[10px] "
                      >
                        <label
                          className="text-[18px] w-full  py-[10px] flex gap-[50px] justify-center items-center rounded-[5px] hover:cursor-pointer border-[.5px] border-[#0000005d]"
                          htmlFor="file1"
                          id="file"
                        >
                          <FaCloudUploadAlt size={"50px"} />
                          <p>Upload Your Profile Photo</p>
                        </label>
                        <input
                          className="hidden"
                          type="file"
                          name="avatar"
                          id="file1"
                          multiple
                          onInput={(e) => {
                            const img = e.target.files[0];
                            setFormDataLocal((prev) => ({
                              ...prev,
                              [e.target.name]: e.target.files[0],
                            }));
                            if (img) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                const base64Image = encodeURIComponent(
                                  reader.result
                                );
                                setFile(base64Image);

                                // Store URL-encoded image data
                              };
                              reader.readAsDataURL(img); // Convert to Data URL
                            }
                          }}
                        />
                      </div>
                      <img
                        className="px-[10px] h-[65px] absolute top-[2.8%] "
                        src={decodeURIComponent(file)}
                        alt=""
                      />
                    </div>
                    <div
                      id="name-field"
                      className="relative grid grid-cols-3 gap-[20px]"
                    >
                      <div id="name" className="flex flex-col gap-[5px]">
                        <input
                          type="text"
                          name="firstname"
                          placeholder="First Name*"
                          onChange={inputHandler}
                          value={formDataLocal.firstname}
                          className="w-full p-3 mt-2 bg-gray-100  rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 border-[.5px] border-gray-400 text-[16px]"
                        />
                      </div>
                      <div id="name" className="flex flex-col gap-[5px]">
                        <input
                          type="text"
                          name="middlename"
                          placeholder="Middle Name"
                          value={formDataLocal.middlename}
                          onChange={inputHandler}
                          className="w-full p-3 mt-2 bg-gray-100  rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 border-[.5px] border-gray-400 text-[16px]"
                        />
                      </div>
                      <div id="name" className="flex flex-col gap-[5px]">
                        <input
                          type="text"
                          name="lastname"
                          placeholder="Last Name*"
                          value={formDataLocal.lastname}
                          onChange={inputHandler}
                          className="w-full p-3 mt-2 bg-gray-100  rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 border-[.5px] border-gray-400 text-[16px]"
                        />
                      </div>
                    </div>
                    <div
                      id="user-email"
                      className="grid grid-cols-2 gap-[20px]"
                    >
                      <div id="username" className="flex flex-col gap-[5px]">
                        <input
                          type="text"
                          name="username"
                          placeholder="Enter your username*"
                          onInput={inputHandler}
                          value={formDataLocal.username}
                          className="w-full p-3 mt-2 bg-gray-100  rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 border-[.5px] border-gray-400 text-[16px]"
                        />
                      </div>
                      <div id="name" className="flex flex-col gap-[5px]">
                        <input
                          type="text"
                          name="email"
                          placeholder="Enter your email*"
                          onChange={inputHandler}
                          value={formDataLocal.email}
                          className="w-full p-3 mt-2 bg-gray-100  rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 border-[.5px] border-gray-400 text-[16px]"
                        />
                      </div>
                    </div>
                    <div id="password" className="grid grid-cols-2 gap-[20px]">
                      <div
                        id="password"
                        className="flex flex-col gap-[5px] relative"
                      >
                        <div className="absolute right-0 top-[50%] translate-y-[-30%] flex justify-end cursor-pointer">
                          {!showPassword && (
                            <img
                              src={visible}
                              alt="Show Password"
                              className="mr-2 cursor-pointer size-5"
                              onClick={() => setShowPassword(true)} // Step 2: Show password when clicked
                            />
                          )}
                          {showPassword && (
                            <img
                              src={hideLogo}
                              alt="Hide Password"
                              className="mr-2 cursor-pointer size-5"
                              onClick={() => setShowPassword(false)}
                            />
                          )}
                        </div>
                        <input
                          type="password"
                          name="password"
                          placeholder="Enter your password*"
                          value={formDataLocal.password}
                          onChange={inputHandler}
                          className="w-full p-3 mt-2 bg-gray-100  rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 border-[.5px] border-gray-400 text-[16px]"
                        />
                      </div>
                      <div
                        id="conf-password"
                        className="flex flex-col gap-[5px] relative "
                      >
                        <div className="absolute right-0 flex justify-end cursor-pointer top-[50%] translate-y-[-30%]">
                          {!showPassword && (
                            <img
                              src={visible}
                              alt="Show Password"
                              className="mr-2 cursor-pointer size-5"
                              onClick={() => setShowPassword(true)} // Step 2: Show password when clicked
                            />
                          )}
                          {showPassword && (
                            <img
                              src={hideLogo}
                              alt="Hide Password"
                              className="mr-2 cursor-pointer size-5"
                              onClick={() => setShowPassword(false)}
                            />
                          )}
                        </div>
                        <input
                          type="password"
                          name="confirmPassword"
                          value={formDataLocal.confirmPassword}
                          onChange={inputHandler}
                          placeholder="Enter your confirm password*"
                          className="w-full p-3 mt-2 bg-gray-100  rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 border-[.5px] border-gray-400 text-[16px]"
                        />
                      </div>
                    </div>

                    <div className=" flex flex-col space-y-2 !mt-12 ">
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
                    </div>

                    <div className="flex flex-col space-y-2 ">
                      <button
                        className="bg-[#524bad] w-28 text-white px-6 py-2 rounded-lg cursor-pointer"
                        onClick={handleSubmit}
                      >
                        Sign Up
                      </button>
                      <span>
                        Already have an account?{" "}
                        <Link to={"/login"} className="text-blue-400 underline">
                          Log in
                        </Link>
                      </span>
                    </div>
                  </div>
                  {/* {error && <p className="text-red-500">{error}</p>} */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
