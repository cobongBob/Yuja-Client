import React, { useEffect, useState } from "react";
import YapiService from "./YapiService";
import "./Ydetail.scss";
import { FcLike, FcOk } from "react-icons/fc";
import Footer from "../../../components/Footer";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const Ydetail = (props) => {
  // console.log(props.match);
  // let updatedDate = new Date();

  const [data, setData] = useState({
    updatedDate: "",
    title: "여기 제목",
    content: "여긴 내용",
    hit: 3,
    likes: 2,
  });

  useEffect(() => {
    YapiService.fetchBoard(props.match.params.board_id).then((res) => {
      setData(res.data);
    });
  }, []);

  const deleteBoard = () => {
    YapiService.deleteBoard(props.match.params.board_id).then((res) => {
      alert(res.data);
      props.history.push("/Youtuber");
    });
  };

  return (
    <div>
      <div className='DetailWrapper'>
        <div className='DetailHeaderWrapper'>
          <div className='youtube-top'>채널소개</div>
          <div></div>
          <div className='channel-box'></div>
          <div className='detail-box'>
            <div className='DetailTop'>공고내용</div>
            <div className='detail-btn'>
              <div className='detail-btn-box'>
                <Link to={`/YmodifyTest/${data.id}`} className='detail-update-btn'>
                  공고 수정하기
                </Link>
                <button onClick={deleteBoard}>공고 삭제하기</button>
              </div>
            </div>
            <div></div>
            <div className='detail-title'>
              {data.title}
              <div className='detail-show'>
                <span>
                  <FcLike size={20} /> {data.likes}
                </span>
                <br />
                <span>
                  <FcOk size={20} /> {data.hit}
                </span>
              </div>
            </div>
            <div className='detail-date'>
              {data.updatedDate !== null ? data.updatedDate.substr(0, 10) : ""} ~ 마감일
            </div>
            <div className='detail-content'>
              <div className='detail-content-default'> 기본내용 </div>
              <div className='detail-content-detail'> 추가내용 </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Ydetail;