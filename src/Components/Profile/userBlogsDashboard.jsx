import React, { useState, useContext, useEffect } from 'react';
import { BlogsDetailsContext } from '../../Context/blogsContextApi.jsx';
import BlogCard from '../Blogs/blogCard';
// import { sendReqToServer } from '../../../Hooks/useAxios';

const UserBlogsDashboard = (props) => {
  const [bookmarkedBlogs, setBookmarkedBlogs] = useState([]);
  const { blogsList } = useContext(BlogsDetailsContext);

  const filterBookmarkedNotes = (blogList, bookmarkedBlogs) => {
    return blogList.filter((jsonObj) => bookmarkedBlogs.includes(jsonObj._id));
  };
  useEffect(() => {
    setBookmarkedBlogs(filterBookmarkedNotes(blogsList, props.user?.blogs));
  }, [blogsList, props.user?.blogs]);

  return (
    <>
      {bookmarkedBlogs?.length > 0 ? (
        <div className="flex h-fit gap-4">
          {bookmarkedBlogs.map((ele, _idx) => {
            return <BlogCard blog={ele} />;
          })}
        </div>
      ) : (
        <div className="flex justify-center items-center w-full text-xl font-bold text-[#005C6A] opacity-30 cursor-pointer">
          No Blogs Available
        </div>
      )}
    </>
  );
};

export default UserBlogsDashboard;
