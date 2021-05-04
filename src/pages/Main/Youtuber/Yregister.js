import { useCallback, useRef, useState } from 'react';
import Editor from '../../../components/Quill/QuillComponents';
import './Yregister.scss';

const NoticeWriteComponent = () => {
  const checkedlist = useRef([]);

  const [input, setInput] = useState({
    title: '',
    channelname: '',
    worker: '',
    workercount: '',
    careervalue: '',
    ywhen: '',
    tools: checkedlist.current,
  });

  const onChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const radioCheck = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
    console.log(input);
  };

  const checkboxCheck = (e) => {
    const { name, value, checked } = e.target;
    if (e.target.checked) {
      checkedlist.current.push(e.target.value);
    } else {
      const index = checkedlist.current.indexOf(e.target.value);
      console.log(index);
      checkedlist.current.splice(index, 1);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    fetch('', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf8',
      },
      body: JSON.stringify(input),
    })
      .then()
      .then();
  };

  const [desc, setDesc] = useState('');
  function onEditorChange(value) {
    setDesc(value);
  }

  return (
    <div className='YregisterWrapper'>
      <div className='YregisterHeader'>
        <h1>공고등록</h1>
      </div>
      <div className='YregisterTitleWrapper'>
        <input
          id='YregisterWriter'
          name='title'
          onChange={onChange}
          placeholder='제목'
          maxLength='200'
          type='text'
        />
      </div>
      <div>
        <label htmlFor='YregisterChannel'>채널명:</label>
        <input
          id='YregisterChannel'
          onChange={onChange}
          name='channelname'
          type='text'
        />
      </div>
      <div>
        <label htmlFor=''>모집분야:</label>

        <input
          id='editor'
          type='radio'
          name='worker'
          value='editor'
          onChange={radioCheck}
        />
        <label htmlFor='editor'>영상편집</label>

        <input
          type='radio'
          id='thumbnailer'
          name='worker'
          value='thumbnailer'
          onChange={radioCheck}
        />
        <label htmlFor='thumbnailer'>썸네일러</label>

        <input
          type='radio'
          id='both'
          onChange={radioCheck}
          name='worker'
          value='both'
        />
        <label htmlFor='both'>모두</label>
      </div>

      <div>
        <label htmlFor='workercount'>
          인원수:
          <input
            id='workercount'
            onChange={onChange}
            name='workercount'
            type='text'
            maxLength='3'
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
          />
          명
        </label>
      </div>

      <div>
        <input
          id='newbie'
          name='careervalue'
          onChange={radioCheck}
          value='newbie'
          type='radio'
        />
        <label htmlFor='newbie'>신입</label>

        <input
          id='career'
          onChange={radioCheck}
          name='careervalue'
          value='career'
          type='radio'
        />
        <label htmlFor='career'>경력</label>

        <input
          id='notcareer'
          name='careervalue'
          value='notcareer'
          type='radio'
          onChange={radioCheck}
        />
        <label htmlFor='notcareer'>경력무관</label>
      </div>

      {/* <div>
        <label htmlFor=''>급여:</label>
        <select>
          <option>선택</option>
          <option>연봉</option>
          <option>월급</option>
          <option>주급</option>
          <option>건당</option>
          <option>분당</option>
        </select>
        <input id='YregisterPayAmount' type='text' />원
      </div> */}

      <div>
        <label htmlFor=''>편집 가능 툴:</label>
        <input
          id='Ypremiere'
          name='ypremiere'
          value='ypremiere'
          type='checkbox'
          onChange={checkboxCheck}
        />
        <label htmlFor='Ypremiere'>프리미어 프로</label>

        <input
          id='Yaftereffect'
          name='yaftereffect'
          value='yaftereffect'
          type='checkbox'
          onChange={checkboxCheck}
        />
        <label htmlFor='Yaftereffect'>애프터이펙트</label>

        <input
          id='Yfinalcut'
          name='yfinalcut'
          value='yfinalcut'
          type='checkbox'
          onChange={checkboxCheck}
        />
        <label htmlFor='Yfinalcut'>파이널컷</label>

        <input
          id='Yvegas'
          name='yvegas'
          onChange={checkboxCheck}
          value='yvegas'
          type='checkbox'
        />
        <label htmlFor='Yvegas'>베가스</label>

        <input
          id='Ypowerdirector'
          name='ypowerdirector'
          value='ypowerdirector'
          type='checkbox'
          onChange={checkboxCheck}
        />
        <label htmlFor='Ypowerdirector'>파워 디렉터</label>

        <input
          id='Yphotoshop'
          name='yphotoshop'
          value='yphotoshop'
          type='checkbox'
          onChange={checkboxCheck}
        />
        <label htmlFor='Yphotoshop'>포토샵</label>

        <input
          id='Yillustrater'
          name='yillustrater'
          value='yillustrater'
          type='checkbox'
          onChange={checkboxCheck}
        />
        <label htmlFor='Yillustrater'>일러스트</label>

        <input
          id='Yblender'
          onChange={checkboxCheck}
          name='yblender'
          value='yblender'
          type='checkbox'
        />
        <label htmlFor='Yblender'>블렌더</label>

        <input
          id='Ymaya'
          onChange={checkboxCheck}
          name='ymaya'
          value='ymaya'
          type='checkbox'
        />
        <label htmlFor='Ymaya'>마야</label>
      </div>
      <div>
        <label htmlFor=''>마감일:</label>
        <input id='YendDate' onChange={onChange} name='yenddate' type='date' />

        <input
          id='always'
          onChange={radioCheck}
          name='ywhen'
          value='always'
          type='radio'
        />
        <label htmlFor='always'>상시모집</label>

        <input
          id='deadline'
          name='ywhen'
          value='deadline'
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
      <br />
      <h2>상세 내용</h2>
      <button
        onClick={() => {
          console.log(input);
          console.log(checkedlist);
        }}>
        테스트 버튼
      </button>
      <Editor value={desc} onChange={onEditorChange} />
    </div>
  );
};

export default NoticeWriteComponent;
