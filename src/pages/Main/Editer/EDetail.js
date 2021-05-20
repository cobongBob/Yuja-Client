import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLike, deleteLike, getDetailData } from "../../../redux/board/editer/eboardReducer";
import * as EditerApiService from "../../../apiService/EditerApiService";
import "./EditorDetail.scss";
import ReactQuill from "react-quill";
import { AiFillStar, AiOutlineFileSearch, AiOutlineStar } from "react-icons/ai";
import { ToastTopRight } from "../../../modules/ToastModule";
import { Link } from "react-router-dom";
import Report from "../components/Report";

const EDetail = (props) => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.loginReducer);
  const { detailData } = useSelector((state) => state.EboardReducer);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const board_id = props.match.params.board_id;
    if (board_id) {
      getDetailData(board_id).then((res) => {
        dispatch(res);
      });
    }
  }, [dispatch, props.match.params.board_id, userData]);

  const deleteBoard = () => {
    if (window.confirm(`정말 삭제 하시겠습니까?`)) {
      EditerApiService.deleteBoard(props.match.params.board_id).then((res) => {
        ToastTopRight(res.data);
        props.history.push("/Editor");
      });
    }
  };

  const likeHandler = useCallback(() => {
    if (userData && userData.id) {
      if (detailData && detailData.liked) {
        deleteLike(props.match.params.board_id, userData.id).then((res) => {
          dispatch(res);
        });
      } else {
        addLike(props.match.params.board_id, userData.id).then((res) => {
          dispatch(res);
        });
      }
    } else {
      ToastTopRight("로그인 해주세요");
    }
  }, [userData, dispatch, props.match.params.board_id, detailData]);
  console.log(555, detailData.user);
  return (
    detailData && (
      <div>
        <ul className='editordetail-wrapper'>
          <div className='editordetail-header-wrapper'>
            <li className='editordetail-header'>이력서</li>
          </div>
          <div className='detail-btn'>
            <div className='detail-btn-box'>
              {userData && detailData.user && userData.id === detailData.user.id ? (
                <div>
                  <Link to={`/EboardModify/Editor/${detailData.id}/1`} className='detail-update-btn'>
                    이력서 수정하기
                  </Link>
                  <button className='detail-update-btn' onClick={deleteBoard}>
                    이력서 삭제하기
                  </button>
                </div>
              ) : (
                <Report
                  board_id={props.match.params.board_id}
                  modalIsOpen={modalIsOpen}
                  setModalIsOpen={setModalIsOpen}
                />
              )}
              <Link className='detail-update-btn' to={`/Eboard/Editor/1`}>
                목록보기
              </Link>
              {/* 모달 열리는 부분 */}
            </div>
          </div>
          <li className='editordetail-content-like'>
            <div className='editordetail-content-hit'>
              <AiOutlineFileSearch className='hit' size={30} />
              {detailData.hit}
            </div>
            <div>
              {detailData && detailData.liked ? (
                <button className='starButton' onClick={likeHandler}>
                  <AiFillStar size={30} />
                  <span>{detailData.likes}</span>
                </button>
              ) : (
                <button className='starButton' onClick={likeHandler}>
                  <AiOutlineStar size={30} />
                  <span>{detailData.likes}</span>
                </button>
              )}
            </div>
          </li>
          <div className='editordetail-content-wrapper'>
            <li className='editordetail-content-profile-pic'>
              <img src='/img/board_pic/thumbnailer_pic/thum2.PNG' alt='썸네일'></img>
            </li>
            <li className='editordetail-content-hit'></li>
            <li className='editordetail-content-title'>{detailData.title}</li>
            <li className='editordetail-content-user'>{detailData.user.username}</li>
            <li className='editordetail-content-pay'>
              급여방식 <span> {detailData.payType}</span>
              희망급여 <span>{detailData.payAmount} 원</span>
            </li>
            <li className='editordetail-content-tools'>
              사용기술 <span>{detailData.tools}</span>
            </li>
            <li className='editordetail-content-pr'>
              <div className='pr-div'> 경력 및 소개 </div>
              <div className='pr-content'>
                <ReactQuill
                  className='QuillContent'
                  value={detailData.content || ""}
                  readOnly={true}
                  theme={"bubble"}
                />
              </div>
            </li>
          </div>
        </ul>
      </div>
    )
  );
};

export default EDetail;
