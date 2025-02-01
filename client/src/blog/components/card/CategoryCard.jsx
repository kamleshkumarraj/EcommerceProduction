import { Link } from "react-router-dom"

function CategoryCard({blog}) {
  return (
    <Link to={`/blog/blog-details/${blog._id}`} id="category-card" className="flex flex-col gap-[20px] max-w-[28rem]">
      <div id="image-section" className="">
        <img className="w-[28rem] rounded-[10px]" src={blog?.thumbnail?.url} alt={blog?.title} />
      </div>
      <div id="details-section" className="flex flex-col gap-[5px]">
          <h1 id="category" className="text-[13px] font-[500] text-black px-[10px] rounded-[10px] inline max-w-[100px] text-justify bg-white py-[2px]">{blog.category}</h1>
          <h2 id="title" className="text-[20px] leading-[23px] font-[600]">{blog.content.substring(0,90) + "..."}</h2>
          <p className="text-[13px] font-[400] text-gray-400" id="date">{blog.createdAt}</p>
      </div>
    </Link>
  )
}

export default CategoryCard

export const WithoutImageCard = ({blog}) => {
    return (
        <Link to={`/blog/blog-details/${blog._id}`} id="details-section" className="flex flex-col gap-[5px]">
          <h1 id="category" className="text-[13px] font-[500] text-black px-[10px] rounded-[10px] inline max-w-[100px] text-center bg-white py-[2px]">{blog.category}</h1>
          <h2 id="title" className="text-[20px] leading-[23px] font-[600]">{blog.content.substring(0,90) + "..."}</h2>
          <p className="text-[13px] font-[400] text-gray-400" id="date">{blog.createdAt}</p>
      </Link>
    )
}

export const ImageWithInTextCard = ({blog}) => {
    return (
        <Link to={`/blog/blog-details/${blog._id}`} id="image-within-text-card" className="flex flex-col gap-[20px] max-w-[28rem] relative">
      <div id="image-section" className="">
        <img className="min-w-[45rem] h-[40rem] rounded-[10px]" src={blog?.thumbnail?.url} alt={blog?.title} />
      </div>
      <div id="layer" className="absolute w-[45rem] h-[100%] bg-black opacity-[0.3] rounded-[10px]" ></div>
      <div id="details-section" className="flex absolute px-[1rem]  left-0 flex-col gap-[5px] bottom-0 py-[1rem]">
          <h1 id="category" className="text-[13px] font-[500] text-white px-[10px] rounded-[10px] inline w-[6rem] bg-black py-[2px] text-center">{blog.category}</h1>
          <h2 id="title" className="text-[20px] leading-[23px] font-[600]">{blog.content.substring(0,90) + "..."}</h2>
          <p className="text-[14px] font-[400] text-white" id="date">{blog.createdAt}</p>
      </div>
    </Link>
    )
}

export const TechonologyCard = ({blog , imgWidth, imgHeight , headingSize , leadingSize}) => {
  return (
    <Link to={`/blog/blog-details/${blog._id}`} id="techonology-card" className="flex gap-[1rem] items-center" >
        <div id="image-section">
          <img className={`${imgWidth} rounded-[1rem] ${imgHeight} rounded-[10px]" `}src={blog?.thumbnail?.url} alt={blog?.title} />
        </div>
        <div id="details-section" className="flex flex-col gap-[1.5rem]">
        <h1 id="category" className={`text-[13px] font-[500] text-black px-[10px] rounded-[10px]  inline max-w-[100px] text-center bg-white py-[2px]`}>{blog.category}</h1>
        <h2 id="title" className={`text-[${headingSize}] ${leadingSize}  font-[600]`}>{blog.content.substring(0,90) + "..."}</h2>
        <p className="text-[13px] font-[400] text-gray-100" id="date">{blog.createdAt}</p>
    </div>
    </Link>
  )
}
