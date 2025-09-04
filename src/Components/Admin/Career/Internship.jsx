import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import InternshipForm from '../Career/Internship/InternshipForm';
import InternshipList from '../Career/Internship/InternshipList';
import InternshipDescriptionModal from '../Career/Internship/InternshipDescriptionModal';
import { sendReqToServer } from '../../../Hooks/useAxios';
import { axios, CAREER } from '../../../api';

const color = {
  orange: '#F97316',
  green: '#38B5AA',
};

const InternshipPage = () => {
  const [internships, setInternships] = useState([]);
  const [createNotes, setCreateNotes] = useState(false);
  const [selectedInternshipDesc, setSelectedInternshipDesc] = useState('');

  const fetchInternships = async () => {
    try {
      const { response } = await sendReqToServer({
        axiosInstance: axios,
        url: CAREER.getInternship,
        method: 'GET',
      });
      setInternships(response.data);
    } catch (error) {
      console.error('Error fetching internships:', error);
    }
  };

  const deleteInternship = async (id) => {
    try {
      await sendReqToServer({
        axiosInstance: axios,
        url: CAREER.deleteInternship.replace(':id', id),
        method: 'DELETE',
      });
      toast.success('Internship deleted successfully!');
      fetchInternships();
    } catch {
      toast.error('Error deleting internship.');
    }
  };

  const markAsCompleted = async (e, internship) => {
    e.preventDefault();
    try {
      await sendReqToServer({
        axiosInstance: axios,
        url: CAREER.markInternshipCompleted.replace(':id', internship._id),
        method: 'PATCH',
      });
      toast.success('Internship marked as completed!');
      fetchInternships();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error marking internship as completed.');
    }
  };

  useEffect(() => {
    fetchInternships();
  }, []);

  return (
    <>
      <div className="p-6 bg-white">
        {!createNotes ? (
          <button
            onClick={() => setCreateNotes(true)}
            type="button"
            className="create-notes-button text-center w-full"
            style={{
              backgroundColor: color.green,
              color: '#fff',
              padding: '0.5rem',
              borderRadius: '0.5rem',
            }}
          >
            + Create an Internship
          </button>
        ) : (
          <InternshipForm
            onCancel={() => setCreateNotes(false)}
            onInternshipCreated={() => {
              fetchInternships();
              setCreateNotes(false);
            }}
          />
        )}
      </div>

      <InternshipDescriptionModal
        description={selectedInternshipDesc}
        onClose={() => setSelectedInternshipDesc('')}
      />

      <InternshipList
        internships={internships}
        onDelete={deleteInternship}
        onMarkCompleted={markAsCompleted}
        onViewDescription={(desc) => setSelectedInternshipDesc(desc)}
      />
    </>
  );
};

export default InternshipPage;
