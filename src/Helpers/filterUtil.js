import { sendReqToServer } from '../Hooks/useAxios';
import { NOTES, PROJECTS, axios } from '../api';

async function handleNotesSearchAndFilter(filter, searchTerm, pageNo) {
  try {
    const { response, error: _error1 } = await sendReqToServer({
      axiosInstance: axios,
      url: NOTES.filter,
      method: 'POST',
      requestConfig: {
        filter,
        pageNo: pageNo,
        searchTerm,
      },
    });

    if (response) {
      // console.log(response);
      // setNotes(response);
      return response;
    }
  } catch (error) {
    console.log(error);
    //display filtering error
  }
}

async function handleProjectSearchAndFilter(searchTerm, filter, pageNo) {
  // console.log(searchTerm, filter, pageNo);

  try {
    const { response, error: _error2 } = await sendReqToServer({
      axiosInstance: axios,
      url: PROJECTS.filter,
      method: 'POST',
      requestConfig: {
        searchTerm,
        filter,
        pageNo,
      },
    });

    if (response) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
}

export { handleNotesSearchAndFilter, handleProjectSearchAndFilter };
