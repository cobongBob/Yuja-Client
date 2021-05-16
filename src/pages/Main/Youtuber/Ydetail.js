import React, { useCallback, useEffect, useState } from "react";
import * as YapiService from "../../../apiService/YapiService";
import "./Ydetail.scss";
import { FcLike } from "react-icons/fc";
import { AiOutlineHeart, AiOutlineFileSearch } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import ReactQuill from "react-quill";
import ChannelBox from "./api_practice/ChannelBox";
import { getDetailData, addLike, deleteLike } from "../../../redux/board/youtube/yboardReducer";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";

const Ydetail = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const history = useHistory();

  // 뒤로가기
  const goBack = () => {
    history.push("/Youtuber");
  };

  const dispatch = useDispatch();

  const { userData } = useSelector((state) => state.loginReducer);
  const { detailData } = useSelector((state) => state.YboardReducer);

  useEffect(() => {
    const board_id = props.match.params.board_id;
    if (board_id) {
      getDetailData(board_id).then((res) => {
        dispatch(res);
      });
    }
  }, [dispatch, props.match.params.board_id, userData]);

  const deleteBoard = () => {
    YapiService.deleteBoard(props.match.params.board_id).then((res) => {
      alert(res.data);
      props.history.push("/Youtuber");
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
      alert("로그인 해주세요");
      //로그인 창으로
    }
  }, [userData, dispatch, props.match.params.board_id, detailData]);

  return (
    <div>
      <div className='DetailWrapper'>
        <div className='DetailHeaderWrapper'>
          <div className='youtube-top-wrapper'>
            {""}
            <div className='youtube-top'>채널소개 및 기본공고</div>
          </div>
          <div className='youtube_top_DefaultInfo'>
            <div className='channel-box'>{!detailData ? <span>loading..</span> : <ChannelBox />}</div>
          </div>
          <div className='detail-box'>
            <div>
              <div className='DetailTop'>상세내용</div>
              <div className='detail-btn'>
                <div className='detail-btn-box'>
                  <Link to={`/YmodifyTest/${detailData.id}`} className='detail-update-btn'>
                    공고 수정하기
                  </Link>
                  <button className='detail-update-btn' onClick={deleteBoard}>
                    공고 삭제하기
                  </button>
                  <button className='detail-update-btn' onClick={goBack}>
                    목록보기
                  </button>
                  <button onClick={() => setModalIsOpen(true)}>신고하기</button>
                  <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                    <h1>신고하기 모달창</h1>
                    <button onClick={() => setModalIsOpen(false)}>closeModal</button>
                  </Modal>
                </div>
              </div>
              <div className='detail-title'>
                {detailData.title}
                <div className='detail-show'>
                  <div className='likeWrapper'>
                    {detailData && detailData.liked ? (
                      <button className='likeButton' onClick={likeHandler}>
                        <FcLike size={30} />
                        <span>{detailData.likes}</span>
                      </button>
                    ) : (
                      <button className='likeButton' onClick={likeHandler}>
                        <AiOutlineHeart size={30} />
                        <span>{detailData.likes}</span>
                      </button>
                    )}
                  </div>
                  <div className='hitWrapper'>
                    <AiOutlineFileSearch className='hit' size={30} /> <span className='hitCount'>{detailData.hit}</span>
                  </div>
                </div>
              </div>
              -
            </div>
            <div className='detail-date'>
              {detailData && detailData.updatedDate ? detailData.updatedDate.substr(0, 10) : ""} ~{" "}
              {detailData && detailData.expiredDate ? detailData.expiredDate.substr(0, 10) : "상시채용"}
            </div>
            <div className='detail-content'>
              <div className='DetailQuill'>
                <ReactQuill
                  className='QuillContent'
                  value={detailData.content || ""}
                  readOnly={true}
                  theme={"bubble"}
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
