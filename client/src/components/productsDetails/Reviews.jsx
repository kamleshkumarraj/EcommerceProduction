import React, { useEffect, useState } from "react";
import { fetchReviews } from "../../utils/review";
import { useDispatch } from "react-redux";
import Rating from "../common/Rating";

const ReviewSection = ({products , changed}) => {
 
  const [reviewsData , setReviewsData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() =>{
    fetchReviews({dispatch , productId : products?._id})
    .then(({data , success}) => {
      if(success) setReviewsData(data)
      else console.log("We get error during fetching reviews from database !");
    })
    
  },[changed])
  return (
    <>
    {reviewsData && <div className="p-[3.2rem] px-[80px]">
      <h2 className="mb-4 text-[2.4rem] font-bold">{reviewsData.length} Reviews</h2>
      {reviewsData.map((review, index) => (
        <div key={index} className="flex items-start mb-8">
          <img
            src={review?.avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYiQVI64BOhcmcvgwR3TrgsgxkEyWmQCdz9g&s"}
            alt={"reviewer-photo"}
            className="self-center w-20 h-20 mr-4 rounded-full"
          />
          <div className="flex-1">
            <h3 className="font-bold text-[18px]">{review?.name ||"Masirul Islam"}</h3>
            <p className="text-[14px] text-gray-500">{review.date}</p>
            <p className="mt-2 text-[16px] text-gray-600 font-[500]">
              {review.comment}
            </p>
            <button className="px-4 rounded-[20px] py-1 mt-2 text-white bg-red-500 ">
              Reply
            </button>
          </div>
          <div className="ml-4">
           {review.rating && <Rating rating={review.rating-1 } />}
          </div>
        </div>
      ))}
      <button className="fixed flex items-center justify-center w-12 h-12 text-[2.4rem] text-white bg-red-500 rounded-full bottom-4 right-4">
        ↑
      </button>
    </div>}
    </>
  );
};

export default ReviewSection;
