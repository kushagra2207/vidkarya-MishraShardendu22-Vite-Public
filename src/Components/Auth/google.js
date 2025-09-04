import firebaseApp from '../../Firebase/firebaseInit';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect as _signInWithRedirect } from 'firebase/auth';
import { sendReqToServer } from '../../Hooks/useAxios';
import { AUTH, axios } from '../../api';

// Initialize Firebase
const auth = getAuth(firebaseApp);

const Provider = new GoogleAuthProvider();

const signInwithGoogle = () => {
  return new Promise((resolve, reject) => {
    signInWithPopup(auth, Provider)
      .then((res) => {
        const userName = res.user.displayName;
        const email = res.user.email;
        const photoURL = res.user.photoURL;
        const userDetails = {
          userName: userName,
          email: email,
          photoURL: photoURL,
        };

        resolve(userDetails);
      })
      .catch((e) => {
        console.log(e.message);
        reject(e);
      });
  });
};

const registerUserLoginViaGoogle = async (notify, setuser, setShowLoginPopup, userDetails) => {
  const { email, userName, photoURL } = userDetails;

  const { response, error: _error } = await sendReqToServer({
    axiosInstance: axios,
    url: AUTH.googleLogin,
    method: 'POST',
    requestConfig: {
      data: {
        email: email,
        name: userName,
        dpLink: photoURL,
      },
    },
  });
  if (response?.flag) {
    localStorage.setItem('session', response.body.token);
    // setuser(response.body.userData);
    // window.location.reload();
    setuser(response.body?.userData);
    setShowLoginPopup(false);

    notify({
      type: 'SUCCESS',
      message: 'User Login Successfull',
    });
  } else {
    notify({
      type: 'ERROR',
      message: 'Error in User Login',
    });
  }
};

export { signInwithGoogle, registerUserLoginViaGoogle };
