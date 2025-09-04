import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import DescriptionModal from './DescriptionModal';
import { sendReqToServer } from '../../../../Hooks/useAxios';
import { axios, CAREER } from '../../../../api';
import '../../css/UploadNotes.css';

const JobForm = ({ onCancel, onJobCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    startDate: '',
    about: '',
    salary: '',
    applicationLink: '',
    description: '',
    source: '',
  });
  const [loading, setLoading] = useState(false);
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [tempDescription, setTempDescription] = useState('');
  const editorRef = useRef(null);

  const openDescriptionModal = () => {
    setTempDescription(formData.description);
    setShowDescriptionModal(true);
  };

  const saveDescription = () => {
    setFormData({ ...formData, description: tempDescription });
    setShowDescriptionModal(false);
  };

  const createJob = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await sendReqToServer({
        axiosInstance: axios,
        url: CAREER.makeJob,
        method: 'POST',
        requestConfig: formData,
      });
      toast.success('Job created successfully!');
      setFormData({
        title: '',
        company: '',
        location: '',
        startDate: '',
        about: '',
        salary: '',
        applicationLink: '',
        description: '',
        source: '',
      });
      onJobCreated();
    } catch {
      toast.error('Error creating job.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="notes-form-section">
      <div className="container">
        <div className="notes-form-main-navbar">
          <h1 className="notes-form-heading">Create a Job</h1>
          <span className="notes-form-cross-sign" onClick={onCancel}>
            ×
          </span>
        </div>
        <form onSubmit={createJob} className="notes-form-allInput">
          <div className="notes-form-classInput">
            <div className="notes-form-input-labels">Title</div>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          <div className="notes-form-classInput">
            <div className="notes-form-input-labels">Company</div>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              required
            />
          </div>
          <div className="notes-form-classInput">
            <div className="notes-form-input-labels">About</div>
            <input
              type="text"
              value={formData.about}
              onChange={(e) => setFormData({ ...formData, about: e.target.value })}
              required
            />
          </div>
          <div className="notes-form-classInput">
            <div className="notes-form-input-labels">Location</div>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
            />
          </div>
          <div className="notes-form-classInput">
            <div className="notes-form-input-labels">Start Date</div>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              required
            />
          </div>
          <div className="notes-form-classInput">
            <div className="notes-form-input-labels">Salary</div>
            <input
              type="text"
              value={formData.salary}
              onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
              required
            />
          </div>
          <div className="notes-form-classInput">
            <div className="notes-form-input-labels">Application Link</div>
            <input
              type="url"
              value={formData.applicationLink}
              onChange={(e) => setFormData({ ...formData, applicationLink: e.target.value })}
            />
          </div>
          <div className="notes-form-classInput">
            <div className="notes-form-input-labels">Description</div>
            <button
              type="button"
              onClick={openDescriptionModal}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-left"
            >
              {formData.description ? 'View/Edit Description' : 'Add Description'}
            </button>
          </div>
          <div className="notes-form-classInput">
            <div className="notes-form-input-labels">Source</div>
            <input
              type="text"
              value={formData.source}
              onChange={(e) => setFormData({ ...formData, source: e.target.value })}
            />
          </div>
          <div className="btn_container">
            <button type="submit" className="uploadBtn" disabled={loading}>
              {loading ? 'Creating...' : 'Create'}
            </button>
            <button type="button" className="cancleBtn" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
      {showDescriptionModal && (
        <DescriptionModal
          tempDescription={tempDescription}
          setTempDescription={setTempDescription}
          onSave={saveDescription}
          onCancel={() => setShowDescriptionModal(false)}
          editorRef={editorRef}
        />
      )}
    </div>
  );
};

export default JobForm;
