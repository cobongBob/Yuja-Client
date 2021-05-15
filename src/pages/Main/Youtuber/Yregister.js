import React, { useCallback, useRef, useState } from 'react';
import './Yregister.scss';
import * as YapiService from '../../../apiService/YapiService';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import QuillRegister from '../../../components/Quill/QuillRegister';

const Yregister = () => {
  const { userData } = useSelector((state) => state.loginReducer);
  const currFileList = useRef([]);
  const addingFileList = useRef([]);
  const [qData, setQData] = useState();

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
        `src="http://localhost:8888/files/YoutuberBoard/`
      ), //업로드된 이미지들은 temp가 아닌 YoutuberBoard에 저장된다.
      thumbnail: '썸네일테스트', //썸네일 서버쪽 만들어지면 변경 필
      boardAttachNames: currFileList.current,
    };
    YapiService.addBoards(sendingData)
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

  const checkedlist = useRef([]);

  const [input, setInput] = useState({
    title: '',
    channelName: '',
    worker: '',
    recruitingNum: 0,
    payType: '',
    payAmount: '',
    career: '',
    ywhen: '',
    expiredDate: '',
    receptionType: '',
    manager: '',
    receptionMethod: '',
    tools: checkedlist.current,
  });

  return (
    <div className='register-container'>
      <div className='register-header'>
        <h1>공고등록</h1>
      </div>
      <div className='register-default-input'>
        <div className='register-title'>
          <input
            id='YregisterWriter'
            name='title'
            onChange={onChange}
            placeholder='제목'
            maxLength='200'
            type='text'
          />
        </div>
        <div className='register-channelname'>
          <input
            placeholder='채널명'
            id='YregisterChannel'
            onChange={onChange}
            name='channelName'
            type='text'
          />
        </div>
        <div className='wanted-part'>
          <div>모집분야</div>
          <input
            id='editor'
            type='radio'
            name='worker'
            value='영상편집'
            onChange={radioCheck}
          />
          <label htmlFor='editor'>편집자</label>
          <input
            type='radio'
            id='thumbnailer'
            name='worker'
            value='썸네일러'
            onChange={radioCheck}
          />
          <label htmlFor='thumbnailer'>썸네일러</label>
          <input
            type='radio'
            id='both'
            onChange={radioCheck}
            name='worker'
            value='영상편집자 + 썸네일러'
          />
          <label htmlFor='both'>편집자+썸네일러</label>
        </div>
        <div className='wanted-career'>
          <div>지원자격</div>
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
          <input
            id='notcareer'
            name='career'
            value='경력무관'
            type='radio'
            onChange={radioCheck}
          />
          <label htmlFor='notcareer'>경력무관</label>
        </div>
        <div className='wanted-number'>
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
        </div>
        <div className='wanted-pay'>
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
          />
          원
        </div>

        <div className='watned-tools'>
          <div>사용기술</div>
          <input
            id='Ypremiere'
            name='ypremiere'
            value='프리미어 프로'
            type='checkbox'
            onChange={checkboxCheck}
          />
          <label htmlFor='Ypremiere'>프리미어 프로</label>
          <input
            id='Yaftereffect'
            name='yaftereffect'
            value='애프터이펙트'
            type='checkbox'
            onChange={checkboxCheck}
          />
          <label htmlFor='Yaftereffect'>애프터이펙트</label>
          <input
            id='Yfinalcut'
            name='yfinalcut'
            value='파이널컷'
            type='checkbox'
            onChange={checkboxCheck}
          />
          <label htmlFor='Yfinalcut'>파이널컷</label>

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
        </div>
        <div className='wanted-deadline'>
          <label htmlFor=''>마감일</label>
          <input
            id='YendDate'
            onChange={onChange}
            name='expiredDate'
            type='date'
          />

          <input
            id='always'
            onChange={radioCheck}
            name='ywhen'
            value='상시모집'
            type='radio'
          />
          <label htmlFor='always'>상시모집</label>

          <input
            id='deadline'
            name='ywhen'
            value='채용시 마감'
            type='radio'
            onChange={radioCheck}
          />
          <label htmlFor='deadline'>채용시 마감</label>
        </div>
        <div>
          <input id='Ycontact' placeholder='연락방법' type='text' />
          이메일 / 온라인 접수 / 직접 방문 / 우편 접수 / 팩스 / 당사 홈페이지
        </div>
        <div>
          <label htmlFor='YregisterService'>담당자:</label>
          <input
            id='YregisterService'
            onChange={onChange}
            name='manager'
            type='text'
          />
          {/* default = 회원 이름 */}
        </div>
      </div>
      <div className='register-add-input'>
        <h2>상세 내용</h2>
        <QuillRegister
          register={testCheking}
          addingFileList={addingFileList}
          qData={qData}
          setQData={setQData}
        />
      </div>
    </div>
  );
};

export default Yregister;
