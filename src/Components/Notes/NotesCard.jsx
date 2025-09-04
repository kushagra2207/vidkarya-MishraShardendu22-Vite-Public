import React, { useState, useRef, useEffect } from 'react';
import { BsThreeDotsVertical, BsDot } from '../../lib/icons';
import { useNavigate } from 'react-router-dom';
import NotesOptionBox from './notes-options-box';
import { NOTES_ASSET } from '../../Assets/assetImages';
// import notePageImg from '../../Assets/Images/Notes/notes-img2.png';
import { AppStates } from '../../Context/appContext.jsx';
import './notes.css';
import { convertTimeToMomentsAgo } from '../../Helpers/index';

export default function NotesCard(props) {
  const [openOptionsBox, setOpenOptionsBox] = useState(false);
  const [notesData, setNotesData] = useState(props.note);
  const navigate = useNavigate();
  const time = convertTimeToMomentsAgo(notesData.createdAt);
  const optionsBoxRef = useRef(null);
  const { user, setuser, setShowLoginPopup } = AppStates();

  useEffect(() => {
    // Function to handle the click event outside the popup component
    const handleClickOutside = (event) => {
      if (optionsBoxRef.current && !optionsBoxRef.current.contains(event.target)) {
        setOpenOptionsBox(false);
      }
    };

    // Attach the event listener
    document.addEventListener('click', handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleNotes = () => {
    if (!user) {
      setShowLoginPopup(true);
      return;
    }
    navigate(`/notes/preview/${notesData._id}`);
  };

  return (
    <div
      onClick={handleNotes}
      className="md:flex gap-3 justify-evenly notes-card rounded-md p-1 w-[100%] my-2 mx-auto py-3 items-center"
    >
      <div className="img-box flex flex-col items-end relative mr-3">
        <img
          style={{ margin: '0px', padding: '0px', height: '110px', width: '150px' }}
          src={notesData.thumbnailUrl}
          alt=""
          className="object-cover p-2 "
        />
        {/* <p className="top-[100%] z-5 justify-end text-sm right-0">100</p> */}
      </div>

      <div className="md:w-[75%] p-1">
        <div className="flex justify-between">
          <p className="title-card text-[1.35rem] md:font-[640] font-[400] notes-card-title ">
            {notesData.coursename}
          </p>
          <BsThreeDotsVertical
            size={20}
            className="cursor-pointer"
            onClick={(event) => {
              event.stopPropagation();
              setOpenOptionsBox(!openOptionsBox);
            }}
          />
          {openOptionsBox && (
            <div className="absolute right-0" ref={optionsBoxRef}>
              <NotesOptionBox
                notesData={notesData}
                setNotesData={setNotesData}
                user={user}
                setuser={setuser}
              />
            </div>
          )}
        </div>
        <p className="my-1 text-sm mb-5 font-semibold notes-card-small-details">
          {notesData.branch} &nbsp; | &nbsp;{notesData.college}&nbsp; | &nbsp;
          <span className="text-orange-400" style={{ fontWeight: '400' }}>
            Anonymous
          </span>
        </p>
        <p className="mt-1 mb-3 notes-card-discription">{notesData.discription}</p>
        <div>
          <span className=" flex justify-end items-center text-sm notes-card-rating-time">
            {notesData.rating && '⭐' + notesData.rating.toFixed(2) + '/5'}
            <BsDot size={25} />
            <span className="text-sm" style={{ color: 'rgba(0, 0, 0, 0.60)' }}>
              {time}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
