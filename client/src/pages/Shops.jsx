import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Range } from 'react-range'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import Headers from '../components/Headers'
import Footer from '../components/Footer'
import Products from '../components/products/Products'
import { AiFillStar } from 'react-icons/ai'
import { CiStar } from 'react-icons/ci'
import { BsFillGridFill } from 'react-icons/bs'
import { FaThList } from 'react-icons/fa'
import ShopProducts from '../components/products/ShopProducts'
import Pagination from '../components/Pagination'

import { useDispatch, useSelector } from 'react-redux'

const Shops = () => {


   

    const dispatch = useDispatch()
    const [pageNumber, setPageNumber] = useState(1)
    const [styles, setStyles] = useState('grid')
    const [filter, setFilter] = useState(true)
    const [category, setCategory] = useState('')
    const [rating, setRatingQ] = useState('')
    const [sortPrice, setSortPrice] = useState('')

   
    

    const queryCategoey = (e, value) => {
        if (e.target.checked) {
            setCategory(value)
        } else {
            setCategory('')
        }
    }
    console.log(category)
    

    
    return (
        <div>
            <Headers />
            <section className='bg-[url("http://localhost:3000/images/banner/shop.gif")] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left'>
                <div className='absolute left-0 top-0 w-full h-full bg-[#2422228a]'>
                    <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
                        <div className='flex flex-col items-center justify-center w-full h-full gap-1 text-white'>
                            <h2 className='text-xl font-bold'>Shop.my</h2>
                            <div className='flex items-center justify-center w-full gap-2 text-2xl'>
                                <Link to='/'>Home</Link>
                                <span className='pt-1'><MdOutlineKeyboardArrowRight /></span>
                                <span>Products</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='py-16'>
                <div className='w-[85%] md:w-[90%%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
                    <div className={`md:block hidden ${!filter ? 'mb-6' : 'mb-0'}`}>
                        <button onClick={() => setFilter(!filter)} className='w-full px-3 py-2 text-center text-white bg-indigo-500'>Filter Product</button>
                    </div>
                    <div className='flex flex-wrap w-full'>
                        <div className={`w-3/12 md-lg:w-4/12 md:w-full pr-8 ${filter ? 'md:h-0 md:overflow-hidden md:mb-6' : 'md:h-auto md:overflow-auto md:mb-0'}`}>
                            <h2 className='mb-3 text-xl font-bold text-slate-600'>Category</h2>
                            <div className='py-2'>
                                {
                                    categorys.map((c, i) => <div className='flex items-center justify-start gap-2 py-1' key={i}>
                                        <input checked={category === c.name ? true : false} onChange={(e) => queryCategoey(e, c.name)} type="checkbox" id={c.name} />
                                        <label className='block cursor-pointer text-slate-600' htmlFor={c.name}>{c.name}</label>
                                    </div>)
                                }
                            </div>
                            <div className='flex flex-col gap-5 py-2'>
                                <h2 className='mb-3 text-xl font-bold text-slate-600'>Price</h2>
                                <Range
                                    step={1}
                                    min={priceRange.low}
                                    max={priceRange.high === priceRange.low ? priceRange.high + 1 : priceRange.hight}
                                    values={state.values}
                                    onChange={(values) => setState({ values })}
                                    renderTrack={({ props, children }) => (
                                        <div {...props} className='w-full h-[6px] bg-slate-200 rounded-full cursor-default'>
                                            {children}
                                        </div>
                                    )}
                                    renderThumb={({ props }) => (
                                        <div className='w-[15px] h-[15px] bg-blue-500 rounded-full' {...props} />

                                    )}
                                />
                                <div>
                                    <span className='text-lg font-bold text-red-500'>${Math.floor(state.values[0])} - ${Math.floor(state.values[1])}</span>
                                </div>
                            </div>
                            <div className='flex flex-col gap-4 py-3'>
                                <h2 className='mb-3 text-xl font-bold text-slate-600'>Rating</h2>
                                <div className='flex flex-col gap-3'>
                                    <div onClick={() => setRatingQ(5)} className='flex items-start justify-start gap-2 text-xl text-orange-500 cursor-pointer'>
                                        <span><AiFillStar /></span>
                                        <span><AiFillStar /></span>
                                        <span><AiFillStar /></span>
                                        <span><AiFillStar /></span>
                                        <span><AiFillStar /></span>
                                    </div>
                                    <div onClick={() => setRatingQ(4)} className='flex items-start justify-start gap-2 text-xl text-orange-500 cursor-pointer'>
                                        <span><AiFillStar /></span>
                                        <span><AiFillStar /></span>
                                        <span><AiFillStar /></span>
                                        <span><AiFillStar /></span>
                                        <span><CiStar /></span>
                                    </div>
                                    <div onClick={() => setRatingQ(3)} className='flex items-start justify-start gap-2 text-xl text-orange-500 cursor-pointer'>
                                        <span><AiFillStar /></span>
                                        <span><AiFillStar /></span>
                                        <span><AiFillStar /></span>
                                        <span><CiStar /></span>
                                        <span><CiStar /></span>
                                    </div>
                                    <div onClick={() => setRatingQ(2)} className='flex items-start justify-start gap-2 text-xl text-orange-500 cursor-pointer'>
                                        <span><AiFillStar /></span>
                                        <span><AiFillStar /></span>
                                        <span><CiStar /></span>
                                        <span><CiStar /></span>
                                        <span><CiStar /></span>
                                    </div>
                                    <div onClick={() => setRatingQ(1)} className='flex items-start justify-start gap-2 text-xl text-orange-500 cursor-pointer'>
                                        <span><AiFillStar /></span>
                                        <span><CiStar /></span>
                                        <span><CiStar /></span>
                                        <span><CiStar /></span>
                                        <span><CiStar /></span>
                                    </div>
                                    <div onClick={resetRating} className='flex items-start justify-start gap-2 text-xl text-orange-500 cursor-pointer'>
                                        <span><CiStar /></span>
                                        <span><CiStar /></span>
                                        <span><CiStar /></span>
                                        <span><CiStar /></span>
                                        <span><CiStar /></span>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-4 py-5 md:hidden'>
                                <Products title="Latest Products" products={latest_product} />
                            </div>
                        </div>
                        <div className='w-9/12 md-lg:w-8/12 md:w-full'>
                            <div className='pl-8 md:pl-0'>
                                <div className='flex items-start justify-between px-3 py-4 mb-10 bg-white border rounded-md'>
                                    <h2 className='text-lg font-medium text-slate-600'>{totalProduct} Products</h2>
                                    <div className='flex items-center justify-center gap-3'>
                                        <select onChange={(e) => setSortPrice(e.target.value)} className='p-1 font-semibold border outline-0 text-slate-600' name="" id="">
                                            <option value="">Sort By</option>
                                            <option value="low-to-high">Low to High Price</option>
                                            <option value="high-to-low">High to Low Price</option>
                                        </select>
                                        <div className='flex items-start justify-center gap-4 md-lg:hidden'>
                                            <div onClick={() => setStyles('grid')} className={`p-2 ${styles === 'grid' && 'bg-slate-300'} text-slate-600 hover:bg-slate-300 cursor-pointer rounded-sm`}>
                                                <BsFillGridFill />
                                            </div>
                                            <div onClick={() => setStyles('list')} className={`p-2 ${styles === 'list' && 'bg-slate-300'} text-slate-600 hover:bg-slate-300 cursor-pointer rounded-sm`}>
                                                <FaThList />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='pb-8'>
                                    <ShopProducts products={products} styles={styles} />
                                </div>
                                <div>
                                    {
                                        totalProduct > parPage && <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} totalItem={totalProduct} parPage={parPage} showItem={Math.floor(totalProduct / parPage)} />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default Shops