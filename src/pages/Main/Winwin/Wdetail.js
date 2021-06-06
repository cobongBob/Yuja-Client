import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { deleteWinBoard } from "../../../apiService/winBoardApiService";
import { useDispatch, useSelector } from "react-redux";
import "./Wdetail.scss";
import { FcLike } from "react-icons/fc";
import { AiOutlineHeart, AiOutlineFileSearch } from "react-icons/ai";
import { getWDetailsData, wAddLike, wDeleteLike } from "../../../redux/board/winwin/winBoardReducer";
import { useHistory } from "react-router";
import { ToastCenter } from "../../../modules/ToastModule";
import Report from "../components/Report";
import RootComment from "../components/Comment/RootComment";
const Wdetail = ({ match }) => {
  const { current: board_type } = useRef(match.params.board_type);
  const { current: pageNum } = useRef(match.params.current_page);

  //신고모달
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { userData, authorities } = useSelector((state) => state.loginReducer);
  const { wDetails } = useSelector((state) => state.winBoardReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (wDetails && wDetails.boardType && wDetails.boardType.boardName === "NoticeBoard") {
      if (!wDetails.isPrivate && !authorities.includes("ADMIN")) {
        ToastCenter("권한이 없습니다.");
        return history.push("/");
      }
    } else {
      if (
        wDetails &&
        wDetails.isPrivate &&
        (!userData || !(userData.id === wDetails.user.id || authorities.includes("ADMIN")))
      ) {
        ToastCenter("권한이 없습니다.");
        return history.goBack();
      }
    }
  }, [history, userData, wDetails, authorities]);

  //게시글 상세정보 및 댓글 가져오기
  useEffect(() => {
    const board_id = match.params.board_id;
    if (board_id) {
      getWDetailsData(board_id, board_type).then((res) => {
        dispatch(res);
      });
    }
  }, [match.params.board_id, dispatch, board_type, history]);

  const likeHandler = useCallback(() => {
    if (userData && userData.id) {
      if (wDetails && wDetails.liked) {
        wDeleteLike(match.params.board_id).then((res) => {
          dispatch(res);
        });
      } else {
        wAddLike(match.params.board_id).then((res) => {
          dispatch(res);
        });
      }
    } else {
      ToastCenter("로그인 해주세요");
    }
  }, [userData, wDetails, dispatch, match.params.board_id]);

  const deleteBoard = useCallback(() => {
    if (window.confirm("게시글을 삭제 하시겠습니까?")) {
      deleteWinBoard(match.params.board_id, board_type).then(() => {
        if (board_type === "Notice") {
          history.push(`/Admin/AdminBoard`);
        } else {
          history.push(`/Community/${board_type}/${pageNum}`);
        }
      });
    }
  }, [match.params.board_id, history, board_type, pageNum]);

  const modifyBoard = useCallback(() => {
    history.push(`/BoardModify/${board_type}/${match.params.board_id}/${pageNum}`);
  }, [history, board_type, pageNum, match]);

  const goList = useCallback(() => {
    if (board_type === "Notice") {
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
            {userData && userData.id > 0 && !authorities.includes("ADMIN") ? (
              <>
                <Report
                  board_id={match.params.board_id}
                  modalIsOpen={modalIsOpen}
                  setModalIsOpen={setModalIsOpen}
                  board_code={wDetails.boardType && wDetails.boardType.boardCode}
                />
              </>
            ) : null}
          </div>
          <div className='comment-detail-title'>{wDetails.title}</div>
          <div className='comment-options-user'>
            {userData && userData.id === wDetails.user.id ? (
              <>
                <button onClick={modifyBoard}>수정</button>
                <button onClick={deleteBoard}>삭제</button>
              </>
            ) : userData && wDetails.user && authorities.includes("ADMIN") ? (
              <button onClick={deleteBoard}>삭제</button>
            ) : null}
          </div>
          <div>
            <div className='detail-show'>
              <div className='show-user-name'>
                <span>작성자</span> {wDetails.user.nickname}
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
                <AiOutlineFileSearch className='hit' size={29} /> <span className='hitCount'>{wDetails.hit}</span>
              </div>
            </div>
            <div className='dateBox'>
              <span>작성일</span> {wDetails.createDate && wDetails.createDate.substr(0, 10)}
            </div>
          </div>
          <div className='DetailQuill'>
            <ReactQuill
              id='wQuill'
              className='QuillContent'
              value={wDetails.content || ""}
              readOnly={true}
              theme={"bubble"}
            />
          </div>
        </div>
        <RootComment writer={wDetails.user.id} board_id={wDetails.id} />
      </div>
    )
  );
};

export default Wdetail;
