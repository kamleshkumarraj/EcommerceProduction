import PropTypes from 'prop-types'
import { BsCart4 } from 'react-icons/bs'
import { GiStopwatch } from "react-icons/gi";
import { useCountDown } from '../../hooks/useCountDown';

function OfferedProductCard({item}) {
  const {days , hours , minutes , seconds} = useCountDown("December 31, 2024 23:59:59");
  return (
    <div id='offered-product-card' className='flex flex-col gap-[10px] w-[470px] px-[30px] py-[20px] bg-white rounded-[10px]'>
      <div id="product" className='flex '>
        <div id="details" className='flex relative flex-col gap-[5px] col-span-2'>
            <h1 className='text-[20px] font-[600] w-[80px] text-center py-[8px] bg-[black] text-white rounded-[10px]' > -30%</h1>
            <p className='text-[15px] font-[500] text-[#FF4035]'>Basic gift ideas</p>
            <p className='text-[13px] font-[400] text-[black]'>New Arrival</p>
            <h1 className='text-[20px] absolute top-[100px] font-[500] whitespace-nowrap' >{item?.title}</h1>
        </div>
        <div id="image" className='relative ml-auto' >
            <img className='w-[140px] border rounded-[10px]' src={item?.images[0]} alt="product-images" />
        </div>
      </div>
      <div id="button" className='flex justify-between mt-[10px] gap-[20px]'>
        <button id='add-to-cart' className='px-[20px] text-[16px] py-[10px] bg-[#FF4039] text-center text-white rounded-[25px] cursor-pointer hover:bg-[#FF4035] font-[600] flex gap-[15px] items-center'>
            <BsCart4 size={25} color="#fff" />
            <span>Add to Cart </span>
        
        </button>
        <div id="stop-watch" className='flex gap-[5px] items-center px-[20px] rounded-[30px] py-[12px] border-[1px] border-gray-200 shadow-lg'>
            <GiStopwatch size={20} color='black' />
            <p className='text-black font-[500] text-[18px]'>{days>9?days:"0"+days} : {hours>9?hours:"0"+hours} : {minutes>9?minutes:"0"+minutes} : <span className='text-[#FF4035]' >{seconds>9?seconds:"0"+seconds}</span> </p>
        </div>
      </div>
    </div>
  )
}

OfferedProductCard.propTypes = {
  item: PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired, 
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
  }).isRequired,
};

export default OfferedProductCard