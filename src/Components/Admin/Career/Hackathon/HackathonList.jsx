import React, { useState, useEffect } from 'react';
import { axios, CAREER } from '../../../../api';
import { sendReqToServer } from '../../../../Hooks/useAxios';
import HackathonCard from './HackathonCard';

const HackathonList = () => {
  const [hackathons, setHackathons] = useState([]);

  const fetchHackathons = async () => {
    try {
      const { response } = await sendReqToServer({
        axiosInstance: axios,
        url: CAREER.getHackathon,
        method: 'GET',
      });
      setHackathons(response.data);
    } catch (error) {
      console.error('Error fetching hackathons:', error);
    }
  };

  useEffect(() => {
    fetchHackathons();
  }, []);

  const handleUpdate = () => {
    fetchHackathons();
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mx-6">
      <h2 className="text-2xl font-semibold mb-4 text-black">Available Hackathons</h2>
      <div className="flex flex-wrap gap-6 justify-start">
        {hackathons.length > 0 ? (
          hackathons.map((hackathon) => (
            <HackathonCard key={hackathon._id} hackathon={hackathon} onUpdate={handleUpdate} />
          ))
        ) : (
          <p className="w-full text-center text-gray-500">No hackathons available.</p>
        )}
      </div>
    </div>
  );
};

export default HackathonList;
