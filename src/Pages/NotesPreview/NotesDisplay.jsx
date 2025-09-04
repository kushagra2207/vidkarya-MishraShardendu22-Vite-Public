import React from 'react';
import { GiExpand, GiContract } from '../../lib/icons';

export default function NotesDisplay({ resourceLink, expand, setExpand }) {
  return (
    <div className=" w-full relative">
      <div
        className="absolute bg-black  w-14 h-14 z-100 right-0 p-1 cursor-pointer"
        onClick={() => setExpand(!expand)}
      >
        {expand ? <GiContract size={40} color="white" /> : <GiExpand size={40} color="white" />}
      </div>

      <iframe
        src={resourceLink}
        height={'1050px'}
        className={`md:w-[${expand ? '1500px' : '700px'}] w-[100%]`}
        style={{ border: 'none' }}
        allow="autoplay"
        title="Notes Preview"
      ></iframe>
    </div>
  );
}
