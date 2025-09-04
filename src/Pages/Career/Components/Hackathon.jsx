import { sendReqToServer } from '../../../Hooks/useAxios';
import React, { useState, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import { axios, CAREER } from '../../../api';
import HackathonCard from './Hackathon/Card';
import Skeleton from './Skeleton';

const HackathonPage = () => {
  const [hackathons, setHackathons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 8;

  const fetchHackathons = async () => {
    setLoading(true);
    try {
      const { response } = await sendReqToServer({
        axiosInstance: axios,
        url: CAREER.getHackathon,
        method: 'GET',
      });

      if (response) {
        setHackathons(response.data);
        setTotalPages(Math.ceil(response.data.length / itemsPerPage));
      }
    } catch (error) {
      console.error('Error fetching hackathons:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHackathons();
  }, []);

  const handlePagination = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentHackathons = hackathons.slice(firstIndex, lastIndex);

  return (
    <div className="w-[90%] mx-auto px-4 pb-10">
      <div className="text-center">
        <p className="heading">Discover Hackathons</p>
        <p className="text-[#838383] text-3xl mb-10">
          From weekend warriors to coding champions - your next hackathon adventure starts here.
        </p>
      </div>
      <div className="flex flex-wrap justify-between gap-6 py-10">
        {loading
          ? [...Array(itemsPerPage)].map((_, index) => (
              <div key={`skeleton-${index}`} className="w-full md:w-[48%]">
                <Skeleton />
              </div>
            ))
          : currentHackathons.map((hackathon, index) => (
              <div key={hackathon._id} className="w-full md:w-[48%]">
                <HackathonCard hackathon={hackathon} index={firstIndex + index} />
              </div>
            ))}
      </div>
      {!loading && totalPages > 1 && (
        <div className="flex justify-center p-1 my-4">
          <Pagination count={totalPages} color="primary" onChange={handlePagination} />
        </div>
      )}
    </div>
  );
};

export default HackathonPage;
