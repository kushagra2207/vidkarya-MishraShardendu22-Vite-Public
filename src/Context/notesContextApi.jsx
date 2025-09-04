import { useState, React, createContext, useEffect, useCallback } from 'react';
import { axios, NOTES } from '../api';
import { sendReqToServer } from '../Hooks/useAxios';
import { useToasts } from '../Components/UI/toast';

const NotesDetailsContext = createContext();

// Create a Provider component
const NotesDetailsContextProvider = ({ children }) => {
  const [notesList, setNotesList] = useState([]);
  const [notify] = useToasts();

  const getAllNotes = useCallback(async () => {
    try {
      const { response, error: _error1 } = await sendReqToServer({
        axiosInstance: axios,
        url: NOTES.getAllNotes,
        method: 'GET',
        requestConfig: {},
      });
      if (response.body.note.length === 0) {
        notify({
          type: 'WARNING',
          message: 'No Notes Uploaded',
        });
      } else {
        setNotesList(response.body.note);
      }
    } catch {
      notify({
        type: 'ERROR',
        message: 'Problem occured while fetching Notes',
      });
    }
  }, [notify]);

  useEffect(() => {
    getAllNotes();
  }, [getAllNotes]);

  const contextValue = {
    notesList,
    setNotesList,
    getAllNotes,
  };

  return (
    <NotesDetailsContext.Provider value={contextValue}>{children}</NotesDetailsContext.Provider>
  );
};

export { NotesDetailsContextProvider, NotesDetailsContext };
