import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { getWinOneBoard } from "../../../apiService/winBoardApiService";

const Wdetail = ({ match }) => {
  const [wContent, setWContent] = useState("");
  useEffect(() => {
    getWinOneBoard(match.params.board_id)
      .then((res) => {
        setWContent(res.data.content);
      })
      .catch((e) => {
        alert(e.response.message);
      });
  }, [match.params.board_id]);
  return (
    <div>
      <div className='detail-content'>
        <div className='DetailQuill'>
          <ReactQuill className='QuillContent' value={wContent || ""} readOnly={true} theme={"bubble"} />
        </div>
      </div>
    </div>
  );
};

export default Wdetail;
