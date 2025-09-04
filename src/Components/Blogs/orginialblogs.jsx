import React from 'react';
import { useEffect, useState, useCallback } from 'react';
import { Grid } from '@mui/material';
import './blogs.css';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import { axios, BLOGS } from '../../api';
import { useToasts } from '../../Components/UI/toast';
import BlogCard from './blogCard';
import Pagination from '@mui/material/Pagination';
import { sendReqToServer } from '../../Hooks/useAxios';
import BlogsSkeleton from '../loading-skeletons/blogs-skeleton';

const Orginialblogs = ({ searchString }) => {
  const [notify] = useToasts();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noPages, setNopages] = useState();

  const getBlogsFunc = useCallback(async (index) => {
    try {
      const { response, error: _error } = await sendReqToServer({
        axiosInstance: axios,
        url: BLOGS.pagenation,
        method: 'POST',
        requestConfig: {
          num: index,
        },
      });
      if (response) return response;
    } catch {
      notify({
        type: 'ERROR',
        message: 'Fetching BLOGS failed!',
      });
    }
  }, [notify]);

  const handlePagenation = async (event, pageNumber) => {
    const data = await getBlogsFunc(pageNumber);
    setBlogs(data.body.currentBlogsPatch);
  };

  const fetchData = useCallback(async () => {
    try {
      //when all blogs have been fetched
      if (searchString === '' || searchString === null || searchString === '#') {
        setLoading(true);
        const data = await getBlogsFunc(1);

        //setting blog data to useState projects
        setBlogs(data.body.currentBlogsPatch);

        // for counting total page number
        var count = data.body.totalBlogs / 10;
        if (data.body.totalBlogs % 10 > 0) count++;
        setNopages(Math.round(count));
      }
      //when search is done for tag
      else if (searchString[searchString.length - 1] === '#') {
        const _searchString = searchString.slice(0, -1);
        setLoading(true);
        const result = await axios.get(`${BLOGS.searchTag}/${_searchString}`);
        setBlogs(result.data.body.searchResults);
      }
      //normal text search
      else {
        setLoading(true);
        const result = await axios.get(`${BLOGS.search}/${searchString}`);
        setBlogs(result.data.body.searchResults);
      }
    } catch (error) {
      console.log(error);
      notify({
        type: 'ERROR',
        message: 'Some Blogs could not be fetched !',
      });
    }
    setLoading(false);
  }, [searchString, notify, getBlogsFunc]);

  useEffect(() => {
    fetchData();
  }, [searchString, fetchData]);

  return loading ? (
    <BlogsSkeleton />
  ) : (
    <>
      <div className="blogPageWrapper">
        <Grid className="mainContainer" container spacing={4}>
          {blogs ? (
            blogs.map((blog) => {
              return <BlogCard key={blog._id} blog={blog} />;
            })
          ) : (
            <div className="loadingContainer">
              <span className="loadingText">No Blogs found . . .</span>
            </div>
          )}
        </Grid>
        <div className="flex justify-center p-1 my-2">
          <Pagination count={noPages} color="primary" onChange={handlePagenation} />
        </div>
      </div>
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 5,
        }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default Orginialblogs;
