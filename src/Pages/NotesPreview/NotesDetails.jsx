/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import { RateNotes, RelatedNotesCard } from '../../Components';
import { sendReqToServer } from '../../Hooks/useAxios';
import { NOTES, axios } from '../../api';
import {
  BsBookmark,
  GrFormView,
  MdVerified,
  RxDotFilled,
  BsBookmarkFill,
  BsStarFill,
  BsStarHalf,
  BsStar,
} from '../../lib/icons';
import { CommentBox } from '../index';
import styles from './NotesDetails.module.css';
import { AppStates } from '../../Context/appContext.jsx';
import { useToasts } from '../../Components/UI/toast';
import { NotesDetailsContext } from './../../Context/notesContextApi.jsx';
import { convertTimeToMomentsAgo } from '../../Helpers';

export default function NotesDetails(props) {
  const data = props?.data;
  const [RateThisNote, setRateThisNote] = useState(false);
  const [alreadyRated, setAlreadyRated] = useState(false);
  const [ratedContent, setRatedContent] = useState({});
  const [bookmarked, setBookmarked] = useState(false);
  const { user, setuser } = AppStates();
  const userId = user?._id;
  const notesid = props?.data?._id;
  const [notify] = useToasts();
  const { notesList, setNotesList } = useContext(NotesDetailsContext);
  const [reletedNotes, setReletedNotes] = useState(notesList || []);
  const [tagSelected, setTagSelected] = useState('all');
  const [reletedNotesOptionBox, setReletedNotesOptionBox] = useState('');
  const [reviewCount, setReviewCount] = useState(0);

  const checkBookmarked = (notes) => {
    return notes?.some((ele, idx) => {
      if (ele === data._id) return true;
    })
      ? true
      : false;
  };

  const handelBookmarkButton = async (isCurrentlyBookmarked) => {
    setBookmarked(!isCurrentlyBookmarked);
    try {
      let updatedNotes = user.notes.slice(); // Create a shallow copy of the notes array
      if (!isCurrentlyBookmarked) {
        updatedNotes.push(notesid); // update the user notes array
      } else {
        updatedNotes = updatedNotes.filter((ele) => ele !== notesid);
      }
      setuser((prevUser) => ({
        ...prevUser,
        notes: updatedNotes,
      }));
      const { response, error } = await sendReqToServer({
        axiosInstance: axios,
        url: NOTES.save + notesid,
        method: 'PUT',
        requestConfig: {
          userId,
        },
      });
    } catch (error) {
      console.log(error);
      notify({
        type: 'ERROR',
        message: 'Unable to bookmark',
      });
      setBookmarked(!isCurrentlyBookmarked);
    }
  };

  const filterDataByTag = (tag) => {
    return notesList.filter((item) =>
      item.tags.some((itemTag) => itemTag.toLowerCase() === tag.toLowerCase())
    );
  };

  const handelTagBasedSearch = (tag) => {
    if (tag === tagSelected) {
      setReletedNotes(notesList);
      setTagSelected('all');
    } else {
      setReletedNotes(filterDataByTag(tag));
      setTagSelected(tag);
    }
  };

  const fetchReviewCount = async () => {
    try {
      const { response, error } = await sendReqToServer({
        axiosInstance: axios,
        url: NOTES.countReviews.replace(':notesId', notesid),
        method: 'GET',
      });
      if (response) {
        setReviewCount(response.body.existingDocumentCount);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // It will check weather the notes is already rated or not
  const fetchRatingData = async () => {
    try {
      const { response, error } = await sendReqToServer({
        axiosInstance: axios,
        url: NOTES.getRateAccess.replace(':userId', userId).replace(':notesId', notesid),
        method: 'GET',
      });
      // console.log(response)
      if (response.flag) {
        setAlreadyRated(false);
      } else {
        setAlreadyRated(true);
        setRatedContent(response.payload.checkRated);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setBookmarked(checkBookmarked(user?.notes));
    setReletedNotes(notesList);
    fetchRatingData();
    fetchReviewCount();
  }, [notesList, alreadyRated]);

  // console.log(data);

  return (
    <div className="px-2 m-2">
      <div className="flex gap-5 text-sm justify-between items-center">
        <p className="text-3xl font-semibold">{data.name}</p>
        {bookmarked ? (
          <BsBookmarkFill
            size={25}
            onClick={() => {
              handelBookmarkButton(bookmarked);
            }}
            color="#38B5AA"
            style={{ cursor: 'pointer' }}
          />
        ) : (
          <BsBookmark
            size={25}
            onClick={() => {
              handelBookmarkButton(bookmarked);
            }}
            style={{ cursor: 'pointer' }}
          />
        )}
      </div>
      <p className="text-orange-500">Anonymous</p>

      <div className="rating text-sm mb-5">
        <p className="mt-3 flex">
          <StarRating rating={data.rating} />
          <RxDotFilled className="text-black " size={20} />
          <span className="text-orange-500 mr-1">{reviewCount} rating </span> |
          <span className="text-gray-500 ml-1">{convertTimeToMomentsAgo(data.createdAt)}</span>
        </p>
        <div className="flex gap-8">
          <div className="rated">
            <MdVerified className="absolute right-4" color="orange" />
            <p className="p-[2px]">Top rated</p>
          </div>

          <p className="mt-5 flex text-[#38B5AA]">
            for {data.branch.toString()} | {data.college}
            <RxDotFilled className="text-black" size={20} />
            <GrFormView size={23} className="ml-1" />
            <span className="text-black">{data.views} views</span>
          </p>
        </div>
      </div>

      <div className="my-3 ">
        <p className="text-lg font-bold">About</p>
        <p className="text-sm md:w-[25rem]">{data.description}</p>
      </div>

      <hr className="mt-5" />
      <div className=" my-4 ">
        <p className="font-bold text-xl "># Tags</p>

        <div className="notes-preview-tags">
          {data.tags.map((tag, index) => (
            <p
              className={tagSelected === tag ? 'selected-notes-preview-tag' : 'notes-preview-tag'}
              key={index}
              onClick={() => {
                handelTagBasedSearch(tag);
              }}
            >
              {tag}
            </p>
          ))}
        </div>
      </div>
      <div className="scroller h-[25rem] my-1" id="scrollbar-style">
        {reletedNotes &&
          reletedNotes.map((ele, idx) => {
            return (
              <RelatedNotesCard
                key={idx}
                notesData={ele}
                setNotesList={setNotesList}
                user={user}
                setuser={setuser}
                reletedNotesOptionBox={reletedNotesOptionBox}
                setReletedNotesOptionBox={setReletedNotesOptionBox}
              />
            );
          })}
      </div>

      <CommentBox comment={data.comments} user={user} />

      {!alreadyRated && (
        <div className={styles.rateNotesBtn} onClick={() => setRateThisNote(!RateThisNote)}>
          Rate this Content
        </div>
      )}

      {/* Only Visible when user wants to rate this Note */}
      {RateThisNote && (
        <RateNotes
          notesData={data}
          userId={userId}
          alreadyRated={alreadyRated}
          setAlreadyRated={setAlreadyRated}
          setRatedContent={setRatedContent}
          setReviewCount={setReviewCount}
        />
      )}
    </div>
  );
}

const StarRating = ({ rating }) => {
  // Round the rating to the nearest half
  // const roundedRating = Math.round(rating * 2) / 2;

  // Create an array of stars based on the rounded rating
  const stars = Array.from({ length: 5 }, (_, index) => {
    // Check if the current star should be filled, half-filled, or empty
    if (rating - index >= 1) {
      return <BsStarFill />; // Filled star
    } else if (rating - index >= 0.1 && rating - index <= 0.9) {
      return <BsStarHalf />; // Half-filled star
    } else {
      return <BsStar />; // Empty star
    }
  });
  return (
    <div className="flex">
      {stars.map((star, index) => (
        <span key={index}>{star}</span>
      ))}
    </div>
  );
};
