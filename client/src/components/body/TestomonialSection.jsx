import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import './styles.css';

// import required modules
import { Navigation } from 'swiper/modules';
import { useEffect, useState } from 'react';
import TestCard from '../card/TestCard';

function TestimonialSection() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='py-[40px]'>
      <div className="text-center">
        <h1 className="text-lg dm_sansFont font-normal sm:text-3xl 2xl:text-[39px] lg:leading-[3.207rem] tracking-[-.09866] text-[#282828] leading-[4.5rem]">Testimonials</h1>
        <p className="font-normal text-sm sm:text-base 2xl:text-[18px] text-[#000000] lg:p-0">Our customers speak for us</p>
      </div>

      <Swiper 
        slidesPerView={windowWidth <= 800 ? 1 : windowWidth <= 1400 ? 2 : 3} 
        spaceBetween={30} 
        modules={[Navigation]} 
        className="px-6"
        
      >
        <SwiperSlide><TestCard sender={"Sarah M."} title={"The quality of the business cards I ordered exceeded my expectations! The colors are vibrant, the paper feels premium, and the printing is flawless."
} type={"Entrepreneur"} /></SwiperSlide>
        <SwiperSlide><TestCard sender={"Emily R."} title={"Their design tool made it so simple to customize my cards. I’m thrilled with the results, and my clients have been complimenting them too!"} type={"Graphic Designer"} /></SwiperSlide>
        <SwiperSlide><TestCard title={"I chose their deluxe cards, and they stand out in a pile of plain ones. The raised text and glossy finish add a premium touch. Worth every penny!"} sender={" Linda K."} type={"Real Estate Agent"} /></SwiperSlide>
        <SwiperSlide><TestCard title={"Our wedding invitations were stunning! The printing quality, custom design options, and paper selection made them truly unique. Our guests loved them!"} sender={"Rachel and Mark"} type={"Newlyweds"} /></SwiperSlide>
        <SwiperSlide><TestCard title={"We ordered thank-you cards for our wedding, and they turned out beautifully. They added a personal touch, and we couldn’t be happier with the result."} sender={"Jessica L."} type={"Bride"} /></SwiperSlide>
       
      </Swiper>
    </div>
  );
}

export default TestimonialSection;