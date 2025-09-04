import React from 'react';
import './loading-skeleton.css';
import { Grid } from '@mui/material';

export default function BlogsSkeleton() {
  return (
    <Grid
      container
      rowSpacing={5}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={4} style={{ display: 'flex', justifyContent: 'center' }}>
        <BlogsSkeletonBox />
      </Grid>
      <Grid item xs={4} style={{ display: 'flex', justifyContent: 'center' }}>
        <BlogsSkeletonBox />
      </Grid>
      <Grid item xs={4} style={{ display: 'flex', justifyContent: 'center' }}>
        <BlogsSkeletonBox />
      </Grid>
      <Grid item xs={4} style={{ display: 'flex', justifyContent: 'center' }}>
        <BlogsSkeletonBox />
      </Grid>
      <Grid item xs={4} style={{ display: 'flex', justifyContent: 'center' }}>
        <BlogsSkeletonBox />
      </Grid>
      <Grid item xs={4} style={{ display: 'flex', justifyContent: 'center' }}>
        <BlogsSkeletonBox />
      </Grid>
    </Grid>
  );
}

const BlogsSkeletonBox = () => {
  return (
    <div className="border shadow-lg p-6 rounded-lg w-[70%]">
      <div className="flex gap-1">
        <div className="skeleton w-[100%] h-[10rem]"></div>
      </div>
      <div>
        <div className="skeleton w-[45%] h-3 my-2"></div>
        <div className="skeleton w-[40%] h-3 my-2"></div>
        <div className="skeleton w-[30%] h-3 my-2"></div>
        <div className="skeleton w-[25%] h-3 my-2" style={{ marginLeft: 'auto' }}></div>
      </div>
    </div>
  );
};
