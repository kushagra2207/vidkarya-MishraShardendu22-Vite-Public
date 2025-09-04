import React, { useEffect, useState, useCallback } from 'react';
import { sendReqToServer } from '../../Hooks/useAxios';
import { AUTH, axios } from '../../api';
import { useToasts } from '../../Components/UI/toast';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import { useNavigate, useParams } from 'react-router-dom';

const Verify = () => {
  const [loading, setLoading] = useState(false);
  const [notify] = useToasts();
  const { userid, token } = useParams();
  const navigate = useNavigate();
  
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const handleArrival = useCallback(async () => {
    try {
      setLoading(true);
      const { response, error } = await sendReqToServer({
        axiosInstance: axios,
        url: AUTH.emailVerify + `/${userid}/${token}`,
        method: 'PUT',
        requestConfig: {},
      });
      setLoading(false);
      if (response) {
        notify({
          type: 'PROMISE',
          message: 'User verified successfully',
        });
      } else if (error) {
        notify({
          type: 'ERROR',
          message: 'Error in verifing',
        });
      }
      sleep(2000).then(() => navigate('/auth'));
    } catch (_error) {
      console.log(_error);
    }
  }, [userid, token, notify, navigate]);
  
  useEffect(() => {
    handleArrival();
  }, [handleArrival]);

  return (
    <>
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

export default Verify;
