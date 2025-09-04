import '../css/EventsCard.css';
import { MdSchedule, MdOutlineLocationOn } from 'react-icons/md';
import { GoOrganization } from 'react-icons/go';
import { truncateText} from "../../../Helpers"
import parse from "html-react-parser";
import { useState } from 'react';
import UpdateEvent from './updateEvevt';
import DeleteEvent from './deleteEvent';

function EventsCard({ eventsData }) {
  const [updateEventDrawer, setUpdateEventDrawer] = useState(false);
  const [deleteEventPopup, setDeleteEventPopup] = useState(false);
  const { eventname, discription, organizer, date, speaker, location, timings, _id } = eventsData;

  let eventDate = '';
  let year = '';
  let day = '';
  let monthName = '';

  if (date) {
    eventDate = date.split('T')[0];
    [year, , day] = eventDate.split('-'); // Splitting the year, month, and day
    monthName = new Date(date).toLocaleString('default', { month: 'long' });
  }

  return (
    <>
      {updateEventDrawer && (
        <UpdateEvent
          eventDetails={eventsData}
          setUpdateEventDrawer={setUpdateEventDrawer}
          updateEventDrawer={updateEventDrawer}
        />
      )}
      {deleteEventPopup && <DeleteEvent eventId={_id} setDeleteEventPopup={setDeleteEventPopup} />}
      <div className="EventsCardWrapper">
        {/* CARD TOP */}
        <div className="EventsCardTop">
          <div className="EventsCardTopLeft">
            <span className="eventCardHead">{eventname || 'None'}</span>
            <span className="eventCardSubHead">by {speaker}</span>
          </div>

          <div className="EventCardTopRight">
            <span className="eventCardTop-Date">{day || 'day'}</span>
            <span className="eventCardTop-Month">
              {monthName || 'month'},{year || 'year'}
            </span>
          </div>
        </div>

        {/* CARD MIDDLE */}
        <div className="EventsCardMiddle">
          <div className="EventsCardTiming">
            <MdSchedule className="EventsCardTimingLogo" size={20} />
            <span className="EventsCardTimingText">{timings || 'timings'}</span>
          </div>

          <div className="EventsCardLocation">
            <MdOutlineLocationOn className="EventsCardLocationLogo" size={20} />
            <span className="EventsCardLocationText">{location || 'location'}</span>
          </div>
        </div>

        {/* CARD DESC */}
        <div className="EventsCardDesc">
          {discription
                    ? parse(truncateText(discription, 50))
                    : ""}
        </div>

        {/* CARD BOTTOM */}
        <div className="EventCardBottom">
          <GoOrganization className="EventCardOrgLogo" size={25} />
          <span className="EventCardOrgName">{organizer || 'organizer'}</span>
        </div>
        <div className="hover">
          <button
            type="button"
            onClick={() => {
              setUpdateEventDrawer(true);
            }}
          >
            Update
          </button>
          <button
            type="button"
            onClick={() => {
              setDeleteEventPopup(true);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
}
export default EventsCard;
