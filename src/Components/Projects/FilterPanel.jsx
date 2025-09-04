import { ProjectFilterOptions } from '../../data/ProjectFilterOptions';
import ProjectsFilterCard from './ProjectsFilterCard';
import styles from './styles/projectsFilterPanel.module.css';
import { AiOutlinePlus } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { AppStates } from '../../Context/appContext.jsx';

export default function FilterPanel() {
  const { user, setShowLoginPopup } = AppStates();
  const navigate = useNavigate();

  function handleAddProject() {
    if (!user) {
      setShowLoginPopup(true);
      return;
    }
    navigate('/projects/add');
  }

  function handleGoToDashboard() {
    if (!user) {
      setShowLoginPopup(true);
      return;
    }
    navigate('/projects/dashboard');
  }

  return (
    <div className={styles.filterPanel}>
      {ProjectFilterOptions.map((ele, idx) => {
        return <ProjectsFilterCard key={idx} filterName={ele.filterName} options={ele.options} />;
      })}

      <div className={styles.addNewProjBtn} onClick={handleAddProject}>
        <AiOutlinePlus size={17} className={styles.addProjIcon} /> Add Project
      </div>

      <div className={styles.dashboardBtn} onClick={handleGoToDashboard}>
        Dashboard
      </div>
    </div>
  );
}
