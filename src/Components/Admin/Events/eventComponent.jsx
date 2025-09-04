import React, { useContext, useEffect, useState } from 'react';
import EventsCard from './EventsCard';
import CreateEvent from './createEvent';
import { EventDetailsContextProvider, EventDetailsContext } from '../../../Context/eventContextapi.jsx';

import './../css/eventComponent.css';

function EventMainComponent() {
  const [createEvent, setCreateEvent] = useState(false);
  const { upcomingEvents, fetchEvents } = useContext(EventDetailsContext);
  useEffect(() => {
    fetchEvents();
  }, [createEvent, fetchEvents]);
  return (
    <>
      {createEvent && <CreateEvent createEvent={createEvent} setCreateEvent={setCreateEvent} />}
      <div className="event-section">
        <button type="button" className="create-event-button" onClick={() => setCreateEvent(true)}>
          + Create Event
        </button>
      </div>
      <div className="events-cards-grid">
        {upcomingEvents.length > 0 &&
          upcomingEvents.map((ele, _idx) => {
            return <EventsCard key={ele._id} eventsData={ele} />;
          })}
      </div>
    </>
  );
}

const Event = () => {
  return (
    <EventDetailsContextProvider>
      <div>
        <EventMainComponent />
      </div>
    </EventDetailsContextProvider>
  );
};

export default Event;
