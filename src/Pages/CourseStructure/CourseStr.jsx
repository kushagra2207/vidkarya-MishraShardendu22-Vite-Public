import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../Components';
import styles from './styles/courseStr.module.css';
import { BsSearch } from 'react-icons/bs';
import { GoProjectRoadmap } from 'react-icons/go';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import axios from 'axios';
import { COURSE_STR_ASSET } from '../../Assets/assetImages';
import { truncateText } from '../../Helpers';
import { AppStates } from '../../Context/appContext.jsx';

function CourseStr() {
  const [courseStructures, setCourseStructures] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoding] = useState(false);
  const [SearchTerm, setSearchTerm] = useState('');
  const [SearchResult, setSearchResult] = useState(null);
  const sendRef = useRef(null);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      sendRef.current.click(); // Trigger button click
    }
  };

  async function handleSearch(searchTerm) {
    if (searchTerm === '') {
      setSearchResult(null);
      return;
    }

    setIsSearching(true);

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/courseStructure/search/${searchTerm}`
      );
      setSearchResult(res.data.body.searchResult);
      setIsSearching(false);
    } catch (err) {
      console.log(err);
      setIsSearching(false);
      throw err;
    }
  }

  // Fetch course structures
  useEffect(() => {
    async function fetchAllCourseStr() {
      try {
        setIsLoding(true);
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/courseStructure/getAll`);
        if (res.data?.body) {
          setCourseStructures(res.data.body.structures);
        }
        setIsLoding(false);
      } catch (err) {
        setIsLoding(false);
        console.log(err);
      }
    }

    fetchAllCourseStr();
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.wrapper}>
        {/* Landing Container */}
        <div className={styles.landingDiv}>
          <div className={styles.landingDescription}>
            <span className={styles.landingDescHead}> Explore official Course Structures </span>
            <span className={styles.landingDescSubHead}>
              Embark on a journey of academic discovery with our detailed course structures approved
              by faculties. From evaluation schemes to dedicated instructors, and a treasure trove
              of references, our platform provides a comprehensive insight into your educational
              adventure. Uncover the richness of each course at your fingertips.
            </span>
          </div>
          <img
            src={COURSE_STR_ASSET.landingVector}
            className={styles.landingImg}
            alt="Course Structure Image"
          />
        </div>

        {/* SEARCH */}
        <div className={styles.searchWrapper}>
          <input
            className={styles.inputText}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              if (e.target.value === '') setSearchResult(null);
            }}
            onKeyDown={(e) => handleKeyDown(e)}
            value={SearchTerm}
            placeholder="Search courses ..."
            type="text"
          />

          <div
            className={styles.sendIconBox}
            onClick={() => handleSearch(SearchTerm)}
            ref={sendRef}
          >
            <BsSearch className={styles.sendIcon} />
          </div>
        </div>

        <div className={styles.coursesList}>
          {SearchResult ? (
            SearchResult.length === 0 ? (
              <span className={styles.noResults}>No Results</span>
            ) : (
              SearchResult?.map((course) => {
                return <CourseCard key={course._id} course={course} />;
              })
            )
          ) : (
            courseStructures?.map((course) => {
              return <CourseCard key={course._id} course={course} />;
            })
          )}

          <Backdrop
            sx={{
              color: '#fff',
              zIndex: (theme) => theme.zIndex.drawer + 5,
            }}
            open={isLoading || isSearching}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      </div>
    </>
  );
}

function CourseCard({ course }) {
  const { user, setShowLoginPopup } = AppStates();
  const navigate = useNavigate();

  function handleNavigate() {
    if (!user) {
      setShowLoginPopup(true);
      return;
    }

    navigate(`/courseStr/${course._id}`);
  }

  return (
    <div className={styles.courseCard} onClick={handleNavigate}>
      <GoProjectRoadmap className={styles.notesIcon} />
      <div className={styles.courseCardDesc}>
        <span className={styles.courseName}> {course.courseName}</span>
        <span className={styles.courseCode}> {truncateText(course.courseCode, 2)} </span>
      </div>
    </div>
  );
}

export default CourseStr;
