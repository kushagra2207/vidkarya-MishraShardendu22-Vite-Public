import { useState } from 'react';
import './styles/loginSignup.css';
import Login from './login';
import Register from './Register';

function LoginAndSignup() {
  const [register, setRegister] = useState(false);

  return (
    <div className="popupWrapper">
      {register ? (
        <Register setRegister={setRegister} register={register} />
      ) : (
        <Login setRegister={setRegister} register={register} />
      )}
    </div>
  );
}

export default LoginAndSignup;
