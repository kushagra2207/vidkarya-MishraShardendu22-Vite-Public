import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../Components';
import styles from './QnPaper.module.css';
import { PiNewspaperClippingDuotone } from 'react-icons/pi';
import { BsSearch } from 'react-icons/bs';
import qpPageImg from '../../Assets/qpPageImg.png';
import questionPapersMockData from '../../data/questionPapersMockData';
import { AppStates } from '../../Context/appContext.jsx';

const Card = ({ subjectCode, subjectName, type, year, _faculty, _id }) => {
  const navigate = useNavigate();
  const { user, setShowLoginPopup } = AppStates();

  function handleNavigate() {
    if (!user) {
      setShowLoginPopup(true);
      return;
    }

    navigate('/qp/preview/' + _id);
  }

  return (
    <div className=" h-32 my-2 mx-5 cursor-pointer" onClick={handleNavigate}>
      <div className="flex gap-3 items-center p-1 border-l-4 border-orange-500 shadow-lg rounded ">
        <div className="w-1/6 ml-1">
          <div style={{ fontSize: '2rem' }}>
            <PiNewspaperClippingDuotone />
          </div>
        </div>

        <div className="w-4/6">
          <p className="font-bold text-l mb-1 text-center">{subjectCode}</p>
          <p className="text-gray-700 text-s text-center">{subjectName}</p>
          <div className="flex items-center ml-4 mt-1 justify-between">
            <div className="flex flex-row gap-4 justify-between text-center">
              <p className="text-gray-700 text-base mb-1">
                <span className="italic">&#8226;</span> <span className="italic">{type}</span>
              </p>
              <p className="text-gray-700 text-base ml-4">
                <span className="italic">&#8226;</span> <span className="italic">{year}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function QuestionPapersContainer() {
  const [searchTerm, setSearchTerm] = useState(''); // Define searchTerm here
  const [SearchResult, setSearchResult] = useState(null);
  const _navigate = useNavigate();
  const searchInputRef = useRef(null);
  const _sendRef = useRef(null);

  const handleSearch = () => {
    const filteredPapers = questionPapersMockData.filter((paper) => {
      const searchTermLowerCase = searchTerm.toLowerCase();
      return (
        paper.subjectName.toLowerCase().includes(searchTermLowerCase) ||
        paper.subjectCode.toLowerCase().includes(searchTermLowerCase) ||
        paper.type.toLowerCase().includes(searchTermLowerCase)
      );
    });
    setSearchResult(filteredPapers);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <Navbar />
      <div className={styles.wrapper}>
        {/* Landing Container */}
        <div className={styles.landingDiv}>
          <div className={styles.landingDescription}>
            <span className={styles.landingDescHead}> Previous year question papers </span>
            <span className={styles.landingDescSubHead}>
              Boost your exam preparation to new heights with our extensive collection of previous
              year question papers! Excel in exams by leveraging the power of real exam scenarios
              and familiarize yourself with the pattern, types of questions, and time management
              skills crucial for success.
            </span>
          </div>
          <img src={qpPageImg} className={styles.landingImg} alt="Course Structure" />
        </div>

        <div className="my-12">
          <p className="font-bold text-3xl text-center ">Previous Year Question papers</p>
        </div>

        {/* SEARCH BOX HERE */}
        <div className={styles.searchWrapper}>
          <input
            className={styles.inputText}
            onChange={handleInputChange}
            onKeyDown={(e) => handleKeyDown(e)}
            value={searchTerm}
            placeholder="Search Question Papers ..."
            type="text"
          />

          <div
            className={styles.sendIconBox}
            onClick={() => handleSearch(searchTerm)}
            ref={searchInputRef}
          >
            <BsSearch className={styles.sendIcon} />
          </div>
        </div>
        <div className="md:grid grid-cols-4 gap-8">
          {SearchResult
            ? SearchResult.map((qp, i) => <Card key={i} {...qp} />)
            : questionPapersMockData.map((qp, i) => <Card key={i} {...qp} />)}
        </div>
      </div>
    </>
  );
}

export default QuestionPapersContainer;
