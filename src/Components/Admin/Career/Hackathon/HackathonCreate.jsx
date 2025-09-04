import React, { useState } from 'react';
import { sendReqToServer } from '../../../../Hooks/useAxios';
import { axios, CAREER } from '../../../../api';
import '../../css/UploadNotes.css';
import { toast } from 'react-toastify';

const HackathonCreate = ({ onHackathonCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    theme: '',
    prizes: '',
    source: '',
    duration: '',
    location: '',
    startDate: '',
    hackathonLink: '',
    problemStatementLink: '',
  });

  const createHackathon = async (e) => {
    e.preventDefault();
    const prizesArray = formData.prizes.split(',').map((prize) => prize.trim());
    try {
      await sendReqToServer({
        axiosInstance: axios,
        url: CAREER.makeHackathon,
        method: 'POST',
        requestConfig: {
          ...formData,
          prizes: prizesArray,
        },
      });
      toast.success('Hackathon created successfully!');
      setFormData({
        title: '',
        theme: '',
        startDate: '',
        duration: '',
        prizes: '',
        hackathonLink: '',
        source: '',
        location: '',
        problemStatementLink: '',
      });
      onHackathonCreated();
    } catch {
      toast.error('Error creating hackathon.');
    }
  };

  return (
    <div className="notes-form-section">
      <div className="container">
        <div className="notes-form-main-navbar">
          <h1 className="notes-form-heading">Create a Hackathon</h1>
          <span className="notes-form-cross-sign" onClick={onHackathonCreated}>
            ×
          </span>
        </div>
        <form onSubmit={createHackathon} className="notes-form-allInput">
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
            <div className="notes-form-input-labels">Theme</div>
            <input
              type="text"
              value={formData.theme}
              onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
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
            <div className="notes-form-input-labels">Duration</div>
            <input
              type="text"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              required
            />
          </div>
          <div className="notes-form-classInput">
            <div className="notes-form-input-labels">Prizes (comma-separated)</div>
            <textarea
              value={formData.prizes}
              onChange={(e) => setFormData({ ...formData, prizes: e.target.value })}
              required
            ></textarea>
          </div>
          <div className="notes-form-classInput">
            <div className="notes-form-input-labels">Hackathon Link</div>
            <input
              type="url"
              value={formData.hackathonLink}
              onChange={(e) => setFormData({ ...formData, hackathonLink: e.target.value })}
            />
          </div>
          <div className="notes-form-classInput">
            <div className="notes-form-input-labels">Location</div>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>
          <div className="notes-form-classInput">
            <div className="notes-form-input-labels">Problem Statement Link</div>
            <input
              type="url"
              value={formData.problemStatementLink}
              onChange={(e) => setFormData({ ...formData, problemStatementLink: e.target.value })}
              required
            />
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
            <button type="submit" className="uploadBtn">
              Create
            </button>
            <button type="button" className="cancleBtn" onClick={onHackathonCreated}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HackathonCreate;
