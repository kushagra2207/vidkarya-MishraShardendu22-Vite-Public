import { React, useContext } from 'react';
import { axios, EVENTS } from '../../../api';
import { sendReqToServer } from '../../../Hooks/useAxios';
import { useToasts } from './../../UI/toast';
import { EventDetailsContext } from '../../../Context/eventContextapi.jsx';

import './../css/deleteEvent.css';
function DeleteEvent({ eventId, setDeleteEventPopup }) {
  const { upcomingEvents, setUpcomingEvents } = useContext(EventDetailsContext);
  const [notify] = useToasts();

  const handelDeleteEvent = async (eventId) => {
    setUpcomingEvents(upcomingEvents.filter((event) => event._id !== eventId));
    try {
      const { response } = await sendReqToServer({
        axiosInstance: axios,
        url: EVENTS.delete,
        method: 'PUT',
        requestConfig: {
          data: { eventId },
        },
      });
      if (response) {
        notify({
          type: 'PROMISE',
          message: 'Event Deleted',
        });
      }
    } catch {
      notify({
        type: 'ERROR',
        message: 'Unable to delete ',
      });
    }
    setDeleteEventPopup(false);
  };
  return (
    <>
      <section className="delete-event-section">
        <div className="delete-event-box">
          <h1 className="delete-event-box-heading">Delete Event Confirmation</h1>
          <p className="delete-event-box-text">Are you sure to delete this event?</p>
          <div className="event-popup-buttons-group">
            <button
              className="event-popup-delete-button"
              onClick={() => {
                handelDeleteEvent(eventId);
              }}
            >
              Delete
            </button>
            <button
              className="event-popup-cancle-button"
              onClick={() => setDeleteEventPopup(false)}
            >
              Cancle
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default DeleteEvent;
