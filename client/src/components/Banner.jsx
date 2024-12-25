
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import {  useDispatch } from 'react-redux'
import bannerImg1 from '../assets/Banner/banner-img-1.jpg'
import bannerImg2 from '../assets/Banner/banner-img-2.webp'
import bannerImg3 from '../assets/Banner/banner-img-3.png'
import bannerImg4 from '../assets/Banner/banner-img-4.jpg'
import bannerImg5 from '../assets/Banner/banner-img-5.jpg'
import bannerImg6 from '../assets/Banner/banner-img-6.jpg'
import bannerImg7 from '../assets/Banner/banner-img-7.jpg'
import bannerImg8 from '../assets/Banner/banner-img-8.jpg'


const Banner = () => {

    const dispatch = useDispatch()
    // const { banners } = useSelector(state => state.home)
    const banners = [
        {banner : bannerImg1 , link :'http://localhost:5173'},
        {banner : bannerImg2 , link :'http://localhost:5173'},
        {banner : bannerImg3 , link :'http://localhost:5173'},
        {banner : bannerImg4 , link :'http://localhost:5173'},
        {banner : bannerImg5 , link :'http://localhost:5173'},
        {banner : bannerImg6 , link :'http://localhost:5173'},
        {banner : bannerImg7 , link :'http://localhost:5173'},
        {banner : bannerImg8 , link :'http://localhost:5173'},
    
    ]
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
    return (
        <div className='w-full md-lg:mt-6'>
            <div className='w-[98%]  mx-auto'>
                <div className='flex flex-wrap w-full md-lg:gap-8'>
                    <div className='w-full'>
                        <div className='my-8'>
                            <Carousel
                                autoPlay={true}
                                infinite={true}
                                arrows={true}
                                responsive={responsive}
                            >
                                {
                                    banners && banners.length > 0 && banners.map((b, i) => <Link className='lg-md:h-[440px] h-auto w-full block' key={i} to={``}>
                                        <img className='h-[50vh] w-[100%]' src={b.banner} alt="" />
                                    </Link>)
                                }
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner