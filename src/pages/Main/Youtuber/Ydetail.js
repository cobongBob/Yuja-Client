import React, { useCallback, useEffect, useState } from 'react';
import * as YapiService from '../../../apiService/YapiService';
import './Ydetail.scss';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { AiOutlineFileSearch } from 'react-icons/ai';
import { Link } from 'react-router-dom';
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

Modal.setAppElement('#root');
const Ydetail = (props) => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.loginReducer);
  const { detailData } = useSelector((state) => state.YboardReducer);

  // 신고하기 modal 쓸때마다 해당 component 에서 선언해줘야함
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const board_id = props.match.params.board_id;
    console.log(1111111111111, userData);
    if (board_id) {
      getDetailData(board_id).then((res) => {
        dispatch(res);
      });
    }
  }, [dispatch, props.match.params.board_id, userData]);

  const deleteBoard = () => {
    YapiService.deleteBoard(props.match.params.board_id).then((res) => {
      alert(res.data);
      props.history.push('/Youtuber');
    });
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
      alert('로그인 해주세요');
      //로그인 창으로
    }
  }, [userData, dispatch, props.match.params.board_id, detailData]);

  return (
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
                        to={`/YmodifyTest/${detailData.id}`}
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
                  <Link className='detail-update-btn' to='/Youtuber'>
                    목록보기
                  </Link>
                  {/* 모달 열리는 부분 */}
                  <Report
                    board_id={props.match.params.board_id}
                    modalIsOpen={modalIsOpen}
                    setModalIsOpen={setModalIsOpen}
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
              {detailData && detailData.updatedDate
                ? detailData.updatedDate.substr(0, 10)
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
  );
};

export default Ydetail;
