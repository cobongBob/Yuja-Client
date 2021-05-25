import React, { useCallback, useEffect, useRef, useState } from 'react';
import './Yregister.scss';
import * as YapiService from '../../../apiService/YapiService';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import QuillModify from '../../../components/Quill/QuillModify';
import { ToastCenter } from '../../../modules/ToastModule';

const YmodifyTest = (props) => {
  const { userData } = useSelector((state) => state.loginReducer);
  const addingFileList = useRef([]);
  const deletedFileList = useRef([]);
  const [qModiData, setQModiData] = useState();
  const fileList = useRef([]);
  const checkedlist = useRef([]);
  const current_page = useRef(props.match.params.current_page);
  const history = useHistory();
  let Yhistory = useCallback(
    (board_id) => history.push(`/Ydetail/${board_id}/${current_page.current}`),
    [history]
  );

  const checkboxCheck = (e) => {
    if (e.target.checked) {
      checkedlist.current.push(e.target.value);
    } else {
      const index = checkedlist.current.indexOf(e.target.value);
      checkedlist.current.splice(index, 1);
    }
  };

  const radioCheck = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const onChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const [input, setInput] = useState({
    title: '',
    channelName: '',
    worker: '',
    recruitingNum: '',
    payType: '',
    payAmount: '',
    career: '',
    ywhen: '',
    expiredDate: '',
    manager: '',
    receptionMethod: '',
  });

  useEffect(() => {
    YapiService.fetchBoard(props.match.params.board_id).then((res) => {
      if (!userData || userData.id !== res.data.user.id) {
        ToastCenter('권한이 없습니다.');
        return history.goBack();
      }
      fileList.current = res.data.boardAttachFileNames;
      setQModiData(res.data.content);
      setInput(res.data);
    });
  }, [userData]); // eslint-disable-line react-hooks/exhaustive-deps

  const testCheking = () => {
    if (!qModiData || !input.title) {
      return ToastCenter('제목과 내용을 입력해주세요');
    }
    let currentBoardType = 'YoutuberBoard/';
    let reg = /http:\/\/localhost:8888\/files\/Youtuber\/[0-9]+.[a-z]+/g;
    let imgSrcArr = String(qModiData).match(reg); // 불러왔던 글에 존재했던 이미지 태그들의 src
    // 서버에서 날아온 이미지 이름과 비교한다. 없으면 삭제된것이므로 삭제 리스트에 담아준다.
    if (imgSrcArr) {
      fileList.current.forEach((src) => {
        if (
          !imgSrcArr.includes(
            `http://localhost:8888/files/${currentBoardType}${src}`
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
        `src="http://localhost:8888/files/Youtuber/`
      ),
      thumbnail: '썸네일 수정 테스트',
      boardAttachIds: addingFileList.current,
      boardAttachToBeDeleted: deletedFileList.current,
    };
    YapiService.modifyBoard(props.match.params.board_id, modifyingData).then(
      (res) => {
        Yhistory(res.data.id);
      }
    );
  };

  return (
    <div className='register-container'>
      <div className='register-header'>
        <h1>공고수정</h1>
      </div>
      <ul className='register-default-input'>
        <li className='register-title'>
          <input
            id='YregisterWriter'
            name='title'
            onChange={onChange}
            placeholder='제목'
            maxLength='45'
            type='text'
            value={input.title || ''}
          />
        </li>
        <li className='register-channelname'>
          <input
            placeholder='채널명'
            id='YregisterChannel'
            onChange={onChange}
            name='channelName'
            type='text'
            value={input.channelName || ''}
          />
        </li>
        <li className='wanted-part'>
          <div>모집분야</div>
          <input
            id='editor'
            type='radio'
            name='worker'
            value='영상편집'
            onChange={radioCheck}
            checked={input.worker === '영상편집'}
          />
          <label htmlFor='editor'>편집자</label>
          <input
            type='radio'
            id='thumbnailer'
            name='worker'
            value='썸네일러'
            onChange={radioCheck}
            checked={input.worker === '썸네일러'}
          />
          <label htmlFor='thumbnailer'>썸네일러</label>
          <input
            type='radio'
            id='both'
            onChange={radioCheck}
            name='worker'
            value='편집자+썸네일러'
            checked={input.worker === '편집자+썸네일러'}
          />
          <label htmlFor='both'>편집자+썸네일러</label>
        </li>
        <li className='wanted-career'>
          <div>지원자격</div>
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
          <input
            id='notcareer'
            name='career'
            value='경력무관'
            type='radio'
            onChange={radioCheck}
            checked={input.career === '경력무관'}
          />
          <label htmlFor='notcareer'>경력무관</label>
        </li>
        <li className='wanted-number'>
          <input
            placeholder='인원수'
            id='recruitingNum'
            onChange={onChange}
            name='recruitingNum'
            type='text'
            maxLength='3'
            onInput={({ target }) => {
              target.value = target.value.replace(/[^0-9]/g, '');
              target.value = target.value.replace(/,/g, '');
            }}
          />
          <div> 명 </div>
        </li>
        <li className='wanted-pay'>
          <div>급여</div>
          <select name='payType' onChange={onChange}>
            <option>선택</option>
            <option value='연봉'>연봉</option>
            <option value='월급'>월급</option>
            <option value='주급'>주급</option>
            <option value='건당'>건당</option>
            <option value='분당'>분당</option>
          </select>
          <input
            id='payAmount'
            onChange={onChange}
            name='payAmount'
            type='text'
            maxLength='11'
            onInput={({ target }) => {
              target.value = target.value.replace(/[^0-9]/g, '');
              target.value = target.value.replace(/,/g, '');
              target.value = target.value.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // 정규식을 이용해서 3자리 마다 , 추가
            }}
            value={input.payAmount || ''}
          />
          원
        </li>
        <li className='watned-tools'>
          <span>사용기술</span>
          <input
            id='Ypremiere'
            name='ypremiere'
            value='프리미어 프로'
            type='checkbox'
            onChange={checkboxCheck}
          />
          <label htmlFor='Ypremiere'>프리미어 프로 </label>
          <input
            id='Yaftereffect'
            name='yaftereffect'
            value='애프터이펙트'
            type='checkbox'
            onChange={checkboxCheck}
          />
          <label htmlFor='Yaftereffect'>애프터이펙트 </label>
          <input
            id='Yfinalcut'
            name='yfinalcut'
            value='파이널컷'
            type='checkbox'
            onChange={checkboxCheck}
          />
          <label htmlFor='Yfinalcut'>파이널컷 </label>
          <input
            id='Yvegas'
            name='yvegas'
            onChange={checkboxCheck}
            value='베가스'
            type='checkbox'
          />
          <label htmlFor='Yvegas'>베가스</label>
          <input
            id='Ypowerdirector'
            name='ypowerdirector'
            value='파워 디렉터'
            type='checkbox'
            onChange={checkboxCheck}
          />
          <label htmlFor='Ypowerdirector'>파워 디렉터</label>
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
        <li className='wanted-deadline'>
          <div>마감일</div>
          <input
            id='YendDate'
            onChange={onChange}
            name='expiredDate'
            type='date'
            value={
              input && input.expiredDate
                ? input.expiredDate.substr(0, 10)
                : null
            }
          />
          <input
            id='always'
            onChange={radioCheck}
            name='ywhen'
            value='상시모집'
            type='radio'
            checked={input.ywhen === '상시모집'}
          />
          <label htmlFor='always'>상시모집</label>
          <input
            id='deadline'
            name='ywhen'
            value='채용시 마감'
            type='radio'
            onChange={radioCheck}
            checked={input.ywhen === '채용시 마감'}
          />
          <label htmlFor='deadline'>채용시 마감</label>
        </li>
        <li className='wanted-manager'>
          <input
            id='YregisterService'
            onChange={onChange}
            name='manager'
            type='text'
            placeholder='담당자'
            value={input.manager || ''}
          />
        </li>
        <li className='wanted-way'>
          <input
            id='YreceptionMethod'
            name='receptionMethod'
            placeholder='담당자 연락처'
            onChange={onChange}
            type='text'
            value={input.receptionMethod || ''}
          />
        </li>
      </ul>
      <div className='register-add-input'>
        <h2>상세 내용</h2>
        <QuillModify
          modify={testCheking}
          addingFileList={addingFileList}
          qModiData={qModiData}
          setQModiData={setQModiData}
          board_type='Youtuber'
        />
      </div>
    </div>
  );
};

export default YmodifyTest;
