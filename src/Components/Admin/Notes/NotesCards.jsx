import React, { useState } from 'react';
import '../css/NotesCard.css';
import { IoEyeSharp } from 'react-icons/io5';
import { convertTimeToMomentsAgo } from '../../../Helpers';
import { truncateText } from '../../../Helpers';
import EditNotes from './EditNotes';
import DeleteNotes from './deleteNotes';

function NotesCards({ notesData }) {
  const [updateNotesDrawer, setUpdateNotesDrawer] = useState(false);
  const [deleteNotesPopup, setDeleteNotesPopup] = useState(false);

  const { _id, coursename, thumbnailUrl, createdAt, branch, college, discription, views } =
    notesData;
  return (
    <>
      {updateNotesDrawer && (
        <EditNotes
          notesData={notesData}
          setUpdateNotesDrawer={setUpdateNotesDrawer}
          updateNotesDrawer={updateNotesDrawer}
        />
      )}
      {deleteNotesPopup && <DeleteNotes eventId={_id} setDeleteNotesPopup={setDeleteNotesPopup} />}
      <div className="NotesCardWrapper">
        {/* CARD LEFT */}
        <img src={thumbnailUrl} className="NotesCardImage" alt="Notes Preview Image" />

        {/* CARD RIGHT */}
        <div className="NotesCardRight">
          <div className="NotesCardHeader">
            <div className="NotesTitle">{truncateText(coursename, 2)}</div>
            <div className="NotesTagsSection">
              {branch} | {college} |<div className="NotesCreatorTag">Vidkarya</div>
            </div>
          </div>
          <div className="NotesDescription">{discription}</div>
          <div className="NotesBottomSection">
            <div className="NotesViews">
              <IoEyeSharp style={{ color: '#27948b' }} />
              {views} views
            </div>
            <div className="NotesUploadDate">{convertTimeToMomentsAgo(createdAt)}</div>
          </div>
        </div>

        <div className="hoverEffect">
          <button className="adminAccess-btn" onClick={() => setUpdateNotesDrawer(true)}>
            Edit
          </button>
          <button className="adminAccess-btn" onClick={() => setDeleteNotesPopup(true)}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

export default NotesCards;
