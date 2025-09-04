import React from 'react';
import { useState } from 'react';
import { PROJECT_ASSET } from '../../Assets/assetImages';
// import demoImg from '../../Assets/Images/Project/demoImg.svg';
// import bookmarkStar from '../../Assets/Images/Project/bookmark-star.svg';
// import techStackIcon from '../../Assets/Images/Project/techStackIcon.svg';
// import durationIcon from '../../Assets/Images/Project/durationIcon.svg';
// import tempDp from '../../Assets/Images/Project/user-smaple.svg';
import { arrayToStr, convertTimeToMomentsAgo, truncateText } from '../../Helpers';
import './projectCard.css';
import ApplyProject from './ApplyProject';
import { AppStates } from '../../Context/appContext.jsx';

function ProjectCard({ project }) {
  const { user, setShowLoginPopup } = AppStates();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const momentsAgo = convertTimeToMomentsAgo(project?.createdAt);

  const openPopup = () => {
    // check the login status of user if not open login popup
    if (!user) {
      setShowLoginPopup(true);
      return;
    }

    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const _handleApply = (_formData) => {
    // console.log('Form data submitted:', formData);
    closePopup();
    // Add your logic to handle the form data (e.g., send it to an API)
  };

  return (
    <div className="projectCard-Main">
      <div className="projectCard-Top">
        <div className="projectCardTopLeft">
          <img
            src={project?.photoURL ? project?.photoURL : PROJECT_ASSET.defaultProjectIcon}
            className="photoURL"
            alt=""
          />

          <div className="projectCardHead">
            <div className="projectCardMainHead">{truncateText(project?.name, 6) || 'Project'}</div>
            <div className="projectCardAuthor">
              Posted By: {project?.owner?.name || 'Anonymous'}
            </div>
          </div>
        </div>

        {/* <img src={bookmarkStar} alt="" className="projectCardBookmarkBtn" /> */}
      </div>

      <div className="projectCard-Content">
        <div className="projectDesctiption">{truncateText(project?.description, 80)}</div>
        <div className="projectDetails">
          <img src={PROJECT_ASSET.techStack} alt="" className="projectDetailsLogo" />
          <span className="projectDetailsHead">Tech Stack: </span>
          <span className="projectDetailsDesc"> {arrayToStr(project?.skillsRequired)} </span>
        </div>
        <div className="projectDetails">
          <img src={PROJECT_ASSET.postedIcon} alt="" className="projectDetailsLogo" />
          <span className="projectDetailsHead">Posted: </span>
          <span className="projectDetailsDesc"> {momentsAgo} </span>
        </div>
      </div>

      <div className="projectCard-WorkingPeople">
        <img src={PROJECT_ASSET.userIcon} alt="" className="projectCard-WorkingPeopleDP" />
        <span className="projectCard-WorkingPeopleInfo">
          {project?.applications?.length} Applicants
        </span>
      </div>

      <div className="projectCardBtns">
        <button className="projectApplyBtn" onClick={openPopup}>
          Apply
        </button>
        {/* <button className="viewProjectDetailsBtn">View Details</button> */}
      </div>

      {isPopupOpen && (
        <ApplyProject isOpen={isPopupOpen} closePopup={closePopup} project={project} />
      )}
    </div>
  );
}

export default ProjectCard;
