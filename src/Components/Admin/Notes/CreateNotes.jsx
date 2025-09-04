import React from 'react';
import UploadNotes from './UploadNotes';
import '../css/createNotes.css';

function CreateNotes({ createNotes, setCreateNotes }) {
  return (
    <>
      <div
        className="create-notes-drawer"
        style={{ transform: createNotes ? 'translateX(0)' : 'translate(100%)' }}
      >
        <div className="createNotesContainer">
          <UploadNotes setUpdateNotesDrawer={setCreateNotes} />
        </div>
      </div>
    </>
  );
}

export default CreateNotes;
