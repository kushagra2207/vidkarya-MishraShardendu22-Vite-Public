import qpPageImg from '../../../Assets/qpPageImg.png';
import Internship from '../Components/Internship';
import JobOpening from '../Components/JobOpening';
import Hackathon from '../Components/Hackathon';
import { Navbar } from '../../../Components';
import React, { useState } from 'react';

const Career = () => {
  const [activePage, setActivePage] = useState('hackathon');

  const renderContent = () => {
    switch (activePage) {
      case 'hackathon':
        return <Hackathon />;
      case 'internship':
        return <Internship />;
      case 'jobs':
        return <JobOpening />;
      default:
        return <Hackathon />;
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Image as a Fixed Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${qpPageImg})`,
          backgroundAttachment: 'fixed',
        }}
      />

      <div className="relative z-10 min-h-screen bg-white/60 ">
        <Navbar />

        <nav className="w-full max-w-4xl mx-auto px-6">
          <ul className="flex justify-center border-b border-gray-200">
            {['hackathon', 'internship', 'jobs'].map((item) => (
              <li key={item} className="relative flex-1">
                <button
                  onClick={() => setActivePage(item)}
                  className={`
                    w-full px-8 py-4 text-base font-medium capitalize
                    hover:text-orange-500 transition-colors duration-200
                    ${activePage === item ? 'bg-orange-50 text-orange-500' : 'text-gray-500'}
                  `}
                >
                  {item}
                </button>
                {activePage === item && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-orange-400 transition-all duration-200" />
                )}
              </li>
            ))}
          </ul>
        </nav>

        {renderContent()}
      </div>
    </div>
  );
};

export default Career;
