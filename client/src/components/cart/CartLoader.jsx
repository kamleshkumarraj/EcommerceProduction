
import { BsCartX } from 'react-icons/bs'

function CartLoader() {
  return (
    <div id="empty-cart-page" className='flex items-center justify-center w-full py-[60px] bg-white'>
        <div id="carts-details" className='flex flex-col items-center'>
            <div id="logo" className='text-center'>
                <BsCartX size={250} color="#E8E8E8" />
            </div>
            <div id="text-section" className='my-[40px] text-center'>
                <h1 className='text-[52px] '>Your cart is currently empty.</h1>
                <p className='text-[20px] text-center text-[#201f1f57]'>Before proceed to checkout you must add some products to your shopping cart. <br />
                You will find a lot of interesting products on our "Shop" page.</p>
            </div>
            <div id="button-section" >
                <p className='px-[30px] py-[15px] bg-[#4ABBB5] text-center text-white rounded-[5px] cursor-pointer hover:bg-[#40B0A6] font-[600]'>RETURN TO SHOP</p>
            </div>
        </div>
    </div>
  )
}

export default CartLoader
