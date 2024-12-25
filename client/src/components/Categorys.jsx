import React, { useEffect, useState } from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { apiCalling } from '../api/apiCalling.api'

const Categorys = () => {
    const [categories , setCategories] = useState([])
    const  dispatch = useDispatch()
    useEffect(() => {
        const options = {
            method : "GET",
            url : "http://localhost:2000/api/v2/products/get-categories"
        }
        ;(async function getCategories(){
            const response = await dispatch(apiCalling(options))
            if(response?.success){
                setCategories(response?.data)
            }else console.log("Get error during fetching the category !")
        })()
    },[])
    
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 6
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 6
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 4
        },
        mdtablet: {
            breakpoint: { max: 991, min: 464 },
            items: 4
        },
        mobile: {
            breakpoint: { max: 768, min: 0 },
            items: 3
        },
        smmobile: {
            breakpoint: { max: 640, min: 0 },
            items: 2
        },
        xsmobile: {
            breakpoint: { max: 440, min: 0 },
            items: 1
        }
    }
    return (
        <div className='w-[97%] mx-auto relative'>

            <Carousel
                autoPlay={true}
                infinite={true}
                arrows={true}
                responsive={responsive}
                transitionDuration={500}
                
            >
                {
                 categories.length > 0 &&    categories.map(({name , image} , i) => <Link state={{category : name}}  className='h-[185px] border block' key={i} to={`/category&searching/category=${name}`}>
                        <div className='relative w-full h-full p-3 border-[.5px] rounded-[10px] border-[#00000015]'>
                            <img src={image} alt="image" />
                            <div className='absolute left-0 flex items-center justify-center w-full mx-auto font-bold bottom-6'>
                                <span className='py-[2px] px-6 bg-[#3330305d] text-white'>{name}</span>
                            </div>
                        </div>
                    </Link>)
                }
            </Carousel>

        </div>
    )
}

export default Categorys