import React from 'react';
import { FaCalendar, FaExternalLinkAlt, FaMapMarkerAlt, FaClock, FaTrophy } from 'react-icons/fa';

const color = {
  orange: '#F97316',
  green: '#38B5AA',
};

const HackathonCard = ({ hackathon, index }) => {
  const calculateDaysLeft = (startDate) => {
    const start = new Date(startDate);
    const today = new Date();
    const diffTime = start - today;
    return diffTime > 0 ? Math.ceil(diffTime / (1000 * 60 * 60 * 24)) : 0;
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-md overflow-hidden">
      <div className="relative">
        <div
          className={`absolute top-0 w-3 h-full`}
          style={{ backgroundColor: color.orange, [index % 2 === 0 ? 'left' : 'right']: 0 }}
        ></div>
        <div className="p-6 pl-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-center" style={{ color: color.green }}>
              {hackathon.title}
            </h2>
            <p className="text-gray-600 text-sm text-justify">{hackathon.theme}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="w-5 h-5" style={{ color: color.green }} />
              <span className="text-sm">{hackathon.location || 'N/A'}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCalendar className="w-5 h-5" style={{ color: color.green }} />
              <span className="text-sm">{new Date(hackathon.startDate).toLocaleDateString()}</span>
            </div>
            {hackathon.prizes.map((prize, index) => (
              <div key={index} className="flex items-center gap-2">
                <FaTrophy className="w-5 h-5" style={{ color: color.green }} />
                <p className="text-sm">{prize}</p>
              </div>
            ))}
            <div className="flex items-center gap-2">
              <FaClock className="w-5 h-5" style={{ color: color.green }} />
              <span className="text-sm">{calculateDaysLeft(hackathon.startDate)} days left</span>
            </div>
          </div>
          <div className="flex justify-between items-center gap-4">
            <div className="text-sm text-gray-500">{hackathon.source} - credit</div>
            <a
              href={hackathon.problemStatementLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white py-2 px-6 rounded-xl transition-colors flex items-center gap-2"
              style={{ backgroundColor: color.green }}
            >
              <span>Register</span>
              <FaExternalLinkAlt className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HackathonCard;
