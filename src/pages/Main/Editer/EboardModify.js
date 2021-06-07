import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getOneEBoard } from "../../../apiService/EditerApiService";
import { ToastCenter } from "../../../modules/ToastModule";
import "./EditorRegister.scss";
import * as EditerApiService from "../../../apiService/EditerApiService";
import QuillModify from "../../../components/Quill/QuillModify";
import { previewToYoutubeLink } from "../../../modules/QuillYoutubeConvert";
import { checkBoxConvert } from "../../../modules/CheckBoxConvert";
import { isNotFilled } from "../../../modules/InputFocus";

const EboardModify = ({ match }) => {
  const { userData } = useSelector((state) => state.loginReducer);
  const addingFileList = useRef([]);
  const deletedFileList = useRef([]);
  const [qModiData, setQModiData] = useState();
  const board_type = useRef(match.params.board_type);
  const checkedlist = useRef([]);
  const fileList = useRef([]);
  const history = useHistory();

  const [combine, setCombine] = useState({
    combine: 0,
  });

  const [input, setInput] = useState({
    previewImage: "",
    title: "",
    career: "",
    payType: "",
    payAmount: "",
    receptionMethod: "",
    tools: checkedlist.current,
  });

  const [checkBoxInput, setcheckBoxInput] = useState({
    premiere: false,
    aftereffect: false,
    finalcut: false,
    vegas: false,
    powerdirector: false,
    photoshop: false,
    illustrater: false,
    blender: false,
    maya: false,
  });

  let eHistory = useCallback(
    (board_id) => history.push(`/EDetail/${board_type.current}/${board_id}/1`),
    [history, board_type]
  );

  const originalUrl = useRef("");

  useEffect(() => {
    getOneEBoard(match.params.board_id, board_type.current).then((res) => {
      if (!userData || userData.id !== res.data.user.id) {
        ToastCenter("권한이 없습니다.");
        return history.goBack();
      }
      fileList.current = res.data.boardAttachFileNames;
      setQModiData(res.data.content);
      originalUrl.current = res.data.previewImage && res.data.previewImage;
      originalUrl.current = previewToYoutubeLink(originalUrl.current);
      setInput({
        career: res.data.career,
        payAmount: res.data.payAmount,
        payType: res.data.payType,
        previewImage: originalUrl.current,
        receptionMethod: res.data.receptionMethod,
        title: res.data.title,
        tools: res.data.tools,
      });
      setcheckBoxInput(checkBoxConvert(res.data.tools));
      checkedlist.current = res.data.tools;
      setCombine({combine:res.data.career.substr(3,res.data.career.length-4)})
    });
  }, [userData, history, match.params.board_id]);

  const titleRef = useRef();
  const payTypeRef = useRef();
  const payAmountRef = useRef();
  const receptionMethodRef = useRef();
  const workerRef = useRef();

  const refsArray = useMemo(
    () => [titleRef, null, null, payTypeRef, payAmountRef, null, receptionMethodRef, workerRef],
    []
  );

  const testCheking = useCallback(
    (e) => {
      if (!input.title.trim()) {
        titleRef.current.focus();
        return ToastCenter("빈칸을 모두 적어주세요.");
      }
      if (!isNotFilled(input, refsArray)) {
        return ToastCenter("빈칸을 모두 적어주세요.");
      }
      if (checkedlist.current.length === 0 || !input.career) {
        workerRef.current.focus();
        return ToastCenter("빈칸을 모두 적어주세요.");
      } else {
        let reg = new RegExp(`https://api.withyuja.com/files/${board_type.current}/[0-9]+.[a-z]+`, "gi");
        let imgSrcArr = String(qModiData).match(reg); // 불러왔던 글에 존재했던 이미지 태그들의 src
        // 서버에서 날아온 이미지 이름과 비교한다. 없으면 삭제된것이므로 삭제 리스트에 담아준다.
        if (imgSrcArr) {
          fileList.current.forEach((src) => {
            if (!imgSrcArr.includes(`https://api.withyuja.com/files/${board_type.current}/${src}`)) {
              deletedFileList.current.push(src);
            }
          });
        } else {
          deletedFileList.current = fileList.current;
        }

        if (input.career !== "신입" && input.career.includes([0 - 9]) === false) {
          const modifyingData = {
            ...input,
            career: "경력 " + combine.combine + "년",
            tools: checkedlist.current,
            content: qModiData.replaceAll(
              `src="https://api.withyuja.com/files/temp/`,
              `src="https://api.withyuja.com/files/${board_type.current}/`
            ),
            boardAttachIds: addingFileList.current,
            boardAttachToBeDeleted: deletedFileList.current,
          };
          EditerApiService.modifyBoard(match.params.board_id, modifyingData, board_type.current).then((res) => {
            eHistory(res.data.id);
          });
        } else {
          const regex2 = /[0-9]/g;
          const modifyingData = {
            ...input,
            career: input.career.replaceAll(regex2, combine.combine),
            tools: checkedlist.current,
            content: qModiData.replaceAll(
              `src="https://api.withyuja.com/files/temp/`,
              `src="https://api.withyuja.com/files/${board_type.current}/`
            ),
            boardAttachIds: addingFileList.current,
            boardAttachToBeDeleted: deletedFileList.current,
          };
          EditerApiService.modifyBoard(match.params.board_id, modifyingData, board_type.current).then((res) => {
            eHistory(res.data.id);
          });
        }
      }
    },
    [eHistory, input, match.params.board_id, qModiData, refsArray, combine]
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
      setcheckBoxInput({
        ...checkBoxInput,
        [e.target.name]: e.target.checked,
      });
      if (e.target.checked) {
        checkedlist.current.push(e.target.value);
      } else {
        const index = checkedlist.current.indexOf(e.target.value);
        checkedlist.current.splice(index, 1);
      }
    },
    [checkedlist, checkBoxInput]
  );

  const [editorLinkDesc, setEditorLinkDesc] = useState("");

  const editorLinkCheck = useCallback((e) => {
    let checkContent = e.target.value;
    if (checkContent !== "" && checkContent.startsWith("https://www.youtube.com/watch?v=")) {
      setEditorLinkDesc("");
    } else {
      setEditorLinkDesc("유튜브 링크는 'https://www.youtube.com/watch?v=고유주소' 의 형식이여야 합니다.");
    }
  }, []);

  const careerYear = useCallback(
    (e) => {
      setCombine({
        ...combine,
        combine: e.target.value,
      });
    },
    [combine]
  );

  return (
    <div className='editorRegisterFrag'>
      <div className='register-container'>
        <div className='editor-register-header'>
          <h1>포트폴리오 수정</h1>
        </div>
        <div className='editor-register-default-input'>
          <ul className='leftUl'>
            <div className='li_Title_Title'>제목</div>
            <li className='li-item1'>
              <input
                type='text'
                placeholder='제목'
                name='title'
                id='first-link'
                onChange={onChange}
                maxLength='45'
                value={input.title || ""}
                ref={titleRef}
              />
            </li>
            <li className='li-item2'>
              <div className='li_Title_Link'>대표 영상 링크</div>
              <input
                type='text'
                placeholder='대표영상의 링크를 적어주세요.'
                value={input.previewImage || ""}
                name='previewImage'
                onChange={onChange}
                onKeyUp={editorLinkCheck}
              />
            </li>
            <div className='warningBox'>{editorLinkDesc}</div>
            <li className='li-item3'>
              <div className='li_Title_ReceptionMethod'>연락처</div>
              <input
                id='YreceptionMethod'
                onChange={onChange}
                placeholder='연락처'
                value={input.receptionMethod}
                maxLength='50'
                name='receptionMethod'
                type='text'
                ref={receptionMethodRef}
              />
            </li>
          </ul>

          <ul className='rightUl'>
            <li className='li-item3'>
              <div>경력사항</div>
              <input
                ref={workerRef}
                id='newbie'
                name='career'
                onChange={radioCheck}
                value='신입'
                type='radio'
                checked={input.career === "신입"}
              />
              <label htmlFor='newbie'>신입</label>
              <input
                id='career'
                onChange={radioCheck}
                name='career'
                value='경력'
                type='radio'
                checked={input.career.includes("경력")}
              />
              <label htmlFor='career'>경력</label>
              {input.career.includes("경력") ? (
                <div className='careerTimeBox'>
                  <input
                    id='careerYear'
                    name='careerYear'
                    type='text'
                    maxLength='2'
                    value={combine.combine}
                    onChange={careerYear}
                    onInput={({ target }) => {
                      target.value = target.value.replace(/[^0-9]/g, "");
                      target.value = target.value.replace(/,/g, "");
                    }}
                  />
                  년
                </div>
              ) : (
                ""
              )}
            </li>
            <li className='li-item4'>
              <select name='payType' ref={payTypeRef} value={input.payType} onChange={onChange}>
                <option value=''>선택</option>
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
                value={input.payAmount || ""}
                maxLength={12}
                onInput={({ target }) => {
                  target.value = target.value.replace(/[^0-9]/g, "");
                  target.value = target.value.replace(/,/g, "");
                  target.value = target.value.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // 정규식을 이용해서 3자리 마다 , 추가
                }}
                ref={payAmountRef}
              />
            </li>
            <div className='registerSpanBox'>
              <span className='registerSpan'>사용기술</span>
            </div>
            <li className='li-item5'>
              <input
                id='Epremiere'
                name='premiere'
                value='프리미어 프로'
                type='checkbox'
                onChange={checkboxCheck}
                checked={checkBoxInput.premiere}
              />
              <label htmlFor='Epremiere'>프리미어 프로 </label>
              <input
                id='Eaftereffect'
                name='aftereffect'
                value='애프터이펙트'
                type='checkbox'
                onChange={checkboxCheck}
                checked={checkBoxInput.aftereffect}
              />
              <label htmlFor='Eaftereffect'>애프터이펙트 </label>
              <input
                id='Efinalcut'
                name='finalcut'
                value='파이널컷'
                type='checkbox'
                onChange={checkboxCheck}
                checked={checkBoxInput.finalcut}
              />
              <label htmlFor='Efinalcut'>파이널컷 </label>
              <input
                id='Evegas'
                name='vegas'
                onChange={checkboxCheck}
                value='베가스'
                type='checkbox'
                checked={checkBoxInput.vegas}
              />
              <label htmlFor='Evegas'>베가스</label>
              <input
                id='Epowerdirector'
                name='powerdirector'
                value='파워 디렉터'
                type='checkbox'
                onChange={checkboxCheck}
                checked={checkBoxInput.powerdirector}
              />
              <label htmlFor='Epowerdirector'>파워 디렉터</label>
              <input
                id='Yphotoshop'
                name='photoshop'
                value='포토샵'
                type='checkbox'
                onChange={checkboxCheck}
                checked={checkBoxInput.photoshop}
              />
              <label htmlFor='Yphotoshop'>포토샵</label>
              <input
                id='Yillustrater'
                name='illustrater'
                value='일러스트'
                type='checkbox'
                onChange={checkboxCheck}
                checked={checkBoxInput.illustrater}
              />
              <label htmlFor='Yillustrater'>일러스트</label>
              <input
                id='Yblender'
                onChange={checkboxCheck}
                name='blender'
                value='블렌더'
                type='checkbox'
                checked={checkBoxInput.blender}
              />
              <label htmlFor='Yblender'>블렌더</label>
              <input
                id='Ymaya'
                onChange={checkboxCheck}
                name='maya'
                value='마야'
                type='checkbox'
                checked={checkBoxInput.maya}
              />
              <label htmlFor='Ymaya'>마야</label>
            </li>
          </ul>
        </div>
        <div className='editor-quill'>
          <div className='editor-infomation'>상세 내용</div>
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
