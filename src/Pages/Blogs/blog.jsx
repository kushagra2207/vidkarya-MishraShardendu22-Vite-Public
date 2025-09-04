import React, { useState } from 'react';
import Blogtop from '../../Components/Blogs/blogtop';
import Blogtopics from '../../Components/Blogs/blogtopics';
import Topicsnavbar from '../../Components/Blogs/topicsnavbar';
import Orginialblogs from '../../Components/Blogs/orginialblogs';
// import BlogTop from '../../Assets/Images/Blogs/blog.png'
import './CSS/blog.css';
import { Navbar } from '../../Components';

export default function Blog() {
  const [searchString, setSearchString] = useState('');

  return (
    <>
      <Navbar />
      <div>
        <div className="blogtop">
          <Blogtop />
        </div>

        <div className="blogtopics">
          <Blogtopics />
        </div>

        <div className="topicsnavbar">
          <Topicsnavbar setSearchString={setSearchString} />
        </div>

        <div id="display_blogs" className="orginialblogs">
          <Orginialblogs searchString={searchString} />
        </div>
      </div>
    </>
  );
}
