import React, { useState, useContext, useEffect } from 'react';
import NotesCardMini from '../Notes/NotesCardMini';
import { NotesDetailsContext } from '../../Context/notesContextApi.jsx';

const UserNotesBookmarks = (props) => {
  const [bookmarkedNotes, setBookmarkedNotes] = useState([]);
  const { notesList } = useContext(NotesDetailsContext);
  const filterBookmarkedNotes = (notesList, bookmarkedNotes) => {
    return notesList.filter((jsonObj) => bookmarkedNotes.includes(jsonObj._id));
  };
  useEffect(() => {
    setBookmarkedNotes(filterBookmarkedNotes(notesList, props.user?.notes));
  }, [notesList, props.user?.notes]);
  return (
    <>
      {bookmarkedNotes?.length > 0 ? (
        <div className="flex h-fit gap-4">
          {bookmarkedNotes.map((ele, idx) => {
            return (
              <NotesCardMini
                coursename={ele.coursename}
                views={ele.views}
                createdAt={ele.createdAt}
                discription={ele.discription}
                _id={ele._id}
                key={idx}
              />
            );
          })}
        </div>
      ) : (
        <div className="flex justify-center items-center w-full text-xl font-bold text-[#005C6A] opacity-30 cursor-pointer">
          {' '}
          No Notes Bookmarked{' '}
        </div>
      )}
    </>
  );
};

export default UserNotesBookmarks;
