import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Heders from '../components/Headers'
import Banner from '../components/Banner'
import Categorys from '../components/Categorys'
import FeatureProducts from '../components/products/FeatureProducts'
import Products from '../components/products/Products'
import { apiCalling } from '../api/apiCalling.api'
const Home = () => {
    const dispatch = useDispatch()
    const [products , setProducts] = useState([])
    const [latest_product , setLatestProducts] = useState([])
    const [topRated_product , setTopRatedProduct] = useState([])
    const [discount_product , setDiscountProducts] = useState([])

    
    useEffect(() => {
        const options = {
            methood : "GET",
            url : "http://localhost:2000/api/v2/admin/products"
        }
        ;(async function getFeaturedProducts(){
            const response = await dispatch(apiCalling(options))
            if(response?.success) {
                setProducts(response?.data?.splice(0,16))
                setTopRatedProduct(response?.data?.splice(16,40))
                setLatestProducts(response?.data?.splice(40,70))
                setDiscountProducts(response?.data?.splice(70,100))
            }
            else console.log("Error during geting all products")
        })()
    },[])

    
    
    return (
        <div className='w-full'>
            <Banner />
            <div className='my-4'>
                <Categorys />
            </div>
            <div className='py-[45px]'>
                <FeatureProducts products={products} />
            </div>
            <div className='py-10'>
                <div className='w-[85%] flex flex-wrap mx-auto'>
                    <div className="grid w-full grid-cols-3 md-lg:grid-cols-2 md:grid-cols-1 gap-7">
                        <div className='overflow-hidden'>
                            {<Products title='Latest Product' products={latest_product} />}
                        </div>
                        <div className='overflow-hidden'>
                            <Products title='Top Rated Product' products={topRated_product} />
                        </div>
                        <div className='overflow-hidden'>
                            <Products title='Discount Product' products={discount_product} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home