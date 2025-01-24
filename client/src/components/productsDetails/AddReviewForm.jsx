// import React from "react";

import { useCallback, useState } from "react";
import { FaPenAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { apiCalling } from "../../api/apiCalling.api";
import Rating from "../common/Rating";
import { useHandleSocket } from "../../hooks/useHandleSocket";
import { CREATE_REVIEW_RATING } from "../../events";
import { useSocket } from "../../contexts/Socket";
const AddReviewForm = ({products , setChanged , changed}) => {
  const [ratingCount , setRatingCount] = useState(0);
  const [reviewData , setReviewsData] = useState({
    comment : '',
    rating : 4
  })
  const socket = useSocket();
  const dispatch = useDispatch();
  const postReviews = async () => {
    const options = {
      method : "PUT",
      formData : reviewData,
      url : `http://localhost:2000/api/v2/user/product/give-reviews?id=${products._id}`,
    }
    const response = await dispatch(apiCalling(options));
    console.log(response)
    if(response?.success){
      setChanged(!changed)
      socket.emit(CREATE_REVIEW_RATING , 'review create successfully !')
      toast.success("We give rating and reviews successfully.")
    }else{
      toast.error("We get error during rating and reviews!")
    }
  }
  
  
  return (
    <div className="bg-gray-50 ">
      <div className="w-[100%] px-[100px] p-[2.4rem] mx-auto bg-white rounded shadow-md">
        <h1 className="mb-[1.6rem] text-[2.4rem] font-[500] text-black">Add A Review</h1>
        <p className="mb-[1.6rem] text-[1.6rem] text-gray-600">
          Your email address will not be published. Required fields are marked{" "}
          <span className="text-red-500">*</span>
        </p>
        <div className="mb-[1.6rem]">
          <label className="text-[1.6rem] font-medium text-black">
            Rate this product? <span className="text-red-500">*</span>
          </label>
          <div className="flex mt-[.8rem] space-x-2">
            <Rating rating={ratingCount} setRatingCount={setRatingCount} />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-[1.6rem] mb-[1.6rem] sm:grid-cols-2">
         
          
        </div>
        <div className="relative mb-[1.6rem]">
          <textarea
            placeholder="Write a Message"
            value={reviewData.comment}
            onChange={(e) => setReviewsData({...reviewData , comment : e.target.value})}
            className="w-full p-[1.2rem] border border-gray-300 rounded resize-none focus:ring focus:ring-blue-300 focus:outline-none h-[11.2rem]"
          ></textarea>
          <span className="absolute text-gray-400 right-[1.2rem] top-[1.2rem]">
            <FaPenAlt size={20} />
          </span>
        </div>
        
        <button className="px-[2.4rem] py-[1.2rem] text-white bg-red-500 rounded hover:bg-red-600 focus:ring focus:ring-red-300" onClick={postReviews} >
        
          Post A Comment →
        </button>
      </div>
    </div>
  );
};

export default AddReviewForm;
