import React from 'react';
import { Grid, Card } from '@mui/material';
import './blogs.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router';
import { truncateText } from '../../Helpers';

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();
  const capitalizeWords = (str) => {
    return str
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  return (
    <>
      <Grid style={{ padding: '15px' }} item lg={4} key={blog._id}>
        <Card className="blogcard" onClick={(_e) => navigate(`/blogs/${blog._id}`)}>
          <div className="blogcard_img">
            <img src={blog.thumbnailUrl} alt="blogimg" />
          </div>
          <div className="blogcard_top">
            <div className="blogcard_title">
              {truncateText(blog.title, 8)}
              <MoreVertIcon />
            </div>
            <div className="blogcard_tags">
              <div style={{ display: 'flex' }}>
                {' '}
                {blog.tags.map((tag, index) => {
                  if (index < 3) {
                    return (
                      <div key={index}>
                        <p style={{ paddingRight: '1px' }}>
                          {tag.toUpperCase()} {index < 2 && ','}
                        </p>
                      </div>
                    );
                  }
                })}{' '}
                -
                {Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                  .format(new Date(blog.updatedAt))
                  .toUpperCase()}
              </div>
            </div>
            <div className="blogcard_description">
              <span style={{ fontWeight: 500 }}>{truncateText(blog.description, 12)} </span>
            </div>
            <div className="blog_author">
              🖋 {blog.user ? capitalizeWords(blog.user.name) : 'Anonymous'}
            </div>
          </div>
        </Card>
      </Grid>
    </>
  );
};

export default BlogCard;
