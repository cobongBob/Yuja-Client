import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addLike,
  deleteLike,
  getDetailData,
} from '../../../redux/board/editer/eboardReducer';
import * as EditerApiService from '../../../apiService/EditerApiService';
import { useHistory } from 'react-router';
import ReactQuill from 'react-quill';
import { ToastCenter, ToastTopRight } from '../../../modules/ToastModule';
import { AiFillStar, AiOutlineFileSearch, AiOutlineStar } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Report from '../components/Report';

const ThumbDetail = ({ match }) => {
  const { current: board_type } = useRef(match.params.board_type);
  const { current: pageNum } = useRef(match.params.current_page);
  const dispatch = useDispatch();
  const history = useHistory();
  const { userData } = useSelector((state) => state.loginReducer);
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

  const deleteBoard = () => {
    if (window.confirm(`정말 삭제 하시겠습니까?`)) {
      EditerApiService.deleteBoard(match.params.board_id).then((res) => {
        ToastTopRight(res.data);
        history.push(`/Thboard/${board_type}/${pageNum}`);
      });
    }
  };

  const likeHandler = useCallback(() => {
    if (userData && userData.id) {
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
      ToastCenter('로그인 해주세요');
    }
  }, [userData, dispatch, match, detailData]);

  return (
    detailData && (
      <div>
        <ul className='Thumb-wrapper'>
          <div className='Thumb-header-wrapper'>
            <li className='Thumb-header'>이력서</li>
          </div>
          <div className='detail-btn'>
            <div className='detail-btn-box'>
              {userData &&
              detailData.user &&
              userData.id === detailData.user.id ? (
                <div>
                  <Link
                    to={`/ThumbModify/Thumb/${detailData.id}/1`}
                    className='detail-update-btn'
                  >
                    이력서 수정하기
                  </Link>
                  <button className='detail-update-btn' onClick={deleteBoard}>
                    이력서 삭제하기
                  </button>
                </div>
              ) : (
                <Report
                  board_id={match.params.board_id}
                  modalIsOpen={modalIsOpen}
                  setModalIsOpen={setModalIsOpen}
                />
              )}
              <Link className='detail-update-btn' to={`/Thboard/Thumb/1`}>
                목록보기
              </Link>
              {/* 모달 열리는 부분 */}
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
            <li className='Thumb-content-profile-pic'>
              <img src='/img/board_pic/thumbnailer_pic/thum2.PNG'></img>
            </li>

            <li className='Thumb-content-hit'></li>
            <li className='Thumb-content-title'>{detailData.title}</li>
            <li className='Thumb-content-user'>작성자</li>
            <li className='Thumb-content-pay'>
              급여방식 <span> {detailData.payType}</span>
              희망급여 <span>{detailData.payAmount} 원</span>
            </li>
            <li className='Thumb-content-tools'>
              사용기술 <span>{detailData.tools}</span>
            </li>
            <li className='Thumb-content-pr'>
              <div className='thumb-pr-div'> 경력 및 소개 </div>
              <div className='thumb-pr-content'>
                <ReactQuill
                  className='QuillContent'
                  value={detailData.content || ''}
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

export default ThumbDetail;
