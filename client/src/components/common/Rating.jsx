import React from 'react'
import { IoStar, IoStarOutline } from 'react-icons/io5'

function Rating({rating }) {
    console.log(rating)
  return (
    <div id="rating" className="flex gap-[10px] items-center">
              <span className="text-[16px] flex gap-[5px] text-red-600">
                {[[1,2,3,4,5] , [1,2,3,4,] , [1,2,3,] , [1,2] , [1] ,[]][5-Math.floor(rating)].map(() => (
                  <IoStar  key={Math.random()} size={20} color="" />
                ))}
                {[[1,2,3,4,5] , [1,2,3,4,] , [1,2,3,] , [1,2] , [1] , []][Math.floor(rating)].map(() => (
                  <IoStarOutline   key={Math.random()} size={20} color="#DC2626" />
                ))}
              </span>
              <h2 className="text-[15px] text-gray-500 font-[400]">
                {rating} Reviews
              </h2>
            </div>
  )
}

export default Rating
