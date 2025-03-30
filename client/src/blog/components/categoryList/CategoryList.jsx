import { useGSAP } from '@gsap/react';
import gsap from "gsap";
import ScrollTrigger from "gsap/src/ScrollTrigger";
import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { useLazyGetCategoriesWiseBlogsQuery } from "../../../store/slices/blogApi";
import styles from "./categoryList.module.css";

const CategoryList =  () => {
  gsap.registerPlugin(ScrollTrigger)
  const [getCategoryWiseBlogs, {data : categoriesWiseBlog, isLoading, isError}] = useLazyGetCategoriesWiseBlogsQuery();

  useEffect(() => {
    getCategoryWiseBlogs();
  },[])
  useGSAP(() => {
    gsap.from('#category' , {
      y : -200,
      opacity : 0,
      duration : 1,
      stagger : .2,
      scrollTrigger : {
        trigger :'.body #category',
        scroll : 'body',
        start : 'top 70%',
        end : 'top 30%',
        scrub : true,
      }
    })
  })

  if(isLoading) return <h1>We getting the categories wise blog data ....</h1>
  if(isError) return <h1>We get error during fetching the categories wise blog data !</h1>
  return (
    <div className={`${styles.container} body`}>
      <h1 className={styles.title}>Popular slug</h1>
      <div id="category-body" className="flex gap-[20px]" >
        {categoriesWiseBlog && categoriesWiseBlog?.length > 0 &&  categoriesWiseBlog?.map((item , idx) => {
          return (
            <div  key={item._id} id="category"className="relative " >
              <img className="h-[150px] rounded-[10px]" src={item?.thumbnail?.url} alt="" />
              <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[#2a2a2a69] h-[180px] w-full" id="layer">
              </div>
              <Link className="absolute bottom-[10%] left-[50%] translate-x-[-50%] text-[18px] text-white font-[600]" to={`/blog/blog-page`}>{item?.category}</Link>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default CategoryList;
