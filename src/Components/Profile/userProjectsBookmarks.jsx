import React, { useState, useEffect } from 'react';
import ProjectCard from '../Projects/ProjectCard';
// import { ProjectsDetailsContext } from '../../Context/projectsContextApi';

const UserProjectsBookmarks = (_props) => {
  const [bookmarkedProjects] = useState([]);
  // const { projectsList } = useContext(ProjectsDetailsContext);
  const _filterBookmarkedProjects = (projectsList, bookmarkedProjects) => {
    return projectsList.filter((jsonObj) => bookmarkedProjects.includes(jsonObj._id));
  };
  useEffect(() => {
    // setBookmarkedProjects(filterBookmarkedProjects(projectsList, props.user?.projects))
  }, []);
  return (
    <>
      {bookmarkedProjects?.length > 0 ? (
        <div className="flex h-fit gap-4">
          {bookmarkedProjects.map((ele, idx) => {
            return <ProjectCard project={ele} key={idx} />;
          })}
        </div>
      ) : (
        <div className="flex justify-center items-center w-full text-xl font-bold text-[#005C6A] opacity-30 cursor-pointer">
          {' '}
          No Projects Bookmarked{' '}
        </div>
      )}
    </>
  );
};

export default UserProjectsBookmarks;
