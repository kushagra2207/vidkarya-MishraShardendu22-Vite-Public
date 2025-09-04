import React, { useState } from 'react';
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaTrash,
  FaCheck,
  FaGlobe,
  FaInfo,
} from 'react-icons/fa';
import { sendReqToServer } from '../../../../Hooks/useAxios';
import { axios, CAREER } from '../../../../api';
import { toast } from 'react-toastify';

const InternshipCard = ({ internship: initialInternship, onViewDescription }) => {
  const [internship, setInternship] = useState(initialInternship);
  const [loading, setLoading] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await sendReqToServer({
        axiosInstance: axios,
        url: CAREER.deleteInternship.replace(':id', internship._id),
        method: 'DELETE',
      });
      toast.success('Internship deleted successfully!');
      setDeleted(true);
    } catch {
      toast.error('Error deleting internship.');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkCompleted = async () => {
    try {
      setLoading(true);
      await sendReqToServer({
        axiosInstance: axios,
        url: CAREER.markInternshipCompleted.replace(':id', internship._id),
        method: 'PATCH',
      });
      toast.success('Internship marked as completed successfully!');
      setInternship({ ...internship, status: false });
    } catch {
      toast.error('Failed to mark internship as completed.');
    } finally {
      setLoading(false);
    }
  };

  if (deleted) return null;

  return (
    <div className="relative w-[400px] p-5 m-3 border rounded-md bg-white transition duration-200 hover:shadow-lg border-r-4 border-orange-500">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <span className="text-xl font-semibold text-gray-800">{internship.title}</span>
          <span className="text-sm text-gray-500 flex items-center gap-2">
            <FaBuilding className="text-gray-500" /> {internship.company}
          </span>
        </div>
        <div className="flex flex-col items-center border border-teal-500 rounded px-2 py-1 text-teal-600">
          <span className="text-sm font-medium flex items-center gap-1">
            <FaMoneyBillWave className="text-green-500" /> {internship.stipend}
          </span>
          <span className="text-xs flex items-center gap-1">
            <FaMapMarkerAlt className="text-red-500" /> {internship.location}
          </span>
        </div>
      </div>

      <div className="my-3 text-sm font-semibold">
        <span>Status: {internship.status ? 'Active' : 'Inactive'}</span>
      </div>

      <div className="mb-3">
        {internship.description && (
          <div className="text-sm">
            <span className="font-semibold">Description:</span>{' '}
            <button
              onClick={() => onViewDescription(internship.description)}
              className="text-blue-500 underline"
            >
              View Description
            </button>
          </div>
        )}
        {internship.applicationLink && (
          <div className="mt-2">
            <a
              href={internship.applicationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline flex items-center gap-1"
            >
              <FaGlobe /> Apply Now
            </a>
          </div>
        )}
        {internship.about && (
          <div className="mt-2">
            <span className="font-semibold">About:</span> {internship.about}
          </div>
        )}
        {internship.source && (
          <div className="mt-2 text-sm">
            <span className="font-semibold">Source:</span> {internship.source}
          </div>
        )}
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={handleDelete}
          disabled={loading}
          className="bg-orange-500 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <FaTrash /> Delete
        </button>
        {internship.status && (
          <button
            onClick={handleMarkCompleted}
            disabled={loading}
            className="bg-teal-500 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <FaCheck /> Mark as Completed
          </button>
        )}
      </div>
    </div>
  );
};

const InternshipList = ({ internships, onViewDescription }) => {
  return (
    <div className="p-6 mx-6 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-semibold mb-4 text-black">Available Internships</h2>
      {internships.length > 0 ? (
        <div className="flex flex-wrap gap-6">
          {internships.map((internship) => (
            <InternshipCard
              key={internship._id}
              internship={internship}
              onViewDescription={onViewDescription}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No internships available.</p>
      )}
    </div>
  );
};

export default InternshipList;
