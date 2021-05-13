import React, { useCallback, useEffect, useState } from 'react';
import * as YapiService from './YapiService';
import './Ydetail.scss';
import { FcLike, FcOk } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import ChannelBox from './api_practice/ChannelBox';
import { getDetailData } from '../../../redux/board/youtube/yboardReducer';
import { useDispatch, useSelector } from 'react-redux';
import {
  getLiked,
  addLike,
  deleteLike,
} from '../../../redux/liked/likedReducer';

const Ydetail = (props) => {
  // console.log(props.match);
  // let updatedDate = new Date();

  const dispatch = useDispatch();

  const { countLikes, isLiked } = useSelector((state) => state.likedReducer);
  const { userData } = useSelector((state) => state.loginReducer);
  const { detailData } = useSelector((state) => state.YboardReducer);
  // const _getDetailData = () => dispatch(getDetailData());
  // getDetailData().then((res) => {
  //   dispatch(res);
  // });

  // useEffect(() => {
  //   YapiService.fetchBoard(props.match.params.board_id)
  //     .then((res) => {
  //       setData(res.data);
  //       console.log(res.data);
  //     })
  //     .catch((e) => {
  //       alert('접근불가');
  //       // props.history.goBack(-1);
  //     });
  // }, [props.match.params.board_id, props.history]);

  useEffect(() => {
    const board_id = props.match.params.board_id;
    if (userData.id) {
      getLiked(board_id, userData.id).then((res) => {
        dispatch(res);
      });
      getDetailData(board_id, userData.id).then((res) => {
        dispatch(res);
      });
    } else {
      getLiked(board_id, 0).then((res) => {
        dispatch(res);
      });
      getDetailData(board_id, 0).then((res) => {
        dispatch(res);
      });
    }
  }, [userData.id]);

  const deleteBoard = () => {
    YapiService.deleteBoard(props.match.params.board_id).then((res) => {
      alert(res.data);
      props.history.push('/Youtuber');
    });
  };

  const likeHandler = useCallback(() => {
    if (userData.id) {
      if (isLiked) {
        deleteLike(props.match.params.board_id, userData.id).then((res) => {
          dispatch(res);
        });
      } else {
        addLike(props.match.params.board_id, userData.id).then((res) => {
          dispatch(res);
        });
      }
    } else {
      //로그인 창으로
    }
  }, [userData.id, isLiked]);

  return (
    <div>
      <div className='DetailWrapper'>
        <div className='DetailHeaderWrapper'>
          <div className='youtube-top-wrapper'>
            {''}
            <div className='youtube-top'>채널 및 기본공고</div>
          </div>
          <div className='youtube_top_DefaultInfo'>
            <div className='channel-box'>
              {!detailData ? (
                <span>loading..</span>
              ) : (
                <ChannelBox detailData={detailData}></ChannelBox>
              )}
            </div>
            <div className='DefaultInfoWrapper'>
              <div className='DefaultInfo'>
                <ul>
                  <li>
                    <label htmlFor=''>모십니다:</label> {detailData.worker}
                  </li>
                  <li>
                    <label htmlFor=''>경력:</label> {detailData.career}
                  </li>
                  <li>
                    <label htmlFor=''>급여종류:</label> {detailData.payType}
                  </li>
                  <li>
                    <label htmlFor=''>급여:</label> {detailData.payAmount}원
                  </li>
                  <li>
                    <label htmlFor=''>원하는 툴:</label> {detailData.tools}
                  </li>
                  <li>
                    <label htmlFor=''>담당자:</label> {detailData.manager}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className='detail-box'>
            <div>
              <div className='DetailTop'>상세내용</div>
              <div className='detail-btn'>
                <div className='detail-btn-box'>
                  <Link
                    to={`/YmodifyTest/${detailData.id}`}
                    className='detail-update-btn'>
                    공고 수정하기
                  </Link>
                  <button onClick={deleteBoard}>공고 삭제하기</button>
                </div>
              </div>
              <div className='detail-title'>
                {detailData.title}
                <div className='detail-show'>
                  <span>
                    {isLiked === true ? (
                      <button onClick={likeHandler}>
                        <FcLike size={20} />
                        {countLikes}
                      </button>
                    ) : (
                      <button onClick={likeHandler}>
                        <FcLike size={20} />
                        {countLikes}
                      </button>
                    )}
                  </span>
                  <br />
                  <span>
                    <FcOk size={20} /> {detailData.hit}
                  </span>
                </div>
              </div>
            </div>
            <div className='detail-date'>
              {detailData.updatedDate !== undefined
                ? detailData.updatedDate.substr(0, 10)
                : ''}{' '}
              ~{' '}
              {detailData.expiredDate !== undefined
                ? detailData.expiredDate.substr(0, 10)
                : '상시채용'}
            </div>
            <div className='detail-content'>
              <div className='detail-content-default'>
                {' '}
                기본내용{' '}
                <div>
                  <ul></ul>
                  <br />
                </div>{' '}
              </div>
              <div className='detail-content-detail'>
                {' '}
                추가내용
                <ReactQuill
                  value={detailData.content || ''}
                  readOnly={true}
                  theme={'bubble'}
                />{' '}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ydetail;
