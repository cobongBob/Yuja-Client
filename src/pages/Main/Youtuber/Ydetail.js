import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as YapiService from '../../../apiService/YapiService';
import './Ydetail.scss';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { AiOutlineFileSearch } from 'react-icons/ai';
import { Link, useHistory } from 'react-router-dom';
import ReactQuill from 'react-quill';
import ChannelBox from './api_practice/ChannelBox';
import {
  getDetailData,
  addLike,
  deleteLike,
} from '../../../redux/board/youtube/yboardReducer';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import Report from '../components/Report';
import { ToastCenter } from '../../../modules/ToastModule';

Modal.setAppElement('#root');
const Ydetail = ({ match }) => {
  console.log(22222, match);
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.loginReducer);
  const { detailData } = useSelector((state) => state.YboardReducer);
  const { authorities } = useSelector((state) => state.loginReducer);
  const history = useHistory();
  // 신고하기 modal 쓸때마다 해당 component 에서 선언해줘야함
  const current_page = useRef(match.params.current_page);
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
    YapiService.deleteBoard(match.params.board_id).then((res) => {
      history.push('/Youtuber');
    });
  };

  const likeHandler = useCallback(() => {
    if (
      (userData &&
        userData.id &&
        authorities &&
        authorities.includes('YOUTUBER')) ||
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
      //로그인 창으로
    }
  }, [userData, dispatch, match.params.board_id, detailData]);

  return (
    detailData && (
      <div>
        <div className='DetailWrapper'>
          <div className='DetailHeaderWrapper'>
            <div className='youtube-top-wrapper'>
              <div className='youtube-top'>채널소개 및 기본공고</div>
            </div>
            <div className='youtube_top_DefaultInfo'>
              {/* 유튜버  */}
              <div className='channel-box'>
                {!detailData ? <span>loading..</span> : <ChannelBox />}
              </div>
            </div>
            <div className='detail-box'>
              <div>
                <div className='DetailTop'>상세내용</div>
                <div className='detail-btn'>
                  <div className='detail-btn-box'>
                    {userData &&
                    detailData.user &&
                    userData.id === detailData.user.id ? (
                      <div>
                        <Link
                          to={`/YboardModify/${detailData.id}/${current_page.current}`}
                          className='detail-update-btn'>
                          공고 수정하기
                        </Link>
                        <button
                          className='detail-update-btn'
                          onClick={deleteBoard}>
                          공고 삭제하기
                        </button>
                      </div>
                    ) : null}
                    <Link
                      className='detail-update-btn'
                      to={`/Youtuber/${current_page.current}`}>
                      목록보기
                    </Link>
                    {/* 모달 열리는 부분 */}
                    <Report
                      board_id={match.params.board_id}
                      modalIsOpen={modalIsOpen}
                      setModalIsOpen={setModalIsOpen}
                      board_code={
                        detailData.boardType && detailData.boardType.boardCode
                      }
                    />
                  </div>
                </div>
                <div className='detail-title'>
                  {detailData.title}
                  <div className='detail-show'>
                    <div className='likeWrapper'>
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
                    <div className='hitWrapper'>
                      <AiOutlineFileSearch className='hit' size={30} />{' '}
                      <span className='hitCount'>{detailData.hit}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='detail-date'>
                {detailData && detailData.boardUpdatedDate
                  ? detailData.boardUpdatedDate.substr(0, 10)
                  : ''}{' '}
                ~{' '}
                {detailData && detailData.expiredDate
                  ? detailData.expiredDate.substr(0, 10)
                  : '상시채용'}
              </div>
              <div className='detail-content'>
                <div className='DetailQuill'>
                  <ReactQuill
                    className='QuillContent'
                    value={detailData.content || ''}
                    readOnly={true}
                    theme={'bubble'}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Ydetail;
