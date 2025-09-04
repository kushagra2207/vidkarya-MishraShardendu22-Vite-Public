import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppStates } from '../Context/appContext.jsx';
import { Navbar } from '../Components';

function ProtectRoute({ children }) {
  const navigate = useNavigate();
  const { user, setShowLoginPopup } = AppStates();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkUserToken = useCallback(() => {
    const session = localStorage.getItem('session');

    if (!session || session == 'undefined') {
      setIsLoggedIn(false);
      navigate('/');
      setShowLoginPopup(true);
      return;
    }
    setIsLoggedIn(true);
  }, [navigate, setShowLoginPopup]);

  useEffect(() => {
    checkUserToken();
  }, [checkUserToken, isLoggedIn, user]);

  return (
    <div>{isLoggedIn ? children : <Navbar />}</div>
  );
}

export { ProtectRoute };
