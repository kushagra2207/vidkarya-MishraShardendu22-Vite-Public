import React from 'react';
import { FaMapMarkerAlt, FaCalendar, FaExternalLinkAlt, FaBuilding } from 'react-icons/fa';
import { BiMoneyWithdraw } from 'react-icons/bi';
import Skeleton from '../Skeleton';

const color = {
  orange: '#F97316',
  green: '#38B5AA',
};

const JobCard = ({ Job, onViewDescription, cardIndex, loading }) => {
  const isEven = cardIndex % 2 === 0;
  if (loading)
    return (
      <>
        <Skeleton />
        <Skeleton />
      </>
    );

  return (
    <div className="w-full bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <div
          className="absolute top-0 left-0 w-3 h-full"
          style={{
            backgroundColor: color.orange,
            left: isEven ? 0 : 'auto',
            right: isEven ? 'auto' : 0,
          }}
        ></div>
        <div className="p-6 pl-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-center" style={{ color: color.green }}>
              {Job.title}
            </h2>
          </div>
          <div className="mb-6">
            <p className="text-gray-600 text-sm">{Job.about || ''}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="w-5 h-5" style={{ color: color.green }} />
              <span className="text-sm">{Job.location || 'N/A'}</span>
            </div>
            <div className="flex items-center gap-2">
              <BiMoneyWithdraw className="w-5 h-5" style={{ color: color.green }} />
              <span className="text-sm">{Job.salary || 'Unpaid'}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCalendar className="w-5 h-5" style={{ color: color.green }} />
              <span className="text-sm">{new Date(Job.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaBuilding className="w-5 h-5" style={{ color: color.green }} />
              <span className="text-sm">{Job.company}</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-sm" style={{ color: color.green }}>
              {Job.source} - credit
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => onViewDescription(Job.description)}
                className="py-2 px-6 rounded-xl transition-colors flex items-center gap-2 border"
                style={{
                  borderColor: color.green,
                  color: color.green,
                  backgroundColor: 'transparent',
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = color.orange;
                  e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = color.green;
                }}
              >
                View Description
              </button>
              <a
                href={Job.applicationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white py-2 px-6 rounded-xl transition-colors flex items-center gap-2"
                style={{ backgroundColor: color.green }}
              >
                <span>Apply Now</span>
                <FaExternalLinkAlt className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
