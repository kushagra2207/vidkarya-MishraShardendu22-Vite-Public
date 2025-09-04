import React, { useState, useEffect } from 'react';
import './profile.css';
import UserDetails from './UserDetails';
import {
  Navbar,
  UserBlogsBookmarks,
  UserProjectsBookmarks,
  UserNotesBookmarks,
  UserBlogsDashboard,
  UserNotesDashboard,
} from '../../Components';
import { useNavigate } from 'react-router-dom';
import PrivacyAndSecurity from './Settings/PrivacyAndSecurity';
import { useParams } from 'react-router-dom';

import {
  FaRegUserCircle,
  MdDashboard,
  AiFillFolderOpen,
  RiBook2Fill,
  CgNotes,
  AiOutlineCaretUp,
  BsBookmarkFill,
  AiOutlineCaretDown,
  SiSpringsecurity,
  BiLogOut,
} from '../../lib/icons';
import { useToasts } from '../../Components/UI/toast';
import { AppStates } from '../../Context/appContext.jsx';

export default function Profile() {
  const { action } = useParams();

  //context
  const { user, setuser } = AppStates();
  console.log(action);
  const [openDashboard, setOpenDashboard] = useState(false);
  const [openBookmark, setOpenBookmark] = useState(false);
  const [selectedTab, setSelectedTab] = useState(
    action === 'settings' ? 'PROFILE_SETTINGS' : 'PROFILE'
  );
  const navigate = useNavigate();
  const [notify] = useToasts();

  function handleLogout(e) {
    e.preventDefault();

    // Clear session from Local Storage
    localStorage.clear();

    // Clear User from Context
    setuser(null);

    notify({
      type: 'SUCCESS',
      message: 'Signed Out',
    });

    // Navigate to Home
    navigate('/');

    return;
  }

  useEffect(() => {
    if (selectedTab === 'DASHBOARD_PROJECTS') {
      navigate('/projects/dashboard');
    }
  }, [selectedTab, navigate]);

  return (
    <>
      <Navbar />

      <div className="md:flex">
        <div className="profilePage-sidebar items-start border m-4 rounded-md w-[20%] h-[100vh]">
          <div
            className={`sidebar-option p-2 w-[95%] rounded flex gap-3 m-2 text-[#005C6A] items-center ${selectedTab === 'PROFILE' ? 'sidebar-option-selected' : ''}`}
            onClick={() => {
              setSelectedTab('PROFILE');
            }}
          >
            <div>
              <FaRegUserCircle size={20} />
            </div>
            <p className="font-semibold "> Profile </p>
          </div>

          <div style={{ opacity: 0.8 }}>
            <div
              className="sidebar-option p-2 w-[95%] rounded flex gap-3 m-2 text-[#005C6A] items-center"
              onClick={() => setOpenDashboard(!openDashboard)}
            >
              <div>
                <MdDashboard size={20} />
              </div>
              <p className="font-semibold "> Dashboards </p>
              <div>
                {openDashboard ? <AiOutlineCaretUp size={20} /> : <AiOutlineCaretDown size={20} />}
              </div>
            </div>

            {openDashboard && (
              <div className="dashboard-subSection ml-2 w-[85%]">
                <div
                  className={`dashboard-subSection-option font-sm p-1 m-2 ml-4 w-full rounded flex gap-3 text-[#005C6A] items-center ${selectedTab === 'DASHBOARD_NOTES' ? 'sidebar-option-selected' : ''}`}
                  onClick={() => setSelectedTab('DASHBOARD_NOTES')}
                >
                  <div>
                    <RiBook2Fill size={17} />
                  </div>
                  <p className="font-semibold "> Notes </p>
                </div>

                <div
                  className={`dashboard-subSection-option font-sm p-1 m-2 ml-4 w-full rounded flex gap-3 text-[#005C6A] items-center ${selectedTab === 'DASHBOARD_BLOGS' ? 'sidebar-option-selected' : ''}`}
                  onClick={() => setSelectedTab('DASHBOARD_BLOGS')}
                >
                  <div>
                    <CgNotes size={17} />
                  </div>
                  <p className="font-semibold "> Blogs </p>
                </div>

                <div
                  className={`dashboard-subSection-option font-sm p-1 m-2 ml-4 w-full rounded flex gap-3 text-[#005C6A] items-center ${selectedTab === 'DASHBOARD_PROJECTS' ? 'sidebar-option-selected' : ''}`}
                  onClick={() => setSelectedTab('DASHBOARD_PROJECTS')}
                >
                  <div>
                    <AiFillFolderOpen size={17} />
                  </div>
                  <p className="font-semibold "> Projects </p>
                </div>
              </div>
            )}
          </div>

          <div style={{ opacity: 0.8 }}>
            <div
              className="sidebar-option p-2 w-[95%] rounded flex gap-3 m-2 text-[#005C6A] items-center"
              onClick={() => setOpenBookmark(!openBookmark)}
            >
              <div>
                <BsBookmarkFill size={20} />
              </div>
              <p className="font-semibold "> Bookmarks </p>
              <div>
                {openBookmark ? <AiOutlineCaretUp size={20} /> : <AiOutlineCaretDown size={20} />}
              </div>
            </div>

            {openBookmark && (
              <div className="dashboard-subSection ml-2 w-[85%]">
                <div
                  className={`dashboard-subSection-option font-sm p-1 m-2 ml-4 w-full rounded flex gap-3 text-[#005C6A] items-center ${selectedTab === 'BOOKMARKS_NOTES' ? 'sidebar-option-selected' : ''}`}
                  onClick={() => setSelectedTab('BOOKMARKS_NOTES')}
                >
                  <div>
                    <RiBook2Fill size={17} />
                  </div>
                  <p className="font-semibold "> Notes </p>
                </div>

                <div
                  className={`dashboard-subSection-option font-sm p-1 m-2 ml-4 w-full rounded flex gap-3 text-[#005C6A] items-center ${selectedTab === 'BOOKMARKS_BLOGS' ? 'sidebar-option-selected' : ''}`}
                  onClick={() => setSelectedTab('BOOKMARKS_BLOGS')}
                >
                  <div>
                    <CgNotes size={17} />
                  </div>
                  <p className="font-semibold "> Blogs </p>
                </div>

                <div
                  className={`dashboard-subSection-option font-sm p-1 m-2 ml-4 w-full rounded flex gap-3 text-[#005C6A] items-center ${selectedTab === 'BOOKMARKS_PROJECTS' ? 'sidebar-option-selected' : ''}`}
                  onClick={() => setSelectedTab('BOOKMARKS_PROJECTS')}
                >
                  <div>
                    <AiFillFolderOpen size={17} />
                  </div>
                  <p className="font-semibold "> Projects </p>
                </div>
              </div>
            )}
          </div>

          <div
            className={`sidebar-option p-2 w-[95%] rounded flex gap-3 m-2 text-[#005C6A] items-center ${selectedTab === 'PROFILE_SETTINGS' ? 'sidebar-option-selected' : ''}`}
            onClick={() => {
              setSelectedTab('PROFILE_SETTINGS');
            }}
            style={{ opacity: 0.8 }}
          >
            <div>
              <SiSpringsecurity size={20} />
            </div>
            <p className="font-semibold "> Privacy & Security </p>
          </div>

          <div
            className="sidebar-option p-2 w-[95%] rounded flex gap-3 m-2 text-[#005C6A]  items-center"
            onClick={handleLogout}
            style={{ opacity: 0.8 }}
          >
            <div>
              <BiLogOut size={20} />
            </div>
            <p className="font-semibold "> Logout </p>
          </div>
        </div>
        {selectedTab === 'PROFILE' ? <UserDetails /> : <div></div>}
        {selectedTab === 'DASHBOARD_NOTES' ? <UserNotesDashboard user={user} /> : <div></div>}
        {selectedTab === 'DASHBOARD_BLOGS' ? <UserBlogsDashboard user={user} /> : <div></div>}
        {selectedTab === 'BOOKMARKS_NOTES' ? <UserNotesBookmarks user={user} /> : <div></div>}
        {selectedTab === 'BOOKMARKS_BLOGS' ? <UserBlogsBookmarks user={user} /> : <div></div>}
        {selectedTab === 'BOOKMARKS_PROJECTS' ? <UserProjectsBookmarks user={user} /> : <div></div>}
        {selectedTab === 'PROFILE_SETTINGS' ? <PrivacyAndSecurity /> : <div></div>}
      </div>
    </>
  );
}
