const sendReqToServer = async (configObj) => {
  let response;
  let error;
  const { axiosInstance, url, method, requestConfig = {} } = configObj;

  try {
    // console.log(url)
    const res = await axiosInstance[method.toLowerCase()](url, {
      ...requestConfig,
    });
    console.log('Response : ', res);
    response = res.data;
  } catch (err) {
    error = err;
  }

  // console.log(response, error)
  return { response, error };
};

export { sendReqToServer };
