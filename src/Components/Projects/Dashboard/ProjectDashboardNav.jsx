import { useNavigate } from 'react-router-dom';
import styles from './styles/projDashboardNav.module.css';
import { CgNotes } from 'react-icons/cg';
import { FaLaptopCode } from 'react-icons/fa';
import { AiOutlinePlus } from 'react-icons/ai';

export default function ProjectDashboardNav({ selectedTab, setSelectedTab }) {
  const navigate = useNavigate();

  return (
    <div className={styles.navWrapper}>
      {/* Dashboard Navbar Top */}
      <div className={styles.dbNavTop}>
        <div className={styles.dbNavTopRight}>
          <span className={styles.dbNavHeading}> Project </span>
          <span className={styles.dbNavHeading}>Dashboard</span>
          <span className={styles.dbNavSubHeading}> B E T A </span>
        </div>
      </div>

      {/* Dashboard Navbar List */}
      <div className={styles.dbNavList}>
        {/*  M Y   A P P L I C A T I O N S  */}
        <div
          className={
            selectedTab === 'APPLICATIONS' ? styles.dbNavListItemSelected : styles.dbNavListItem
          }
          onClick={() => setSelectedTab('APPLICATIONS')}
        >
          <div className={styles.dbNavListItemIcon}>
            <CgNotes
              size={25}
              className={styles.dbNavListItemIconImg}
              color={selectedTab === 'APPLICATIONS' ? 'white' : '#00A385'}
            />
          </div>
          <span className={styles.dbNavListItemText}> My Applications </span>
        </div>

        {/* M Y   P R O J E C T S  */}
        <div
          className={
            selectedTab === 'PROJECTS' ? styles.dbNavListItemSelected : styles.dbNavListItem
          }
          onClick={() => setSelectedTab('PROJECTS')}
        >
          <div className={styles.dbNavListItemIcon}>
            <FaLaptopCode
              size={25}
              className={styles.dbNavListItemIconImg}
              color={selectedTab === 'PROJECTS' ? 'white' : '#38B5AA'}
            />
          </div>
          <span className={styles.dbNavListItemText}> My Projects </span>
        </div>
      </div>

      <div className={styles.addNewProjBtn} onClick={() => navigate('/projects/add')}>
        <AiOutlinePlus size={17} className={styles.addProjIcon} /> Add Project
      </div>
    </div>
  );
}
