import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLike, deleteLike, getDetailData } from "../../../redux/board/editer/eboardReducer";
import * as EditerApiService from "../../../apiService/EditerApiService";
import { useHistory } from "react-router";
import ReactQuill from "react-quill";
import { ToastCenter, ToastTopRight } from "../../../modules/ToastModule";
import { AiFillStar, AiOutlineFileSearch, AiOutlineStar } from "react-icons/ai";
import { FaUserAstronaut } from "react-icons/fa";
import { Link } from "react-router-dom";
import Report from "../components/Report";

const ThumbDetail = ({ match }) => {
  const { current: board_type } = useRef(match.params.board_type);
  const { current: pageNum } = useRef(match.params.current_page);
  const [representImg, setRepresentImg] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const { userData, authorities } = useSelector((state) => state.loginReducer);
  const { detailData } = useSelector((state) => state.EboardReducer);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const board_id = match.params.board_id;
    if (board_id) {
      getDetailData(board_id).then((res) => {
        dispatch(res);
      });
    }
  }, [dispatch, match.params.board_id, userData]);

  useEffect(() => {
    if (detailData && detailData.thumbnail && detailData.thumbnail.length > 8) {
      setRepresentImg(
        `<p style="text-align:center;"><img class="custom-class-to-image" src="https://api.withyuja.com/files/thumbnail/original/${detailData.thumbnail}"></p>`
      );
    }
  }, [detailData]);

  const deleteBoard = () => {
    if (window.confirm(`정말 삭제 하시겠습니까?`)) {
      EditerApiService.deleteBoard(match.params.board_id).then((res) => {
        ToastTopRight(res.data);
        history.push(`/Thboard/${board_type}/${pageNum}`);
      });
    }
  };

  const likeHandler = useCallback(() => {
    if (userData && userData.id > 0) {
      if (
        (authorities && authorities.includes("YOUTUBER")) ||
        authorities.includes("EDITOR") ||
        authorities.includes("THUMBNAILER") ||
        authorities.includes("ADMIN")
      ) {
        if (detailData && detailData.liked) {
          deleteLike(match.params.board_id, userData.id).then((res) => {
            dispatch(res);
          });
        } else {
          addLike(match.params.board_id, userData.id).then((res) => {
            dispatch(res);
          });
        }
      } else {
        ToastCenter("권한이 없습니다.");
      }
    } else {
      ToastCenter("로그인 해주세요");
    }
  }, [userData, dispatch, match.params.board_id, detailData, authorities]);

  return (
    detailData && (
      <div>
        <ul className='Thumb-wrapper'>
          <div className='Thumb-header-wrapper'>
            <li className='Thumb-header'>포트폴리오</li>
          </div>
          <div className='detail-btn'>
            <div className='detail-btn-box'>
              {userData && detailData.user && userData.id === detailData.user.id ? (
                <div>
                  <Link to={`/ThumbModify/Thumb/${detailData.id}/1`} className='detail-update-btn'>
                    포트폴리오 수정하기
                  </Link>
                  <button className='detail-update-btn' onClick={deleteBoard}>
                    포트폴리오 삭제하기
                  </button>
                </div>
              ) : userData && detailData.user && authorities.includes("ADMIN") ? (
                <button className='detail-update-btn' onClick={deleteBoard}>
                  포트폴리오 삭제하기
                </button>
              ) : (
                <Report
                  board_id={match.params.board_id}
                  modalIsOpen={modalIsOpen}
                  setModalIsOpen={setModalIsOpen}
                  board_code={detailData.boardType && detailData.boardType.boardCode}
                />
              )}
              <Link className='detail-update-btn' to={`/Thboard/Thumb/1`}>
                목록보기
              </Link>
            </div>
          </div>
          <li className='Thumb-content-like'>
            <div className='Thumb-content-hit'>
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
          <div className='Thumb-content-wrapper'>
            {detailData.profilePicture ? (
              <li className='Thumb-content-profile-pic'>
                <img src={detailData.profilePicture} alt='프로필 사진'></img>
              </li>
            ) : (
              <li className='Thumb-content-profile-pic_'>
                <FaUserAstronaut className='ThProfileIcon' size={80} />
              </li>
            )}
            <li className='Thumb-content-hit'></li>
            <li className='Thumb-content-title'>{detailData.title}</li>
            <li className='Thumb-content-user'>작성자 : {detailData.user.nickname}</li>
            <li className='Thumb-content-user-data'>{detailData.career}</li>
            <li className='Thumb-content-user-data'>연락방법 {detailData.receptionMethod}</li>
            <li className='Thumb-content-pay'>
              급여방식 <span> {detailData.payType}</span>
              희망급여 <span>{detailData.payAmount} 원</span>
            </li>
            <li className='Thumb-content-tools'>
              사용기술 <span>{detailData.tools && detailData.tools.join(", ")}</span>
            </li>
            <li className='Thumb-content-pr'>
              <div className='thumb-pr-div'> 경력 및 소개 </div>
              <div className='thumb-pr-content'>
                <ReactQuill
                  className='QuillContent'
                  value={representImg + detailData.content || ""}
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

export default ThumbDetail;
