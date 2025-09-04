import React, { useEffect, useState } from 'react';
import './CSS/DashboardNav.css';
import { DASHBOARD_ASSET } from '../../Assets/assetImages';
// import buildingImg from "../../Assets/Images/Dashboard/ph_buildings.svg";
// import messLogo from "../../Assets/Images/Dashboard/mess-logo.svg";
// import eventLogo from "../../Assets/Images/Dashboard/event-logo.svg";
import { getYearAndBranch } from '../../Helpers';
import { AppStates } from '../../Context/appContext.jsx';

import { MdSchedule } from 'react-icons/md';

function DashboardNav({ selectedTab, setSelectedTab }) {
  const { user } = AppStates();
  const [studentInfo, setStudentInfo] = useState(['N/A', 'N/A']);

  useEffect(() => {
    if (user) {
      const [year, branch] = getYearAndBranch(user?.email);
      const currentYear = new Date().getFullYear();
      const batch = currentYear - year;
      setStudentInfo([branch, batch]);
    }
  }, [user]);

  const handelTabClick = (idx) => {
    setSelectedTab(idx);
  };

  return (
    <div className="dashboardNav">
      <div className="dashboardNavWrapper">
        {/* Dashboard Navbar Top */}
        <div className="dbNavTop">
          <div className="dbNavTopLeft">
            <img src={DASHBOARD_ASSET.building} alt="" />
            <span className="dbNavBatchText">
              {studentInfo[0]} {studentInfo[1]}
            </span>
          </div>

          <div className="dbNavTopRight">
            <span className="dbNavHeading">IIIT Dharwad </span>
            <span className="dbNavHeading">Dashboard</span>
            <span className="dbNavSubHeading">STUDENT</span>
          </div>
        </div>

        {/* Dashboard Navbar List */}
        <div className="dbNavList">
          <div
            className={selectedTab === 0 ? 'dbNavListItemSelected' : 'dbNavListItem'}
            onClick={() => {
              handelTabClick(0);
            }}
          >
            <div className="dbNavListItemIcon">
              <img src={DASHBOARD_ASSET.events} alt="" className="dbNavListItemIconImg" />
            </div>
            <span className="dbNavListItemText"> Events </span>
          </div>
          <div
            className={selectedTab === 1 ? 'dbNavListItemSelected' : 'dbNavListItem'}
            onClick={() => {
              handelTabClick(1);
            }}
          >
            <div className="dbNavListItemIcon">
              <MdSchedule size={25} className="dbNavListItemIconImg" />
              {/* <img src={ timetableLogo } alt="" className='dbNavListItemIconImg'/> */}
            </div>
            <span className="dbNavListItemText"> Class Schedule </span>
          </div>

          {/* MESS Menu */}
          <div
            className={selectedTab === 2 ? 'dbNavListItemSelected' : 'dbNavListItem'}
            onClick={() => {
              handelTabClick(2);
            }}
          >
            <div className="dbNavListItemIcon">
              <img src={DASHBOARD_ASSET.mess} alt="" className="dbNavListItemIconImg" />
            </div>
            <span className="dbNavListItemText"> Mess Schedule </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardNav;
