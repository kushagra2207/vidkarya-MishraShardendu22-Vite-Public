import React, { useState } from 'react';
import { sendReqToServer } from '../../Hooks/useAxios';
import { NOTES, axios } from '../../api';
import { useToasts } from '../UI/toast';

import './styles/rate-notes.css';

const StarRating = ({ rating, setRating, alreadyRated }) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none',
              cursor: 'pointer',
              fontSize: '2rem',
            }}
            key={index}
            className={index <= (hover || rating) ? 'on' : 'off'}
            onClick={() => setRating(index)}
            onMouseEnter={() => {
              if (!alreadyRated) {
                setHover(index);
              }
            }}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};

export default function RateNotes({
  notesData,
  userId,
  alreadyRated,
  setAlreadyRated,
  setRatedContent,
  setReviewCount,
}) {
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState('');
  const [notify] = useToasts();

  const handelRatingBtn = async () => {
    try {
      const { response, error: _error } = await sendReqToServer({
        axiosInstance: axios,
        url: NOTES.rate,
        method: 'POST',
        requestConfig: {
          data: {
            notesId: notesData._id,
            userId,
            rating,
            content: description,
          },
        },
      });
      // console.log(response);
      if (response.status === 'success') {
        notify({
          type: 'SUCCESS',
          message: 'Thanks for your feedback',
        });
        setAlreadyRated(true);
        setReviewCount((prevCount) => prevCount + 1);
        setRatedContent(response.body.newRating);
        notesData.rating = response.body.updatedRating;
      }
    } catch (error) {
      console.log(error);
      notify({
        type: 'ERROR',
        message: 'Error occured while processing request',
      });
    }
  };

  const handelOnType = (e) => {
    if (!alreadyRated) setDescription(e.target.value);
  };
  return (
    <div>
      <div className="top-header flex justify-between my-2">
        <div>
          <p className="text-lg font-bold">Rate This notes</p>
          <p className=" mt-1">Tell us about this notes</p>
        </div>

        {!alreadyRated && (
          <button className="text-lg rate-post-btn" onClick={handelRatingBtn}>
            Rate Content
          </button>
        )}
      </div>

      <StarRating rating={rating} setRating={setRating} alreadyRated={alreadyRated} />

      <div className="my-5">
        <p className="text-lg font-semibold my-2">Description (optional)</p>
        <textarea
          value={description}
          onChange={handelOnType}
          className="outline-none mx-auto p-1 border w-full"
          id=""
          cols="40"
          rows="5"
          placeholder="description"
        ></textarea>
      </div>
    </div>
  );
}
