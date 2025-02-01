import { useGetAllBlogsQuery } from "../../../store/slices/blogApi";
import { TechonologyCard } from "../card/CategoryCard";

function TechnologyBody() {
    const {data : allBlogs} = useGetAllBlogsQuery() || []
  return (
    <div
      id="technology-body"
      className="lg:px-[4rem] px-[2rem] bg-gradient-to-r from-blue-600 to-violet-700 pb-[2rem]"
    >
      <div
        id="heading"
        className="text-center flex justify-center items-center flex-col text-[3.6rem] mt-[20px] text-slate-600 font-bold relative pb-[45px] py-[2rem]"
      >
        <h2 className="text-gray-100">{"Technology"}</h2>
      </div>
      <div id="blog-section" className="grid auto-rows-auto  gap-[1rem] w-full grid-cols-1" >
            <div id="row-1" className="grid w-full grid-cols-2 gap-[3rem]" >
                {allBlogs && allBlogs?.length > 0 && allBlogs?.slice(8,10).map((blog) => (<TechonologyCard headingSize={'2.8rem'} leadingSize={'leading-[3.2rem]'} imgWidth={'min-w-[40rem]'} imgHeight={'h-[35rem]'} blog={blog} key={blog._id}  />)) }

               
            </div> 
            <hr  className="w-full border-t-[1px] my-[1rem] border-gray-600" />
            <div id="row-2" className="flex gap-[2rem] justify-between" >
                {
                    allBlogs && allBlogs?.length > 0 && allBlogs?.slice(5,8).map((blog) => (<TechonologyCard headingSize={'1.6rem'} leadingSize={'1.6rem'} imgWidth={'w-[60rem]'} imgHeight={'h-[22rem]'}  blog={blog} key={blog._id}  />)) 
                }
            </div>
      </div>
    </div>
  );
}

export default TechnologyBody;
