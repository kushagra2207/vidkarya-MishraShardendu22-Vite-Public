import { useState, React, createContext, useEffect } from 'react';
import { axios, NOTES } from '../api';
import { sendReqToServer } from '../Hooks/useAxios';
import { useToasts } from '../Components/UI/toast';

const CommentDetailsContext = createContext();

// Create a Provider component
const CommentDetailsContextProvider = ({ children }) => {
  const [commentDetails, setCommentDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [notify] = useToasts();

  const getAllComment = async (id) => {
    try {
      const { response, error: _error1 } = await sendReqToServer({
        axiosInstance: axios,
        url: NOTES.getQuestion.replace(':notesid', id),
        method: 'GET',
      });
      if (response) {
        setCommentDetails(response.body.commentsData);
      }
    } catch {
      notify({
        type: 'ERROR',
        message: 'Problem occured while fetching Comments',
      });
    }
  };

  const addComment = async ({ content, userId, id }) => {
    setIsLoading(true);
    try {
      if (userId === undefined || userId === null) {
        notify({
          type: 'WARNING',
          message: 'Please LogIn First !',
        });
        setIsLoading(false);
        return;
      }

      const { response, error: _error2 } = await sendReqToServer({
        axiosInstance: axios,
        url: NOTES.addQuestion.replace(':notesid', id),
        method: 'POST',
        requestConfig: { content, userId },
      });

      if (response) {
        getAllComment(id);
      }
    } catch {
      notify({
        type: 'ERROR',
        message: 'Problem occured in Comment',
      });
    }
    setIsLoading(false);
  };

  const deleteComment = async (id, commentId) => {
    setIsLoading(true);
    try {
      const { response, error: _error3 } = await sendReqToServer({
        axiosInstance: axios,
        url: NOTES.disableQuestion.replace(':notesid', commentId),
        method: 'PUT',
      });
      if (response) {
        getAllComment(id);
      }
    } catch {
      notify({
        type: 'ERROR',
        message: 'Problem occured while Deleting Comment',
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    // getAllNotes(); // Function not defined, commenting out
  }, []);

  const contextValue = {
    addComment,
    getAllComment,
    deleteComment,
    commentDetails,
    isLoading,
  };

  return (
    <CommentDetailsContext.Provider value={contextValue}>{children}</CommentDetailsContext.Provider>
  );
};

export { CommentDetailsContextProvider, CommentDetailsContext };
