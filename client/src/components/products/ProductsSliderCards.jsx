import { FaHeart } from 'react-icons/fa'
import cameraImg from '../../assets/Img/cameraImg.jpg'
import { Link } from 'react-router-dom'
function ProductsSliderCards({product}) {
  return (
    <div  className="w-[35rem] rounded-[10px] overflow-hidden bg-[#ffffff] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)]" >
      <div id="img-section" className='h-[300px] rounded-[20px] w-full relative'>
        <img className='text-center h-[200px] object-contain rounded-[10px] ' src={product.images[0]} alt="products-image" />
        <div id="icon-wishlist" className='absolute top-[10%] right-[1%] transform -translate-x-1/2 -translate-y-1/2'>
            <FaHeart size={'25px'} color='#ff5a5f' />
        </div>
        <div className='w-[100%] h-[100%] bg-[#0000002f] absolute top-0 left-0' id="layer"></div>
        <div className='absolute top-[85%] px-[10px] text-[1rem] font-[600]' id="title">{product.title}</div>
      </div>
      <div id="text-section" className='py-[15px]' >
        <div id="heading" className='flex justify-between px-[10px]' >
            <p className='text-[24px] font-[600] text-emerald-600' id="price">${product.price}</p>
            <div id="rating">⭐⭐⭐⭐</div>

        </div>
        <div id="description">
            <p className='text-[16px] font-[400] text-left px-[10px]' >{product.description.slice(0, 75) + '...'}</p>
        </div>
        <div id="btn-section" className='flex justify-between px-[10px] pt-[10px]'>
            <button className='bg-[#0000002f] text-[16px] font-[500] text-white py-[5px] px-[10px] rounded-[5px] hover:bg-[#00000040]'>Add to Cart</button>
            <Link state={{product}} to={`/product-details/${product._id}`}  className='bg-[#0000002f] inline-block text-[16px] font-[500] text-white py-[5px] px-[10px] rounded-[5px] hover:bg-[#00000040]'>View Details</Link>
        </div>
      </div>
    </div>
  )
}

export default ProductsSliderCards
