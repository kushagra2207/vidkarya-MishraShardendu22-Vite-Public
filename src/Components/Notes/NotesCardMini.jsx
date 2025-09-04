import React from 'react';
import './notes.css';
import { NOTES_ASSET } from '../../Assets/assetImages';
// import coverPic from '../../Assets/Images/Notes/linear-alg.svg';
import { AiOutlineEye } from 'react-icons/ai';
import { BsDot } from 'react-icons/bs';
import { convertTimeToMomentsAgo } from '../../Helpers';
import { useNavigate } from 'react-router-dom';

function NotesCardMini(props) {
  // const { subject, desc, views, time,_id } = NotesData;
  const { thumbnailUrl, coursename, views, createdAt, discription, _id } = props;
  const navigate = useNavigate();

  return (
    <div
      className=" mt-3 shadow-md NotesCardMini"
      onClick={() => navigate(`/notes/preview/${_id}`)}
    >
      <div className="NotesCardMiniCover">
        <img className="NotesCardMiniCoverPic" src={thumbnailUrl} alt="" />
      </div>

      <p className="NotesCardMiniHeading">{coursename}</p>
      <p className="NotesCardMiniDesc">{discription}</p>

      <div className="NotesCardMiniBottom">
        <div className="NotesCardMiniViews">
          <AiOutlineEye className="NotesCardMini-viewIcon" />
          <span className="NotesCardMiniViewsText">{views} Views</span>
          <BsDot className="NotesCardMini-dotIcon" />
        </div>
        <span className="NotesCardMiniDate">{convertTimeToMomentsAgo(createdAt)}</span>
      </div>
    </div>
  );
}

export default NotesCardMini;
