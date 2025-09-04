import React, { useContext, useEffect, useState } from 'react';
import '../css/notesComponent.css';
import NotesCards from './NotesCards';
import CreateNotes from './CreateNotes';
import { NotesDetailsContext } from '../../../Context/notesContextApi.jsx';

const NotesMainCompoent = () => {
  const [createNotes, setCreateNotes] = useState(false);
  const { notesList, getAllNotes } = useContext(NotesDetailsContext);
  useEffect(() => {
    getAllNotes();
  }, [createNotes, getAllNotes]);

  return (
    <>
      {createNotes && <CreateNotes createNotes={createNotes} setCreateNotes={setCreateNotes} />}

      <button type="button" className="create-notes-button" onClick={() => setCreateNotes(true)}>
        + Create Notes
      </button>

      <div className={`${createNotes ? 'hidden' : ''}`}>
        <div className="notes-cards-grid">
          {notesList.length > 0 &&
            notesList.map((ele, _) => {
              return <NotesCards key={ele._id} notesData={ele} />;
            })}
        </div>
      </div>
    </>
  );
};

const Notes = () => {
  return <NotesMainCompoent />;
};
export default Notes;
