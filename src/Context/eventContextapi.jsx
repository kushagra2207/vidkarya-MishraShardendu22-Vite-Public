import { useState, React, createContext } from 'react';
import { axios, EVENTS } from '../api';
import { sendReqToServer } from '../Hooks/useAxios';
import { useToasts } from '../Components/UI/toast';
const EventDetailsContext = createContext();

// Create a Provider component
const EventDetailsContextProvider = ({ children }) => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [notify] = useToasts();

  const fetchEvents = async () => {
    try {
      const { response, error: _error } = await sendReqToServer({
        axiosInstance: axios,
        url: EVENTS.upcoming,
        method: 'GET',
        requestConfig: {},
      });
      if (response.body.events.length === 0) {
        notify({
          type: 'WARNING',
          message: 'No upcoming events',
        });
      } else {
        setUpcomingEvents(response.body.events);
      }
    } catch {
      notify({
        type: 'ERROR',
        message: 'Problem occured while fetching events',
      });
    }
  };

  const contextValue = {
    upcomingEvents,
    setUpcomingEvents,
    fetchEvents,
  };

  return (
    <EventDetailsContext.Provider value={contextValue}>{children}</EventDetailsContext.Provider>
  );
};

export { EventDetailsContextProvider, EventDetailsContext };
