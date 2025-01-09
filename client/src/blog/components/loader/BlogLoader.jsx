import React from 'react';

const BlogCard = () => {
    return (
      <div className="max-w-sm p-6 mx-auto my-4 border rounded-lg shadow-md">
       
          <div>
            <div className="w-3/4 h-4 mb-4 bg-gray-300 rounded animate-pulse"></div>
            <div className="w-full h-6 mb-2 bg-gray-300 rounded animate-pulse"></div>
            <div className="w-full h-6 mb-2 bg-gray-300 rounded animate-pulse"></div>
            <div className="w-5/6 h-6 bg-gray-300 rounded animate-pulse"></div>
          </div>
        
      </div>
    );
  };
  
export const BlogLoader = () => {
const blogs = [1,2,3,4,5,6,7,8,9,10,11,12]
 
  return (
    <div className="p-6">
      
       { 
            blogs.map((blog) => (
                <BlogCard key={blog} />
            ))
        }
      
    </div>
  );
};


// src/components/BlogCard.js




