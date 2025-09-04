import { PROJECT_ASSET } from '../../../Assets/assetImages';
// import demoImg from '../../../Assets/Images/Project/demoImg.svg';
// import techStackIcon from '../../../Assets/Images/Project/techStackIcon.svg';
// import durationIcon from '../../../Assets/Images/Project/durationIcon.svg';
// import tempDp from '../../../Assets/Images/Project/user-smaple.svg';
import { arrayToStr, convertTimeToMomentsAgo } from '../../../Helpers';
import styles from './styles/myprojectCard.module.css';

function MyProjectCard({ index, projectData, setSelectedProject }) {
  const momentsAgo = convertTimeToMomentsAgo(projectData.createdAt);

  return (
    <div className={styles.CardMain}>
      <div className={styles.CardTop}>
        <div className={styles.CardTopLeft}>
          <img
            src={projectData.photoURL ? projectData.photoURL : PROJECT_ASSET.defaultProjectIcon}
            className={styles.photoURL}
            alt=""
          />

          <div className={styles.CardHead}>
            <div className={styles.CardMainHead}>{projectData.name}</div>
            <div className={styles.CardAuthor}>Posted By: You</div>
          </div>
        </div>
      </div>

      <div className={styles.CardContent}>
        {/* DESC */}
        <div className={styles.Desctiption}>{projectData.description}</div>

        {/* SKILLS */}
        <div className={styles.Details}>
          <img src={PROJECT_ASSET.techStack} alt="" className={styles.DetailsLogo} />
          <span className={styles.DetailsHead}>Tech Stack: </span>
          <span className={styles.DetailsDesc}> {arrayToStr(projectData.skillsRequired)} </span>
        </div>

        {/* TIME POSTED */}
        <div className={styles.Details}>
          <img src={PROJECT_ASSET.postedIcon} alt="" className={styles.DetailsLogo} />
          <span className={styles.DetailsHead}>Posted: </span>
          <span className={styles.DetailsDesc}> {momentsAgo} </span>
        </div>
      </div>

      {/* APPLICANTS */}
      <div className={styles.applicant}>
        <img src={PROJECT_ASSET.userIcon} alt="" className={styles.applicantDP} />
        <span className={styles.applicantInfo}>{projectData.applications?.length} Applicants</span>
      </div>

      {/* BUTTON */}
      <div className={styles.CardBtns}>
        <button className={styles.viewProjectDetailsBtn} onClick={() => setSelectedProject(index)}>
          View Applications
        </button>
      </div>
    </div>
  );
}

export default MyProjectCard;
