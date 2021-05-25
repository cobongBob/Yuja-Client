import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import { deleteWinBoard } from '../../../apiService/winBoardApiService';
import {
  deleteComment,
  fetchComments,
  insertComment,
  updateComment,
} from '../../../apiService/CommentApiService';
import { useDispatch, useSelector } from 'react-redux';
import './Wdetail.scss';
import ParentsComments from '../components/Comment/ParentsComments';
import { FcLike } from 'react-icons/fc';
import { AiOutlineHeart, AiOutlineFileSearch } from 'react-icons/ai';
import {
  getWDetailsData,
  wAddLike,
  wDeleteLike,
} from '../../../redux/board/winwin/winBoardReducer';
import { useHistory } from 'react-router';
import { ToastCenter } from '../../../modules/ToastModule';
const Wdetail = ({ match }) => {
  const { current: board_type } = useRef(match.params.board_type);
  const { current: pageNum } = useRef(match.params.current_page);

  //대댓글을 등록중인지 확인하는 state
  const [isReplying, setIsReplying] = useState({
    isReplying: false,
    reply_commentId: 0,
  });

  //전체 댓글관리
  const [comments, setComments] = useState();

  //root댓글 input
  const [inputReply, setInputReply] = useState({
    content: '',
  });

  const { userData } = useSelector((state) => state.loginReducer);
  const { wDetails } = useSelector((state) => state.winBoardReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (
      wDetails &&
      wDetails.isPrivate &&
      (!userData || userData.id !== wDetails.user.id)
    ) {
      //어드민 권한 추가 필요
      ToastCenter('권한이 없습니다.');
      return history.goBack();
    }
  }, [history, userData, wDetails]);

  //게시글 상세정보 및 댓글 가져오기
  useEffect(() => {
    const board_id = match.params.board_id;
    if (board_id) {
      getWDetailsData(board_id, board_type).then((res) => {
        dispatch(res);
      });
      fetchComments(match.params.board_id).then((res) => {
        setComments(res.data);
      });
    }
  }, [match.params.board_id, dispatch, board_type, history]);

  //댓글 삭제
  const deleteReply = useCallback(
    (commentId) => {
      if (window.confirm('댓글을 삭제하시겠습니까?')) {
        deleteComment(commentId).then(() => {
          fetchComments(match.params.board_id).then((res) => {
            setComments(res.data);
          });
        });
      }
    },
    [match.params.board_id]
  );

  //root댓글입력 저장
  const insertReply = useCallback(() => {
    if (inputReply.content === '') {
      ToastCenter('내용을 입력해 주세요');
      return;
    }
    const insertData = {
      ...inputReply,
      userId: userData.id,
      boardId: match.params.board_id,
      parentId: null,
    };
    insertComment(insertData).then(() => {
      fetchComments(match.params.board_id).then((res) => {
        setComments(res.data);
        setInputReply({ content: '' });
      });
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
      if (reReplyData.content === '') {
        ToastCenter('내용을 입력해 주세요');
        return;
      }
      const insertData = {
        ...reReplyData,
        userId: userData.id,
        boardId: match.params.board_id,
      };
      insertComment(insertData).then(() => {
        fetchComments(match.params.board_id).then((res) => {
          setComments(res.data);
        });
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
      if (modifyData.content === '') {
        ToastCenter('내용을 입력해 주세요');
        return;
      }
      const modiContent = {
        content: modifyData.content,
      };
      updateComment(modifyData.commentId, modiContent).then(() => {
        fetchComments(match.params.board_id).then((res) => {
          setComments(res.data);
        });
      });
    },
    [match.params.board_id]
  );

  const likeHandler = useCallback(() => {
    if (userData && userData.id) {
      if (wDetails && wDetails.liked) {
        wDeleteLike(match.params.board_id, userData.id).then((res) => {
          dispatch(res);
        });
      } else {
        wAddLike(match.params.board_id, userData.id).then((res) => {
          dispatch(res);
        });
      }
    } else {
      ToastCenter('로그인 해주세요');
    }
  }, [userData, wDetails, dispatch, match.params.board_id]);

  const deleteBoard = useCallback(() => {
    if (window.confirm('게시글을 삭제 하시겠습니까?')) {
      deleteWinBoard(match.params.board_id, board_type).then(() => {
        if (board_type === 'Notice') {
          history.push(`/Admin/AdminBoard`);
        } else {
          history.push(`/Community/${board_type}/${pageNum}`);
        }
      });
    }
  }, [match.params.board_id, history, board_type, pageNum]);

  const modifyBoard = useCallback(() => {
    history.push(
      `/BoardModify/${board_type}/${match.params.board_id}/${pageNum}`
    );
  }, [history, board_type, pageNum, match]);

  const goList = useCallback(() => {
    if (board_type === 'Notice') {
      history.push(`/Admin/AdminBoard`);
    } else {
      history.push(`/Community/${board_type}/${pageNum}`);
    }
  }, [history, board_type, pageNum]);

  return (
    wDetails && (
      <div className='comment-wrapper'>
        <div className='comment-content'>
          <div className='comment-options'>
            <button onClick={goList}>목록</button>
          </div>
          <div className='comment-detail-title'>{wDetails.title}</div>
          {userData && userData.id === wDetails.user.id ? (
            <div className='comment-options-user'>
              <button onClick={modifyBoard}>수정</button>
              <button onClick={deleteBoard}>삭제</button>
            </div>
          ) : null}
          <div>
            <div className='detail-show'>
              <div className='show-user-name'>
                작성자 {wDetails.user.username}
              </div>
              <div className='likeWrapper'>
                {wDetails && wDetails.liked ? (
                  <button className='likeButton' onClick={likeHandler}>
                    <FcLike size={32} />
                    <span>{wDetails.likes}</span>
                  </button>
                ) : (
                  <button className='likeButton' onClick={likeHandler}>
                    <AiOutlineHeart size={32} />
                    <span>{wDetails.likes}</span>
                  </button>
                )}
              </div>
              <div className='hitWrapper'>
                <AiOutlineFileSearch className='hit' size={29} />{' '}
                <span className='hitCount'>{wDetails.hit}</span>
              </div>
            </div>
          </div>
          <div className='DetailQuill'>
            <ReactQuill
              className='QuillContent'
              value={wDetails.content || ''}
              readOnly={true}
              theme={'bubble'}
            />
          </div>
        </div>
        <div className='commentWrapper'>
          <h4> 코멘트 </h4>
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
          <div className='comment-area'>
            <textarea
              placeholder='댓글달기'
              name='content'
              value={inputReply.content}
              className='textarea'
              onChange={replyInputHandler}
            />
            <button onClick={insertReply}>등록</button>
          </div>
        </div>
      </div>
    )
  );
};

export default Wdetail;
