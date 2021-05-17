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

const Wdetail = ({ match }) => {
  const { current: board_type } = useRef(match.params.board_type);

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
  const { wDetails, loading } = useSelector((state) => state.winBoardReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  //게시글 상세정보 및 댓글 가져오기
  useEffect(() => {
    const board_id = match.params.board_id;
    if (board_id) {
      getWDetailsData(board_id, board_type).then((res) => {
        dispatch(res);
      });
      fetchComments(match.params.board_id)
        .then((res) => {
          setComments(res.data);
        })
        .catch((e) => {
          alert(e.response.data.message);
        });
    }
  }, [match.params.board_id, dispatch, board_type]);

  //댓글 삭제
  const deleteReply = useCallback(
    (commentId) => {
      if (window.confirm('댓글을 삭제하시겠습니까?')) {
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
    if (inputReply.content === '') {
      alert('내용을 입력해 주세요');
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
            setInputReply({ content: '' });
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
      if (reReplyData.content === '') {
        alert('내용을 입력해 주세요');
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
      if (modifyData.content === '') {
        alert('내용을 입력해 주세요');
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
      alert('로그인 해주세요');
      //로그인 창으로
    }
  }, [userData, wDetails, dispatch, match.params.board_id]);

  const deleteBoard = useCallback(() => {
    deleteWinBoard(match.params.board_id, board_type)
      .then(() => {
        history.push(`/Community/${board_type}`);
      })
      .catch((e) => {
        alert(e.response.data.message);
      });
  }, [match.params.board_id, history, board_type]);
  const modifyBoard = useCallback(() => {
    alert('수정페이지로...');
  }, []);
  const goList = useCallback(() => {
    history.push(`/Community/${board_type}`);
  }, [history, board_type]);

  return loading ? (
    <h2>Loading...</h2>
  ) : (
    wDetails && (
      <div>
        <div className='detail-content'>
          <div>
            {userData.id === wDetails.user.id ? (
              <>
                <button onClick={deleteBoard}>삭제</button>
                <button onClick={modifyBoard}>수정</button>
              </>
            ) : null}
            <button onClick={goList}>목록</button>
          </div>
          <div className='detail-title'>
            {wDetails.title}
            <div className='detail-show'>
              <div className='likeWrapper'>
                {wDetails && wDetails.liked ? (
                  <button className='likeButton' onClick={likeHandler}>
                    <FcLike size={30} />
                    <span>{wDetails.likes}</span>
                  </button>
                ) : (
                  <button className='likeButton' onClick={likeHandler}>
                    <AiOutlineHeart size={30} />
                    <span>{wDetails.likes}</span>
                  </button>
                )}
              </div>
              <div className='hitWrapper'>
                <AiOutlineFileSearch className='hit' size={30} />{' '}
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
            <textarea
              name='content'
              value={inputReply.content}
              className='textarea'
              onChange={replyInputHandler}
            />
            <button onClick={insertReply}>댓글 등록</button>
          </div>
        </div>
      </div>
    )
  );
};

export default Wdetail;
