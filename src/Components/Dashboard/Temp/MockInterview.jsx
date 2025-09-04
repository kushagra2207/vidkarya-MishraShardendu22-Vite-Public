import React, { useState, useEffect } from 'react';
import { MdEventNote, MdAccessTime, MdClose } from 'react-icons/md'; // Changed import for react-icons
import axios from 'axios';
import MockInterview from '../Temp_data/MockInterview';
import { sendReqToServer } from '../../../Hooks/useAxios';
import { CAREER } from '../../../api';
import { EventExtra } from '../../../api/requests';

const SkeletonInterview = () => (
  <div className="border border-emerald-100 rounded-lg p-6 animate-pulse">
    <div className="flex justify-between flex-wrap gap-4 mb-4">
      <div>
        <div className="h-6 w-48 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 w-32 bg-gray-200 rounded"></div>
      </div>
      <div className="flex items-center gap-4">
        <div className="h-4 w-24 bg-gray-200 rounded"></div>
        <div className="h-4 w-24 bg-gray-200 rounded"></div>
      </div>
    </div>
    <div className="flex gap-3">
      <div className="flex-1 h-9 bg-gray-200 rounded"></div>
      <div className="flex-1 h-9 bg-gray-200 rounded"></div>
    </div>
  </div>
);

// Rest of Modal component remains the same
const Modal = ({ children, onClose, title, isEmpty }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
    <div className="bg-white rounded-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto">
      <div className="flex justify-between items-center p-4 border-b">
        <h3 className="text-lg font-medium">{title}</h3>
        <button onClick={onClose}>
          <MdClose className="w-6 h-6" /> {/* Updated icon */}
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

const MockInterviewSection = () => {
  const [loading, setLoading] = useState(true);
  const [fullname, setFullName] = useState('');
  const [branch, setBranch] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [batch, setBatch] = useState('');
  const [reviewer, setReviewer] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [registeredStudents, setRegisteredStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Rest of the functions remain the same
  const RegisterForMockInterview = async () => {
    try {
      await sendReqToServer({
        axiosInstance: axios,
        url: EventExtra.mockInterviewRegister,
        method: 'POST',
        requestConfig: {
          data: {
            fullname,
            branch,
            email,
            phone,
            batch,
            reviewer,
          },
        },
      });
      setFullName('');
      setBranch('');
      setEmail('');
      setPhone('');
      setBatch('');
      setReviewer('');
      setIsFormVisible(false);
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const GetRegisteredStudents = async (reviewerName) => {
    try {
      const { response } = await sendReqToServer({
        axiosInstance: axios,
        url: EventExtra.registeredMockName.replace(':name', reviewerName),
        method: 'GET',
      });
      setRegisteredStudents(response.body);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  return (
    <section className="max-w-5xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-medium text-emerald-700 mb-8">Mock Interview Sessions</h2>

      {loading ? (
        <div className="space-y-4">
          <SkeletonInterview />
          <SkeletonInterview />
        </div>
      ) : MockInterview.length === 0 ? (
        <div className="text-center py-12">
          <MdEventNote className="w-12 h-12 mx-auto mb-4 text-gray-400" /> {/* Updated icon */}
          <p>No sessions scheduled</p>
        </div>
      ) : (
        <div className="space-y-4">
          {MockInterview.map((interview) => (
            <div key={interview.id} className="border border-emerald-100 rounded-lg p-6">
              <div className="flex justify-between flex-wrap gap-4 mb-4">
                <div>
                  <h3 className="text-lg font-medium text-emerald-800">{interview.NameOfSenior}</h3>
                  <p className="text-sm text-gray-600">
                    {interview.Company} • {interview.Designation}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <MdEventNote className="w-4 h-4 text-orange-500" /> {/* Updated icon */}
                    {interview.DateOfInterview}
                  </div>
                  <div className="flex items-center gap-1">
                    <MdAccessTime className="w-4 h-4 text-orange-500" /> {/* Updated icon */}
                    {interview.TimeOfInterview}
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setReviewer(interview.NameOfSenior);
                    setIsFormVisible(true);
                  }}
                  className="flex-1 bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 text-sm"
                >
                  Book Session
                </button>
                <button
                  onClick={() => GetRegisteredStudents(interview.NameOfSenior)}
                  className="flex-1 bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 text-sm"
                >
                  View Registrations
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isFormVisible && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-xl p-6">
            <h3 className="text-lg font-medium mb-6">Register for Session</h3>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullname}
                  onChange={(e) => setFullName(e.target.value)}
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
                  value={reviewer}
                  readOnly
                  className="border rounded p-2 w-full bg-gray-50"
                />
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={RegisterForMockInterview}
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
                  <p className="text-sm text-gray-600">{student.email}</p>
                </div>
              </div>
            ))}
          </div>
        </Modal>
      )}
    </section>
  );
};

export default MockInterviewSection;
