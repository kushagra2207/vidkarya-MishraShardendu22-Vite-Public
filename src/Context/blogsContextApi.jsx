import { useState, React, createContext, useEffect, useCallback } from 'react';
import { axios, BLOGS } from '../api';
import { sendReqToServer } from '../Hooks/useAxios';
import { useToasts } from '../Components/UI/toast';

const BlogsDetailsContext = createContext();

// Create a Provider component
const BlogsDetailsContextProvider = ({ children }) => {
  const [blogsList, setBlogsList] = useState([]);
  const [notify] = useToasts();

  const getAllBlogs = useCallback(async () => {
    try {
      const { response, error: _error1 } = await sendReqToServer({
        axiosInstance: axios,
        url: BLOGS.getAllBlogs,
        method: 'GET',
        requestConfig: {},
      });
      if (response.body.blog.length === 0) {
        notify({
          type: 'WARNING',
          message: 'No Blogs Uploaded',
        });
      } else {
        setBlogsList(response.body.blog);
      }
    } catch {
      notify({
        type: 'ERROR',
        message: 'Problem occured while fetching Blogs',
      });
    }
  }, [notify]);

  useEffect(() => {
    getAllBlogs();
  }, [getAllBlogs]);

  const contextValue = {
    blogsList,
    setBlogsList,
    getAllBlogs,
  };

  return (
    <BlogsDetailsContext.Provider value={contextValue}>{children}</BlogsDetailsContext.Provider>
  );
};

export { BlogsDetailsContext, BlogsDetailsContextProvider };
