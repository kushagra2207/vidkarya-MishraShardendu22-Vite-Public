import { useState, React } from 'react';
import { axios, EVENTS } from '../../../api';
import { sendReqToServer } from '../../../Hooks/useAxios';
import { useToasts } from './../../UI/toast';
import { RxCross2 } from 'react-icons/rx';
import { BsCalendarDate } from 'react-icons/bs';
import { VscOrganization } from 'react-icons/vsc';
import { HiSpeakerWave } from 'react-icons/hi2';
import { BiCurrentLocation, BiTimeFive } from 'react-icons/bi';
import { MdEventAvailable, MdDescription } from 'react-icons/md';

import './../css/createEvent.css';
function CreateEvent({ setCreateEvent, createEvent }) {
  /*  
    Event Type -> 
    1 - talk
    2 - mock interview
    3 - live coding
    4 - resume review (resume sumbit)
    5 - portfolio building (portfolio submit)
  */
  const [eventData, setEventData] = useState({
    eventname: '',
    organizer: '',
    speaker: '',
    location: '',
    timings: '',
    date: '',
    discription: '',
    availableSeats: 0,
    link: '',
    eventType: 1,
  });
  const [notify] = useToasts();

  const handleTextChange = async (event) => {
    setEventData({
      ...eventData,
      [event.target.name]: event.target.value,
    });
  };

  const handleCreateEvent = async () => {
    const {
      eventname,
      organizer,
      speaker,
      location,
      timings,
      date,
      discription,
      availableSeats,
      link,
      eventType,
    } = eventData;
    if (
      !eventname ||
      !organizer ||
      !speaker ||
      !location ||
      !timings ||
      !date ||
      !discription ||
      !eventType
    ) {
      notify({
        type: 'ERROR',
        message: 'Please fill all the fields',
      });
      return;
    }
    try {
      const { response } = await sendReqToServer({
        axiosInstance: axios,
        url: EVENTS.create,
        method: 'POST',
        requestConfig: {
          data: {
            eventname,
            organizer,
            speaker,
            location,
            timings,
            date,
            discription,
            availableSeats,
            link,
            eventType,
          },
        },
      });
      if (response.body.result) {
        notify({
          type: 'PROMISE',
          message: 'Event Created',
        });
        setCreateEvent(false);
      }
    } catch {
      notify({
        type: 'ERROR',
        message: 'Failed to create event',
      });
    }
  };

  return (
    <>
      <div
        className="create-event-drawer"
        style={{ transform: createEvent ? 'translateX(0)' : 'translate(100%)' }}
      >
        <RxCross2 className="close-event-drawer" onClick={() => setCreateEvent(false)} />
        <div className="create-container">
          <h1>Create Event</h1>
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

            <div style={{ gridColumn: '1/-1' }}>
              <div className="create-event-input">
                <div>
                  <label>
                    <div>{<MdDescription />}</div>
                    Description
                  </label>
                </div>
                <textarea
                  value={eventData.discription}
                  name="discription"
                  onChange={handleTextChange}
                  required
                />
              </div>
            </div>

            {/* Added By Sharedendu Mishra */}
            <div>
              <label>
                <div>Event Type</div>
                <select
                  className=" px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={eventData.eventType}
                  name="eventType"
                  onChange={handleTextChange}
                  required
                >
                  <option value={1}>Talk</option>
                  <option value={2}>Mock Interview</option>
                  <option value={3}>Live Coding</option>
                  <option value={4}>Resume Review</option>
                  <option value={5}>Portfolio Building</option>
                </select>
              </label>
            </div>
          </form>
          <div className="bottom">
            <button className="submit_button" type="submit" onClick={handleCreateEvent}>
              Create Event
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateEvent;
