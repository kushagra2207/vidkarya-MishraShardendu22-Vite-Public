import React, { useState } from 'react';
import styles from './Dashboard.module.css';
import { Events, ClassSchedule, MessSchedule, DashboardNav, Navbar } from './../../Components';

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const _dashBoardList = ['EVENTS', 'CLASSES_SCHEDULE', 'MESS_SCHEDULE'];

  const _handleTabClick = (index) => {
    setSelectedTab(index);
  };

  // Define components associated with each tab
  const tabComponents = [<Events />, <ClassSchedule />, <MessSchedule />];

  return (
    <>
      <Navbar />
      <div className={styles.dashboardWrapper}>
        <DashboardNav selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        <div className={styles.dashboardRight}>{tabComponents[selectedTab]}</div>
      </div>
    </>
  );
};

export default Dashboard;
