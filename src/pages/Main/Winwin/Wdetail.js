import React, { useCallback, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { getWinOneBoard } from "../../../apiService/winBoardApiService";
import { deleteComment, fetchComments, insertComment } from "../../../apiService/CommentApiService";
import { useSelector } from "react-redux";
import "./Wdetail.scss";
import ParentsComments from "../components/Comment/ParentsComments";

const Wdetail = ({ match }) => {
  const [wDetails, setWDetails] = useState({
    title: "",
    content: "",
  });
  const [comments, setComments] = useState();
  const [inputReply, setInputReply] = useState({
    content: "",
  });
  const { userData } = useSelector((state) => state.loginReducer);
  useEffect(() => {
    getWinOneBoard(match.params.board_id)
      .then((res) => {
        setWDetails(res.data);
      })
      .catch((e) => {
        alert(e.response.message);
      });
    fetchComments(match.params.board_id)
      .then((res) => {
        setComments(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [match.params.board_id]);
  const deleteReply = useCallback(
    (commentId) => {
      deleteComment(commentId)
        .then(() => {
          fetchComments(match.params.board_id)
            .then((res) => {
              setComments(res.data);
            })
            .catch((e) => {
              console.log(e.response);
            });
        })
        .catch((e) => {
          console.log(e.response);
        });
    },
    [match.params.board_id]
  );

  const insertReply = useCallback(() => {
    const insertData = {
      ...inputReply,
      userId: userData.id,
      boardId: match.params.board_id,
      parentId: null,
    };
    insertComment(insertData)
      .then(() => {
        fetchComments(match.params.board_id)
          .then((res) => {
            setComments(res.data);
            setInputReply({ content: "" });
          })
          .catch((e) => {
            console.log(e.response);
          });
      })
      .catch((e) => {
        console.log(e.response);
      });
  }, [match.params.board_id, userData, inputReply]);

  const replyInputHandler = useCallback(
    (e) => {
      setInputReply({
        ...inputReply,
        [e.target.name]: e.target.value,
      });
    },
    [inputReply]
  );
  return (
    <div>
      <div className='detail-content'>
        <div>제목 : {wDetails.title}</div>
        <div className='DetailQuill'>
          <ReactQuill className='QuillContent' value={wDetails.content || ""} readOnly={true} theme={"bubble"} />
        </div>
        <div className='commentWrapper'>
          <ul>
            {comments &&
              comments.map((comment, index) => (
                <ParentsComments
                  writer={wDetails.user.id}
                  userData={userData}
                  comment={comment}
                  key={index}
                  deleteReply={deleteReply}
                />
              ))}
          </ul>

          {/* 댓글 다는 곳 */}
          <textarea name='content' value={inputReply.content} className='textarea' onChange={replyInputHandler} />
          <button onClick={insertReply}>댓글 등록</button>
        </div>
      </div>
    </div>
  );
};

export default Wdetail;
