import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addLike,
  deleteLike,
  getDetailData,
} from '../../../redux/board/editer/eboardReducer';
import * as EditerApiService from '../../../apiService/EditerApiService';
import './EditorDetail.scss';
import ReactQuill from 'react-quill';
import { AiFillStar, AiOutlineFileSearch, AiOutlineStar } from 'react-icons/ai';
import { FaUserAstronaut } from 'react-icons/fa';
import { ToastCenter, ToastTopRight } from '../../../modules/ToastModule';
import { Link, useHistory } from 'react-router-dom';
import Report from '../components/Report';
import { youtubeCodeToIframe } from '../../../modules/QuillYoutubeConvert';

const EDetail = ({ match }) => {
  const { current: board_type } = useRef(match.params.board_type);
  const { current: pageNum } = useRef(match.params.current_page);
  const dispatch = useDispatch();
  const history = useHistory();
  const { userData, authorities } = useSelector((state) => state.loginReducer);
  const { detailData } = useSelector((state) => state.EboardReducer);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [representVideo, setRepresentVideo] = useState('');

  useEffect(() => {
    const board_id = match.params.board_id;
    if (board_id) {
      getDetailData(board_id).then((res) => {
        dispatch(res);
        let previewImageUrl = res.data.previewImage;
        if (previewImageUrl) {
          let idx = previewImageUrl.indexOf('com/vi/') + 7;
          if (idx >= 7) {
            let youtubeCode = previewImageUrl.substr(idx, 11);
            setRepresentVideo(youtubeCodeToIframe(youtubeCode));
          }
        }
      });
    }
  }, [dispatch, match.params.board_id, userData]);

  const deleteBoard = () => {
    if (window.confirm(`정말 삭제 하시겠습니까?`)) {
      EditerApiService.deleteBoard(match.params.board_id).then((res) => {
        ToastTopRight(res.data);
        history.push(`/Eboard/${board_type}/${pageNum}`);
      });
    }
  };

  const likeHandler = useCallback(() => {
    if (userData && userData.id > 0) {
      if (
        (authorities && authorities.includes('YOUTUBER')) ||
        authorities.includes('EDITOR') ||
        authorities.includes('THUMBNAILER') ||
        authorities.includes('ADMIN')
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
        ToastCenter('권한이 없습니다.');
      }
    } else {
      ToastCenter('로그인 해주세요');
    }
  }, [userData, dispatch, match.params.board_id, detailData, authorities]);

  return (
    detailData && (
      <div>
        <ul className='editordetail-wrapper'>
          <div className='editordetail-header-wrapper'>
            <li className='editordetail-header'>포트폴리오</li>
          </div>
          <div className='detail-btn'>
            <div className='detail-btn-box'>
              {userData &&
              detailData.user &&
              userData.id === detailData.user.id ? (
                <div>
                  <Link
                    to={`/EboardModify/Editor/${detailData.id}/1`}
                    className='detail-update-btn'>
                    포트폴리오 수정하기
                  </Link>
                  <button className='detail-update-btn' onClick={deleteBoard}>
                    포트폴리오 삭제하기
                  </button>
                </div>
              ) : userData &&
                detailData.user &&
                authorities.includes('ADMIN') ? (
                <button className='detail-update-btn' onClick={deleteBoard}>
                  이력서 삭제하기
                </button>
              ) : (
                <Report
                  board_id={match.params.board_id}
                  modalIsOpen={modalIsOpen}
                  setModalIsOpen={setModalIsOpen}
                  board_code={
                    detailData.boardType && detailData.boardType.boardCode
                  }
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
            {detailData.profilePicture ? (
              <li className='editordetail-content-profile-pic'>
                <img src={detailData.profilePicture} alt='프로필 사진'></img>
              </li>
            ) : (
              <li className='editordetail-content-profile-pic_'>
                <FaUserAstronaut className='EProfileIcon' size={100} />
              </li>
            )}
            <li className='editordetail-content-hit'></li>
            <li className='editordetail-content-title'>{detailData.title}</li>
            <li className='editordetail-content-user'>
              {detailData.user.nickname}
            </li>
            <li className='editordetail-content-user-data'>
              {detailData.career}
            </li>
            <li className='editordetail-content-user-data'>
              연락처 {detailData.receptionMethod}
            </li>
            <li className='editordetail-content-pay'>
              급여방식 <span> {detailData.payType}</span>
              희망급여 <span>{detailData.payAmount} 원</span>
            </li>
            <li className='editordetail-content-tools'>
              사용기술 <span>{ detailData.tools && detailData.tools.join(', ') }</span>
            </li>
            <li className='editordetail-content-pr'>
              <div className='pr-div'> 경력 및 소개 </div>
              <div className='pr-content'>
                <ReactQuill
                  className='QuillContent'
                  value={representVideo + detailData.content || ''}
                  readOnly={true}
                  theme={'bubble'}
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
