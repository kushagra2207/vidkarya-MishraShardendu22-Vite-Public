import React from 'react';
import parse from 'html-react-parser';

const color = {
  orange: '#F97316',
  green: '#38B5AA',
};



const EventDescriptionModal = ({ description, onClose }) => {
  if (!description) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="z-10 w-11/12 p-6 bg-white rounded-lg shadow-lg md:w-3/4 lg:w-1/2">
        <h2 className="mb-4 text-2xl font-semibold text-center" style={{ color: color.orange }}>
          Event Description
        </h2>
        <div className="overflow-auto max-h-96">
          <div>{parse(description)}</div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-white rounded-lg"
            style={{ backgroundColor: color.orange }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDescriptionModal;
