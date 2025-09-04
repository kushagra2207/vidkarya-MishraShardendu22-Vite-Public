import { useState } from 'react';
import { Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './notes.css';
import { AppStates } from '../../Context/appContext.jsx';

const NotesNavbar = ({ setsearchTerm, onSearchClick, searchTerm }) => {
  const [navSubjects, _setnavSubjects] = useState([
    'Blockchain',
    'TOC',
    'Math',
    'DSA',
    'Signal Processing',
  ]);
  // index to determine which subject is clicked
  const [clickedSub, setclickedSub] = useState(null);
  const { filter, setfilter } = AppStates();

  const handleOnclick = (val) => {
    if (clickedSub === val) {
      setclickedSub(null);
      const subjects = filter.Subject.filter((ele) => {
        return ele != val;
      });
      setfilter({ ...filter, Subject: subjects });

      return;
    }
    setclickedSub(val);
    setfilter({ ...filter, Subject: [val] });
  };

  const handleOnChange = (e) => {
    setsearchTerm(e.target.value);
  };

  // console.log(filter);
  return (
    <>
      <div className="notes-navbar-section sticky top-0 z-50">
        <div className="notes-navbarContainer">
          <Grid className="notes-navbar-grid" container spacing={2}>
            <Grid className="tag-title" item lg={2} sm={2}>
              <p>Notes</p>
            </Grid>
            <Grid className="tags-bundle" item lg={6} sm={4} container spacing={1}>
              {navSubjects.map((sub, idx) => {
                return (
                  <Grid
                    key={idx}
                    className={`cursor-pointer hover:bg-[#61ab9eec] hover:text-white p-1 rounded-md ${sub === clickedSub ? 'bg-[#00A385] text-center text-white' : ''}`}
                    onClick={() => handleOnclick(sub)}
                    item
                  >
                    {sub}
                  </Grid>
                );
              })}
            </Grid>
            <Grid className="notes-search-container" item lg={2} sm={1}>
              {/* <div className='notes-search'>
              <input ref={inputRef} type="text" name="search" placeholder="Search.." />
              <div className='notes-search-btn' onClick={() => {inputRef.current.focus()}}>
                <SearchIcon id='search-box' />
              </div>
            </div> */}
              <div className="notes-search">
                <input
                  className="notes-searchInput"
                  type="text"
                  value={searchTerm}
                  onChange={handleOnChange}
                  onKeyDown={(e) => onSearchClick(e, false)}
                  name=""
                  placeholder="Search"
                />
                <button
                  className="notes-searchButton"
                  onClick={(e) => onSearchClick(e, true)}
                  href="#"
                >
                  <SearchIcon />
                </button>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default NotesNavbar;
