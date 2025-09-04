import React, { useEffect, useState, useCallback } from 'react';
import NotesDetails from './NotesDetails';
import './notes-preview.css';
import NotesDisplay from './NotesDisplay';
import { AiFillRightCircle, AiFillLeftCircle } from '../../lib/icons';
import { sendReqToServer } from '../../Hooks/useAxios';
import { NOTES, axios } from '../../api';
import { useParams } from 'react-router-dom';
import { useToasts } from '../../Components/UI/toast';
import { Navbar } from '../../Components';
import { AppStates } from '../../Context/appContext.jsx';

export default function NotesPreview() {
  // context
  const { user: _user, setShowLoginPopup: _setShowLoginPopup } = AppStates();

  const [drawerState, setdrawerState] = useState('close');
  const [notesDeatils, setNotesDeatils] = useState();
  const [expandNotes, setexpandNotes] = useState(false);
  const { id } = useParams();
  const [notify] = useToasts();

  const handleDrawerClick = () => {
    drawerState === 'open' ? setdrawerState('close') : setdrawerState('open');
  };

  const fetchNotes = useCallback(async () => {
    try {
      const { response } = await sendReqToServer({
        axiosInstance: axios,
        url: NOTES.get.replace(':notesid', id),
        method: 'GET',
      });
      if (response) setNotesDeatils(response.body.note);
      console.log(response);
      return;
    } catch {
      notify({
        type: 'ERROR',
        message: 'Fetching Notes failed!',
      });
    }
  }, [id, notify]);

  const handelNotesViewCount = useCallback(async () => {
    try {
      const { response: _response } = await sendReqToServer({
        axiosInstance: axios,
        url: NOTES.updateViews.replace(':notesid', id),
        method: 'GET',
      });
      // if (response.flag) {
      //   console.log("Views updated");
      // };
      return;
    } catch {
      console.error('Error updating views');
    }
  }, [id]);

  useEffect(() => {
    fetchNotes();
    handelNotesViewCount();
  }, [fetchNotes, handelNotesViewCount]);

  return (
    <>
      <Navbar />
      <div
        className={`md:${expandNotes ? '' : 'flex'} md:p-4 px-3 relative gap-10 overflow-x-hidden`}
      >
        <NotesDisplay
          resourceLink={notesDeatils && notesDeatils.resourceLink}
          expand={expandNotes}
          setExpand={setexpandNotes}
        />

        <div
          className={`drawer-symbol top-[5%]  fixed  md:hidden transition-all duration-500 block z-[100]  ${drawerState !== 'open' ? 'right-0' : 'right-[23rem]'}`}
          onClick={handleDrawerClick}
        >
          {drawerState !== 'open' ? (
            <AiFillLeftCircle size={30} color={'orange'} className="z-[100]" />
          ) : (
            <AiFillRightCircle size={30} color={'orange'} className="z-[100]" />
          )}
        </div>

        <div
          className={` drawer m-0 md:p-0 transition-all duration-500 w-[100%] md:relative md:left-0 ${drawerState === 'open' ? 'left-0' : 'left-[105%]'} absolute top-0 z-50`}
        >
          {notesDeatils && <NotesDetails data={notesDeatils} />}
        </div>
      </div>
    </>
  );
}
