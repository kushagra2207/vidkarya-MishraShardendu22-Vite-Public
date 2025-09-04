import {
  FaBriefcase,
  FaBuilding,
  FaMoneyBillWave,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaTrash,
  FaCheck,
} from 'react-icons/fa';

const JobCard = ({ job, onDelete, onMarkCompleted, onViewDescription }) => {
  return (
    <div className="relative w-[400px] p-5 m-3 border rounded-md bg-white transition duration-200 hover:shadow-lg border-r-4 border-orange-500">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <span className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <FaBriefcase className="text-orange-500" /> {job.title}
          </span>
          <span className="text-sm text-gray-500 flex items-center gap-2">
            <FaBuilding className="text-gray-500" /> {job.company}
          </span>
        </div>
        <div className="flex flex-col items-center border border-teal-500 rounded px-2 py-1 text-teal-600">
          <span className="text-sm font-medium flex items-center gap-1">
            <FaMoneyBillWave className="text-green-500" /> {job.salary}
          </span>
          <span className="text-xs flex items-center gap-1">
            <FaMapMarkerAlt className="text-red-500" /> {job.location}
          </span>
        </div>
      </div>

      <div className="flex items-center my-3 text-sm font-semibold">
        <FaCheckCircle className={`mr-2 ${job.status ? 'text-green-500' : 'text-gray-500'}`} />
        <span>Status: {job.status ? 'Available' : 'Closed'}</span>
      </div>

      <div className="mb-3">
        {job.description && (
          <div className="text-sm">
            <span className="font-semibold">Description:</span>{' '}
            <button
              onClick={() => onViewDescription(job.description)}
              className="text-blue-500 underline"
            >
              View Description
            </button>
          </div>
        )}
        {job.applicationLink && (
          <div className="mt-2">
            <a
              href={job.applicationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Apply Now
            </a>
          </div>
        )}
        {job.source && (
          <div className="mt-2 text-sm">
            <span className="font-semibold">Source:</span> {job.source}
          </div>
        )}
        {job.about && (
          <div className="mt-2 text-sm">
            <span className="font-semibold text-black">About:</span> {job.about}
          </div>
        )}
      </div>

      <div className="flex gap-4 mt-4">
        <button
          onClick={() => onDelete(job._id)}
          className="bg-orange-500 text-white px-4 py-2 rounded flex items-center gap-2 w-full justify-center"
        >
          <FaTrash /> Delete
        </button>
        {job.status && (
          <button
            onClick={() => onMarkCompleted(job._id)}
            className="bg-teal-500 text-white px-4 py-2 rounded flex items-center gap-2 w-full justify-center"
          >
            <FaCheck /> Mark as Completed
          </button>
        )}
      </div>
    </div>
  );
};

const JobList = ({ jobs, loading, onDelete, onMarkCompleted, onViewDescription }) => {
  return (
    <div className="p-6 mx-6 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-semibold mb-4 text-black">Available Jobs</h2>
      {loading ? (
        <p>Loading jobs...</p>
      ) : jobs.length > 0 ? (
        <div className="flex flex-wrap gap-6">
          {jobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              onDelete={onDelete}
              onMarkCompleted={onMarkCompleted}
              onViewDescription={onViewDescription}
            />
          ))}
        </div>
      ) : (
        <p>No jobs available.</p>
      )}
    </div>
  );
};

export default JobList;
