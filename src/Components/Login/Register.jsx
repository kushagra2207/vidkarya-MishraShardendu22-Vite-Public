import React from 'react';
import { useState } from 'react';
import './styles/register.css';
import ReCaptchaComponent from '../Recaptcha/ReCaptcha.jsx';
import { sendReqToServer } from '../../Hooks/useAxios';
import { USER, axios } from '../../api';
import { useToasts } from './../UI/toast';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import { signInwithGoogle, registerUserLoginViaGoogle } from './../Auth/index';
import { AppStates } from '../../Context/appContext.jsx';
import CloseIcon from '@mui/icons-material/Close';
import { BsEyeSlash, BsEye } from '../../lib/icons.js';
import ReactGA from 'react-ga4';

const Register = (props) => {
  //user context api
  const { setuser, setShowLoginPopup } = AppStates();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { register, setRegister } = props;
  const [_isverified, setisverified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notify] = useToasts();
  const [details, setDetails] = useState({
    name: '',
    email: '',
    password: '',
  });

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const handleSignup = async () => {
    if (details.password && details.password.length < 3) {
      notify({
        type: 'ERROR',
        message: 'Secure your account with a password length exceeding 3 characters',
      });
      return;
    }
    if (!details.name || !details.email || !details.password) {
      notify({
        type: 'ERROR',
        message: 'Please fill all the fields',
      });
      return;
    }

    if (details.email && !details.email.includes('@iiitdwd')) {
      notify({
        type: 'ERROR',
        message: 'Use your collage email id only',
      });
      return;
    }

    setLoading(true);
    try {
      const { response, error } = await sendReqToServer({
        axiosInstance: axios,
        url: USER.create,
        method: 'POST',
        requestConfig: {
          data: {
            name: details.name,
            email: details.email,
            password: details.password,
          },
        },
      });
      // console.log(response, error)
      if (response?.flag) {
        setuser(response.body?.newUser);

        notify({
          type: 'SUCCESS',
          message: 'User Registered Successfully',
        });

        sleep(2000).then(() => {
          notify({
            type: 'INFO',
            message: 'Check Verification mail in inbox',
          });
        });

        // Send event for analytics
        ReactGA.event({
          category: 'Auth',
          action: 'Signup Success',
          label: 'Signup_event',
        });
      } else {
        notify({
          type: 'ERROR',
          message: error.response.data.message,
        });
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleOnChange = (event) => {
    setDetails({
      ...details,
      [event.target.name]: event.target.value,
    });
  };

  const handleGoogleSignin = async () => {
    signInwithGoogle().then((userDetails) => {
      registerUserLoginViaGoogle(notify, setuser, setShowLoginPopup, userDetails);

      // Send event for analytics
      ReactGA.event({
        category: 'Auth',
        action: 'Signup Success',
        label: 'Signup_event',
      });
    });
  };

  return (
    <>
      <div className="signupWrapper">
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

        <div className="registerTitle">Register on Vidkarya !</div>
        <div className="registerDetails">
          <div>
            {/* Name */}
            <div className="input_title">
              <label htmlFor="name">Name</label>
              <div className="input_box">
                <span className="icon">
                  <svg
                    className="fill-current text-gray-500 w-4 h-4 "
                    width="12"
                    height="13"
                    viewBox="0 0 12 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.83463 0.785156C5.23237 0.785156 4.64364 0.963746 4.14288 1.29834C3.64212 1.63294 3.25183 2.10851 3.02136 2.66492C2.79088 3.22134 2.73058 3.8336 2.84808 4.42428C2.96557 5.01497 3.25558 5.55754 3.68144 5.9834C4.1073 6.40926 4.64988 6.69928 5.24057 6.81677C5.83125 6.93427 6.44351 6.87396 6.99992 6.64349C7.55634 6.41302 8.03191 6.02272 8.36651 5.52197C8.7011 5.02121 8.87969 4.43248 8.87969 3.83022C8.87969 3.02262 8.55887 2.24809 7.98781 1.67703C7.41675 1.10597 6.64223 0.785156 5.83463 0.785156ZM5.83463 5.65726C5.47328 5.65726 5.12004 5.5501 4.81958 5.34935C4.51913 5.14859 4.28495 4.86324 4.14667 4.5294C4.00838 4.19555 3.9722 3.82819 4.0427 3.47378C4.11319 3.11937 4.2872 2.79382 4.54272 2.53831C4.79823 2.28279 5.12378 2.10878 5.47819 2.03829C5.8326 1.96779 6.19996 2.00397 6.53381 2.14226C6.86765 2.28054 7.153 2.51472 7.35376 2.81517C7.55451 3.11563 7.66167 3.46887 7.66167 3.83022C7.66167 4.31478 7.46918 4.77949 7.12654 5.12213C6.7839 5.46477 6.31919 5.65726 5.83463 5.65726ZM11.3157 12.3564V11.7474C11.3157 10.6167 10.8666 9.53241 10.0671 8.73292C9.26763 7.93344 8.1833 7.48429 7.05265 7.48429H4.6166C3.48596 7.48429 2.40163 7.93344 1.60215 8.73292C0.802661 9.53241 0.353516 10.6167 0.353516 11.7474V12.3564H1.57154V11.7474C1.57154 10.9398 1.89236 10.1653 2.46342 9.5942C3.03448 9.02314 3.809 8.70232 4.6166 8.70232H7.05265C7.86026 8.70232 8.63478 9.02314 9.20584 9.5942C9.7769 10.1653 10.0977 10.9398 10.0977 11.7474V12.3564H11.3157Z"
                      fill="black"
                      fillOpacity="0.56"
                    />
                  </svg>
                </span>
                <input
                  className="input"
                  type="name"
                  name="name"
                  placeholder="Name"
                  value={details.name}
                  onChange={handleOnChange}
                />
              </div>
            </div>

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

            {/* Refferal Code */}
            {/* <div className="input_title">

              <label htmlFor="name">
                Referral Code
              </label>

              <div className="input_box">
                <span className="icon">
                  <svg
                    className="fill-current text-gray-500 w-4 h-4 "
                    width="14"
                    height="16"
                    viewBox="0 0 14 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.49883 5.505C3.49883 5.37239 3.56027 5.24521 3.66963 5.15145C3.77899 5.05768 3.92731 5.005 4.08197 5.005H5.58647L5.84422 3.903C5.87831 3.77615 5.96876 3.66571 6.09633 3.59514C6.2239 3.52457 6.37855 3.49944 6.52739 3.52509C6.67623 3.55075 6.80753 3.62516 6.89339 3.73252C6.97925 3.83987 7.01289 3.97171 6.98717 4.1L6.77724 5.005H7.92019L8.17677 3.904C8.21202 3.77841 8.30257 3.66939 8.42948 3.59978C8.55638 3.53017 8.70978 3.50537 8.85754 3.53058C9.00529 3.55578 9.13593 3.62904 9.22209 3.73501C9.30825 3.84097 9.34324 3.97141 9.31973 4.099L9.1098 5.005H10.2061C10.3608 5.005 10.5091 5.05768 10.6184 5.15145C10.7278 5.24521 10.7892 5.37239 10.7892 5.505C10.7892 5.63761 10.7278 5.76479 10.6184 5.85855C10.5091 5.95232 10.3608 6.005 10.2061 6.005H8.87654L8.64329 7.005H9.91453C10.0692 7.005 10.2175 7.05768 10.3269 7.15145C10.4362 7.24521 10.4977 7.37239 10.4977 7.505C10.4977 7.63761 10.4362 7.76478 10.3269 7.85855C10.2175 7.95232 10.0692 8.005 9.91453 8.005H8.4112L8.15695 9.098C8.12222 9.22416 8.03169 9.33383 7.90448 9.40387C7.77726 9.4739 7.62329 9.49884 7.47504 9.47342C7.3268 9.448 7.19586 9.3742 7.10984 9.2676C7.02383 9.16099 6.98946 9.02991 7.014 8.902L7.22159 8.005H6.07631L5.82089 9.098C5.80819 9.16422 5.78008 9.22757 5.73822 9.28428C5.69636 9.34098 5.64162 9.38988 5.57725 9.42806C5.51288 9.46624 5.44021 9.49292 5.36357 9.50651C5.28692 9.5201 5.20787 9.52032 5.13112 9.50716C5.05437 9.494 4.9815 9.46773 4.91684 9.4299C4.85219 9.39208 4.79707 9.34349 4.75479 9.28702C4.7125 9.23055 4.6839 9.16736 4.6707 9.10121C4.6575 9.03506 4.65996 8.96731 4.67794 8.902L4.88787 8.005H3.7939C3.63924 8.005 3.49092 7.95232 3.38156 7.85855C3.2722 7.76478 3.21076 7.63761 3.21076 7.505C3.21076 7.37239 3.2722 7.24521 3.38156 7.15145C3.49092 7.05768 3.63924 7.005 3.7939 7.005H5.11996L5.35322 6.005H4.08197C3.92731 6.005 3.77899 5.95232 3.66963 5.85855C3.56027 5.76479 3.49883 5.63761 3.49883 5.505ZM7.45485 7.005L7.6881 6.005H6.54282L6.30956 7.005H7.45485ZM2.33256 0H11.6674C12.2861 0 12.8794 0.210714 13.3168 0.585786C13.7542 0.960859 14 1.46957 14 2V13.501C14 13.6336 13.9386 13.7608 13.8292 13.8546C13.7198 13.9483 13.5715 14.001 13.4169 14.001H1.16628C1.16659 14.266 1.2896 14.5201 1.50829 14.7075C1.72697 14.8948 2.02344 15 2.33256 15H13.4169C13.5715 15 13.7198 15.0527 13.8292 15.1464C13.9386 15.2402 14 15.3674 14 15.5C14 15.6326 13.9386 15.7598 13.8292 15.8536C13.7198 15.9473 13.5715 16 13.4169 16H2.33256C1.71392 16 1.12063 15.7893 0.68319 15.4142C0.245751 15.0391 0 14.5304 0 14V2C0 1.46957 0.245751 0.960859 0.68319 0.585786C1.12063 0.210714 1.71392 0 2.33256 0ZM1.16628 13.001H12.8337V2C12.8337 1.73478 12.7108 1.48043 12.4921 1.29289C12.2734 1.10536 11.9768 1 11.6674 1H2.33256C2.02324 1 1.72659 1.10536 1.50787 1.29289C1.28915 1.48043 1.16628 1.73478 1.16628 2V13.001Z"
                      fill="black"
                      fillOpacity="0.56"
                    />
                  </svg>
                </span>
                <input className="input"

                  type="code"
                  name="code"
                  placeholder="Referral Code (optional)"
                />
              </div>
            </div> */}
          </div>
        </div>

        {/* ReCaptcha */}
        <div className="recaptcha">
          <ReCaptchaComponent setverified={setisverified} />
        </div>

        {/* Sign-Up Btn */}
        <div className="registerBtn">
          <button
            type="submit"
            // disabled={!disabled && !isverified}
            size="lg"
            //round
            onClick={handleSignup}
          >
            REGISTER
          </button>
        </div>

        {/* Login Redirect */}
        <div className="alreadyHvAcc">
          <span>
            Already have an account?&nbsp;
            <span
              style={{ fontWeight: 'bold' }}
              onClick={() => {
                setRegister(false);
              }}
            >
              Login
            </span>
          </span>
        </div>

        <div className="alternative">
          <span className="alt_line"></span>
          <span> OR </span>
          <span className="alt_line"></span>
        </div>

        {/* Login with Google */}
        <div className="googlebutton" title="Sign Up with Google">
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

            <span className="googletext">Login with google</span>
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

export default Register;
