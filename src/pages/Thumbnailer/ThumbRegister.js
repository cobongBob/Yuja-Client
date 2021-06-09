import React, { useCallback, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import QuillRegister from "../../components/Quill/QuillRegister";
import * as EditerApiService from "../../apiService/EditerApiService";
import "../Editor/EditorRegister.scss";
import { ToastCenter } from "../../modules/ToastModule";
import "./ThumbRegister.scss";
import defaultImg from "./Thumdefault.png";
import { isNotFilled } from "../../modules/InputFocus";

const ThumbRegister = ({ match }) => {
  const { userData } = useSelector((state) => state.loginReducer);
  const currFileList = useRef([]);
  const addingFileList = useRef([]);
  const [qData, setQData] = useState();
  const board_type = useRef(match.params.board_type);
  const history = useHistory();
  const ThumbId = useRef(0);
  const [fileUrl, setFileUrl] = useState(defaultImg);
  let ThHistory = useCallback(
    (board_id) => history.push(`/ThumbDetail/${board_type.current}/${board_id}/1`),
    [history]
  );

  const checkedlist = useRef([]);
  const [totalCareer, setTotalCareer] = useState("");
  const [inputData, setInputData] = useState({
    title: "",
    payType: "",
    payAmount: "",
    career: "",
    receptionMethod: "",
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

  const titleRef = useRef();
  const payTypeRef = useRef();
  const payAmountRef = useRef();
  const receptionMethodRef = useRef();
  const workerRef = useRef();
  const careerYearRef = useRef();

  const refsArray = useMemo(
    () => [titleRef, null, null, payTypeRef, payAmountRef, null, receptionMethodRef, workerRef],
    []
  );

  const testCheking = useCallback(() => {
    if (!inputData.title.trim()) {
      titleRef.current.focus();
      return ToastCenter("빈칸을 모두 적어주세요.");
    }
    if (!isNotFilled(inputData, refsArray)) {
      return ToastCenter("빈칸을 모두 적어주세요.");
    }
    if (checkedlist.current.length === 0 || !inputData.career) {
      workerRef.current.focus();
      return ToastCenter("빈칸을 모두 적어주세요.");
    }
    if (inputData.career === "경력" && totalCareer.length < 3) {
      careerYearRef.current.focus();
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
      ...inputData,
      career: inputData.career + totalCareer,
      userId: userData.id, //글쓰고있는 사람의 아이디로 변경요망
      content: qData.replaceAll(
        `src="https://api.withyuja.com/files/temp/`,
        `src="https://api.withyuja.com/files/${board_type.current}/`
      ), //업로드된 이미지들은 temp가 아닌 Editor에 저장된다.
      thumbnailId: ThumbId.current, //?? 넘어온 번호..
      boardAttachNames: currFileList.current,
    };
    EditerApiService.addBoards(sendingData, board_type.current).then((res) => {
      ThHistory(res.data.id);
    });
  }, [userData, qData, ThHistory, inputData, refsArray, totalCareer]);

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
    setInputData((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  }, []);

  const handleImg = useCallback((e) => {
    let file = e.target.files[0];
    if (!file) {
      return;
    }

    const acceptType = ["image/png", "image/jpeg", "image/gif", "image/jpg"];
    if (!acceptType.includes(file.type)) {
      return ToastCenter("jpg, jpeg, png 만 가능합니다.");
    }
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    if (e.target.files !== null) {
      const formData = new FormData();
      formData.append("file", file);
      EditerApiService.addThumb(formData, config).then((response) => {
        setFileUrl(`https://api.withyuja.com/files/temp/${response.data.fileName}`);
        ThumbId.current = response.data.thumbnailId;
      });
    }
  }, []);

  const onChange = useCallback(
    (e) => {
      setInputData({
        ...inputData,
        [e.target.name]: e.target.value,
      });
    },
    [inputData]
  );

  const careerYear = useCallback((e) => {
    setTotalCareer(" " + e.target.value + "년");
  }, []);

  const contactCheck = useCallback((e) => {
    e.target.value = e.target.value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
  }, []);

  return (
    <div className='thumbRegisterFrag'>
      <div className='register-container'>
        <div className='thumb-register-header'>
          <h1>포트폴리오 등록</h1>
        </div>
        <div className='thumb-register-default-input'>
          <ul className='leftUl'>
            <li className='li-item2'>
              <img className='preview_Thubnail' src={fileUrl} alt='' /> <br />
              <input
                className='thumb-PicInput'
                id='thumb-PicInput'
                type='file'
                accept='image/jpeg, image/jpg, image/png'
                placeholder='이 이미지는 포트폴리오 썸네일로 사용 됩니다.'
                onChange={handleImg}
              />
            </li>
            <div className='editor_li_Title_Title'>제목</div>
            <li className='li-item1'>
              <input
                type='text'
                placeholder='제목'
                name='title'
                id='first-link'
                onChange={inputHandler}
                maxLength='45'
                ref={titleRef}
              />
            </li>
            <li className='li-item1'>
              <div className='editor_li_Title_ReceptionMethod'>연락처</div>
              <input
                id='YreceptionMethod'
                onChange={onChange}
                placeholder='연락처'
                maxLength='50'
                name='receptionMethod'
                type='text'
                ref={receptionMethodRef}
              />
            </li>
          </ul>
          <ul className='rightUl'>
            <li className='li-item3'>
              <div className='careerTitle'>경력사항</div>
              <input ref={workerRef} id='newbie' name='career' onChange={radioCheck} value='신입' type='radio' />
              <label htmlFor='newbie'>신입</label>
              <input id='career' onChange={radioCheck} name='career' value='경력' type='radio' />
              <label htmlFor='career'>경력</label>
              {inputData.career === "경력" ? (
                <div className='careerTimeBox'>
                  <input
                    id='thumbCareerYear'
                    name='thumbCareerYear'
                    type='text'
                    maxLength='2'
                    onChange={careerYear}
                    onInput={contactCheck}
                    ref={careerYearRef}
                  />
                  년
                </div>
              ) : (
                ""
              )}
            </li>
            <li className='li-item4'>
              <select name='payType' ref={payTypeRef} onChange={onChange}>
                <option value=''>선택</option>
                <option value='연봉'>연봉</option>
                <option value='월급'>월급</option>
                <option value='주급'>주급</option>
                <option value='건당'>건당</option>
              </select>
              <input
                type='text'
                placeholder='희망급여'
                name='payAmount'
                onChange={inputHandler}
                maxLength={12}
                onInput={({ target }) => {
                  target.value = target.value.replace(/[^0-9]/g, "");
                  target.value = target.value.replace(/,/g, "");
                  target.value = target.value.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // 정규식을 이용해서 3자리 마다 , 추가
                }}
                ref={payAmountRef}
              />
            </li>
            <div className='thumbSpanBox'>
              <span className='thumbSpan'>사용기술</span>
            </div>
            <li className='li-item5'>
              <input id='Epremiere' name='tools' value='프리미어 프로' type='checkbox' onChange={checkboxCheck} />
              <label htmlFor='Epremiere'>프리미어 프로 </label>
              <input id='Eaftereffect' name='tools' value='애프터이펙트' type='checkbox' onChange={checkboxCheck} />
              <label htmlFor='Eaftereffect'>애프터이펙트 </label>
              <input id='Efinalcut' name='tools' value='파이널컷' type='checkbox' onChange={checkboxCheck} />
              <label htmlFor='Efinalcut'>파이널컷 </label>
              <input id='Evegas' name='tools' onChange={checkboxCheck} value='베가스' type='checkbox' />
              <label htmlFor='Evegas'>베가스</label>
              <input id='Epowerdirector' name='tools' value='파워 디렉터' type='checkbox' onChange={checkboxCheck} />
              <label htmlFor='Epowerdirector'>파워 디렉터</label>
              <input id='Yphotoshop' name='tools' value='포토샵' type='checkbox' onChange={checkboxCheck} />
              <label htmlFor='Yphotoshop'>포토샵</label>
              <input id='Yillustrater' name='tools' value='일러스트' type='checkbox' onChange={checkboxCheck} />
              <label htmlFor='Yillustrater'>일러스트</label>
              <input id='Yblender' onChange={checkboxCheck} name='tools' value='블렌더' type='checkbox' />
              <label htmlFor='Yblender'>블렌더</label>
              <input id='Ymaya' onChange={checkboxCheck} name='tools' value='마야' type='checkbox' />
              <label htmlFor='Ymaya'>마야</label>
            </li>
          </ul>
        </div>
        <div className='thumb-quill'>
          <div className='thumb-infomation'>상세 내용</div>
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
