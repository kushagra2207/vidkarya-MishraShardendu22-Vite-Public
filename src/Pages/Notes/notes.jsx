import { useEffect, useState, useCallback } from 'react';
import {
  Navbar,
  NotesCard,
  NotesNavbar,
  NotesCarousel,
  RecommendedNotes,
  NotesFilterPanel,
} from '../../Components';
import { sendReqToServer } from '../../Hooks/useAxios';
import { NOTES, axios } from '../../api';
import './notes.css';
import { BsFilterLeft, MdCancel, RiArrowDropDownLine } from '../../lib/icons';
import Pagination from '@mui/material/Pagination';
import { useToasts } from '../../Components/UI/toast';
import { slides } from '../../data/notesCarousel';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { set_Notes, addNote as _addNote } from '../../redux/slices/notes-slices';
import { AppStates } from '../../Context/appContext.jsx';
import { handleNotesSearchAndFilter, isFilterEmpty as _isFilterEmpty } from '../../Helpers/index';
// import NoResultFoundImg from '../../Assets/Images/Notes/no-result-img.svg';
import { NOTES_ASSET } from '../../Assets/assetImages';
import NotesSkeleton from '../../Components/loading-skeletons/notes-skeleton';

export default function Notes() {
  //redux
  const dispatch = useDispatch();
  const notesData = useSelector((state) => {
    return state.notes;
  });

  //context
  
  const [notify] = useToasts();
  const [_notes, _setNotes] = useState();
  const { filter, setfilter } = AppStates();
  const [_pageNo, _setpageNo] = useState(1);
  const [loading, setloading] = useState(false);
  const [notesPages, setNotespages] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearched, setisSearched] = useState(false);
  const [finalSearchTerm, setfinalSearchTerm] = useState('');
  const [openFilterPanel, setopenFilterPanel] = useState(true);

  const getNotesFunc = useCallback(async (index) => {
    try {
      const { response } = await sendReqToServer({
        axiosInstance: axios,
        url: NOTES.pagination,
        method: 'POST',
        requestConfig: {
          num: index,
        },
      });
      if (response) return response;
    } catch {
      notify({
        type: 'ERROR',
        message: 'Fetching Notes failed!',
      });
    }
  }, [notify]);

  // Calculate total pg. nos. to be displayed in pagenation
  const setPages = (total) => {
    setNotespages(Math.ceil(total / 10));
  };

  //for filter change
  useEffect(() => {
    setloading(true);
    const fetchNoteForFilterAndSearchChange = async () => {
      try {
        const data = await handleNotesSearchAndFilter(filter, searchTerm, 1);
        dispatch(set_Notes(data.body.currentNotesPatch));
        setPages(data.body.totalNotes);
        setloading(false);
      } catch {
        
        setloading(false);

        notify({
          type: 'ERROR',
          message: 'Some notes could not be fetched !',
        });
      }
    };
    fetchNoteForFilterAndSearchChange();
    setisSearched(false);
  }, [filter, searchTerm, dispatch, notify]);

  const handlePagenation = async (event, pageNumber) => {
    try {
      _setpageNo(pageNumber);
      var res;

      setloading(true);
      res = await handleNotesSearchAndFilter(filter, searchTerm, pageNumber);
      setloading(false);

      dispatch(set_Notes(res.body.currentNotesPatch));
      setPages(res.body.totalNotes);
    } catch (err) {
      setloading(false);
      console.log(err);
    }
  };

  // search notes
  const onSearchClick = async (e, click) => {
    try {
      if (e.key === 'Enter' || click) {
        setisSearched(true);
        setfinalSearchTerm(searchTerm);
        setloading(true);
        const res = await handleNotesSearchAndFilter(filter, searchTerm, 1);
        setloading(false);

        // Update Notes
        if (res) dispatch(set_Notes(res.body.currentNotesPatch));
        setPages(res.body.totalNotes);
      }
    } catch {
      setloading(false);
      notify({
        type: 'ERROR',
        message: 'Some notes could not be fetched after searching! ',
      });
    }
  };

  // const getNotesSearchResults = async (index) => {
  //   try {
  //     const { response } = await
  //       axiosInstance: axios,
  //       url: NOTES.search,
  //       method: "POST",
  //       requestConfig: {
  //         num: index,
  //         searchTerm
  //       },
  //     });
  //     console.log(response);
  //     if (response) return response;
  //   } catch (error) {
  //     notify({
  //       type: "ERROR",
  //       message: "Fetching Notes failed!",
  //     });
  //   }
  // }

  useEffect(() => {
    setloading(true);
    const fetchData = async () => {
      try {
        const data = await getNotesFunc(1);

        if (data) {
          //setting note data to useState Notes
          dispatch(set_Notes(data.body.currentNotesPatch));
          // for counting total page number
        setPages(data.body.totalNotes);
        setloading(false);
      }
    } catch {
      
      setloading(false);

      notify({
        type: 'ERROR',
        message: 'Some notes could not be fetched !',
      });
    }
  };

    fetchData();
  }, [getNotesFunc, dispatch, notify]);

  // cancel search and get all default (10) notes with placed filters
  const cancelSearch = async () => {
    setSearchTerm('');
    setisSearched(false);
    setfilter({ ...filter, searchTerm: '' });
  };

  return (
    <>
      <Navbar />
      <div>
        {/*notes top rateted cards section*/}
        <NotesNavbar
          setsearchTerm={setSearchTerm}
          onSearchClick={onSearchClick}
          searchTerm={searchTerm}
        />
        <div className="mx-[2.5rem]">
          <NotesCarousel data={slides} />
          <RecommendedNotes />

          <div className="md:flex gap-5 md:h-[60rem] all-notes-display">
            {/* F I L T E R   &   S O R T */}
            <div className="md:w-[30%] w-full sticky">
              <div className="flex gap-4 mt-4 ml-2 filter-box sort-filter-options">
                <Button
                  variant="outlined"
                  size="large"
                  className="filter-btn"
                  startIcon={<BsFilterLeft />}
                  onClick={() => {
                    setopenFilterPanel(!openFilterPanel);
                  }}
                >
                  Filters
                </Button>
                <Button
                  disabled
                  variant="outlined"
                  size="large"
                  className=" "
                  endIcon={<RiArrowDropDownLine />}
                >
                  Sort
                </Button>
              </div>

              {openFilterPanel && <NotesFilterPanel />}
            </div>

            {/*   N O T E S   */}
            <div className="w-full">
              {isSearched && (
                <div className="w-fit bg-gray-200 rounded-lg p-1  my-3 flex items-center">
                  <p className="font-semibold texl-lg  rounded-lg ">
                    {' '}
                    Search results for <span className="text-orange-600">
                      {finalSearchTerm}
                    </span>{' '}
                  </p>
                  <div className="w-fit">
                    <MdCancel
                      className="ml-5 cursor-pointer"
                      size={18}
                      color="red"
                      onClick={cancelSearch}
                    />
                  </div>
                </div>
              )}

              {notesData.length === 0 && !loading && (
                <div className="flex w-full h-[60rem] justify-center ">
                  <div>
                    <img
                      src={NOTES_ASSET.noData}
                      className=" w-[90%] object-cover h-[90%] "
                      alt=""
                    />
                    <p className="text-3xl font-bold">Sorry, No results found for your Search</p>
                  </div>
                </div>
              )}
              <div className="notes-wrapper h-[85%] items-center mt-6 overflow-y-scroll overflow-x-hidden">
                {loading ? (
                  <NotesSkeleton />
                ) : (
                  notesData && notesData.map((note) => <NotesCard key={note._id} note={note} />)
                )}
              </div>

              <div className="flex justify-center p-1 my-2">
                <Pagination count={notesPages} color="primary" onChange={handlePagenation} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
