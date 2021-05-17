import React, { useCallback, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import QuillRegister from '../../../components/Quill/QuillRegister';
import * as EditerApiService from '../../../apiService/EditerApiService';
import './EditorRegister.scss';

const EditorRegister = () => {
  const { userData } = useSelector((state) => state.loginReducer);
  const currFileList = useRef([]);
  const addingFileList = useRef([]);
  const [qData, setQData] = useState();
  const { current: board_type } = useRef('Editor');

  const history = useHistory();

  let Yhistory = useCallback(
    (board_id) => history.push(`/YDetail/${board_id}`),
    [history]
  );
  const testCheking = useCallback(() => {
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
      ...input,
      userId: userData.id, //글쓰고있는 사람의 아이디로 변경요망
      content: qData.replaceAll(
        `src="http://localhost:8888/files/temp/`,
        `src="http://localhost:8888/files/${board_type}/`
      ), //업로드된 이미지들은 temp가 아닌 Youtuber에 저장된다.
      thumbnail: '썸네일테스트', //썸네일 서버쪽 만들어지면 변경 필
      boardAttachNames: currFileList.current,
    };
    EditerApiService.addBoards(sendingData)
      .then((res) => {
        Yhistory(res.data.id);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData, qData, Yhistory]);

  const checkboxCheck = (e) => {
    if (e.target.checked) {
      checkedlist.current.push(e.target.value);
    } else {
      const index = checkedlist.current.indexOf(e.target.value);
      checkedlist.current.splice(index, 1);
    }
  };

  const checkedlist = useRef([]);

  const [input, setInput] = useState({
    firstLink: '',
    title: '',
    career: '',
    wantedpay: '',
    useTools: checkedlist.current,
  });

  return (
    <div>
      <div className='register-container'>
        <div className='editor-register-header'>
          <h1>이력서 등록</h1>
        </div>
        <div className='editor-register-default-input'>
          <ul>
            <li className='li-item1'>
              <input
                type='text'
                placeholder='제목'
                name='title'
                id='first-link'
              />
            </li>
            <li className='li-item2'>
              <input
                type='text'
                placeholder='대표영상의 링크를 적어주세요.'
                name='firstLink'
              />
            </li>
            <li className='li-item3'>
              <input type='text' placeholder='경력' name='career' />
            </li>
            <li className='li-item4'>
              <input type='text' placeholder='희망급여' name='wantedpay' />
            </li>
            <li className='li-item5'>
              <input
                id='Epremiere'
                name='Epremiere'
                value='프리미어 프로'
                type='checkbox'
                onChange={checkboxCheck}
              />
              <label htmlFor='Epremiere'>프리미어 프로 </label>
              <input
                id='Eaftereffect'
                name='Eaftereffect'
                value='애프터이펙트'
                type='checkbox'
                onChange={checkboxCheck}
              />
              <label htmlFor='Eaftereffect'>애프터이펙트 </label>
              <input
                id='Efinalcut'
                name='Efinalcut'
                value='파이널컷'
                type='checkbox'
                onChange={checkboxCheck}
              />
              <label htmlFor='Efinalcut'>파이널컷 </label>
              <input
                id='Evegas'
                name='Evegas'
                onChange={checkboxCheck}
                value='베가스'
                type='checkbox'
              />
              <label htmlFor='Evegas'>베가스</label>
              <input
                id='Epowerdirector'
                name='Epowerdirector'
                value='파워 디렉터'
                type='checkbox'
                onChange={checkboxCheck}
              />
              <label htmlFor='Epowerdirector'>파워 디렉터</label>
            </li>
          </ul>
        </div>
        <div>
          <QuillRegister
            register={testCheking}
            addingFileList={addingFileList}
            qData={qData}
            setQData={setQData}
            board_type={board_type}
          />
        </div>
      </div>
    </div>
  );
};

export default EditorRegister;
