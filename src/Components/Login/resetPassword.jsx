import React from 'react';
import { useState } from 'react';
import './styles/login.css';
import './styles/loginSignup.css';
import ReCaptchaComponent from '../Recaptcha/ReCaptcha.jsx';
import { sendReqToServer } from '../../Hooks/useAxios';
import { useNavigate, useParams } from 'react-router-dom';
import { AUTH, axios } from '../../api';
import { useToasts } from './../UI/toast';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import Navbar from '../NavbarV2/Navbar';
import { BsEyeSlash, BsEye } from '../../lib/icons.js';

const ResetPassword = () => {
  const [disabled, _setDisabled] = useState(false);
  const [isverified, setisverified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [notify] = useToasts();
  const { userid, token } = useParams();
  const [details, setDetails] = useState({
    repassword: '',
    password: '',
  });
  const navigate = useNavigate();

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const handleSubmit = async () => {
    if (details.repassword && details.password && details.password.length < 3) {
      notify({
        type: 'ERROR',
        message: 'Secure your account with a password length exceeding 3 characters',
      });
    }
    if (!details.repassword || !details.password) {
      notify({
        type: 'ERROR',
        message: 'Please fill all the fields',
      });
      return;
    } else if (details.password !== details.repassword) {
      notify({
        type: 'ERROR',
        message: 'Passwords do not match',
      });
      return;
    } else {
      setLoading(true);
      try {
        const { response, error: _error } = await sendReqToServer({
          axiosInstance: axios,
          url: AUTH.resetPassword + `/${userid}/${token}`,
          method: 'PUT',
          requestConfig: {
            data: {
              password: details.password,
            },
          },
        });
        if (response) {
          notify({
            type: 'PROMISE',
            message: 'Request Processed Successfull',
          });
          sleep(2000).then(() => {
            navigate('/auth');
          });
        } else {
          notify({
            type: 'ERROR',
            message: 'Error in processing request',
          });
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
  };

  const handleOnChange = (event) => {
    setDetails({
      ...details,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <Navbar />
      <div className="card">
        <div>
          <div className="Logintitle">Reset Password</div>

          <div className="inputDetails">
            {/* Password */}
            <div className="input_title">
              <label htmlFor="name">Password</label>

              <div className="input_box">
                <span className="icon">
                  <svg
                    className="fill-current text-gray-500 w-4 h-4 "
                    width="12"
                    height="11"
                    viewBox="0 0 12 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.93132 4.17061H11.1535C11.3156 4.17061 11.4711 4.22078 11.5857 4.31009C11.7003 4.39939 11.7646 4.52051 11.7646 4.6468V10.3611C11.7646 10.4874 11.7003 10.6085 11.5857 10.6978C11.4711 10.7871 11.3156 10.8373 11.1535 10.8373H1.37576C1.21368 10.8373 1.05824 10.7871 0.943639 10.6978C0.829033 10.6085 0.764648 10.4874 0.764648 10.3611V4.6468C0.764648 4.52051 0.829033 4.39939 0.943639 4.31009C1.05824 4.22078 1.21368 4.17061 1.37576 4.17061H2.59798V3.69442C2.59798 2.93666 2.98429 2.20994 3.67192 1.67412C4.35956 1.1383 5.29219 0.83728 6.26465 0.83728C7.23711 0.83728 8.16974 1.1383 8.85737 1.67412C9.54501 2.20994 9.93132 2.93666 9.93132 3.69442V4.17061ZM1.98687 5.12299V9.8849H10.5424V5.12299H1.98687ZM5.65354 7.02776H6.87576V7.98014H5.65354V7.02776ZM3.20909 7.02776H4.43132V7.98014H3.20909V7.02776ZM8.09798 7.02776H9.3202V7.98014H8.09798V7.02776ZM8.70909 4.17061V3.69442C8.70909 3.18925 8.45155 2.70477 7.99313 2.34755C7.53471 1.99034 6.91296 1.78966 6.26465 1.78966C5.61634 1.78966 4.99459 1.99034 4.53616 2.34755C4.07774 2.70477 3.8202 3.18925 3.8202 3.69442V4.17061H8.70909Z"
                      fill="black"
                      fillOpacity="0.56"
                    />
                  </svg>
                </span>
                <div className="flex w-full justify-between">
                  <input
                    className="input"
                    type={passwordVisible ? 'text' : 'password'}
                    name="password"
                    placeholder="Password"
                    value={details.password}
                    onChange={handleOnChange}
                  />
                  <button onClick={() => setPasswordVisible(!passwordVisible)}>
                    {passwordVisible ? <BsEyeSlash /> : <BsEye />}
                  </button>
                </div>
              </div>
            </div>

            {/* Re-Enter Password */}
            <div className="input_title">
              <label htmlFor="name">Re-enter Password</label>

              <div className="input_box">
                <span className="icon">
                  <svg
                    className="fill-current text-gray-500 w-4 h-4 "
                    width="12"
                    height="11"
                    viewBox="0 0 12 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.93132 4.17061H11.1535C11.3156 4.17061 11.4711 4.22078 11.5857 4.31009C11.7003 4.39939 11.7646 4.52051 11.7646 4.6468V10.3611C11.7646 10.4874 11.7003 10.6085 11.5857 10.6978C11.4711 10.7871 11.3156 10.8373 11.1535 10.8373H1.37576C1.21368 10.8373 1.05824 10.7871 0.943639 10.6978C0.829033 10.6085 0.764648 10.4874 0.764648 10.3611V4.6468C0.764648 4.52051 0.829033 4.39939 0.943639 4.31009C1.05824 4.22078 1.21368 4.17061 1.37576 4.17061H2.59798V3.69442C2.59798 2.93666 2.98429 2.20994 3.67192 1.67412C4.35956 1.1383 5.29219 0.83728 6.26465 0.83728C7.23711 0.83728 8.16974 1.1383 8.85737 1.67412C9.54501 2.20994 9.93132 2.93666 9.93132 3.69442V4.17061ZM1.98687 5.12299V9.8849H10.5424V5.12299H1.98687ZM5.65354 7.02776H6.87576V7.98014H5.65354V7.02776ZM3.20909 7.02776H4.43132V7.98014H3.20909V7.02776ZM8.09798 7.02776H9.3202V7.98014H8.09798V7.02776ZM8.70909 4.17061V3.69442C8.70909 3.18925 8.45155 2.70477 7.99313 2.34755C7.53471 1.99034 6.91296 1.78966 6.26465 1.78966C5.61634 1.78966 4.99459 1.99034 4.53616 2.34755C4.07774 2.70477 3.8202 3.18925 3.8202 3.69442V4.17061H8.70909Z"
                      fill="black"
                      fillOpacity="0.56"
                    />
                  </svg>
                </span>
                <input
                  className="input"
                  type={passwordVisible ? 'text' : 'password'}
                  name="repassword"
                  placeholder="Re-Enter the Password"
                  value={details.repassword}
                  onChange={handleOnChange}
                />
              </div>
            </div>
          </div>

          {/* Recaptcha */}
          <div className="recaptcha">
            <ReCaptchaComponent setverified={setisverified} />
          </div>

          {/* Submit Btn */}
          <div className="loginBtn">
            <button
              type="submit"
              disabled={!disabled && !isverified}
              size="lg"
              //round
              onClick={handleSubmit}
            >
              SUBMIT
            </button>
          </div>
        </div>
      </div>
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 5,
        }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default ResetPassword;
