import React from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import cameraImg from '../../assets/Img/cameraImg.jpg'

const Products = ({ title }) => {
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
    const products = [[{images : [cameraImg] , name : 'This products is also amazing products' , price : 2000 , description : 'This is realative products description and it is amazing products so you can buy it with high quality and it is also available in different colors and sizes'}] , [{images : [cameraImg] , name : 'This products is also amazing products' , price : 2000 , description : 'This is realative products description and it is amazing products so you can buy it with high quality and it is also available in different colors and sizes'}] , [{images : [cameraImg] , name : 'This products is also amazing products' , price : 2000 , description : 'This is realative products description and it is amazing products so you can buy it with high quality and it is also available in different colors and sizes'}] , [{images : [cameraImg] , name : 'This products is also amazing products' , price : 2000 , description : 'This is realative products description and it is amazing products so you can buy it with high quality and it is also available in different colors and sizes'}] , [{images : [cameraImg] , name : 'This products is also amazing products' , price : 2000 , description : 'This is realative products description and it is amazing products so you can buy it with high quality and it is also available in different colors and sizes'}]]
    return (
        <div className='flex flex-col-reverse gap-8'>
            <ProductsSlider />
        </div>
    )
}

export default Products