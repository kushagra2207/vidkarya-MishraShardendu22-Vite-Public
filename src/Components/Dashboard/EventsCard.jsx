import React, { useEffect, useState } from 'react';
import styles from './CSS/eventsCard.module.css';
import { MdSchedule, MdOutlineLocationOn } from 'react-icons/md';
import { GoOrganization } from 'react-icons/go';
import { IoCloseOutline, IoCloudUploadOutline, IoDocumentTextOutline } from 'react-icons/io5';
import { truncateText, extractFirstName } from '../../Helpers';
import { toast } from 'react-toastify';
import EventDescriptionModal from "./Modal/EventModal"
import { AppStates } from '../../Context/appContext.jsx';
import { axios, EVENTS } from '../../api';
import { sendReqToServer } from '../../Hooks/useAxios';
import { EventExtra } from '../../api/requests';
import parse from "html-react-parser"; 

const COLORS = {
  green: '#00A896',
  orange: '#FF6E0F',
};

function EventsCard({ eventsData }) {
  const {
    eventname,
    discription,
    organizer,
    date,
    speaker,
    location,
    timings,
    registeredUsers,
    link,
    eventType,
  } = eventsData;

  const { user } = AppStates();
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [assetLink, setAssetLink] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  console.log(discription)


  useEffect(() => {
    if (registeredUsers.includes(user?._id)) {
      setIsRegistered(true);
    }
  }, [user, registeredUsers]);

  let eventDate = '';
  let _year = '';
  let _month = '';
  let day = '';
  let monthName = '';

  if (date) {
    eventDate = date.split('T')[0];
    [_year, _month, day] = eventDate.split('-');
    monthName = new Date(date).toLocaleString('default', { month: 'long' });
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      toast.error('Please select a valid PDF file.');
      setSelectedFile(null);
    }
  };

  const handleResumeSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      toast.error('Please select a PDF file before submitting.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('email', user.email);
      formData.append('eventName', eventname);
      formData.append('resume', selectedFile);

      const { res } = await sendReqToServer({
        axiosInstance: axios,
        url: EventExtra.uploadResumeGetLink,
        method: 'POST',
        requestConfig: {
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      });

      setAssetLink(res.body.resumeLink);
      setIsSubmitted(true);
      toast.success('Resume uploaded successfully!');
      setShowModal(false);
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Resume upload failed. Please try again.');
    }
  };

  const handleLinkSubmit = async (e) => {
    e.preventDefault();
    if (!assetLink) {
      toast.error('Please enter a portfolio link');
      return;
    }

    try {
      await sendReqToServer({
        axiosInstance: axios,
        url: EventExtra.uploadEventAsset,
        method: 'POST',
        requestConfig: {
          data: {
            assetLink: assetLink,
            eventId: eventsData._id,
            userId: user._id,
          },
        },
      });
      setIsSubmitted(true);
      toast.success('Link submitted successfully!');
      setShowModal(false);
    } catch (error) {
      console.error('Error submitting asset link:', error);
      toast.error('Failed to submit link.');
    }
  };

  async function handleRegister() {
    if ((eventType === 4 || eventType === 5) && !isSubmitted) {
      toast.error('Please submit your resume/portfolio first');
      return;
    }

    try {
      setIsLoading(true);
      const { response } = await sendReqToServer({
        axiosInstance: axios,
        url: EVENTS.register,
        method: 'PUT',
        requestConfig: {
          data: {
            eventId: eventsData._id,
            eventLink: link,
            eventName: eventname,
            userId: user._id,
            userName: extractFirstName(user.name),
            userEmail: user.email,
          },
        },
      });
      if (response?.status === 'Success') {
        toast.success(response.message);
        setIsRegistered(true);
      } else {
        toast.error(response?.message);
      }
    } catch {
      toast.error('Could not register');
    } finally {
      setIsLoading(false);
    }
  }

  const showUploadButton = (eventType === 4 || eventType === 5) && !isSubmitted && !isRegistered;

  
  return (
    <>
      <div className={styles.EventsCardWrapper}>
        <div className={styles.EventsCardTop}>
          <div className={styles.EventsCardTopLeft}>
            <span className={styles.eventCardHead}>{truncateText(eventname, 7)}</span>
            <span className={styles.eventCardSubHead}>by {speaker}</span>
          </div>

          <div className={styles.EventCardTopRight}>
            <span className={styles.eventCardTopDate}>{day}</span>
            <span className={styles.eventCardTopMonth}>{monthName}</span>
          </div>
        </div>

        <div className={styles.EventsCardMiddle}>
          <div className={styles.EventsCardTiming}>
            <MdSchedule className={styles.EventsCardTimingLogo} size={20} />
            <span className={styles.EventsCardTimingText}>{timings}</span>
          </div>

          <div className={styles.EventsCardLocation}>
            <MdOutlineLocationOn className={styles.EventsCardLocationLogo} size={20} />
            <span className={styles.EventsCardLocationText}>{location}</span>
          </div>
        </div>

       <div className={styles.EventsCardDesc}>
          {discription ? (
            discription.length > 50 ? (
             <>
              {parse(truncateText(discription, 40))}
              <div className="w-full mt-2 text-center">
                <span
                  onClick={() => setShowDescription(true)}
                  style={{ color: COLORS.orange }}
                  className="font-medium cursor-pointer hover:underline"
                >
                  Read more...
                </span>
              </div>
            </>

            ) : (
              parse(discription)
            )
          ) : (
            ""
          )}
        </div>


        <div className={styles.EventCardBottom}>
          <div className={styles.EventCardOrgName}>
            <GoOrganization className={styles.EventCardOrgLogo} size={25} />
            <span className={styles.EventCardOrgName}>{organizer}</span>
          </div>

          <div className="flex items-center gap-4">
            {showUploadButton && (
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 p-2 rounded-lg"
                style={{ backgroundColor: COLORS.orange, color: 'white' }}
                title={eventType === 4 ? 'Upload Resume' : 'Submit Portfolio Link'}
              >
                <IoCloudUploadOutline size={20} />
              </button>
            )}

             <div>
                  <button
                    type="button"
                    className="py-2 px-6 rounded-xl flex items-center gap-2 border border-[#38B5AA] text-[#38B5AA] hover:bg-[#F97316] hover:text-white transition-colors"
                    onClick={() => setShowDescription(true)}
                  >
                    View description
                  </button>
                </div>
                
            {isRegistered ? (
              <div className={styles.registeredText}> Registered </div>
            ) : (
              <div
                style={{
                  backgroundColor: COLORS.green,
                  opacity: !isSubmitted && (eventType === 4 || eventType === 5) ? '0.5' : '1',
                }}
                className={`py-2 px-6 rounded-xl gap-2 border border-[#38B5AA] hover:bg-[#F97316] text-white transition-colors ${!isSubmitted && (eventType === 4 || eventType === 5) ? 'cursor-none' : 'cursor-pointer'}`}
                onClick={handleRegister}
              >
                {!isLoading ? 'Register' : 'Wait...'}
              </div>
            )}
             {showDescription && (
              <EventDescriptionModal
                description={discription}
                onClose={() => setShowDescription(false)}
              />
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-xl p-8 w-[600px] relative shadow-2xl transform transition-all duration-300 scale-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                {eventType === 4 ? 'Upload Resume' : 'Add Portfolio Link'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 text-gray-400 transition-colors rounded-full hover:text-gray-600 hover:bg-gray-100"
              >
                <IoCloseOutline size={20} />
              </button>
            </div>

            <form
              onSubmit={eventType === 4 ? handleResumeSubmit : handleLinkSubmit}
              className="space-y-6"
            >
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  {eventType === 4 ? 'Upload PDF Resume' : 'Portfolio URL'}
                </label>
                <div className="flex items-center gap-3 p-4 transition-colors border-2 border-gray-200 rounded-lg hover:border-gray-300">
                  <IoDocumentTextOutline size={20} className="text-gray-400" />
                  {eventType === 4 ? (
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-500 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                      />
                      {selectedFile && (
                        <p className="mt-2 text-sm text-gray-500">Selected: {selectedFile.name}</p>
                      )}
                    </div>
                  ) : (
                    <input
                      type="text"
                      placeholder="https://your-portfolio-url.com"
                      value={assetLink}
                      onChange={(e) => setAssetLink(e.target.value)}
                      className="flex-1 text-gray-700 placeholder-gray-400 outline-none"
                    />
                  )}
                </div>
              </div>


              <div className="flex gap-4 pt-4">
                 <div>
                  <button
                    type="button"
                    className="py-2 px-6 rounded-xl flex items-center gap-2 border border-[#38B5AA] text-[#38B5AA] hover:bg-[#F97316] hover:text-white transition-colors"
                    onClick={() => setShowDescription(true)}
                  >
                    View description
                  </button>
                </div>
                <div>
                  <button
                  type="submit"
                  style={{ backgroundColor: COLORS.green }}
                  className="flex-1 px-4 py-3 font-semibold text-white rounded-lg"
                  disabled={isSubmitted ||   (eventType === 4 && !selectedFile) ||
                            (eventType === 5 && !assetLink)}
                >
                  {isSubmitted ? 'Submitted' : 'Submit'}
                </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default EventsCard;
