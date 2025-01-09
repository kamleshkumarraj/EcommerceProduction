import React from "react";
import { useSelector } from "react-redux";
import { getLatestBlogs } from "../../../store/slices/blog.slice";
import CategoryCard, { ImageWithInTextCard, WithoutImageCard } from "../card/CategoryCard";

function LatestBlogBody() {
    const allBlogs = useSelector(getLatestBlogs) || []
  return (
    <div className="latest-blog-body lg:px-[4rem] px-[2rem] py-[2rem]">
      <div id="heading" className="text-center flex justify-center items-center flex-col text-[3.6rem] mt-[20px] text-slate-600 font-bold relative pb-[45px]">
        <h2 className="text-gray-100">{"Latest Blog"}</h2>
        <div className="w-[10rem] h-[4px] bg-[#7fad39] mt-4"></div>
      </div>
      <div id="card-section" className="grid grid-cols-3 gap-[2rem]" >
        <div id="col-1" className="col-span-2 " >
            <div id="row-1" className="grid grid-cols-2" >
            {allBlogs.length > 0 && allBlogs.slice(0,2).map((blog) => (<ImageWithInTextCard key={blog._id} blog={blog}  />))}
            </div>
            <hr className=" border-gray-600 my-[2.5rem]" />
            <div id="row-2" className="grid grid-cols-2 my-[1.5rem] gap-y-[3rem] gap-x-[2rem]" >
                {allBlogs.length > 0 && allBlogs.slice(2,6).map((blog) => (<WithoutImageCard key={blog._id} blog={blog}  />))}
            </div>
        </div>
        <div id="col-2" className="grid grid-cols-2 gap-[2rem] justify-items-center" >
            {allBlogs.length > 0 && allBlogs.slice(6,10).map((blog) => (<CategoryCard key={blog._id} blog={blog}  />))}
        </div>
      </div>
      <hr className=" border-gray-600 my-[2.5rem]" />
      <div id="blog-card" className="grid grid-cols-5 gap-[2rem] justify-items-center" >
        {allBlogs.length > 0 && allBlogs.slice(10,15).map((blog) => (<CategoryCard key={blog._id} blog={blog}  />))}
      </div>
    </div>
  );
}

export default LatestBlogBody;
