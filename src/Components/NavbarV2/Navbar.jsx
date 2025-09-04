import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { NAVBAR_ASSET } from '../../Assets/assetImages';
// import Logo from './../../Assets/Images/Navbar/logoWithTitle.svg';
import './Navbar.css';
import { AppStates } from '../../Context/appContext.jsx';
import LoginAndSignup from '../Login/LoginAndSignup';
import ProfileDropdown from './ProfileDropdown/ProfileDropdown';
import { IoGlobeSharp } from 'react-icons/io5';

// Icons
import { BiSearchAlt, BiChevronDown } from 'react-icons/bi';
import { GiHamburgerMenu } from 'react-icons/gi';
import { PiNotebookLight } from 'react-icons/pi';
import { FiBriefcase, FiGithub } from 'react-icons/fi';
import { TbBrandBlogger } from 'react-icons/tb';
import { LuLayoutDashboard } from 'react-icons/lu';
import { PiBooksLight } from 'react-icons/pi';

const Navbar = () => {
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
      <div className="main-nav">
        {/* 1. Logo:Title */}
        <div className="navbarLogo" onClick={(_e) => navigate('/')}>
          <img src={NAVBAR_ASSET.vidNameLogo} alt="logo" />
        </div>

        {/* 2. Menu */}
        <div className={showMediaIcons ? 'nav-menu-link mobile-nav-menu-link' : 'nav-menu-link'}>
          <ul>
            <li>
              <Link to={'/'}>Home</Link>
            </li>
            <li>
              <Link to={'/about'}>About</Link>
            </li>
            <li>
              <Link to={'#'} className="navItemBtnMain">
                <span>Resources</span> <BiChevronDown className="dropdownIcon" />
              </Link>
              <div className="navDropdown">
                <Link to={'/notes'} className="navItemBtn">
                  <PiNotebookLight className="navLogoIcon" /> Notes
                </Link>

                {/* Added Career Page Shardendu Mishra */}
                <Link to={'/career'} className="navItemBtn">
                  <FiBriefcase className="navLogoIcon" /> Career
                </Link>

                <Link to={'/projects'} className="navItemBtn">
                  <FiGithub className="navLogoIcon" /> Projects
                </Link>
                <Link to={'/blogs'} className="navItemBtn">
                  <TbBrandBlogger className="navLogoIcon" /> Blogs
                </Link>
                <Link to={'/courseStr'} className="navItemBtn">
                  <PiBooksLight className="navLogoIcon" /> Structures
                </Link>
                <Link to={'/question-papers'} className="navItemBtn">
                  <PiNotebookLight className="navLogoIcon" /> Q. Papers
                </Link>
                <Link to={'/alumni'} className="navItemBtn">
                  <IoGlobeSharp className="navLogoIcon" /> Alumni
                </Link>
                <div onClick={handleDashboard} className="navItemBtn">
                  <LuLayoutDashboard className="navLogoIcon" /> Dashboard
                </div>
              </div>
            </li>
          </ul>
        </div>

        {/* 3. Search and Start Button */}
        <div className="search-start">
          <ul className="search-start-desktop">
            {/* <li>
              <div action='#' className='nav-search-box'>
                <input className='nav-search-box-input'  type='text' placeholder='Search..' name='search' />
                <button ><BiSearchAlt className='navSearchBtn' /></button>
              </div>
            </li> */}

            {!user ? (
              <button className="navStartBtn" onClick={() => setShowLoginPopup(true)}>
                Sign In
              </button>
            ) : (
              <ProfileDropdown />
            )}
          </ul>

          {/* Hamburger Menu Start  */}
          <div className="hamburger-menu">
            <a href="#" onClick={() => setShowMediaIcons(!showMediaIcons)}>
              <GiHamburgerMenu />
            </a>
          </div>
        </div>
      </div>

      {ShowLoginPopup && <LoginAndSignup />}
    </>
  );
};

export default Navbar;
