import { useState, useContext, React } from 'react';
import { axios, EVENTS } from '../../../api';
import { sendReqToServer } from '../../../Hooks/useAxios';
import { useToasts } from './../../UI/toast';
import { RxCross2 } from 'react-icons/rx';
import { BsCalendarDate } from 'react-icons/bs';
import { VscOrganization } from 'react-icons/vsc';
import { HiSpeakerWave } from 'react-icons/hi2';
import { BiCurrentLocation, BiTimeFive } from 'react-icons/bi';
import { MdEventAvailable, MdDescription } from 'react-icons/md';
import { EventDetailsContext } from '../../../Context/eventContextapi.jsx';
import './../css/createEvent.css';

function UpdateEvent({ eventDetails, setUpdateEventDrawer, updateEventDrawer }) {
  const { fetchEvents } = useContext(EventDetailsContext);

  const [eventData, setEventData] = useState({
    eventname: eventDetails.eventname,
    organizer: eventDetails.organizer,
    speaker: eventDetails.speaker,
    location: eventDetails.location,
    timings: eventDetails.timings,
    date: eventDetails.date,
    discription: eventDetails.discription,
    eventId: eventDetails._id,
    availableSeats: eventDetails.availableSeats,
    link: eventDetails.link,
  });
  const [notify] = useToasts();
  const handleTextChange = async (event) => {
    setEventData({
      ...eventData,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdateEvent = async () => {
    const {
      eventType,
      eventname,
      organizer,
      speaker,
      location,
      timings,
      date,
      discription,
      eventId,
      availableSeats,
      link,
    } = eventData;

    if (!eventname || !organizer || !speaker || !location || !timings || !date || !discription) {
      notify({
        type: 'ERROR',
        message: 'Please fill all the fields',
      });
      return;
    }
    if (eventDetails === eventData) {
      notify({
        type: 'ERROR',
        message: 'You have not changed any data',
      });
      return;
    }
    try {
      const { response } = await sendReqToServer({
        axiosInstance: axios,
        url: EVENTS.update,
        method: 'PUT',
        requestConfig: {
          data: {
            eventId,
            eventname,
            discription,
            organizer,
            date,
            speaker,
            location,
            timings,
            availableSeats,
            link,
            eventType,
          },
        },
      });
      if (response.body.result) {
        notify({
          type: 'PROMISE',
          message: 'Event Updated Successfully',
        });
      }
    } catch {
      // Handle the error appropriately
      notify({
        type: 'ERROR',
        message: 'Error occured while updating the event',
      });
    }
    setUpdateEventDrawer(false);
    fetchEvents();
  };

  return (
    <>
      <div
        className="create-event-drawer"
        style={{ transform: updateEventDrawer ? 'translateX(0)' : 'translate(100%)' }}
      >
        <RxCross2 className="close-event-drawer" onClick={() => setUpdateEventDrawer(false)} />
        <div className="create-container">
          <h1>Update Event</h1>
          <form>
            <div className="create-event-input">
              <div>
                <label>
                  <div>{<MdEventAvailable />}</div>
                  Event Name
                </label>
              </div>
              <input
                value={eventData.eventname}
                name="eventname"
                type="text"
                onChange={handleTextChange}
                required
              />
            </div>
            <div className="create-event-input">
              <div>
                <label>
                  <div>{<VscOrganization />}</div>
                  Organizer
                </label>
              </div>
              <input
                value={eventData.organizer}
                name="organizer"
                type="text"
                onChange={handleTextChange}
                required
              />
            </div>
            <div className="create-event-input">
              <div>
                <label>
                  <div>{<HiSpeakerWave />}</div>
                  Speaker
                </label>
              </div>
              <input
                value={eventData.speaker}
                name="speaker"
                type="text"
                onChange={handleTextChange}
                required
              />
            </div>
            <div className="create-event-input">
              <div>
                <label>
                  <div>{<BiCurrentLocation />}</div>
                  Location
                </label>
              </div>
              <input
                value={eventData.location}
                name="location"
                type="text"
                onChange={handleTextChange}
                required
              />
            </div>
            <div className="create-event-input">
              <div>
                <label>
                  <div>{<BiTimeFive />}</div>
                  Timings
                </label>
              </div>
              <input
                value={eventData.timings}
                name="timings"
                type="text"
                onChange={handleTextChange}
                required
              />
            </div>
            <div className="create-event-input">
              <label>
                <div>
                  <BsCalendarDate />
                </div>
                Date
              </label>
              <input
                type="date"
                value={eventData.date}
                name="date"
                onChange={handleTextChange}
                required
              ></input>
            </div>
            <div style={{ gridColumn: '1/-1' }}>
              <div className="create-event-input">
                <div>
                  <label>
                    <div>{<VscOrganization />}</div>
                    Available Seats
                  </label>
                </div>
                <input
                  value={eventData.availableSeats}
                  name="availableSeats"
                  type="text"
                  onChange={handleTextChange}
                />
              </div>

              <div className="create-event-input">
                <div>
                  <label>
                    <div>{<VscOrganization />}</div>
                    Link
                  </label>
                </div>
                <input value={eventData.link} name="link" type="text" onChange={handleTextChange} />
              </div>

              <div className="create-event-input">
                <div>
                  <label>
                    <div>{<MdDescription />}</div>
                    Description
                  </label>
                </div>
                <input
                  value={eventData.discription}
                  name="discription"
                  type="text"
                  onChange={handleTextChange}
                  required
                />
              </div>
            </div>
            <label className="block mb-4">
              <div className="text-lg font-semibold mb-2">Event Type</div>
              <select
                value={eventData.eventType}
                name="eventType"
                onChange={handleTextChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={1}>Talk</option>
                <option value={2}>Mock Interview</option>
                <option value={3}>Live Coding</option>
                <option value={4}>Resume Review</option>
                <option value={5}>Portfolio Building</option>
              </select>
            </label>
          </form>

          <div className="bottom">
            <button className="submit_button" type="submit" onClick={handleUpdateEvent}>
              Update Event
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateEvent;
