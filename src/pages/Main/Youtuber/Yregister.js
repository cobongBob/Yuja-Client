import React, { useCallback, useMemo, useRef, useState } from "react";
import "./Yregister.scss";
import * as YapiService from "../../../apiService/YapiService";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import QuillRegister from "../../../components/Quill/QuillRegister";
import { ToastCenter } from "../../../modules/ToastModule";
import getFormatDate from "../../../modules/getFormatDate";
import { isNotFilled } from "../../../modules/InputFocus";

const Yregister = () => {
  const { userData } = useSelector((state) => state.loginReducer);
  const currFileList = useRef([]);
  const addingFileList = useRef([]);
  const [qData, setQData] = useState();
  const { current: board_type } = useRef("Youtuber");
  const [showDate, setShowDate] = useState(false);

  const history = useHistory();

  const checkedlist = useRef([]);

  const [input, setInput] = useState({
    title: "",
    channelName: "",
    worker: "",
    recruitingNum: 0,
    payType: "",
    payAmount: "",
    career: "",
    ywhen: "",
    expiredDate: "",
    manager: "",
    receptionMethod: "",
    tools: checkedlist.current,
  });

  let Yhistory = useCallback((board_id) => history.push(`/YDetail/${board_id}/1`), [history]);

  const titleRef = useRef();
  const channelNameRef = useRef();
  const recruitingNumRef = useRef();
  const payTypeRef = useRef();
  const payAmountRef = useRef();
  const managerRef = useRef();
  const receptionMethodRef = useRef();
  const workerRef = useRef();

  const refsArray = useMemo(
    () => [
      titleRef,
      channelNameRef,
      recruitingNumRef,
      payTypeRef,
      payAmountRef,
      managerRef,
      receptionMethodRef,
      workerRef,
    ],
    []
  );

  const testCheking = useCallback(() => {
    if (!isNotFilled(input, refsArray)) {
      return ToastCenter("빈칸을 모두 적어주세요.");
    }
    if (
      (input.ywhen === "마감일" && !input.expiredDate) ||
      !input.ywhen ||
      checkedlist.current.length === 0 ||
      !input.career ||
      !input.worker
    ) {
      workerRef.current.focus();
      return ToastCenter("빈칸을 모두 적어주세요.");
    }

    let reg = /https:\/\/api.withyuja.com\/files\/temp\/[0-9]+.[a-z]+/g;
    let imgSrcArr = String(qData).match(reg);
    if (imgSrcArr) {
      addingFileList.current.forEach((src) => {
        if (imgSrcArr.includes(`https://api.withyuja.com/files/temp/${src}`)) {
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
        `src="https://api.withyuja.com/files/temp/`,
        `src="https://api.withyuja.com/files/${board_type}/`
      ), //업로드된 이미지들은 temp가 아닌 Youtuber에 저장된다.
      thumbnail: "썸네일테스트", //썸네일 서버쪽 만들어지면 변경 필
      boardAttachNames: currFileList.current,
    };
    YapiService.addBoards(sendingData).then((res) => {
      Yhistory(res.data.id);
    });
  }, [userData, qData, Yhistory, board_type, input, refsArray]);

  const radioCheck = useCallback((e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
    if (e.target.value === "마감일") {
      setShowDate(true);
    } else {
      setShowDate(false);
      setInput((prevInput) => ({
        ...prevInput,
        expiredDate: "",
      }));
    }
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

  const checkboxCheck = useCallback(
    (e) => {
      // 체크박스가 선택될 경우
      if (e.target.checked) {
        checkedlist.current.push(e.target.value);
      } else {
        // 체크박스의 선택이 해제될 경우
        const index = checkedlist.current.indexOf(e.target.value);
        checkedlist.current.splice(index, 1);
      }
    },
    [checkedlist]
  );

  return (
    <div className='register-container'>
      <div className='register-header'>
        <h1>공고등록</h1>
      </div>
      <ul className='register-default-input'>
        <li className='register-title'>
          <input
            id='YregisterWriter'
            name='title'
            onChange={onChange}
            placeholder='제목'
            maxLength='100'
            ref={titleRef}
            type='text'
          />
        </li>
        <li className='register-channelname'>
          <input
            placeholder='채널명'
            id='YregisterChannel'
            onChange={onChange}
            name='channelName'
            ref={channelNameRef}
            maxLength='50'
            type='text'
          />
        </li>
        <li className='wanted-part'>
          <div>모집분야</div>
          <input id='editor' type='radio' name='worker' ref={workerRef} value='영상편집' onChange={radioCheck} />
          <label htmlFor='editor'>편집자</label>
          <input type='radio' id='thumbnailer' name='worker' value='썸네일러' onChange={radioCheck} />
          <label htmlFor='thumbnailer'>썸네일러</label>
          <input type='radio' id='both' onChange={radioCheck} name='worker' value='편집자+썸네일러' />
          <label htmlFor='both'>편집자+썸네일러</label>
        </li>
        <li className='wanted-career'>
          <div>지원자격</div>
          <input id='newbie' name='career' onChange={radioCheck} value='신입' type='radio' />
          <label htmlFor='newbie'>신입</label>
          <input id='career' onChange={radioCheck} name='career' value='경력' type='radio' />
          <label htmlFor='career'>경력</label>
          <input id='notcareer' name='career' value='경력무관' type='radio' onChange={radioCheck} />
          <label htmlFor='notcareer'>경력무관</label>
        </li>
        <li className='wanted-number'>
          <input
            placeholder='인원수'
            id='recruitingNum'
            onChange={onChange}
            name='recruitingNum'
            ref={recruitingNumRef}
            type='text'
            maxLength='3'
            onInput={({ target }) => {
              target.value = target.value.replace(/[^0-9]/g, "");
              target.value = target.value.replace(/,/g, "");
            }}
          />
          <div> 명 </div>
        </li>
        <li className='wanted-pay'>
          <div>급여</div>
          <select name='payType' ref={payTypeRef} onChange={onChange}>
            <option value=''>선택</option>
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
            ref={payAmountRef}
            type='text'
            maxLength='11'
            onInput={({ target }) => {
              target.value = target.value.replace(/[^0-9]/g, "");
              target.value = target.value.replace(/,/g, "");
              target.value = target.value.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // 정규식을 이용해서 3자리 마다 , 추가
            }}
          />
          원
        </li>
        <li className='watned-tools'>
          <span>사용기술</span>
          <input id='Ypremiere' name='tools' value='프리미어 프로' type='checkbox' onChange={checkboxCheck} />
          <label htmlFor='Ypremiere'>프리미어 프로</label>
          <input id='Yaftereffect' name='tools' value='애프터이펙트' type='checkbox' onChange={checkboxCheck} />
          <label htmlFor='Yaftereffect'>애프터이펙트</label>
          <input id='Yfinalcut' name='tools' value='파이널컷' type='checkbox' onChange={checkboxCheck} />
          <label htmlFor='Yfinalcut'>파이널컷</label>
          <input id='Yvegas' name='tools' onChange={checkboxCheck} value='베가스' type='checkbox' />
          <label htmlFor='Yvegas'>베가스</label>
          <input id='Ypowerdirector' name='tools' value='파워 디렉터' type='checkbox' onChange={checkboxCheck} />
          <label htmlFor='Ypowerdirector'>파워 디렉터</label>
          <input id='Yphotoshop' name='tools' value='포토샵' type='checkbox' onChange={checkboxCheck} />
          <label htmlFor='Yphotoshop'>포토샵</label>
          <input id='Yillustrater' name='tools' value='일러스트' type='checkbox' onChange={checkboxCheck} />
          <label htmlFor='Yillustrater'>일러스트</label>
          <input id='Yblender' onChange={checkboxCheck} name='tools' value='블렌더' type='checkbox' />
          <label htmlFor='Yblender'>블렌더</label>
          <input id='Ymaya' onChange={checkboxCheck} name='tools' value='마야' type='checkbox' />
          <label htmlFor='Ymaya'>마야</label>
        </li>
        <li className='wanted-deadline'>
          <div>마감일</div>
          <input id='always' onChange={radioCheck} name='ywhen' value='상시모집' type='radio' />
          <label htmlFor='always'>상시모집</label>
          <input id='deadline' name='ywhen' value='채용시 마감' type='radio' onChange={radioCheck} />
          <label htmlFor='deadline'>채용시 마감</label>
          <input id='date' onChange={radioCheck} name='ywhen' value='마감일' type='radio' />
          <label htmlFor='date'>마감일</label>
          {showDate && (
            <input id='YendDate' onChange={onChange} name='expiredDate' type='date' min={getFormatDate(new Date())} />
          )}
        </li>
        <li className='wanted-manager'>
          <input
            id='YregisterService'
            onChange={onChange}
            name='manager'
            ref={managerRef}
            type='text'
            placeholder='담당자'
            maxLength='30'
          />
          {/* default = 회원 이름 */}
        </li>
        <li className='wanted-way'>
          <input
            id='YreceptionMethod'
            onChange={onChange}
            placeholder='담당자 연락처'
            maxLength='50'
            name='receptionMethod'
            ref={receptionMethodRef}
            type='text'
          />
        </li>
      </ul>
      <div className='register-add-input'>
        <h2>상세 내용</h2>
        <QuillRegister
          register={testCheking}
          addingFileList={addingFileList}
          qData={qData}
          setQData={setQData}
          board_type={board_type}
        />
      </div>
    </div>
  );
};

export default Yregister;
