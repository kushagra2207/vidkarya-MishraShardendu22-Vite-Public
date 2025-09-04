import React, { useState, useEffect } from 'react';
import { FaRegCalendarAlt, FaRegTimesCircle, FaExclamationCircle } from 'react-icons/fa'; // Changed to react-icons
import axios from 'axios';
import ResumeReview from '../Temp_data/ResumeReview';
import { sendReqToServer } from '../../../Hooks/useAxios';
import { EventExtra } from '../../../api/requests';

const SkeletonReview = () => (
  <div className="border border-emerald-100 rounded-lg p-6 animate-pulse">
    <div className="flex justify-between flex-wrap gap-4 mb-4">
      <div>
        <div className="h-6 w-48 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 w-32 bg-gray-200 rounded"></div>
      </div>
      <div className="h-4 w-32 bg-gray-200 rounded"></div>
    </div>
    <div className="flex gap-3">
      <div className="flex-1 h-9 bg-gray-200 rounded"></div>
      <div className="flex-1 h-9 bg-gray-200 rounded"></div>
    </div>
  </div>
);

const Modal = ({ children, onClose, title, isEmpty }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
    <div className="bg-white rounded-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto">
      <div className="flex justify-between items-center p-4 border-b">
        <h3 className="text-lg font-medium">{title}</h3>
        <button onClick={onClose}>
          <FaRegTimesCircle className="w-6 h-6" />
        </button>
      </div>
      {isEmpty ? (
        <div className="p-8 text-center">
          <p>No students registered yet</p>
        </div>
      ) : (
        <div className="p-4">{children}</div>
      )}
    </div>
  </div>
);

const ResumeReviewSection = () => {
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [branch, setBranch] = useState('');
  const [batch, setBatch] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedReviewer, setSelectedReviewer] = useState(null);
  const [registeredStudents, setRegisteredStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const SeeRegisteredStudents = async () => {
    try {
      const res = await sendReqToServer({
        axiosInstance: axios,
        url: EventExtra.registeredstudent.replace(':name', selectedReviewer),
        method: 'GET',
      });

      setRegisteredStudents(res.body);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Fetch error:', error);
      setErrorMessage('Failed to fetch registered students');
    }
  };

  const BookReview = async () => {
    if (!selectedReviewer) {
      setErrorMessage('Please select a reviewer');
      return;
    }

    const formData = new FormData();
    formData.append('fullname', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('branch', branch);
    formData.append('batch', batch);
    formData.append('reviewer', selectedReviewer);
    formData.append('resume', resumeFile);

    try {
      await sendReqToServer({
        axiosInstance: axios,
        url: EventExtra.submitResume,
        method: 'POST',
        requestConfig: {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          data: formData,
        },
      });

      setName('');
      setEmail('');
      setPhone('');
      setBranch('');
      setBatch('');
      setResumeFile(null);
      setIsFormVisible(false);
      setErrorMessage(null);
    } catch (error) {
      console.error('Submit error:', error);
      setErrorMessage('Failed to submit the resume');
    }
  };

  return (
    <section className="max-w-5xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-medium text-emerald-700 mb-8">Resume Review Sessions</h2>

      {loading ? (
        <div className="space-y-4">
          <SkeletonReview />
          <SkeletonReview />
        </div>
      ) : ResumeReview.length === 0 ? (
        <div className="text-center py-12">
          <FaExclamationCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p>No sessions scheduled</p>
        </div>
      ) : (
        <div className="space-y-4">
          {ResumeReview.map((review) => (
            <div key={review.id} className="border border-emerald-100 rounded-lg p-6">
              <div className="flex justify-between flex-wrap gap-4 mb-4">
                <div>
                  <h3 className="text-lg font-medium text-emerald-800">
                    {review.NameOfSeniorToShow}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {review.Company} • {review.Designation}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <FaRegCalendarAlt className="w-4 h-4 text-orange-500" />
                    {review.DateOfChecking} | {review.TimeOfChecking}
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setSelectedReviewer(review.NameOfSenior);
                    setIsFormVisible(true);
                  }}
                  className="flex-1 bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 text-sm"
                >
                  Book Review
                </button>
                <button
                  onClick={() => {
                    setSelectedReviewer(review.NameOfSenior);
                    SeeRegisteredStudents();
                  }}
                  className="flex-1 bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 text-sm"
                >
                  View Registrations
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {errorMessage && <div className="text-red-500 text-center my-4">{errorMessage}</div>}

      {isFormVisible && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-xl p-6">
            <h3 className="text-lg font-medium mb-6">Book Resume Review</h3>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border rounded p-2 w-full"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border rounded p-2 w-full"
                />
                <input
                  type="text"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="border rounded p-2 w-full"
                />
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="border rounded p-2 w-full"
                >
                  <option value="">Select Branch</option>
                  <option value="CSE">CSE</option>
                  <option value="ECE">ECE</option>
                  <option value="DSAI">DSAI</option>
                </select>
                <input
                  type="text"
                  placeholder="Batch"
                  value={batch}
                  onChange={(e) => setBatch(e.target.value)}
                  className="border rounded p-2 w-full"
                />
                <input
                  type="text"
                  value={selectedReviewer}
                  readOnly
                  className="border rounded p-2 w-full bg-gray-50"
                />
              </div>
              <input
                type="file"
                onChange={(e) => setResumeFile(e.target.files[0])}
                className="w-full p-2 border rounded"
              />
              <div className="flex gap-3 mt-6">
                <button
                  onClick={BookReview}
                  className="flex-1 bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
                >
                  Submit
                </button>
                <button
                  onClick={() => setIsFormVisible(false)}
                  className="flex-1 border border-gray-300 px-4 py-2 rounded hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <Modal
          onClose={() => setIsModalOpen(false)}
          title="Registered Students"
          isEmpty={registeredStudents.length === 0}
        >
          <div className="space-y-2">
            {registeredStudents.map((student, index) => (
              <div key={student._id} className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                <span className="text-gray-500">{index + 1}.</span>
                <div>
                  <p className="font-medium">{student.fullname}</p>
                  <p className="text-sm text-gray-600">Resume: {student.resume}</p>
                </div>
              </div>
            ))}
          </div>
        </Modal>
      )}
    </section>
  );
};

export default ResumeReviewSection;
