import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function useFetch(url) {
  const [data, setdata] = useState(null);
  const [err, seterr] = useState(undefined);
  const [loading, setloading] = useState(false);

  // console.log("enter");
  useEffect(() => {
    setloading(true);

    axios
      .get(url)
      .then((res) => {
        setdata(res.data);
      })
      .catch((err) => {
        seterr(err);
        setloading(false);
      })
      .finally(() => {
        setloading(false);
      });
  }, [url]);

  return { data, loading, err };
}
