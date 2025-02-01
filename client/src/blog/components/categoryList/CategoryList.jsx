import { useGSAP } from '@gsap/react';
import gsap from "gsap";
import ScrollTrigger from "gsap/src/ScrollTrigger";
import React from "react";
import { Link } from 'react-router-dom';
import { useGetAllBlogsQuery } from "../../../store/slices/blogApi";
import travelImg from '../..//assets/Images/travel.png';
import codingImg from '../../assets/Images/coding.png';
import cultureImg from '../../assets/Images/culture.png';
import fashionImg from '../../assets/Images/fashion.png';
import foodImg from '../../assets/Images/food.png';
import styleImg from '../../assets/Images/style.png';
import styles from "./categoryList.module.css";

const CategoryList =  () => {
  gsap.registerPlugin(ScrollTrigger)
  const data = [
    {_id : '1' , img : styleImg , title : 'Entertainment' , slug : 'style'},
    {_id : '2' , img : fashionImg , title : 'Fashion', slug : 'fashion'},
    {_id : '3' , img : foodImg , title : 'Food', slug : 'food'},
    {_id : '4' , img : travelImg , title : 'Travel', slug : 'travel'},
    {_id : '5' , img : cultureImg , title : 'Culture', slug : 'culture'},
    {_id : '6' , img : codingImg , title : 'Coding', slug : 'coding'},
  ];
  const {data : allBlogs} = useGetAllBlogsQuery();
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
  return (
    <div className={`${styles.container} body`}>
      <h1 className={styles.title}>Popular slug</h1>
      <div id="category-body" className="flex gap-[20px]" >
        {allBlogs && allBlogs?.length > 0 &&  data?.map((item , idx) => {
          return (
            <div  key={item._id} id="category"className="relative " >
              <img className="h-[150px] rounded-[10px]" src={idx==4 ? allBlogs[36]?.thumbnail?.url : allBlogs?.[idx*10+2]?.thumbnail?.url} alt="" />
              <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[#2a2a2a69] h-[180px] w-full" id="layer">
              
              </div>
              <Link className="absolute bottom-[10%] left-[50%] translate-x-[-50%] text-[18px] text-white font-[600]" to={`/blog/blog-page`}>{idx==4 ? "Culture" : allBlogs?.[idx*10+2]?.category}</Link>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default CategoryList;
