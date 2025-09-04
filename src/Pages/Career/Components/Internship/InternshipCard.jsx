import React from 'react';
import { FaMapMarkerAlt, FaCalendar, FaExternalLinkAlt } from 'react-icons/fa';
import { BiMoneyWithdraw } from 'react-icons/bi';
import Skeleton from '../Skeleton';

const color = {
  orange: '#F97316',
  green: '#38B5AA',
};

const InternshipCard = ({ internship, onViewDescription, cardIndex, loading }) => {
  const isEven = cardIndex % 2 === 0;

  if (loading)
    return (
      <>
        <Skeleton />
        <Skeleton />
      </>
    );

  return (
    <div className="w-full bg-white rounded-lg shadow-md overflow-hidden relative">
      <div
        className={`absolute top-0 w-3 h-full`}
        style={{
          backgroundColor: color.orange,
          left: isEven ? '0' : 'auto',
          right: isEven ? 'auto' : '0',
        }}
      ></div>
      <div className="p-6 pl-8">
        <div className="mb-6 text-center">
          <h2 className="text-xl font-semibold" style={{ color: color.green }}>
            {internship.title} - {internship.company}
          </h2>
        </div>
        <div className="mb-6">
          <p className="text-gray-600 text-sm">{internship.about || ''}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="w-5 h-5" style={{ color: color.green }} />
            <span className="text-sm">{internship.location || 'N/A'}</span>
          </div>
          <div className="flex items-center gap-2">
            <BiMoneyWithdraw className="w-5 h-5" style={{ color: color.green }} />
            <span className="text-sm">{internship.stipend || 'Unpaid'}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaCalendar className="w-5 h-5" style={{ color: color.green }} />
            <span className="text-sm">{new Date(internship.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">{internship.source} - credit</div>
          <div className="flex space-x-4">
            <button
              onClick={() => onViewDescription(internship.description)}
              className="py-2 px-6 rounded-xl flex items-center gap-2 border border-[#38B5AA] text-[#38B5AA] hover:bg-[#F97316] hover:text-white transition-colors"
            >
              View Description
            </button>
            <a
              href={internship.applicationLink}
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
  );
};

export default InternshipCard;
