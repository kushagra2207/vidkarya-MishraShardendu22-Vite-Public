import { React, useContext } from 'react';
import { axios, NOTES } from '../../../api';
import { sendReqToServer } from '../../../Hooks/useAxios';
import { useToasts } from './../../UI/toast';
import { NotesDetailsContext } from '../../../Context/notesContextApi.jsx';

import './../css/deleteEvent.css';
function DeleteNotes({ eventId, setDeleteNotesPopup }) {
  const { notesList, setNotesList } = useContext(NotesDetailsContext);
  const [notify] = useToasts();

  const handelDeleteNotes = async (eventId) => {
    setNotesList(notesList.filter((notes) => notes._id !== eventId));
    try {
      const { response } = await sendReqToServer({
        axiosInstance: axios,
        url: NOTES.delete,
        method: 'DELETE',
        requestConfig: {
          data: { notesId: eventId },
        },
      });
      if (response) {
        notify({
          type: 'PROMISE',
          message: 'Notes Deleted',
        });
      }
    } catch {
      notify({
        type: 'ERROR',
        message: 'Unable to delete ',
      });
    }
    setDeleteNotesPopup(false);
  };
  return (
    <>
      <section className="delete-event-section">
        <div className="delete-event-box">
          <h1 className="delete-event-box-heading">Delete Notes Confirmation</h1>
          <p className="delete-event-box-text">Are you sure to delete this Notes?</p>
          <div className="event-popup-buttons-group">
            <button
              className="event-popup-delete-button"
              onClick={() => {
                handelDeleteNotes(eventId);
              }}
            >
              Delete
            </button>
            <button
              className="event-popup-cancle-button"
              onClick={() => setDeleteNotesPopup(false)}
            >
              Cancle
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default DeleteNotes;
