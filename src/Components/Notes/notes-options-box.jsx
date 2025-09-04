import React, { useState, useEffect, useCallback } from 'react';
import { BsBookmark, BiLike, AiFillLike, BsBookmarkFill } from '../../lib/icons';
import { NOTES, axios } from './../../api';
import { sendReqToServer } from '../../Hooks/useAxios';
import { useToasts } from './../UI/toast';
import './notes.css';

export default function NotesOptionBox({ notesData, setNotesData, user, setuser }) {
  const notesid = notesData._id;
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [notify] = useToasts();
  const [userId, _setUserId] = useState(user._id || '');
  
  const checkBookmarked = useCallback((notes) => {
    return notes.some((ele, _idx) => {
      if (ele === notesid) return true;
    })
      ? true
      : false;
  }, [notesid]);

  const ckeckLiked = useCallback(() => {
    return notesData.likes.some((ele) => {
      if (ele === userId) return true;
    })
      ? true
      : false;
  }, [notesData.likes, userId]);

  useEffect(() => {
    const fetchBookmark = async () => {
      try {
        // Seting default from database
        setBookmarked(checkBookmarked(user.notes));
        setLiked(ckeckLiked());
      } catch (error) {
        console.log(error);
      }
    };
    fetchBookmark();
  }, [checkBookmarked, ckeckLiked, user.notes]);

  const handelLikeButton = async (isCurrentlyLiked) => {
    setLiked(!isCurrentlyLiked);
    try {
      const { response, error: _error1 } = await sendReqToServer({
        axiosInstance: axios,
        url: NOTES.like + notesid,
        method: 'PUT',
        requestConfig: {
          userId,
        },
      });
      if (response.body) {
        let updatedLikes = notesData.likes.slice(); // Create a shallow copy of the notes array
        if (!isCurrentlyLiked) {
          updatedLikes.push(userId); // update the user notes array
        } else {
          updatedLikes = updatedLikes.filter((ele) => ele !== userId);
        }
        setNotesData((prevUser) => ({
          ...prevUser,
          likes: updatedLikes,
        }));
      }
    } catch {
      notify({
        type: 'ERROR',
        message: 'Unable to like',
      });
      setLiked(!isCurrentlyLiked);
    }
  };

  const handelBookmarkButton = async (isCurrentlyBookmarked) => {
    setBookmarked(!isCurrentlyBookmarked);
    try {
      const { response, error: _error2 } = await sendReqToServer({
        axiosInstance: axios,
        url: NOTES.save + notesid,
        method: 'put',
        requestConfig: {
          userId,
        },
      });
      if (response) {
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
      }
    } catch (error) {
      console.log(error);
      notify({
        type: 'ERROR',
        message: 'Unable to bookmark',
      });
      setBookmarked(!isCurrentlyBookmarked);
    }
  };

  return (
    <div className="notes-options-box">
      <ul className="p-1">
        <div
          onClick={(event) => {
            event.stopPropagation();
            handelBookmarkButton(bookmarked);
          }}
        >
          {bookmarked ? (
            <>
              <BsBookmarkFill color="#38B5AA" size={18} />
              <p>Bookmarked</p>
            </>
          ) : (
            <>
              <BsBookmark size={18} />
              <p>Bookmark</p>
            </>
          )}
        </div>

        <hr />

        <div
          onClick={(event) => {
            event.stopPropagation();
            handelLikeButton(liked);
          }}
        >
          {liked ? (
            <>
              <AiFillLike color="#38B5AA" size={18} />
              <p>Liked</p>
            </>
          ) : (
            <>
              <BiLike size={18} />
              <p>Like</p>
            </>
          )}
        </div>
      </ul>
    </div>
  );
}
