import React, { useCallback, useEffect } from 'react';
import * as YapiService from '../../../apiService/YapiService';
import './Ydetail.scss';
import { FcLike, FcOk } from 'react-icons/fc';
import { AiOutlineHeart, AiOutlineFileSearch } from 'react-icons/ai';
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
    if (userData && userData.id) {
      getLiked(board_id, userData.id).then((res) => {
        dispatch(res);
      });
      getDetailData(board_id).then((res) => {
        dispatch(res);
      });
    } else {
      getLiked(board_id, 0).then((res) => {
        dispatch(res);
      });
      getDetailData(board_id).then((res) => {
        dispatch(res);
      });
    }
  }, [userData, dispatch, props.match.params.board_id]);

  const deleteBoard = () => {
    YapiService.deleteBoard(props.match.params.board_id).then((res) => {
      alert(res.data);
      props.history.push('/Youtuber');
    });
  };

  const likeHandler = useCallback(() => {
    if (userData && userData.id) {
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
  }, [userData, isLiked, dispatch, props.match.params.board_id]);

  return (
    <div>
      <div className='DetailWrapper'>
        <div className='DetailHeaderWrapper'>
          <div className='youtube-top-wrapper'>
            {''}
            <div className='youtube-top'>채널소개 및 기본공고</div>
          </div>
          <div className='youtube_top_DefaultInfo'>
            <div className='channel-box'>
              {!detailData ? (
                <span>loading..</span>
              ) : (
                <ChannelBox detailData={detailData}></ChannelBox>
              )}
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
                  <div className='likeWrapper'>
                    {isLiked === true ? (
                      <button className='likeButton' onClick={likeHandler}>
                        <FcLike size={30} />
                        <span>{countLikes}</span>
                      </button>
                    ) : (
                      <button className='likeButton' onClick={likeHandler}>
                        <AiOutlineHeart size={30} />
                        <span>{countLikes}</span>
                      </button>
                    )}
                  </div>
                  <div className='hitWrapper'>
                    <AiOutlineFileSearch className='hit' size={30} />{' '}
                    <span className='hitCount'>{detailData.hit}</span>
                  </div>
                </div>
              </div>
              -
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
