import React from 'react';
import './loading-skeleton.css';

function NotesSkeleton() {
  return (
    <div className="bg-white z-100">
      <div>
        <NotesSlideLoading />
        <NotesSlideLoading />
        <NotesSlideLoading />
        <NotesSlideLoading />
        <NotesSlideLoading />
        <NotesSlideLoading />
        <NotesSlideLoading />
        <NotesSlideLoading />
      </div>
    </div>
  );
}

const NotesSlideLoading = () => {
  return (
    <div className="notes-slide  mt-5  p-2">
      <div className="flex gap-4">
        <div className="h-24 w-[15%] skeleton"></div>
        <div className="h-24 w-[80%]">
          <div className="h-5 skeleton w-1/2"></div>
          <div className="h-2 mt-5 w-[90%] skeleton "></div>
          <div className="h-2 mt-5 w-[90%] skeleton "></div>
        </div>
      </div>
    </div>
  );
};
export default NotesSkeleton;
