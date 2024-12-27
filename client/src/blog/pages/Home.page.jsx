import React from 'react'
import Featured from '../components/featured/Featured'
import CategoryList from '../components/categoryList/CategoryList'
import CardList from '../components/cardList/CardList'
import Menu from '../components/Menu/Menu'


function BlogHome() {
  return (
    <div className='pb-[4rem]' >
      <Featured />
      <CategoryList />
      <div id="post-section" className='mx-[4rem]' style={{display : 'flex', gap : '100px'}}>
        <CardList />
        <Menu />
      </div>
    </div>
  )
}

export default BlogHome
