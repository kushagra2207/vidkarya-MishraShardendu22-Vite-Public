import React, { useEffect as _useEffect, useState as _useState } from 'react';
import { useToasts } from '../../../Components/UI/toast';
import { USER, axios } from '../../../api';
import { sendReqToServer } from '../../../Hooks/useAxios';
import { FcGoogle } from 'react-icons/fc';
import { BsGithub, BsTwitter, BsLinkedin } from 'react-icons/bs';
import { AppStates } from '../../../Context/appContext.jsx';
import './PrivacySecurity.css';
import './Responsive.css';

function PrivacyAndSecurity() {
  //context

  const { user, setuser, setShowLoginPopup: _setShowLoginPopup } = AppStates();

  const [notify] = useToasts();
  const email = user?.email;
  const id = user?._id;

  // Changes Mail Privacy: Public 🔀 Private
  const _handleMailPrivacy = async () => {
    try {
      const { response } = await sendReqToServer({
        axiosInstance: axios,
        url: USER.isMailPublic.replace(':userid', id),
        method: 'PUT',
      });
      if (response) {
        setuser((prevData) => ({ ...prevData, public: !prevData.public }));
      }
    } catch {
      notify({
        type: 'ERROR',
        message: 'Error!',
      });
    }
  };

  // Delete Account
  const handleDelete = async () => {
    try {
      const { response } = await sendReqToServer({
        axiosInstance: axios,
        url: USER.deactivate.replace(':userid', id),
        method: 'PUT',
      });
      if (response.status === 'success') {
        notify({
          type: 'SUCCESS',
          message: 'Account Deleted',
        });
      }
    } catch {
      
      notify({
        type: 'ERROR',
        message: 'Error!',
      });
    }
  };

  // Reset Password
  const handleForgotPassword = async () => {
    try {
      const { response } = await sendReqToServer({
        axiosInstance: axios,
        url: USER.forgotPassword,
        method: 'PUT',
        requestConfig: {
          data: {
            email,
          },
        },
      });
      if (response.status === 'success') {
        notify({
          type: 'SUCCESS',
          message: 'A link to reset your password has been sent to you email',
        });
      }
    } catch {
      notify({
        type: 'ERROR',
        message: 'Error!',
      });
    }
  };

  return (
    <>
      <div className="settingsWrapper w-full">
        {/*     P R I V A C Y  SETTINGS     */}
        <span className="privacySecurityHeader">Privacy Settings</span>

        <div className="privacyBox">
          {/* MAIL */}
          <div className="privacyItem disable-component">
            <span className="privacyItemText">
              <span className="itemTextHead">Mail</span>
              <span className="itemTextDesc">Make your email visible to other users</span>
            </span>
            <span className="privacyItemInput">
              <select name="mailPrivacy" id="" className="pricacySelectionBox">
                <option value="">Public</option>
                <option value="">Private</option>
              </select>
            </span>
          </div>

          {/* COMMENTS ❌*/}
          <div className="privacyItem commentsPrivacy disable-component">
            <span className="privacyItemText">
              <span className="itemTextHead">Comments</span>
              <span className="itemTextDesc">Auto delete your comments after specific time</span>
            </span>
            <span className="privacyItemInput">
              <select name="mailPrivacy" id="" className="pricacySelectionBox">
                <option value="">1 Month</option>
                <option value="">3 Months</option>
                <option value="">6 Months</option>
              </select>
            </span>
          </div>

          {/* SOCIAL ACCOUNTS LINK ❌ */}
          <div className="privacyItemSocial">
            <span className="privacyItemText">
              <span className="itemTextHead">Connect Social Accounts</span>
              <span className="itemTextDesc">Mount your account with social services</span>
            </span>

            {/* CONNECTED ACCOUNTS*/}
            <div className="connectedAccountsBox">
              <FcGoogle size={40} />

              <div className="accDetailsBox">
                <div className="accDetailsText">
                  <span className="accountTextHead">{user?.name}</span>
                  <span className="accountTextDesc">{user?.email}</span>
                </div>
                {/* <button className="disconnectSocialBtn">Disconnect</button> */}
              </div>
            </div>

            {/* CONNECT MORE ACCOUNTS */}
            <div className="connectMoreAccounts">
              <span className="connectMoreTextBox">Connect with more services </span>
              <div className="moreSocialAccountsBox">
                <div className="MoreSocialAccountIcon">
                  {' '}
                  <BsGithub size={30} />{' '}
                </div>
                <div className="MoreSocialAccountIcon">
                  {' '}
                  <BsTwitter size={30} color={'#158FE6'} />{' '}
                </div>
                <div className="MoreSocialAccountIcon">
                  {' '}
                  <BsLinkedin size={30} color={'#0288D1'} />{' '}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*  DATA VISIBILITY ❌*/}
        <div className="dataPrivacySettings">
          <div className="dataPrivacyItem">
            <span className="privacyItemText">
              <span className="itemTextHead">Data</span>
              <span className="itemTextDesc">
                Make your content private to your Institute, Branch etc.
              </span>
            </span>
            <button className="dataPrivacyBtn">Disabled</button>
          </div>

          <div className="dataVisibilityOptions">
            {/* NOTES VISIBILITY */}
            <div className="dataVisibilityItem">
              <span className="privacyItemText">
                <span className="itemTextHead">Notes</span>
                <span className="itemTextDesc">Change your Notes visibility</span>
              </span>
              <div className="privacyItemInput">
                <select name="mailPrivacy" id="" className="pricacySelectionBox">
                  <option value="">Public</option>
                  <option value="">Institute</option>
                  <option value="">Branch</option>
                </select>
              </div>
            </div>

            {/* BLOG VISIBILITY */}
            <div className="dataVisibilityItem">
              <span className="privacyItemText">
                <span className="itemTextHead">Blogs</span>
                <span className="itemTextDesc">Change your Blogs visibility</span>
              </span>
              <div className="privacyItemInput">
                <select name="mailPrivacy" id="" className="pricacySelectionBox">
                  <option value="">Public</option>
                  <option value="">Institute</option>
                  <option value="">Branch</option>
                </select>
              </div>
            </div>

            {/* PROJECTS VISIBILITY */}
            <div className="dataVisibilityItem">
              <span className="privacyItemText">
                <span className="itemTextHead">Projects</span>
                <span className="itemTextDesc">Change your Projects visibility</span>
              </span>
              <div className="privacyItemInput">
                <select name="mailPrivacy" id="" className="pricacySelectionBox">
                  <option value="">Public</option>
                  <option value="">Institute</option>
                  <option value="">Branch</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/*  S E C U R I T Y   SETTINGS */}
        <span className="privacySecurityHeader">Security Settings</span>
        <div className="securityBox">
          {/* CHANGE PASSWORD ✅*/}
          <div className="securityItem">
            <div className="securityItemText">
              <span className="itemTextHead">Change Password</span>
              <span className="itemTextDesc">Change Password for this account</span>
            </div>
            <button className="changePassBtn" onClick={handleForgotPassword}>
              Change Password
            </button>
          </div>

          {/* ADD PASSWORD ❌*/}
          <div className="securityItem">
            <div className="securityItemText">
              <span className="itemTextHead">Add Password</span>
              <span className="itemTextDesc">
                Add Password if you have signed up via Social Account
              </span>
            </div>
            <button className="addPasswordBtn">Add Password</button>
          </div>

          {/*  SIGN OUT FROM ALL DEVICES ❌*/}
          <div className="securityItem">
            <div className="securityItemText">
              <span className="itemTextHead">Global Sign Out</span>
              <span className="itemTextDesc">Sign Out from all devices</span>
            </div>
            <button className="signOutFromAllBtn">Global Sign Out</button>
          </div>

          {/* DELETE ACCOUNT ✅*/}
          <div className="securityItem">
            <div className="securityItemText">
              <span className="itemTextHead">Delete Account</span>
              <span className="itemTextDesc">
                By Deleting this account you will loose your data.
              </span>
            </div>
            <button className="deleteAccountBtn" onClick={handleDelete}>
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PrivacyAndSecurity;
