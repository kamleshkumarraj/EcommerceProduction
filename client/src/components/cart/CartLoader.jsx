
import { BsCartX } from 'react-icons/bs'

function CartLoader({icon , heading , para , button}) {
  return (
    <div id="empty-cart-page" className='flex items-center justify-center w-full py-[60px] bg-white'>
        <div id="carts-details" className='flex flex-col items-center'>
            <div id="logo" className='text-center'>
                {icon}
            </div>
            <div id="text-section" className='my-[40px] text-center'>
                <h1 className='text-[52px] '>{heading}</h1>
                <p className='text-[20px] text-center text-[#201f1f57]'>{para.split('\n').map((item, index) => <p key={index}>{item}</p>)}</p>
            </div>
            <div id="button-section" >
                <p className='px-[30px] py-[15px] bg-[#4ABBB5] text-center text-white rounded-[5px] cursor-pointer hover:bg-[#40B0A6] font-[600]'>{button}</p>
            </div>
        </div>
    </div>
  )
}

export default CartLoader
