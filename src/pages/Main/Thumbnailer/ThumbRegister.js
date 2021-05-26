import React, { useCallback, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import QuillRegister from '../../../components/Quill/QuillRegister';
import * as EditerApiService from '../../../apiService/EditerApiService';
import '../Editer/EditorRegister.scss';
import { ToastCenter } from '../../../modules/ToastModule';
import './ThumbRegister.scss';

const ThumbRegister = ({ match }) => {
  const { userData } = useSelector((state) => state.loginReducer);
  const currFileList = useRef([]);
  const addingFileList = useRef([]);
  const [qData, setQData] = useState();
  const board_type = useRef(match.params.board_type);
  const history = useHistory();
  const ThumbId = useRef(0);
  const [fileUrl, setFileUrl] = useState('');
  let ThHistory = useCallback(
    (board_id) =>
      history.push(`/ThumbDetail/${board_type.current}/${board_id}/1`),
    [history]
  );

  const checkedlist = useRef([]);

  const [inputData, setInputData] = useState({
    title: '',
    payType: '',
    payAmount: '',
    career: '',
    tools: checkedlist.current,
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

  const testCheking = useCallback(() => {
    if (
      !qData ||
      !inputData.title ||
      !inputData.payType ||
      !inputData.payAmount ||
      !inputData.career ||
      !inputData.tools
    ) {
      return ToastCenter('내용을 모두 입력해주세요.');
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
      userId: userData.id, //글쓰고있는 사람의 아이디로 변경요망
      content: qData.replaceAll(
        `src="http://localhost:8888/files/temp/`,
        `src="http://localhost:8888/files/${board_type.current}/`
      ), //업로드된 이미지들은 temp가 아닌 Editor에 저장된다.
      thumbnailId: ThumbId.current, //?? 넘어온 번호..
      boardAttachNames: currFileList.current,
    };
    EditerApiService.addBoards(sendingData, board_type.current).then((res) => {
      ThHistory(res.data.id);
    });
  }, [userData, qData, ThHistory, inputData]);

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

  const radioCheck = useCallback(
    (e) => {
      const { name, value } = e.target;
      setInputData((prevInput) => ({
        ...prevInput,
        [name]: value,
      }));
    },
    [inputData]
  );

  const handleImg = (e) => {
    let file = e.target.files[0];
    if (!file) {
      return;
    }

    const acceptType = ['image/png', 'image/jpeg', 'image/gif', 'image/jpg'];
    if (!acceptType.includes(file.type)) {
      return ToastCenter('jpg, jpeg, png 만 가능합니다.');
    }
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    if (e.target.files !== null) {
      const formData = new FormData();
      formData.append('file', file);
      EditerApiService.addThumb(formData, config).then((response) => {
        setFileUrl(
          `http://localhost:8888/files/temp/${response.data.fileName}`
        );
        ThumbId.current = response.data.thumbnailId;
      });
    }
  };

  const onChange = useCallback(
    (e) => {
      setInputData({
        ...inputData,
        [e.target.name]: e.target.value,
      });
    },
    [inputData]
  );

  return (
    <div>
      <div className='register-container'>
        <div className='thumb-register-header'>
          <h1>이력서 등록</h1>
        </div>
        <div className='thumb-register-default-input'>
          <ul>
            <li className='li-item1'>
              <input
                type='text'
                placeholder='제목'
                name='title'
                id='first-link'
                onChange={inputHandler}
                maxLength='45'
              />
            </li>

            <li className='li-item2'>
              <img className='preview_Thubnail' src={fileUrl} alt='' /> <br />
              <input
                className='thumb-PicInput'
                id='thumb-PicInput'
                type='file'
                accept='image/jpeg, image/jpg, image/png'
                onChange={handleImg}
              />
            </li>
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
                onChange={inputHandler}
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
            <li className='li-item5'>
              <span>사용기술</span>
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
              <input
                id='Yphotoshop'
                name='yphotoshop'
                value='포토샵'
                type='checkbox'
                onChange={checkboxCheck}
              />
              <label htmlFor='Yphotoshop'>포토샵</label>
              <input
                id='Yillustrater'
                name='yillustrater'
                value='일러스트'
                type='checkbox'
                onChange={checkboxCheck}
              />
              <label htmlFor='Yillustrater'>일러스트</label>
              <input
                id='Yblender'
                onChange={checkboxCheck}
                name='yblender'
                value='블렌더'
                type='checkbox'
              />
              <label htmlFor='Yblender'>블렌더</label>
              <input
                id='Ymaya'
                onChange={checkboxCheck}
                name='ymaya'
                value='마야'
                type='checkbox'
              />
              <label htmlFor='Ymaya'>마야</label>
            </li>
          </ul>
        </div>
        <div className='thumb-infomation'>자기소개</div>
        <div className='thumb-quill'>
          <QuillRegister
            register={testCheking}
            addingFileList={addingFileList}
            qData={qData}
            setQData={setQData}
            board_type={board_type.current}
          />
        </div>
      </div>
    </div>
  );
};

export default ThumbRegister;
