import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
// import tempLogo from "../../Assets/Images/Footer/temp-logo.png";
import { BsLinkedin, BsFacebook, BsInstagram, BsGoogle } from 'react-icons/bs';
import Logo from '../UI/Logo';

function Footer() {
  return (
    <div className="footerWrapper">
      <div className="footerTop">
        {/*      L O G O      */}
        <div className="logo-box">
          <div>
            <Logo />
          </div>
          {/* <p className="mt-8 font-bold text-5xl -ml-5">VIDKARYA</p> */}
        </div>

        {/*      L I N K S       */}
        <div className="footerLinks">
          {/*     Quick Links    */}
          <div className="footerLinksCol1">
            <span className="footerLinkHead">Quick Links</span>
            <div className="footerLinksList">
              <Link to="/notes" className="footerLinksListItem">
                Notes
              </Link>
              <Link to="/blogs" className="footerLinksListItem">
                Blogs
              </Link>
              <Link to="/projects" className="footerLinksListItem">
                Projects
              </Link>
              <Link to="/dashboard" className="footerLinksListItem">
                Dashboard
              </Link>
              <Link to="#" className="footerLinksListItem">
                Prev Yr Papers
              </Link>
            </div>
          </div>

          {/*     About    */}
          <div className="footerLinksCol2">
            <span className="footerLinkHead">About</span>
            <div className="footerLinksList">
              <Link to="#" className="footerLinksListItem">
                Website
              </Link>
              <Link to="#" className="footerLinksListItem">
                Developers
              </Link>
              <Link to="#" className="footerLinksListItem">
                Company
              </Link>
              <Link to="#" className="footerLinksListItem">
                Partners
              </Link>
              <Link to="#" className="footerLinksListItem">
                Content
              </Link>
            </div>
          </div>

          {/*     Contact    */}
          <div className="footerLinksCol2">
            <span className="footerLinkHead">Contact & Support</span>
            <div className="footerLinksList">
              <Link to="/about" className="footerLinksListItem">
                Contact Us
              </Link>
              <Link to="#" className="footerLinksListItem">
                Feedback
              </Link>
              <Link to="#" className="footerLinksListItem">
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/*     B O T T O M     B A R    */}
      <hr className="bottomBarTopBorder" />
      <div className="footerBottomBar">
        <span className="footerCopyrightText">© Copyright Vidkarya | All rights reserved</span>
        <span className="footerCopyrightText">v2.0.1</span>
        <div className="footerSocialLinks">
          <span className="footerSocialText">Contact Us</span>
          <div className="footerSocialLogoWrapper">
            <Link to="#">
              <BsLinkedin className="foooterSocialLogo" size={25} />
            </Link>
            <Link to="#">
              <BsFacebook className="foooterSocialLogo" size={25} />
            </Link>
            <Link to="#">
              <BsInstagram className="foooterSocialLogo" size={25} />
            </Link>
            <Link to="#">
              <BsGoogle className="foooterSocialLogo" size={25} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
