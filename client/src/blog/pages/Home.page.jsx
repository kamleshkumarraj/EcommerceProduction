import React from 'react'
import Featured from '../components/featured/Featured'
import CategoryList from '../components/categoryList/CategoryList'
import CardList from '../components/cardList/CardList'
import Menu from '../components/Menu/Menu'
import CategoryCard from '../components/card/CategoryCard'
import { useSelector } from 'react-redux'
import { getAllBlogs } from '../../store/slices/blog.slice'
import LatestBlogBody from '../components/body/LatestBlogBody'
import TechnologyBody from '../components/body/TechonologyBody'


function BlogHome() {
  const allBlogs = useSelector(getAllBlogs) ||[]
  return (
    <div className='pb-[4rem]' >
      <Featured />
      <CategoryList />
      <div id="latest-blog-section">
        <LatestBlogBody />
      </div>
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
