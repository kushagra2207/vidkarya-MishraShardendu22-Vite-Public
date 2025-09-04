import React from 'react';
import UploadNotes from './UploadNotes';
import '../css/createNotes.css';
function EditNotes({ notesData, updateNotesDrawer, setUpdateNotesDrawer }) {
  return (
    <>
      <div
        className="create-notes-drawer"
        style={{ transform: updateNotesDrawer ? 'translateX(0)' : 'translate(100%)' }}
      >
        <div className="createNotesContainer">
          <UploadNotes
            updateNotesDrawer={updateNotesDrawer}
            setUpdateNotesDrawer={setUpdateNotesDrawer}
            notesData={notesData}
          />
        </div>
      </div>
    </>
  );
}

export default EditNotes;
