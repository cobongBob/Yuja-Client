import React, { useCallback, useRef, useState } from 'react';
import { insertWinBoard } from '../../../apiService/winBoardApiService';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import QuillRegister from '../../../components/Quill/QuillRegister';
import { ToastCenter } from '../../../modules/ToastModule';

const Wregister = ({ match }) => {
  const { userData } = useSelector((state) => state.loginReducer);
  const currFileList = useRef([]);
  const addingFileList = useRef([]);
  const [qData, setQData] = useState();
  const board_type = useRef(match.params.board_type);
  const history = useHistory();

  let whistory = useCallback(
    (board_id) =>
      history.push(`/BoardDetail/${board_type.current}/${board_id}/1`),
    [history, board_type]
  );

  const [inputData, setInputData] = useState({
    title: '',
  });
  const [checked, setCheckd] = useState({
    isPrivate: false,
  });
  const inputHandler = useCallback(
    (e) => {
      setInputData({
        ...inputData,
        [e.target.name]: e.target.value,
      });
    },
    [inputData]
  );
  const checkboxHandler = useCallback(
    (e) => {
      setCheckd({
        ...checked,
        [e.target.name]: e.target.checked,
      });
    },
    [checked]
  );

  const testCheking = useCallback(() => {
    if (!qData || !inputData.title) {
      return ToastCenter('제목과 내용을 입력해주세요');
    }
    if (!userData) {
      return ToastCenter('로그인 해주세요');
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
      boardAttachNames: currFileList.current,
    };
    insertWinBoard(sendingData, board_type.current).then((res) => {
      whistory(res.data.id);
    });
  }, [userData, qData, whistory, checked, inputData]);

  const goList = useCallback(() => {
    if (board_type === 'Notice') {
      history.push(`/Admin/AdminBoard`);
    } else {
      history.push(`/Community/${board_type.current}/1`);
    }
  }, [history, board_type]);

  return (
    <div className="comment-wrapper">
      <div className="comment-content">
        <div className="comment-register-category">
          {board_type.current === 'Winwin' && '윈윈'}
          {board_type.current === 'Collabo' && '합방'}
          {board_type.current === 'Free' && '자유'}
          {board_type.current === 'CustomService' && '건의'}
          게시판
        </div>
        <div className="comment-options">
          <button onClick={goList}>목록</button>
        </div>
        <ul>
          <li className="comment-register-title">
            <input
              name="title"
              onChange={inputHandler}
              placeholder="제목"
              maxLength="45"
              type="text"
              autoFocus
            />
            <div>
              {board_type.current === 'CustomService' ? (
                <div className="secret-option">
                  <label htmlFor="secret">비밀글</label>
                  <input
                    id="secret"
                    name="isPrivate"
                    onChange={checkboxHandler}
                    type="checkbox"
                  />
                </div>
              ) : null}
              {board_type.current === 'Notice' ? (
                <div className="secret-option">
                  <label htmlFor="secret">공지공개</label>
                  <input
                    id="secret"
                    name="isPrivate"
                    onChange={checkboxHandler}
                    type="checkbox"
                  />
                </div>
              ) : null}
            </div>
          </li>
        </ul>
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
