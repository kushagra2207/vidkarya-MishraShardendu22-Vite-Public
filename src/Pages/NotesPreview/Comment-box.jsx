import React, { useEffect, useState } from 'react';
// import Comment from '../../Components/comment'
import { AiOutlineSend } from '../../lib/icons';
// import { useToasts } from "../../Components/UI/toast";
// import { sendReqToServer } from "../../Hooks/useAxios";
// import { NOTES, axios } from "../../api";
// import { useParams } from 'react-router-dom';

export default function CommentBox({ _comment, user }) {
  const [addComment, setAddcomment] = useState({
    content: '',
    upvotes: 0,
    dpLink: user.dpLink,
    userId: user._id,
  });
  // const [getComments] = useState([]);
  // const [notify] = useToasts();
  // const { id } = useParams();
  // const email = user?._id;
  // const [commentOpenOptionsBox] = useState(false);
  // const [commentId] = useState("");
  // const [commentDetails] = useState([]);

  // const handleAddComment = async (props) => {
  //   try {
  //     // Handle Case: User is not logged in
  //     if (email === null) {
  //       notify({
  //         type: "WARNING",
  //         message: "Please LogIn First !",
  //       });
  //       return;
  //     }
  //     const newCommentArray = [...getComments, addComment]
  //     setGetComments(newCommentArray)
  //     const { response } = await
  //       axiosInstance: axios,
  //       url: NOTES.addQuestion.replace(':notesid', id),
  //       method: "POST",
  //       requestConfig: {
  //         content: addComment.content,
  //         // email,
  //         userId:user._id
  //       },
  //     });
  //     if (response) {
  //       setAddcomment({...addComment, content: ""})
  //       const { res, err } = await sendReqToServer({
  //         axiosInstance: axios,
  //         url: NOTES.getQuestion.replace(':notesid', id),
  //         method: "GET",
  //       });
  //       if (res) {
  //         setCommentDetails(res.body.comments.comments);
  //       }
  //       return;
  //     }

  //   } catch (error) {
  //     
  //     notify({
  //       type: "ERROR",
  //       message: "Fetching comments failed!",
  //     });
  //   }
  // }

  // const handleGetComments = async () => {
  //   try {
  //     const { response } = await
  //       axiosInstance: axios,
  //       url: NOTES.getQuestion.replace(':notesid', id),
  //       method: "GET",
  //     });
  //     if (response) {
  //       // setGetComments(response.body.comments.comments);
  //       const filteredComments = response.body.comments.comments.map(comment => ({
  //         content: comment.content,
  //         upvotes: comment.upvotes,
  //         dpLink: comment.userId.dpLink,
  //         userId: comment.userId._id
  //       }));

  //       setGetComments(filteredComments);
  //       setCommentDetails(response.body.comments.comments);
  //     }

  //   } catch (error) {
  //     notify({
  //       type: "ERROR",
  //       message: "Fetching Notes failed!",
  //     });
  //   }
  // }

  // console.log(comment)
  useEffect(() => {
    // handleGetComments();
  }, []);

  return (
    <div className="my-12 opacity-50 cursor-not-allowed">
      <p className="text-lg font-semibold my-4">Frequently asked questions</p>
      <div className="scroller h-[20rem] p-1 my-4 	">
        <p>No Questions available.</p>
        {/* {getComments.length > 0 ? (
          getComments.map((ele) => (
            <Comment key={idx} data={ele} comment={commentDetails[idx]} commentId={commentId} setCommentId={setCommentId} commentOpenOptionsBox={commentOpenOptionsBox} setCommentOpenOptionsBox={setCommentOpenOptionsBox} user={user} />
          ))
        ) : (
        )} */}
      </div>

      <div className="mt-3">
        <div className="flex gap-2 items-center cursor-pointer justify-between">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzHQv_th9wq3ivQ1CVk7UZRxhbPq64oQrg5Q&usqp=CAU"
            alt=""
            className="w-9 h-9 rounded-full object-cover"
          />

          <input
            className="outline-none border p-1 rounded w-[85%] cursor-not-allowed"
            value={addComment.content}
            placeholder="Ask a question about this notes"
            onChange={(e) => {
              setAddcomment({ ...addComment, content: e.target.value });
            }}
          />
          <AiOutlineSend size={22} />
        </div>
      </div>
    </div>
  );
}
