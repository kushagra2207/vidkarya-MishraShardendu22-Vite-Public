import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { NAVBAR_ASSET } from '../../Assets/assetImages';
// import Logo from './../../Assets/Images/Navbar/logoWithTitle.svg';
import styles from './homeNav.module.css';
import { AppStates } from '../../Context/appContext.jsx';
import LoginAndSignup from '../Login/LoginAndSignup';
import ProfileDropdown from './ProfileDropdown/ProfileDropdown';
import { IoGlobeSharp } from 'react-icons/io5';

// Icons
import { BiChevronDown } from 'react-icons/bi';
import { GiHamburgerMenu } from 'react-icons/gi';
import { PiNotebookLight } from 'react-icons/pi';
import { FiBriefcase, FiGithub } from 'react-icons/fi';
import { TbBrandBlogger } from 'react-icons/tb';
import { LuLayoutDashboard } from 'react-icons/lu';
import { PiBooksLight } from 'react-icons/pi';

const HomeNav = () => {
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  const { ShowLoginPopup, setShowLoginPopup, user } = AppStates();
  const navigate = useNavigate();

  function handleDashboard() {
    if (!user) {
      setShowLoginPopup(true);
      return;
    }
    navigate('/dashboard');
  }

  return (
    <>
      <div className={styles.mainNav}>
        {/* 1. Logo:Title */}
        <div className={styles.navbarLogo} onClick={(_e) => navigate('/')}>
          <img src={NAVBAR_ASSET.vidNameLogo} alt="logo" />
        </div>

        {/* 2. Menu */}
        <div
          className={
            showMediaIcons
              ? `${styles.navMenuLink} ${styles.mobileNavMenuLink}`
              : `${styles.navMenuLink}`
          }
        >
          <ul>
            <li>
              <Link to={'/'}>Home</Link>
            </li>
            <li>
              <Link to={'/about'}>About</Link>
            </li>
            <li>
              <Link to={'#'} className={styles.navItemBtnMain}>
                <span>Resources</span> <BiChevronDown className={styles.dropdownIcon} />
              </Link>

              <div className={styles.navDropdown}>
                <Link to={'/notes'} className={styles.navItemBtn}>
                  <PiNotebookLight className={styles.navLogoIcon} /> Notes
                </Link>

                {/* Added Career Page Shardendu Mishra */}
                <Link to={'/career'} className="navItemBtn">
                  <FiBriefcase className="navLogoIcon" /> Career
                </Link>

                <Link to={'/projects'} className={styles.navItemBtn}>
                  <FiGithub className={styles.navLogoIcon} /> Projects
                </Link>
                <Link to={'/blogs'} className={styles.navItemBtn}>
                  <TbBrandBlogger className={styles.navLogoIcon} /> Blogs
                </Link>
                <Link to={'/courseStr'} className="navItemBtn">
                  <PiBooksLight className="navLogoIcon" /> Structures
                </Link>
                <Link to={'/question-papers'} className={styles.navItemBtn}>
                  <PiNotebookLight className={styles.navLogoIcon} /> Q. Papers
                </Link>
                <Link to={'/alumni'} className="navItemBtn">
                  <IoGlobeSharp className="navLogoIcon" /> Alumni
                </Link>
                <div onClick={handleDashboard} className={styles.navItemBtn}>
                  <LuLayoutDashboard className={styles.navLogoIcon} /> Dashboard
                </div>
              </div>
            </li>
          </ul>
        </div>

        {/* 3. Search and Start Button */}
        <div className={styles.searchStart}>
          <ul className={styles.searchStartDesktop}>
            {/* <li>
              <div action='#' className={styles.navSearchBox}>
                <input className={styles.navSearchBoxInput}  type='text' placeholder='Search..' name='search' />
                <button ><BiSearchAlt className={styles.navSearchBtn} /></button>
              </div>
            </li> */}

            {!user ? (
              <button className={styles.navStartBtn} onClick={() => setShowLoginPopup(true)}>
                Sign In
              </button>
            ) : (
              <ProfileDropdown />
            )}
          </ul>

          {/* Hamburger Menu Start  */}
          <div className={styles.hamburgerMenu}>
            <button
              className={styles.hamburgerButton}
              onClick={() => setShowMediaIcons(!showMediaIcons)}
            >
              <GiHamburgerMenu />
            </button>
          </div>
        </div>
      </div>

      {ShowLoginPopup && <LoginAndSignup />}
    </>
  );
};

export default HomeNav;
