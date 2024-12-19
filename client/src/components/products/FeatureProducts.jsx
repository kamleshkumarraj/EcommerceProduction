import React, { useEffect } from 'react'
import { AiFillHeart, AiOutlineShoppingCart } from 'react-icons/ai'
import { FaCartArrowDown, FaEye } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import Ratings from '../Ratings'
import { addToCart } from '../../utils/addCartFunction'
import { getSelf } from '../../store/slices/selfHandler.slice'
import { addWishlistItem, removeWishlistItem } from '../../utils/wishlist'
import { getAllCartItems } from '../../store/slices/cart.slice'
import { getAllWishlistItems } from '../../store/slices/wishlist.slice'
import { checkAvailibility } from '../../utils/checkAvailibility'
import { BsHeart } from 'react-icons/bs'
import { getWishlistIdUsingProductId } from '../../helper/helper'

const FeatureProducts = ({ products }) => {
    console.log("Hello")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(getSelf)
    const cartList = useSelector(getAllCartItems)
    const wishlist = useSelector(getAllWishlistItems)
    return (
        <div className='w-[98%] px-[20px] flex flex-wrap mx-auto'>
            <div className='w-full'>
                <div className='text-center flex justify-center items-center flex-col text-4xl text-slate-600 font-bold relative pb-[45px]'>
                    <h2>Feature Products</h2>
                    <div className='w-[100px] h-[4px] bg-[#7fad39] mt-4'></div>
                </div>
            </div>
            <div className='grid w-full gap-6 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1'>
                {
                    products.length > 0 &&
                    products.map((p, i) => <div key={i} className='transition-all duration-500  border-[.5px] group hover:shadow-md hover:-mt-3 border-[#00000011] rounded-[10px]'>
                        <div className='relative overflow-hidden '>
                            {
                                p.discount ? <div className='flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2'>{p.discount}%</div> : ""
                            }
                            <img className='sm:w-full w-full h-[240px]' src={p.images[0]} alt="product image" />
                            <ul className='absolute flex items-center justify-center w-full gap-2 transition-all duration-700 -bottom-10 group-hover:bottom-3'>
                                <li   className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[720deg] transition-all'>{
                                    
                                    checkAvailibility(wishlist , p) ? 
                                    <p onClick={() => 
                                        {removeWishlistItem(dispatch , {_id : getWishlistIdUsingProductId(p._id , wishlist)})}} >
                                        <AiFillHeart color='red' />
                                    </p> : <p onClick={() => {addWishlistItem(dispatch , p)}} ><BsHeart /></p>
                                }</li>
                                <Link to={`/product/details/${p.slug}`} className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[720deg] transition-all' ><FaEye /></Link>
                                <li onClick={() => {addToCart(p._id , dispatch , user)}}  className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[720deg] transition-all'><AiOutlineShoppingCart /></li>
                            </ul>
                        </div>
                        <div className='px-2 py-3 text-slate-600'>
                            <h2>{p.name}</h2>
                            <div className='flex items-center justify-start gap-3'>
                                <span className='text-lg font-bold'>${p.price}</span>
                                <div className='flex'>
                                    <Ratings ratings={p.rating} />
                                </div>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    )
}

export default FeatureProducts