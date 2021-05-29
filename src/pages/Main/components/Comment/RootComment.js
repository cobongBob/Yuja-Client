import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment, fetchComments, insertComment, updateComment } from "../../../../apiService/CommentApiService";
import { ToastCenter } from "../../../../modules/ToastModule";
import ParentsComments from "./ParentsComments";

const RootComment = ({ board_id, writer }) => {
  const dispatch = useDispatch();

  const { userData } = useSelector((state) => state.loginReducer);
  useEffect(() => {
    if (board_id) {
      fetchComments(board_id).then((res) => {
        setComments(res.data);
      });
    }
  }, [board_id, dispatch]);

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
  //댓글 삭제
  const deleteReply = useCallback(
    (commentId) => {
      if (window.confirm("댓글을 삭제하시겠습니까?")) {
        deleteComment(commentId).then(() => {
          fetchComments(board_id).then((res) => {
            setComments(res.data);
          });
        });
      }
    },
    [board_id]
  );

  //root댓글입력 저장
  const insertReply = useCallback(() => {
    if (inputReply.content === "") {
      ToastCenter("내용을 입력해 주세요");
      return;
    }
    const insertData = {
      ...inputReply,
      userId: userData.id,
      boardId: board_id,
      parentId: null,
    };
    insertComment(insertData).then(() => {
      fetchComments(board_id).then((res) => {
        setComments(res.data);
        setInputReply({ content: "" });
      });
    });
  }, [board_id, userData, inputReply]);

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
        ToastCenter("내용을 입력해 주세요");
        return;
      }
      const insertData = {
        ...reReplyData,
        userId: userData.id,
        boardId: board_id,
      };
      insertComment(insertData).then(() => {
        fetchComments(board_id).then((res) => {
          setComments(res.data);
        });
      });
    },
    [board_id, userData]
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
        ToastCenter("내용을 입력해 주세요");
        return;
      }
      const modiContent = {
        content: modifyData.content,
      };
      updateComment(modifyData.commentId, modiContent).then(() => {
        fetchComments(board_id).then((res) => {
          setComments(res.data);
        });
      });
    },
    [board_id]
  );
  return (
    <div className='commentWrapper'>
      <h4> 코멘트 </h4>
      <ul>
        {comments &&
          comments.map((comment, index) => (
            <React.Fragment key={index}>
              <ParentsComments
                writer={writer}
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
      <div className='comment-area'>
        <textarea
          placeholder='댓글달기'
          name='content'
          value={inputReply.content}
          className='textarea'
          onChange={replyInputHandler}
          maxLength={2000}
        />
        <button onClick={insertReply}>등록</button>
      </div>
    </div>
  );
};

export default RootComment;
