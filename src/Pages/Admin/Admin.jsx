import React, { useEffect, useState } from 'react';
import './Admin.css';
import {
  EventComponent,
  BlogComponent,
  NotesComponent,
  UserComponent,
  NoticeComponent,
  CourseStructureComponent,
} from '../../Components';
import { AppStates } from '../../Context/appContext.jsx';
import { Career } from '../../Components/Admin';

function Admin() {
  const Tabs = ['Blog', 'Notes', 'Events', 'Notice', 'User', 'CourseStr', 'Career'];
  const [selectedTab, setSelectedTab] = useState('Blog');

  //context
  const { user } = AppStates();

  useEffect(() => {
    // if (user && user?.email !== import.meta.env.VITE_ADMIN_EMAIL) {
    //   window.location.replace('/');
    // }
  }, [user]);

  if (!user) {
    return (
      <div
        style={{ height: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {' '}
        Loading...{' '}
      </div>
    );
  }

  return (
    <>
      <div className="admin-section">
        <div className="admin-container">
          <label>Admin Console</label>
          <div className="tabs-container">
            {Tabs.map((tab, id) => {
              return (
                <div
                  key={id}
                  className={selectedTab === tab ? 'tab-active' : 'non-active-tab'}
                  onClick={() => {
                    setSelectedTab(tab);
                  }}
                >
                  {tab}
                </div>
              );
            })}
          </div>
        </div>
        {selectedTab === 'Blog' && <BlogComponent />}
        {selectedTab === 'Notes' && <NotesComponent />}
        {selectedTab === 'Events' && <EventComponent />}
        {selectedTab === 'Notice' && <NoticeComponent />}
        {selectedTab === 'User' && <UserComponent />}
        {selectedTab === 'CourseStr' && <CourseStructureComponent />}
        {selectedTab === 'Career' && <Career />}
      </div>
    </>
  );
}

export default Admin;
