import React, { useCallback, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { getWinOneBoard } from "../../../apiService/winBoardApiService";
import { deleteComment, fetchComments, insertComment, updateComment } from "../../../apiService/CommentApiService";
import { useSelector } from "react-redux";
import "./Wdetail.scss";
import ParentsComments from "../components/Comment/ParentsComments";

const Wdetail = ({ match }) => {
  //게시글 상세정보
  const [wDetails, setWDetails] = useState({
    title: "",
    content: "",
    user: {
      id: 0,
    },
  });

  //대댓글을 등록중인지 확인하는 state
  const [isReplying, setIsReplying] = useState({
    isReplying: false,
    reply_commentId: 0,
  });

  //전체 댓글관리
  const [comments, setComments] = useState();

  //root댓글 input
  const [inputReply, setInputReply] = useState({
    content: "",
  });

  //접속중인 사람의 정보
  const { userData } = useSelector((state) => state.loginReducer);

  //게시글 상세정보 및 댓글 가져오기
  useEffect(() => {
    getWinOneBoard(match.params.board_id)
      .then((res) => {
        setWDetails(res.data);
      })
      .catch((e) => {
        alert(e.response.data.message);
      });
    fetchComments(match.params.board_id)
      .then((res) => {
        setComments(res.data);
      })
      .catch((e) => {
        alert(e.response.data.message);
      });
  }, [match.params.board_id]);

  //댓글 삭제
  const deleteReply = useCallback(
    (commentId) => {
      if (window.confirm("댓글을 삭제하시겠습니까?")) {
        deleteComment(commentId)
          .then(() => {
            fetchComments(match.params.board_id)
              .then((res) => {
                setComments(res.data);
              })
              .catch((e) => {
                alert(e.response.data.message);
              });
          })
          .catch((e) => {
            alert(e.response.data.message);
          });
      }
    },
    [match.params.board_id]
  );

  //root댓글입력 저장
  const insertReply = useCallback(() => {
    if (inputReply.content === "") {
      alert("내용을 입력해 주세요");
      return;
    }
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
            alert(e.response.data.message);
          });
      })
      .catch((e) => {
        alert(e.response.data.message);
      });
  }, [match.params.board_id, userData, inputReply]);

  //Root 댓글 핸들러
  const replyInputHandler = useCallback(
    (e) => {
      setInputReply({
        ...inputReply,
        [e.target.name]: e.target.value,
      });
    },
    [inputReply]
  );

  // 대댓글 창열기
  const reReplyOpen = useCallback(
    (commnetId) => {
      setIsReplying({
        ...isReplying,
        replying: true,
        reply_commentId: commnetId,
      });
    },
    [isReplying]
  );

  // 대댓글 입력 저장
  const reReplyInsert = useCallback(
    (reReplyData) => {
      if (reReplyData.content === "") {
        alert("내용을 입력해 주세요");
        return;
      }
      const insertData = {
        ...reReplyData,
        userId: userData.id,
        boardId: match.params.board_id,
      };
      insertComment(insertData)
        .then(() => {
          fetchComments(match.params.board_id)
            .then((res) => {
              setComments(res.data);
            })
            .catch((e) => {
              alert(e.response.data.message);
            });
        })
        .catch((e) => {
          alert(e.response.data.message);
        });
    },
    [match.params.board_id, userData]
  );

  //댓글 수정중인지 확인
  const [isModifying, setIsModifying] = useState({
    isModifying: false,
    modify_commentId: 0,
  });
  //댓글 수정 저장
  const modifyComment = useCallback(
    (modifyData) => {
      if (modifyData.content === "") {
        alert("내용을 입력해 주세요");
        return;
      }
      const modiContent = {
        content: modifyData.content,
      };
      updateComment(modifyData.commentId, modiContent)
        .then(() => {
          fetchComments(match.params.board_id)
            .then((res) => {
              setComments(res.data);
            })
            .catch((e) => {
              alert(e.response.data.message);
            });
        })
        .catch((e) => {
          alert(e.response.data.message);
        });
    },
    [match.params.board_id]
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
                <React.Fragment key={index}>
                  <ParentsComments
                    writer={wDetails.user.id}
                    userData={userData}
                    comment={comment}
                    deleteReply={deleteReply}
                    reReplyOpen={reReplyOpen}
                    isReplying={isReplying}
                    setIsReplying={setIsReplying}
                    reReplyInsert={reReplyInsert}
                    isModifying={isModifying}
                    setIsModifying={setIsModifying}
                    modifyComment={modifyComment}
                  />
                </React.Fragment>
              ))}
          </ul>

          {/* root댓글 다는 곳 */}
          <textarea name='content' value={inputReply.content} className='textarea' onChange={replyInputHandler} />
          <button onClick={insertReply}>댓글 등록</button>
        </div>
      </div>
    </div>
  );
};

export default Wdetail;
