import {
  FaTrophy,
  FaCalendarAlt,
  FaClock,
  FaGift,
  FaCheckCircle,
  FaTrash,
  FaCheck,
  FaLink,
} from 'react-icons/fa';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { axios, CAREER } from '../../../../api';
import { sendReqToServer } from '../../../../Hooks/useAxios';

const color = {
  orange: '#F97316',
  green: '#38B5AA',
};

const HackathonCard = ({ hackathon: initialHackathon }) => {
  const [hackathon, setHackathon] = useState(initialHackathon);
  const [loading, setLoading] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await sendReqToServer({
        axiosInstance: axios,
        url: CAREER.deleteHackathon.replace(':id', hackathon._id),
        method: 'DELETE',
      });
      toast.success('Hackathon deleted successfully!');
      setDeleted(true);
    } catch {
      toast.error('Error deleting hackathon.');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkCompleted = async () => {
    try {
      setLoading(true);
      await sendReqToServer({
        axiosInstance: axios,
        url: CAREER.markHackathonAsCompleted.replace(':id', hackathon._id),
        method: 'PATCH',
      });
      toast.success('Hackathon marked as completed successfully!');
      setHackathon({ ...hackathon, status: false });
    } catch {
      toast.error('Failed to mark hackathon as completed.');
    } finally {
      setLoading(false);
    }
  };

  if (deleted) return null;

  return (
    <div
      className="relative w-[400px] p-5 m-3 border rounded-lg bg-white transition duration-200 shadow-md hover:shadow-xl border-r-4"
      style={{ borderColor: color.orange }}
    >
      {/* CARD TOP */}
      <div className="flex justify-between">
        <div className="flex flex-col">
          <span className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <FaTrophy style={{ color: color.orange }} /> {hackathon.title}
          </span>
          <span className="text-sm text-gray-500 flex items-center gap-2">
            <FaCalendarAlt className="text-gray-500" />{' '}
            {new Date(hackathon.startDate).toLocaleDateString()}
          </span>
        </div>
        <div
          className="flex flex-col items-center border rounded px-2 py-1"
          style={{ borderColor: color.green, color: color.green }}
        >
          <span className="text-sm font-medium flex items-center gap-1">
            <FaClock style={{ color: color.green }} /> {hackathon.duration}
          </span>
        </div>
      </div>

      {/* CARD MIDDLE */}
      <div className="flex items-center my-3 text-sm font-semibold">
        <FaCheckCircle
          className="mr-2"
          style={{ color: hackathon.status ? color.green : '#6b7280' }}
        />
        <span>Status: {hackathon.status ? 'Active' : 'Inactive'}</span>
      </div>

      {/* CARD DETAILS */}
      <div className="mb-3 text-sm">
        <div>
          <span className="font-semibold">Theme:</span> {hackathon.theme || 'N/A'}
        </div>
        <div className="flex items-center gap-2">
          <FaGift style={{ color: color.orange }} />
          <span className="font-semibold">Prizes:</span> {hackathon.prizes.join(', ')}
        </div>
        {hackathon.source && (
          <div>
            <span className="font-semibold">Source:</span> {hackathon.source}
          </div>
        )}
        <div>
          <span className="font-semibold">Location:</span> {hackathon.location}
        </div>
        {hackathon.problemStatementLink && (
          <div className="mt-2">
            <a
              href={hackathon.problemStatementLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline flex items-center gap-1"
            >
              <FaLink /> Problem Statement
            </a>
          </div>
        )}
        {hackathon.hackathonLink && (
          <div className="mt-2">
            <a
              href={hackathon.hackathonLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline flex items-center gap-1"
            >
              <FaLink /> Hackathon Link
            </a>
          </div>
        )}
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex justify-between mt-4">
        <button
          onClick={handleDelete}
          disabled={loading}
          className="px-4 py-2 rounded text-white flex items-center gap-2"
          style={{ backgroundColor: color.orange }}
        >
          <FaTrash /> Delete
        </button>
        {hackathon.status && (
          <button
            onClick={handleMarkCompleted}
            disabled={loading}
            className="px-4 py-2 rounded text-white flex items-center gap-2"
            style={{ backgroundColor: color.green }}
          >
            <FaCheck /> Mark as Completed
          </button>
        )}
      </div>
    </div>
  );
};

export default HackathonCard;
