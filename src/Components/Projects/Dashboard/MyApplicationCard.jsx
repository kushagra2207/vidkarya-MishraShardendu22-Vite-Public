import styles from './styles/myApplicationCard.module.css';
import { convertTimeToMomentsAgo, arrayToStr } from '../../../Helpers';
import { BsPeopleFill } from 'react-icons/bs';
import { CgSandClock } from 'react-icons/cg';
// import demoImg from "../../../Assets/Images/Project/demoImg.svg"
// import techStackIcon from '../../../Assets/Images/Project/techStackIcon.svg';
// import durationIcon from '../../../Assets/Images/Project/durationIcon.svg';
import { PROJECT_ASSET } from '../../../Assets/assetImages';

export default function MyApplicationCard({ applicationData }) {
  // const postTime = convertTimeToMomentsAgo(applicationData?.project.createdAt);
  const applicationTime = convertTimeToMomentsAgo(applicationData?.createdAt);

  return (
    <div className={styles.CardMain}>
      {/* T O P */}
      <div className={styles.CardTop}>
        <div className={styles.CardTopLeft}>
          <img
            src={
              applicationData?.project.photoURL
                ? applicationData?.project.photoURL
                : PROJECT_ASSET.defaultProjectIcon
            }
            className={styles.photoURL}
            alt=""
          />

          <div className={styles.CardHead}>
            <div className={styles.CardMainHead}>{applicationData?.project?.name}</div>
            <div className={styles.CardAuthor}>
              Posted By: {applicationData?.project?.owner.name}
            </div>
          </div>
        </div>
      </div>

      {/* C O N T E N T */}
      <div className={styles.CardContent}>
        {/* DESC */}
        <div className={styles.Desctiption}>{applicationData?.project?.description}</div>

        {/* SKILLS */}
        <div className={styles.Details}>
          <img src={PROJECT_ASSET.techStack} alt="" className={styles.DetailsLogo} />
          <span className={styles.DetailsHead}>Tech Stack: </span>
          <span className={styles.DetailsDesc}>
            {arrayToStr(applicationData?.project?.skillsRequired)}
          </span>
        </div>

        {/* APPLIED ON */}
        <div className={styles.Details}>
          <img src={PROJECT_ASSET.postedIcon} alt="" className={styles.DetailsLogo} />
          <span className={styles.DetailsHead}>Applied: </span>
          <span className={styles.DetailsDesc}> {applicationTime} </span>
        </div>

        {/* APPLICANTS */}
        <div className={styles.CardWorkingPeople}>
          <BsPeopleFill size={21} className={styles.CardWorkingPeopleDP} />
          <span className={styles.CardWorkingPeopleInfo}>
            {applicationData?.project?.applications.length} Applicants
          </span>
        </div>

        {/* STATUS */}
        <div className={styles.CardWorkingPeople}>
          <CgSandClock size={22} className={styles.CardWorkingPeopleDP} />
          <span className={styles.CardWorkingPeopleInfo}>
            Status: {applicationData?.applicantStage}
          </span>
        </div>
      </div>
    </div>
  );
}
