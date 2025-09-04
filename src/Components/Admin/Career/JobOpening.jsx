import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import JobList from './Job/JobList';
import JobDescriptionModal from './Job/JobDescriptionModal';
import JobForm from './Job/JobForm';
import { sendReqToServer } from '../../../Hooks/useAxios';
import { axios, CAREER } from '../../../api';

const color = {
  orange: '#F97316',
  green: '#38B5AA',
};

const JobPage = () => {
  const [jobs, setJobs] = useState([]);
  const [createNotes, setCreateNotes] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedJobDesc, setSelectedJobDesc] = useState('');

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const { response } = await sendReqToServer({
        axiosInstance: axios,
        url: CAREER.getJob,
        method: 'GET',
      });
      const filteredJobs = response.data.map((job) => ({
        _id: job._id,
        title: job.title,
        company: job.company,
        location: job.location,
        salary: job.salary,
        applicationLink: job.applicationLink,
        description: job.description || 'No description available',
        source: job.source || 'Not specified',
        status: job.status,
        about: job.about,
        startDate: job.startDate,
      }));
      setJobs(filteredJobs);
    } catch {
      toast.error('Failed to fetch jobs.');
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (id) => {
    try {
      setLoading(true);
      await sendReqToServer({
        axiosInstance: axios,
        url: CAREER.deleteJob.replace(':id', id),
        method: 'DELETE',
      });
      toast.success('Job deleted successfully!');
      fetchJobs();
    } catch {
      toast.error('Error deleting job.');
    } finally {
      setLoading(false);
    }
  };

  const markJob = async (id) => {
    try {
      setLoading(true);
      await sendReqToServer({
        axiosInstance: axios,
        url: CAREER.markJobAsCompleted.replace(':id', id),
        method: 'PATCH',
      });
      toast.success('Job marked as completed successfully!');
      fetchJobs();
    } catch {
      toast.error('Failed to mark job as completed.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <>
      <div className="p-6 bg-white">
        {!createNotes ? (
          <button
            onClick={() => setCreateNotes(true)}
            type="button"
            className="w-full text-center py-2 rounded-md"
            style={{
              backgroundColor: color.green,
              color: '#fff',
              padding: '0.5rem',
              borderRadius: '0.5rem',
            }}
          >
            + Create a Job
          </button>
        ) : (
          <JobForm
            onCancel={() => setCreateNotes(false)}
            onJobCreated={() => {
              fetchJobs();
              setCreateNotes(false);
            }}
          />
        )}
      </div>

      <JobDescriptionModal description={selectedJobDesc} onClose={() => setSelectedJobDesc('')} />

      <JobList
        jobs={jobs}
        loading={loading}
        onDelete={deleteJob}
        onMarkCompleted={markJob}
        onViewDescription={(desc) => setSelectedJobDesc(desc)}
      />
    </>
  );
};

export default JobPage;
