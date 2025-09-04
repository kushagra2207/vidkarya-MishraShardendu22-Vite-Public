import { useState } from 'react';
import './styles/login.css';
import ReCaptchaComponent from '../Recaptcha/ReCaptcha.jsx';
import { sendReqToServer } from '../../Hooks/useAxios';
import { USER, AUTH, axios } from '../../api';
import { useToasts } from './../UI/toast';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import { signInwithGoogle, registerUserLoginViaGoogle } from './../Auth/index';
import { AppStates } from '../../Context/appContext.jsx';
import CloseIcon from '@mui/icons-material/Close';
import { BsEyeSlash, BsEye } from '../../lib/icons.js';
import ReactGA from 'react-ga4';

const Login = ({ setRegister, register }) => {
  const { setuser, setShowLoginPopup } = AppStates();
  // const [disabled, setDisabled] = useState(false);
  const [_isverified, setisverified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [notify] = useToasts();
  const [details, setDetails] = useState({
    email: '',
    password: '',
  });

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const handleLogin = async () => {
    if (!details.email || !details.password) {
      notify({
        type: 'ERROR',
        message: 'Please fill all the fields',
      });
      return;
    } else {
      setLoading(true);
      try {
        const { response, error } = await sendReqToServer({
          axiosInstance: axios,
          url: AUTH.login,
          method: 'PUT',
          requestConfig: {
            data: {
              email: details.email,
              password: details.password,
            },
          },
        });
        if (response?.flag) {
          setuser(response.body?.user);

          //setting token to localstorage
          localStorage.setItem('session', response.body.token);

          notify({
            type: 'SUCCESS',
            message: 'User Login Successful',
          });

          setShowLoginPopup(false);

          // Send event for analytics
          ReactGA.event({
            category: 'Auth',
            action: 'Login Success',
            label: 'Login_event',
          });
        } else {
          notify({
            type: 'ERROR',
            message: error.response.data.error,
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

  const handleGoogleSignin = () => {
    signInwithGoogle().then((userDetails) => {
      if (userDetails.email.includes('@iiitdwd.ac.in')) {
        registerUserLoginViaGoogle(notify, setuser, setShowLoginPopup, userDetails);

        // Send event for analytics
        ReactGA.event({
          category: 'Auth',
          action: 'Login Success',
          label: 'Login_event',
        });
      } else {
        notify({
          type: 'ERROR',
          message: 'Use your college email id only',
        });
      }
    });
  };

  const handleForgotPassword = async () => {
    if (!details.email) {
      notify({
        type: 'ERROR',
        message: 'Please fill you email address',
      });
      return;
    } else {
      setLoading(true);
      try {
        // console.log(details.email)
        const { response, error: _error } = await sendReqToServer({
          axiosInstance: axios,
          url: USER.forgotPassword,
          method: 'PUT',
          requestConfig: {
            data: {
              email: details.email,
            },
          },
        });
        if (response) {
          notify({
            type: 'PROMISE',
            message: 'Requesting service information',
          });
          sleep(2000).then(() => {
            notify({
              type: 'INFO',
              message: 'Check Verification mail in inbox',
            });
          });
        } else {
          notify({
            type: 'ERROR',
            message: 'Error in Password Service',
          });
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
  };
  return (
    <>
      <div className="loginWrapper">
        {/* LOGIN-SIGNUP BUTTONS */}
        <div className="PopupButtons">
          <div className="close_button" title="Close" onClick={() => setShowLoginPopup(false)}>
            <CloseIcon />
          </div>

          <div className="header">
            {/* Login Button */}
            <button
              style={{
                backgroundColor: register ? 'white' : '#FF6E0F',
                color: register ? '#FF6E0F' : 'white',
              }}
              className="header_button_login"
              onClick={() => {
                setRegister(false);
              }}
            >
              Login
            </button>

            {/* Register Button */}
            <button
              style={{
                backgroundColor: register ? '#FF6E0F' : 'white',
                color: register ? 'white' : '#FF6E0F',
              }}
              className="header_button_register"
              onClick={() => {
                setRegister(true);
              }}
            >
              Register
            </button>
          </div>
        </div>

        <div className="Logintitle">Login to Vidkarya !</div>

        <div className="inputDetails">
          {/* Email */}
          <div className="input_title">
            <label htmlFor="name">Email</label>

            <div className="input_box">
              <span className="icon">
                <svg
                  className="fill-current text-gray-500 w-4 h-4 "
                  width="12"
                  height="14"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 13"
                >
                  <path
                    d="M18 2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2h16zm-4.37 9.1L20 16v-2l-5.12-3.9L20 6V4l-10 8L0 4v2l5.12 4.1L0 14v2l6.37-4.9L10 14l3.63-2.9z"
                    fill="black"
                    fillOpacity="0.56"
                  />
                </svg>
              </span>
              <input
                className="input"
                type="email"
                name="email"
                placeholder="Email"
                value={details.email}
                onChange={handleOnChange}
              />
            </div>
          </div>

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
        </div>

        {/* Recaptcha */}
        <div className="recaptcha">
          <ReCaptchaComponent setverified={setisverified} />
        </div>

        {/* Login Btn */}
        <div className="loginBtn">
          <button
            type="submit"
            size="lg"
            // round
            onClick={handleLogin}
          >
            LOGIN
          </button>
        </div>

        {/* Forgot Password Btn */}
        <span className="forgotPass" onClick={handleForgotPassword}>
          {' '}
          Forgot Password ?
        </span>

        <div className="alternative">
          <span className="alt_line"></span>
          <span> OR </span>
          <span className="alt_line"></span>
        </div>

        {/* Google Login Btn */}
        <div className="googlebutton" title="Sign in with Google">
          <button onClick={handleGoogleSignin}>
            <span className="google_svg">
              <svg
                width="20"
                height="20"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                />
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                />
              </svg>
            </span>

            <span className="googletext">Continue with google</span>
          </button>
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

export default Login;
