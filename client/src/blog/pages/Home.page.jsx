import  { useEffect } from 'react'
import Featured from '../components/featured/Featured'
import CategoryList from '../components/categoryList/CategoryList'
import CardList from '../components/cardList/CardList'
import Menu from '../components/Menu/Menu'
import { useDispatch } from 'react-redux'
import { setLatestBlogs } from '../../store/slices/blog.slice'
import LatestBlogBody from '../components/body/LatestBlogBody'
import TechnologyBody from '../components/body/TechonologyBody'
import { useError } from '../../hooks/useError'
import { BlogLoader } from '../components/loader/BlogLoader'
import { useGetAllBlogsQuery } from '../../store/slices/blogApi'


function BlogHome() {
  const dispatch = useDispatch();
  const {data : blogData , isLoading : isBlogLoading , error : blogError , isError : isBlogError} = useGetAllBlogsQuery();

  useError([{error : blogError, isError : isBlogError}])

  useEffect(() => {
    blogData && dispatch(setLatestBlogs(blogData?.data?.slice(0,30)))
  },[blogData])
  return (
    <div className='pb-[4rem]' >
      <Featured />
      <CategoryList />
      {isBlogLoading ? (<BlogLoader />) : (<div id="latest-blog-section">
        <LatestBlogBody />
      </div>)}
      <div id="technology-category">
        <TechnologyBody />
      </div>
      <div id="post-section" className='mx-[4rem]' style={{display : 'flex', gap : '100px'}}>
        <CardList />
        <Menu />
      </div>
    </div>
  )
}

export default BlogHome
