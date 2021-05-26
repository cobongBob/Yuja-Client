import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { getOneEBoard } from '../../../apiService/EditerApiService';
import { ToastCenter } from '../../../modules/ToastModule';
import './EditorRegister.scss';
import * as EditerApiService from '../../../apiService/EditerApiService';
import QuillModify from '../../../components/Quill/QuillModify';
import { previewToYoutubeLink } from '../../../modules/QuillYoutubeConvert';

const EboardModify = ({ match }) => {
  const { userData } = useSelector((state) => state.loginReducer);
  const addingFileList = useRef([]);
  const deletedFileList = useRef([]);
  const [qModiData, setQModiData] = useState();
  const board_type = useRef(match.params.board_type);
  const checkedlist = useRef([]);
  const fileList = useRef([]);
  const history = useHistory();

  const [input, setInput] = useState({
    previewImage: '',
    title: '',
    career: '',
    payType: '',
    payAmount: '',
    tools: checkedlist.current,
  });

  let eHistory = useCallback(
    (board_id) => history.push(`/EDetail/${board_type.current}/${board_id}/1`),
    [history, board_type]
  );

  const onChange = useCallback(
    (e) => {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    },
    [input]
  );

  const radioCheck = useCallback((e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  }, []);

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

  const originalUrl = useRef('');

  useEffect(() => {
    getOneEBoard(match.params.board_id, board_type.current).then((res) => {
      if (!userData || userData.id !== res.data.user.id) {
        ToastCenter('권한이 없습니다.');
        return history.goBack();
      }
      fileList.current = res.data.boardAttachFileNames;
      setQModiData(res.data.content);
      originalUrl.current = res.data.previewImage && res.data.previewImage;
      originalUrl.current = previewToYoutubeLink(originalUrl.current);
      setInput({ ...res.data, previewImage: originalUrl.current });
    });
  }, [userData, history, match.params.board_id]);

  const testCheking = useCallback(() => {
    if (
      !qModiData ||
      !input.title ||
      !input.previewImage ||
      !input.career ||
      !input.payType ||
      !input.payAmount ||
      checkedlist.current.length === 0
    ) {
      return ToastCenter('내용을 모두 적어주세요.');
    }
    let reg = new RegExp(
      `http://localhost:8888/files/${board_type.current}/[0-9]+.[a-z]+`,
      'gi'
    );
    let imgSrcArr = String(qModiData).match(reg); // 불러왔던 글에 존재했던 이미지 태그들의 src
    // 서버에서 날아온 이미지 이름과 비교한다. 없으면 삭제된것이므로 삭제 리스트에 담아준다.
    if (imgSrcArr) {
      fileList.current.forEach((src) => {
        if (
          !imgSrcArr.includes(
            `http://localhost:8888/files/${board_type.current}/${src}`
          )
        ) {
          deletedFileList.current.push(src);
        }
      });
    } else {
      deletedFileList.current = fileList.current;
    }

    const modifyingData = {
      ...input,
      tools: checkedlist.current,
      content: qModiData.replaceAll(
        `src="http://localhost:8888/files/temp/`,
        `src="http://localhost:8888/files/${board_type.current}/`
      ),
      boardAttachIds: addingFileList.current,
      boardAttachToBeDeleted: deletedFileList.current,
    };
    EditerApiService.modifyBoard(
      match.params.board_id,
      modifyingData,
      board_type.current
    ).then((res) => {
      eHistory(res.data.id);
    });
  }, [eHistory, input, match.params.board_id, qModiData]);

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
                onChange={onChange}
                maxLength='45'
                value={input.title || ''}
              />
            </li>
            <li className='li-item2'>
              <input
                type='text'
                placeholder='대표영상의 링크를 적어주세요.'
                value={input.previewImage}
                name='previewImage'
                onChange={onChange}
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
                checked={input.career === '신입'}
              />
              <label htmlFor='newbie'>신입</label>
              <input
                id='career'
                onChange={radioCheck}
                name='career'
                value='경력'
                type='radio'
                checked={input.career === '경력'}
              />
              <label htmlFor='career'>경력</label>
            </li>
            <li className='li-item4'>
              <select name='payType' value={input.payType} onChange={onChange}>
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
                value={input.payAmount || ''}
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
        <div className='editor-infomation'>자기소개</div>
        <div className='editor-quill'>
          <QuillModify
            modify={testCheking}
            addingFileList={addingFileList}
            qModiData={qModiData}
            setQModiData={setQModiData}
            board_type={board_type.current}
          />
        </div>
      </div>
    </div>
  );
};

export default EboardModify;
