import React, { useCallback, useRef, useState } from "react";
import { insertWinBoard } from "../../../apiService/winBoardApiService";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import QuillRegister from "../../../components/Quill/QuillRegister";

const Wregister = ({ match }) => {
  const { userData } = useSelector((state) => state.loginReducer);
  const currFileList = useRef([]);
  const addingFileList = useRef([]);
  const [qData, setQData] = useState();
  const board_type = useRef(match.params.board_type);
  const history = useHistory();

  let Yhistory = useCallback(
    (board_id) => history.push(`/BoardDetail/${board_type.current}/${board_id}/1`),
    [history, board_type]
  );

  const [inputData, setInputData] = useState({
    title: "",
  });
  const [checked, setCheckd] = useState({
    isPrivate: false,
  });
  const inputHandler = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };
  const checkboxHandler = (e) => {
    setCheckd({
      ...checked,
      [e.target.name]: e.target.checked,
    });
  };

  const testCheking = useCallback(() => {
    if (!qData || !inputData.title) {
      return alert("제목과 내용을 입력해주세요");
    }
    let reg = /http:\/\/localhost:8888\/files\/temp\/[0-9]+.[a-z]+/g;
    let imgSrcArr = String(qData).match(reg);
    if (imgSrcArr) {
      addingFileList.current.forEach((src) => {
        if (imgSrcArr.includes(`http://localhost:8888/files/temp/${src}`)) {
          currFileList.current.push(src);
        }
      });
    } else {
      currFileList.current = [];
    }
    const sendingData = {
      ...inputData,
      ...checked,
      userId: userData.id,
      content: qData.replaceAll(
        `src="http://localhost:8888/files/temp/`,
        `src="http://localhost:8888/files/${board_type.current}/`
      ), //업로드된 이미지들은 temp가 아닌 WinBoard에 저장된다.
      thumbnail: "썸네일테스트", //썸네일 서버쪽 만들어지면 변경 필
      boardAttachNames: currFileList.current,
    };
    insertWinBoard(sendingData, board_type.current).then((res) => {
      Yhistory(res.data.id);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData, qData, Yhistory]);

  return (
    <div>
      <div>
        <input name='title' onChange={inputHandler} placeholder='제목' maxLength='200' type='text' />
        {board_type.current === "CustomService" ? (
          <>
            <label htmlFor='secret'>비밀글</label>
            <input id='secret' name='isPrivate' onChange={checkboxHandler} type='checkbox' />
          </>
        ) : null}
        <h2>상세 내용</h2>
        <QuillRegister
          register={testCheking}
          addingFileList={addingFileList}
          qData={qData}
          setQData={setQData}
          board_type={board_type.current}
        />
      </div>
    </div>
  );
};

export default Wregister;
