import React, { useState } from 'react';
import HackathonPage from './Hackathon';
import InternshipPage from './Internship';
import JobPage from './JobOpening';

const Career = () => {
  const Tabs = ['Hackathons', 'Internships', 'Job Openings'];
  const [selectedTab, setSelectedTab] = useState('Hackathons');

  return (
    <div className="career-section">
      <div className="career-container">
        <div className="tabs-container">
          {Tabs.map((tab, id) => {
            return (
              <div
                key={id}
                className={selectedTab === tab ? 'tab-active' : 'non-active-tab'}
                onClick={() => setSelectedTab(tab)}
              >
                {tab}
              </div>
            );
          })}
        </div>
      </div>
      {selectedTab === 'Hackathons' && <HackathonPage />}
      {selectedTab === 'Internships' && <InternshipPage />}
      {selectedTab === 'Job Openings' && <JobPage />}
    </div>
  );
};

export default Career;
