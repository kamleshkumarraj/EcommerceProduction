import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/src/ScrollTrigger";
import React from "react";
import { Link } from "react-router-dom";
import ImgSlider from "../imageSlider/ImgSlider";
import Button from "../reusuable/Button";
import styles from "./featured.module.css";

gsap.registerPlugin(ScrollTrigger)
const Featured = () => {
  //! that block of code for apply gsap animation in our code.
  useGSAP(() => {
    const timeline = gsap.timeline();
    timeline.from("#hero-title #hero-title,#hero-heading,#hero-para",{
      y : -100,
      duration : 1,
      stagger: .5,
      opacity : 0
    })
    timeline.from("#service-btn,#about-btn",{
      y : -100,
      opacity :0,
      duration : 1
    })
    
    // gsap.to('.animeHeading' , {
    //   transform : 'translateX(-180%)',
     
    //   scrollTrigger : {
    //     trigger :'.animeHeading',
    //     scroll : 'body',
    //     start : 'top 10%',
    //     end : 'top -280%',
    //     scrub : true,
    //     pin : true
      
    //   }
    // })
  })
  return (
    <div id="featured" style={{overflowX : 'hidden'}}  className={styles.container}>
    
      <div id="hero-section" style={{
        background : `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1423666639041-f56000c27a9a?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNvbnRhY3R8ZW58MHx8MHx8fDA%3D')`,
        backgroundSize : '100% 100%',
        backgroundRepeat : 'no-repeat'
      }} className="flex items-center justify-center w-full h-screen">
      <div id="hero-layer" className={ 'bg-[#0f172a] absolute top-0 left-0 w-full h-[100.11vh]  '  } style={{clipPath: `polygon(100% 82%, 0% 100%, 100% 100%)`}}></div>
        <div id="hero-container" className="lg:max-w-[60%] max-w-[80%]  flex flex-col items-center gap-[4rem]">
            <div id="hero-title" className="flex-col items-center flex gap-[1rem]">
              <h1 id="hero-title" className="font-[500] tracking-wider  text-[white] text-[3.5rem] text-center">Multi-purpose Template</h1>
              <h1 id="hero-heading" className="text-[6.2rem] text-[white] font-[700] tracking-wide text-center">Create Your News or Blog</h1>
              <p id="hero-para" className="text-[1.6rem] font-[500] text-[#ffffffe6] max-w-[80%] text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
            </div>
            <div id="hero-btn" className="flex gap-[3rem]">
              <div id="service-btn" className="text-white  bg-[#ffffff0a] border-[3px] border-[#ffffff3d] rounded-[.6rem] px-[3.2rem] py-[1rem] text-[1.6rem] font-[600]" style={{backdropFilter : 'blur(5px)'}}>
                <Link to={'/blog/service'} >
                <Button 
                  label={"SERVICES"}
                />
                </Link>
              </div>
              <div id="about-btn" className="text-green-400 bg-[#fff] border-[3px] border-[#fff] px-[3.2rem] py-[1rem] text-[1.6rem] font-[600] rounded-[.4rem]" >
                <Link to={'/blog/about'} >
                <Button className="block" 
                  label={"ABOUT US"}
                />
                </Link>
              </div>
            </div>
            
        </div>
      </div>

     { /* <div id="heading" className="relative flex-col items-center justify-center inline ">
      <h1 className={`text-[35rem] font-[600] text-center  mt-[1rem] pb-[-5rem] ${styles.animateHeading} animeHeading `}>Welcome in our new Blog </h1>
      
      </div> */}
      <div id="featured-section" className="px-[4rem] py-[2rem] ">
      <div className={styles.post}>
      <div className={styles.imgContainer}>
        <div className={` ${styles.aboutImg} absolute top-[120%] left-0 w-[100%] h-[100%] p-[2rem] bg-[#5439598f] grid grid-rows-2" id="about-img`}>
          <div id="center-container" className="flex items-end justify-center w-full h-full text-white">
            <h1 className="text-[2.4rem] relative text-[white] text-center">Recent News </h1>
          </div>
          <div id="details" className="flex items-end justify-between w-full h-full text-white"  >
            <h2>Created By : XENDEK WEB</h2>
            <h3>Created At : 2022-01-01</h3>
          </div>
        </div>
        <ImgSlider />
      </div>
      <div className={styles.textContainer}>
        <h1 className={styles.postTitle}>Lorem ipsum dolor sit amet alim consectetur adipisicing elit.</h1>
        <p className={styles.postDesc}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Cupiditate, quam nisi magni ea laborum inventore voluptatum
          laudantium repellat ducimus unde aspernatur fuga. Quo, accusantium
          quisquam! Harum unde sit culpa debitis.
        </p>
        <Link to={`/blog/blog-details/6736454gd64455464364`} className={styles.button}>Read More</Link>
      </div>
    </div>
      </div>
    </div>
  );
};

export default Featured;
