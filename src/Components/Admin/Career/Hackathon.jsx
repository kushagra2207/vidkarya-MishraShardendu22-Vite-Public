import React, { useState } from 'react';
import HackathonCreate from './Hackathon/HackathonCreate';
import HackathonList from './Hackathon/HackathonList';

const HackathonPage = () => {
  const [showCreate, setShowCreate] = useState(false);

  return (
    <>
      <div className="p-6 bg-white">
        {!showCreate ? (
          <button
            onClick={() => setShowCreate(true)}
            type="button"
            className="create-notes-button text-center w-full"
          >
            + Create A Hackathon
          </button>
        ) : (
          <>
            <HackathonCreate onHackathonCreated={() => setShowCreate(false)} />
          </>
        )}
      </div>
      <HackathonList />
    </>
  );
};

export default HackathonPage;
