import React from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import cameraImg from '../../assets/Img/cameraImg.jpg'
import ProductsSlider from './ProductsSlider'


const Products = ({ title , products }) => {
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 1
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    }
    const ButtonGroup = ({ next, previous }) => {
        return (
            <div className='flex items-center justify-between'>
                <div className='text-lg font-bold text-slate-600'>{title}</div>
                <div className='flex items-center justify-center gap-3 text-slate-600'>
                    <button onClick={() => previous()} className='w-[30px] h-[30px] flex justify-center items-center bg-slate-300 border border-slate-200'>
                        <span><FiChevronLeft /></span>
                    </button>
                    <button onClick={() => next()} className='w-[30px] h-[30px] flex justify-center items-center bg-slate-300 border border-slate-200'>
                        <span><FiChevronLeft /></span>
                    </button>
                </div>
            </div>
        )
    }
    
    return (
        <div className='flex flex-col-reverse gap-8'>
            
            <ProductsSlider products={products} />
            <h1 className='text-3xl font-bold my-[10px] px-[5px]' >{title}</h1>
        </div>
    )
}

export default Products