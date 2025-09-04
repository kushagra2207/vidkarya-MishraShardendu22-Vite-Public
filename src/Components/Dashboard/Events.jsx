  import './CSS/Events.css';
  import EventsCard from './EventsCard';
  import { MdEventNote } from 'react-icons/md';
  import { axios, EVENTS } from '../../api';
  import { sendReqToServer } from '../../Hooks/useAxios';
  import { useEffect, useState } from 'react';

  function Events() {
    const [dataUpcoming, setDataUpcoming] = useState([]);
    const [dataCompleted, setDataCompleted] = useState([]);
    const handleUpcoming = async () => {
      try {
        const { response } = await sendReqToServer({
          axiosInstance: axios,
          url: EVENTS.upcoming,
          method: 'GET',
          requestConfig: {},
        });
        setDataUpcoming(response.body.events);
      } catch (error) {
        console.error(error);
      }
    };

    const handleCompleted = async () => {
      try {
        const { response } = await sendReqToServer({
          axiosInstance: axios,
          url: EVENTS.completed,
          method: 'GET',
          requestConfig: {},
        });
        setDataCompleted(response.body.events);
      } catch (error) {
        console.error(error);
      }
    };

    useEffect(() => {
      handleUpcoming();
      handleCompleted();
    }, []);
    return (
      <>
        <div className="eventsContainer">
          <div className="eventsRightTop">
            <div className="eventsTopHeading">
              <MdEventNote size={25} className="eventIcon" />
              Events around You
            </div>
            {/* <div className="eventsRightTopSearchBox">
            <input
              type="text"
              placeholder="Search for events"
              className="eventsRightTopSearchBar"
            />
          </div> */}
          </div>

          <div className="eventsContent">
            {/* Upcoming Events */}
            <div className="upcomingEventsContainer">
              <div className="upcomingEventsHead">Upcoming Events</div>

              <div className="upcomingEventsCard">
                {dataUpcoming.map((ele, idx) => {
                  return <EventsCard key={idx} eventsData={ele} />;
                })}
              </div>
            </div>

  
            {/* Past Events */}
            <div className="pastEventsCard">
              {dataCompleted
                .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date attribute in descending order
                .slice(0, 3) // Get the first three elements
                .map((ele, idx) => {
                  return <EventsCard key={idx} eventsData={ele} />;
                })}
            </div>
          </div>
        </div>
      </>
    );
  }

  export default Events;
