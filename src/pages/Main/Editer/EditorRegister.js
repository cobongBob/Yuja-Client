import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import QuillRegister from '../../../components/Quill/QuillRegister';
import * as EditerApiService from '../../../apiService/EditerApiService';
import './EditorRegister.scss';
import { ToastCenter } from '../../../modules/ToastModule';

const EditorRegister = ({ match }) => {
  const { userData } = useSelector((state) => state.loginReducer);
  const currFileList = useRef([]);
  const addingFileList = useRef([]);
  const [qData, setQData] = useState();
  const board_type = useRef(match.params.board_type);
  const history = useHistory();
  const checkedlist = useRef([]);
  let Ehistory = useCallback(
    (board_id) => history.push(`/EDetail/${board_type.current}/${board_id}/1`),
    [history]
  );

  const [input, setInput] = useState({
    previewImage: '',
    title: '',
    career: '',
    payType: '',
    payAmount: '',
    receptionMethod: "",
    tools: checkedlist.current,
  });

  const testCheking = useCallback(() => {
    if (
      !qData ||
      !input.title ||
      !input.previewImage ||
      !input.career ||
      !input.payType ||
      !input.payAmount ||
      !input.receptionMethod ||
      !input.tools[0]
    ) {
      return ToastCenter('내용을 모두 적어주세요.');
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
      ...input,
      userId: userData.id, //글쓰고있는 사람의 아이디로 변경요망
      content: qData.replaceAll(
        `src="http://localhost:8888/files/temp/`,
        `src="http://localhost:8888/files/${board_type.current}/`
      ), //업로드된 이미지들은 temp가 아닌 Editor에 저장된다.
      boardAttachNames: currFileList.current,
    };
    EditerApiService.addBoards(sendingData, board_type.current).then((res) => {
      Ehistory(res.data.id);
    });
  }, [userData, qData, Ehistory, input]);

  const checkboxCheck = useCallback(
    (e) => {
      if (e.target.checked) {
        checkedlist.current.push(e.target.value);
      } else {
        const index = checkedlist.current.indexOf(e.target.value);
        checkedlist.current.splice(index, 1);
      }
    },
    [checkedlist]
  );

  const radioCheck = useCallback((e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  }, []);

  const onChange = useCallback(
    (e) => {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    },
    [input]
  );

  const [editorLinkDesc, setEditorLinkDesc] = useState("");

  const editorLinkCheck = useCallback(
    (e) => {
      let checkContent = e.target.value;
      if (
        checkContent !== "" &&
        checkContent.startsWith("https://www.youtube.com/watch?v=")
      ) {
        setEditorLinkDesc("");
      } else {
        setEditorLinkDesc("유튜브 링크는 'https://www.youtube.com/watch?v=고유주소' 의 형식이여야 합니다.");
      }
    },
    [editorLinkDesc]
  );

  const [isCareerChecked, setIsCareerChecked] = useState(false);

  return (
    <div className='editorRegisterFrag'>
      <div className='register-container'>
        <div className='editor-register-header'>
          <h1>포트폴리오 등록</h1>
        </div>
        <div className='editor-register-default-input'>
          <ul className='leftUl'>
            <div className='li_Title_Title'>제목</div>
            <li className='li-item1'>
              <input
                type='text'
                placeholder='포트폴리오의 제목을 작성해주세요.'
                name='title'
                id='first-link'
                onChange={onChange}
                maxLength='45'
              />
            </li>
            <li className='li-item2'>
              <div className='li_Title_Link'>대표 영상 링크</div>
              <input
                type='text'
                id='thumb-PicInput'
                placeholder='이 영상은 포트폴리오 썸네일로 사용 됩니다.'
                name='previewImage'
                onChange={onChange}
                onKeyUp={editorLinkCheck}
              />
            </li>
            <div className='warningBox'>
              {editorLinkDesc}
            </div>
            <li className='li-item3'>
              <div className='li_Title_ReceptionMethod'>
                연락처
              </div>
              <input
                id='YreceptionMethod'
                onChange={onChange}
                placeholder='연락처'
                maxLength='50'
                name='receptionMethod'
                type='text'
              />
            </li>
          </ul>
          <ul className='rightUl'>
            <li className='li-item3'>
              <div>경력사항</div>
              <input
                id='newbie'
                name='career'
                onChange={radioCheck}
                value='신입'
                type='radio'
              />
              <label htmlFor='newbie'>신입</label>
              <input
                id='career'
                onChange={radioCheck}
                name='career'
                value='경력'
                type='radio'
              />
              <label htmlFor='career'>경력</label>
              {isCareerChecked ?
              <div className='careerTimeBox'>
              <input
                id='careerTimeYear'
                name='careerTimeYear'
                type='text'
                maxLength='1'
              />
              년
              <input
                id='careerTimeMonth'
                name='careerTimeMonth'
                type='text'
                maxLength='2'
              />
              개월
              </div>
                :
                ""
              }
            </li>
            <li className='li-item4'>
              <select name='payType' onChange={onChange}>
                <option>선택</option>
                <option value='연봉'>연봉</option>
                <option value='월급'>월급</option>
                <option value='주급'>주급</option>
                <option value='건당'>건당</option>
                <option value='분당'>분당</option>
              </select>
              <input
                type='text'
                placeholder='희망급여'
                name='payAmount'
                onChange={onChange}
                maxLength={12}
                onInput={({ target }) => {
                  target.value = target.value.replace(/[^0-9]/g, '');
                  target.value = target.value.replace(/,/g, '');
                  target.value = target.value.replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    ','
                  ); // 정규식을 이용해서 3자리 마다 , 추가
                }}
              />
            </li>
              <div className='registerSpanBox'>
                <span className='registerSpan'>사용기술</span>
              </div>
            <li className='li-item5'>
              <input
                id='Epremiere'
                name='tools'
                value='프리미어 프로'
                type='checkbox'
                onChange={checkboxCheck}
              />
              <label htmlFor='Epremiere'>프리미어 프로 </label>
              <input
                id='Eaftereffect'
                name='tools'
                value='애프터이펙트'
                type='checkbox'
                onChange={checkboxCheck}
              />
              <label htmlFor='Eaftereffect'>애프터이펙트 </label>
              <input
                id='Efinalcut'
                name='tools'
                value='파이널컷'
                type='checkbox'
                onChange={checkboxCheck}
              />
              <label htmlFor='Efinalcut'>파이널컷 </label>
              <input
                id='Evegas'
                name='tools'
                onChange={checkboxCheck}
                value='베가스'
                type='checkbox'
              />
              <label htmlFor='Evegas'>베가스</label>
              <input
                id='Epowerdirector'
                name='tools'
                value='파워 디렉터'
                type='checkbox'
                onChange={checkboxCheck}
              />
              <label htmlFor='Epowerdirector'>파워 디렉터</label>
              <input
                id='Yphotoshop'
                name='tools'
                value='포토샵'
                type='checkbox'
                onChange={checkboxCheck}
              />
              <label htmlFor='Yphotoshop'>포토샵</label>
              <input
                id='Yillustrater'
                name='tools'
                value='일러스트'
                type='checkbox'
                onChange={checkboxCheck}
              />
              <label htmlFor='Yillustrater'>일러스트</label>
              <input
                id='Yblender'
                onChange={checkboxCheck}
                name='tools'
                value='블렌더'
                type='checkbox'
              />
              <label htmlFor='Yblender'>블렌더</label>
              <input
                id='Ymaya'
                onChange={checkboxCheck}
                name='tools'
                value='마야'
                type='checkbox'
              />
              <label htmlFor='Ymaya'>마야</label>
            </li>
          </ul>
        </div>
      </div>
      <div className='editor-quill'>
        <div className='editor-infomation'>상세 내용</div>
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

export default EditorRegister;
