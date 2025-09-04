import { useEffect, useState, useCallback } from 'react';
import styles from './projDashboard.module.css';
import { ProjectDashboardNav, MyProjects, MyApplications, Navbar } from '../../../Components';
import { AppStates } from '../../../Context/appContext.jsx';
import { axios, PROJECTS } from '../../../api';
import { sendReqToServer } from '../../../Hooks/useAxios';
import { useDispatch, useSelector } from 'react-redux';
import { set_MyProjects } from '../../../redux/slices/myprojects-slices';

export default function ProjectDashboard() {
  //context
  const { user, setShowLoginPopup: _setShowLoginPopup } = AppStates();

  //redux
  const dispatch = useDispatch();
  const myProjects = useSelector((state) => {
    return state.myProjects;
  });

  const [selectedTab, setSelectedTab] = useState('APPLICATIONS');
  const [myApplications, setMyApplications] = useState([]);

  const fetchMyApplications = useCallback(async () => {
    try {
      const { response } = await sendReqToServer({
        axiosInstance: axios,
        url: PROJECTS.applications,
        method: 'POST',
        requestConfig: {
          userId: user._id,
        },
      });

      // console.log("My Applications: " , response?.body?.myApplications)
      setMyApplications(response?.body?.myApplications);
    } catch (err) {
      console.log(err);
    }
  }, [user._id]);

  const fetchMyProjects = useCallback(async () => {
    try {
      const { response } = await sendReqToServer({
        axiosInstance: axios,
        url: PROJECTS.myprojects,
        method: 'POST',
        requestConfig: {
          userId: user._id,
        },
      });

      // console.log("My Projects: ", response?.body?.myProjects);
      dispatch(set_MyProjects(response?.body?.myProjects));
    } catch (err) {
      console.log(err);
    }
  }, [user._id, dispatch]);

  useEffect(() => {
    async function fetchData() {
      if (user) {
        if (selectedTab === 'APPLICATIONS') {
          await fetchMyApplications();
        } else {
          await fetchMyProjects();
        }
      }
    }

    fetchData();
  }, [user, selectedTab, fetchMyApplications, fetchMyProjects]);

  return (
    <>
      <Navbar />
      <div className={styles.dbWrapper}>
        <ProjectDashboardNav selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

        <div className={styles.dashboardRight}>
          {(myApplications || myProjects) &&
            (selectedTab === 'APPLICATIONS' ? (
              <MyApplications applications={myApplications} />
            ) : (
              <MyProjects projects={myProjects} />
            ))}
        </div>
      </div>
    </>
  );
}
