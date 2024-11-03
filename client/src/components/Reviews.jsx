import React, { useState, useEffect } from 'react'
import Ratings from './Ratings'
import RatingTemp from './RatingTemp'
import Pagination from './Pagination'
import { AiFillStar } from 'react-icons/ai'
import RatingReact from 'react-rating'
import { CiStar } from 'react-icons/ci'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import toast from 'react-hot-toast'

const Reviews = ({ product }) => {

  const dispatch = useDispatch()
  
  const [pageNumber, setPageNumber] = useState(1)
  const [perPage, setPerPage] = useState(10)

  const [rat, setRat] = useState('')
  const [re, setRe] = useState('')

  const totalReview = product.reviews.length;



 

  return (
    <div className='mt-8'>
      <div className='flex gap-10 md:flex-col'>
        <div className='flex flex-col items-start justify-start gap-2 py-4'>
          <div>
            <span className='text-6xl font-semibold'>{product.rating}</span>
            <span className='text-3xl font-semibold text-slate-600'>/5</span>
          </div>
          <div className='flex text-4xl'>
            <Ratings ratings={product.rating} />
          </div>
          <p className='text-sm text-slate-600'>{totalReview} Reviews</p>
        </div>
       {/* <div className='flex flex-col gap-2 py-4'>
          <div className='flex items-center justify-start gap-5'>
            <div className='text-md flex gap-1 w-[93px]'>
              <RatingTemp rating={5} />
            </div>
            <div className='w-[200px] h-[14px] bg-slate-200 relative'>
              <div style={{ width: `${Math.floor((100 * (rating_review[0]?.sum || 0)) / totalReview)}%` }} className='h-full bg-[#EDBB0E]'></div>
            </div>
            <p className='text-sm text-slate-600 w-[0%]'>{rating_review[0]?.sum}</p>
          </div>
          <div className='flex items-center justify-start gap-5'>
            <div className='text-md flex gap-1 w-[93px]'>
              <RatingTemp rating={4} />
            </div>
            <div className='w-[200px] h-[14px] bg-slate-200 relative'>
              <div style={{ width: `${Math.floor((100 * (rating_review[1]?.sum || 0)) / totalReview)}%` }} className='h-full bg-[#EDBB0E]'></div>
            </div>
            <p className='text-sm text-slate-600 w-[0%]'>{rating_review[1]?.sum}</p>
          </div>
          <div className='flex items-center justify-start gap-5'>
            <div className='text-md flex gap-1 w-[93px]'>
              <RatingTemp rating={3} />
            </div>
            <div className='w-[200px] h-[14px] bg-slate-200 relative'>
              <div style={{ width: `${Math.floor((100 * (rating_review[2]?.sum || 0)) / totalReview)}%` }} className='h-full bg-[#EDBB0E]'></div>
            </div>
            <p className='text-sm text-slate-600 w-[0%]'>{rating_review[2]?.sum}</p>
          </div>
          <div className='flex items-center justify-start gap-5'>
            <div className='text-md flex gap-1 w-[93px]'>
              <RatingTemp rating={2} />
            </div>
            <div className='w-[200px] h-[14px] bg-slate-200 relative'>
              <div style={{ width: `${Math.floor((100 * (rating_review[3]?.sum || 0)) / totalReview)}%` }} className='h-full bg-[#EDBB0E]'></div>
            </div>
            <p className='text-sm text-slate-600 w-[0%]'>{rating_review[3]?.sum}</p>
          </div>
          <div className='flex items-center justify-start gap-5'>
            <div className='text-md flex gap-1 w-[93px]'>
              <RatingTemp rating={1} />
            </div>
            <div className='w-[200px] h-[14px] bg-slate-200 relative'>
              <div style={{ width: `${Math.floor((100 * (rating_review[4]?.sum || 0)) / totalReview)}%` }} className='h-full bg-[#EDBB0E]'></div>
            </div>
            <p className='text-sm text-slate-600 w-[0%]'>{rating_review[4]?.sum}</p>
          </div>
          <div className='flex items-center justify-start gap-5'>
            <div className='text-md flex gap-1 w-[93px]'>
              <RatingTemp rating={0} />
            </div>
            <div className='w-[200px] h-[14px] bg-slate-200 relative'>
              <div className='h-full bg-[#EDBB0E] w-[0%]'></div>
            </div>
            <p className='text-sm text-slate-600 w-[0%]'>0</p>
          </div>
        </div> */}
      </div>
      <h2 className='py-5 text-xl font-bold text-slate-600'>Product Reviews {totalReview}</h2>
      <div className='flex flex-col gap-8 pt-4 pb-10'>
        {
          product.reviews.map((r, i) => <div key={i} className='flex flex-col gap-1'>
            <div className='flex items-center justify-between'>
              <div className='flex gap-1 text-xl'>
                <RatingTemp rating={r.rating} />
              </div>
              {/*<span className='text-slate-600'>{r.date}</span> */}
            </div>
            {/*<span className='text-slate-600 text-md'>{r.name}</span> */}
            <p className='text-sm text-slate-600'>{r.comment}</p>
          </div>)
        }
        <div className='flex justify-end'>
          {
            totalReview > 5 && <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} totalItem={totalReview} perPage={perPage} showItem={Math.round(totalReview / 5)} />
          }
        </div>
      </div>
      <div>
        {
           <div className='flex flex-col gap-3'>
            <div className='flex gap-1'>
              <RatingReact
                onChange={(e) => setRat(e)}
                initialRating={rat}
                emptySymbol={<span className='text-4xl text-slate-600'><CiStar /></span>}
                fullSymbol={<span className='text-[#EDBB0E] text-4xl'><AiFillStar /></span>}
              />
            </div>
            <form >
              <textarea value={re} required onChange={(e) => setRe(e.target.value)} className='w-full p-3 border outline-0' name="" id="" cols="30" rows="5"></textarea>
              <div className='mt-2'>
                <button className='px-5 py-1 text-white bg-indigo-500 rounded-sm'>Submit</button>
              </div>
            </form>
          </div> 
        }
      </div>
    </div>
  )
}

export default Reviews