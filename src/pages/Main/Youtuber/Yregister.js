import { useState } from 'react';
import Editor from '../../../components/Quill/QuillComponents';
import './Yregister.scss';

const NoticeWriteComponent = () => {
  const [desc, setDesc] = useState('');
  function onEditorChange(value) {
    setDesc(value);
  }

  return (
    <div className='YregisterWrapper'>
      <div>
        <h1>공고등록</h1>
      </div>
      <div className='YregisterTitleWrapper'>
        <input id='YregisterWriter' placeholder='제목' type='text' />
      </div>
      <div>
        <input id='YregisterChannel' placeholder='채널명' type='text' />
      </div>
      <div>
        <input id='YregisterWork' placeholder='담당업무' type='text' />
      </div>
      <div>
        <input id='YregisterCount' placeholder='모집인원' type='text' />
      </div>
      <div>
        <input id='YregisterPayAmount' placeholder='최소 급여' type='text' />
        선택박스로 연봉 / 월급 / 건당 / 분당
      </div>
      <div>
        <input id='YregisterService' placeholder='원하는 경력' type='text' />
        상관없음 / 몇년이상(드랍선택박스)
      </div>
      <div>
        <input id='YregisterService' placeholder='편집 가능 툴' type='text' />
        <input id='Ypremiere' type='checkbox' />
        <label htmlFor='Ypremiere'>프리미어 프로</label>
        <input id='Yaftereffect' type='checkbox' />
        <label htmlFor='Yaftereffect'>애프터이펙트</label>
        <input id='Yfinalcut' type='checkbox' />
        <label htmlFor='Yfinalcut'>파이널컷</label>
        <input id='Yvegas' type='checkbox' />
        <label htmlFor='Yvegas'>베가스</label>
        <input id='Ypowerdirector' type='checkbox' />
        <label htmlFor='Ypowerdirector'>파워 디렉터</label>
        <input id='Yphotoshop' type='checkbox' />
        <label htmlFor='Yphotoshop'>포토샵</label>
        <input id='Yillustrater' type='checkbox' />
        <label htmlFor='Yillustrater'>일러스트</label>
        <input id='Yblender' type='checkbox' />
        <label htmlFor='Yblender'>블렌더</label>
        <input id='Ymaya' type='checkbox' />
        <label htmlFor='Ymaya'>마야</label>
      </div>
      <div>
        <input id='YregisterService' placeholder='접수기간' type='text' />
        상시모집 / 채용시 ..?
      </div>
      <div>
        <input id='YregisterService' placeholder='접수방법' type='text' />
        이메일 / 온라인 접수 / 직접 방문 / 우편 접수 / 팩스 / 당사 홈페이지
      </div>
      <div>
        <input id='YregisterService' placeholder='프로필 양식' type='text' />
        포트폴리오 제출?
      </div>
      <div>
        <input id='YregisterService' placeholder='담당자?' type='text' />
        유튜버 or 유튜버 대신 연락 받는? 사람 default = 회원 이름
      </div>
      <Editor value={desc} onChange={onEditorChange} />
    </div>
  );
};

export default NoticeWriteComponent;
