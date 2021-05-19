import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getWinOneBoard, modifyWinBoard } from "../../../apiService/winBoardApiService";
import QuillModify from "../../../components/Quill/QuillModify";
import { ToastCenter } from "../../../modules/ToastModule";

const WModify = ({ match }) => {
  const { userData } = useSelector((state) => state.loginReducer);
  const addingFileList = useRef([]);
  const deletedFileList = useRef([]);
  const [qModiData, setQModiData] = useState();
  const board_type = useRef(match.params.board_type);
  const fileList = useRef([]);
  const history = useHistory();
  let wHistory = useCallback(
    (board_id) => history.push(`/BoardDetail/${board_type.current}/${board_id}/1`),
    [history, board_type]
  );
  const [input, setInput] = useState({
    title: "",
  });
  const [checked, setCheckd] = useState({
    isPrivate: false,
  });

  const inputHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const checkboxHandler = (e) => {
    setCheckd({
      ...checked,
      [e.target.name]: e.target.checked,
    });
  };

  useEffect(() => {
    getWinOneBoard(match.params.board_id, board_type.current).then((res) => {
      if (!userData || userData.id !== res.data.user.id) {
        ToastCenter("권한이 없습니다.");
        return history.goBack();
      }
      fileList.current = res.data.boardAttachFileNames;
      setQModiData(res.data.content);
      setInput(res.data);
      setCheckd({
        isPrivate: res.data.isPrivate,
      });
    });
  }, [userData]); // eslint-disable-line react-hooks/exhaustive-deps
  const testCheking = () => {
    if (!qModiData || !input.title) {
      return ToastCenter("제목과 내용을 입력해주세요");
    }
    let reg = new RegExp(`http://localhost:8888/files/${board_type.current}/[0-9]+.[a-z]+`, "gi");
    let imgSrcArr = String(qModiData).match(reg); // 불러왔던 글에 존재했던 이미지 태그들의 src
    // 서버에서 날아온 이미지 이름과 비교한다. 없으면 삭제된것이므로 삭제 리스트에 담아준다.
    if (imgSrcArr) {
      fileList.current.forEach((src) => {
        if (!imgSrcArr.includes(`http://localhost:8888/files/${board_type.current}/${src}`)) {
          deletedFileList.current.push(src);
        }
      });
    } else {
      deletedFileList.current = fileList.current;
    }

    const modifyingData = {
      ...input,
      ...checked,
      content: qModiData.replaceAll(
        `src="http://localhost:8888/files/temp/`,
        `src="http://localhost:8888/files/${board_type.current}/`
      ),
      boardAttachIds: addingFileList.current,
      boardAttachToBeDeleted: deletedFileList.current,
    };
    modifyWinBoard(match.params.board_id, modifyingData, board_type.current).then((res) => {
      wHistory(res.data.id);
    });
  };
  return (
    <div>
      <div>
        <input
          name='title'
          value={input.title || null}
          onChange={inputHandler}
          placeholder='제목'
          maxLength='200'
          type='text'
        />
        {board_type.current === "CustomService" ? (
          <>
            <label htmlFor='secret'>비밀글</label>
            <input id='secret' name='isPrivate' onChange={checkboxHandler} type='checkbox' />
          </>
        ) : null}
        <h2>상세 내용</h2>
        <QuillModify
          modify={testCheking}
          addingFileList={addingFileList}
          qModiData={qModiData}
          setQModiData={setQModiData}
          board_type={board_type.current}
        />
      </div>
    </div>
  );
};

export default WModify;
