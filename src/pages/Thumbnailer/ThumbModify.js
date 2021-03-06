import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getOneEBoard } from "../../apiService/EditerApiService";
import { ToastCenter } from "../../modules/ToastModule";
import "./ThumbRegister.scss";
import * as EditerApiService from "../../apiService/EditerApiService";
import QuillModify from "../../components/Quill/QuillModify";
import { checkBoxConvert } from "../../modules/CheckBoxConvert";
import defaultImg from "./Thumdefault.png";
import { isNotFilled } from "../../modules/InputFocus";

const ThumbModify = ({ match }) => {
  const { userData } = useSelector((state) => state.loginReducer);
  const addingFileList = useRef([]);
  const deletedFileList = useRef([]);
  const [qModiData, setQModiData] = useState();
  const board_type = useRef(match.params.board_type);
  const checkedlist = useRef([]);
  const fileList = useRef([]);
  const history = useHistory();
  const ThumbId = useRef(0);
  const [fileUrl, setFileUrl] = useState(defaultImg);

  const [combine, setCombine] = useState({
    combine: 0,
  });

  let ThHistory = useCallback(
    (board_id) => history.push(`/ThumbDetail/${board_type.current}/${board_id}/1`),
    [history, board_type]
  );

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

  const handleImg = useCallback((e) => {
    let file = e.target.files[0];
    if (!file) {
      return;
    }

    const acceptType = ["image/png", "image/jpeg", "image/gif", "image/jpg"];
    if (!acceptType.includes(file.type)) {
      return ToastCenter("jpg, jpeg, png ??? ???????????????.");
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

  useEffect(() => {
    getOneEBoard(match.params.board_id, board_type.current).then((res) => {
      if (!userData || userData.id !== res.data.user.id) {
        ToastCenter("????????? ????????????.");
        return history.goBack();
      }
      fileList.current = res.data.boardAttachFileNames;
      setQModiData(res.data.content);
      setInput({
        career: res.data.career,
        payAmount: res.data.payAmount,
        payType: res.data.payType,
        previewImage: res.data.previewImage,
        receptionMethod: res.data.receptionMethod,
        title: res.data.title,
        tools: res.data.tools,
      });
      if (res.data.thumbnail && res.data.thumbnail.length > 8) {
        setFileUrl(`https://api.withyuja.com/files/thumbnail/${res.data.thumbnail.substr(8)}`);
      }
      setcheckBoxInput(checkBoxConvert(res.data.tools));
      checkedlist.current = res.data.tools;
      setCombine({ combine: res.data.career.substr(3, res.data.career.length - 4) });
    });
  }, [userData, history, match.params.board_id]);

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
    if (!input.title.trim()) {
      titleRef.current.focus();
      return ToastCenter("????????? ?????? ???????????????.");
    }
    if (!isNotFilled(input, refsArray)) {
      return ToastCenter("????????? ?????? ???????????????.");
    }
    if (checkedlist.current.length === 0 || !input.career) {
      workerRef.current.focus();
      return ToastCenter("????????? ?????? ???????????????.");
    }
    if (input.career.startsWith("??????") && combine.combine < 1) {
      careerYearRef.current.focus();
      return ToastCenter("????????? ?????? ???????????????.");
    }

    let reg = new RegExp(`https://api.withyuja.com/files/${board_type.current}/[0-9]+.[a-z]+`, "gi");
    let imgSrcArr = String(qModiData).match(reg); // ???????????? ?????? ???????????? ????????? ???????????? src
    // ???????????? ????????? ????????? ????????? ????????????. ????????? ????????????????????? ?????? ???????????? ????????????.
    if (imgSrcArr) {
      fileList.current.forEach((src) => {
        if (!imgSrcArr.includes(`https://api.withyuja.com/files/${board_type.current}/${src}`)) {
          deletedFileList.current.push(src);
        }
      });
    } else {
      deletedFileList.current = fileList.current;
    }

    if (input.career !== "??????" && input.career.includes([0 - 9]) === false) {
      const modifyingData = {
        ...input,
        career: "?????? " + combine.combine + "???",
        tools: checkedlist.current,
        content: qModiData.replaceAll(
          `src="https://api.withyuja.com/files/temp/`,
          `src="https://api.withyuja.com/files/${board_type.current}/`
        ),
        boardAttachIds: addingFileList.current,
        boardAttachToBeDeleted: deletedFileList.current,
        thumbnailId: ThumbId.current,
      };
      EditerApiService.modifyBoard(match.params.board_id, modifyingData, board_type.current).then((res) => {
        ThHistory(res.data.id);
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
        thumbnailId: ThumbId.current,
      };
      EditerApiService.modifyBoard(match.params.board_id, modifyingData, board_type.current).then((res) => {
        ThHistory(res.data.id);
      });
    }
  }, [ThHistory, match.params.board_id, input, qModiData, refsArray, combine]);

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
    <div className='thumbRegisterFrag'>
      <div className='register-container'>
        <div className='thumb-register-header'>
          <h1>??????????????? ??????</h1>
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
                placeholder='??? ???????????? ??????????????? ???????????? ?????? ?????????.'
                onChange={handleImg}
              />
            </li>
            <div className='editor_li_Title_Title'>??????</div>
            <li className='li-item1'>
              <input
                type='text'
                placeholder='??????'
                name='title'
                id='first-link'
                onChange={onChange}
                maxLength='45'
                value={input.title || ""}
                ref={titleRef}
              />
            </li>
            <li className='li-item1'>
              <div className='editor_li_Title_ReceptionMethod'>?????????</div>
              <input
                id='YreceptionMethod'
                onChange={onChange}
                placeholder='?????????'
                maxLength='50'
                name='receptionMethod'
                type='text'
                value={input.receptionMethod || ""}
                ref={receptionMethodRef}
              />
            </li>
          </ul>
          <ul className='rightUl'>
            <li className='li-item3'>
              <div className='careerTitle'>????????????</div>
              <input
                id='newbie'
                name='career'
                onChange={radioCheck}
                value='??????'
                type='radio'
                checked={input.career === "??????"}
                ref={workerRef}
              />
              <label htmlFor='newbie'>??????</label>
              <input
                id='career'
                onChange={radioCheck}
                name='career'
                value='??????'
                type='radio'
                checked={input.career.includes("??????")}
              />
              <label htmlFor='career'>??????</label>
              {input.career.includes("??????") ? (
                <div className='careerTimeBox'>
                  <input
                    id='thumbCareerYear'
                    name='thumbCareerYear'
                    type='text'
                    maxLength='2'
                    value={combine.combine}
                    onChange={careerYear}
                    onInput={({ target }) => {
                      target.value = target.value.replace(/[^0-9]/g, "");
                      target.value = target.value.replace(/,/g, "");
                    }}
                    ref={careerYearRef}
                  />
                  ???
                </div>
              ) : (
                ""
              )}
            </li>
            <li className='li-item4'>
              <select name='payType' ref={payTypeRef} value={input.payType} onChange={onChange}>
                <option value=''>??????</option>
                <option value='??????'>??????</option>
                <option value='??????'>??????</option>
                <option value='??????'>??????</option>
                <option value='??????'>??????</option>
              </select>
              <input
                type='text'
                placeholder='????????????'
                name='payAmount'
                onChange={onChange}
                value={input.payAmount || ""}
                maxLength={12}
                onInput={({ target }) => {
                  target.value = target.value.replace(/[^0-9]/g, "");
                  target.value = target.value.replace(/,/g, "");
                  target.value = target.value.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // ???????????? ???????????? 3?????? ?????? , ??????
                }}
                ref={payAmountRef}
              />
            </li>
            <div className='thumbSpanBox'>
              <span className='thumbSpan'>????????????</span>
            </div>
            <li className='li-item5'>
              <input
                id='Epremiere'
                name='premiere'
                value='???????????? ??????'
                type='checkbox'
                onChange={checkboxCheck}
                checked={checkBoxInput.premiere}
              />
              <label htmlFor='Epremiere'>???????????? ?????? </label>
              <input
                id='Eaftereffect'
                name='aftereffect'
                value='??????????????????'
                type='checkbox'
                onChange={checkboxCheck}
                checked={checkBoxInput.aftereffect}
              />
              <label htmlFor='Eaftereffect'>?????????????????? </label>
              <input
                id='Efinalcut'
                name='finalcut'
                value='????????????'
                type='checkbox'
                onChange={checkboxCheck}
                checked={checkBoxInput.finalcut}
              />
              <label htmlFor='Efinalcut'>???????????? </label>
              <input
                id='Evegas'
                name='vegas'
                onChange={checkboxCheck}
                value='?????????'
                type='checkbox'
                checked={checkBoxInput.vegas}
              />
              <label htmlFor='Evegas'>?????????</label>
              <input
                id='Epowerdirector'
                name='powerdirector'
                value='?????? ?????????'
                type='checkbox'
                onChange={checkboxCheck}
                checked={checkBoxInput.powerdirector}
              />
              <label htmlFor='Epowerdirector'>?????? ?????????</label>
              <input
                id='Yphotoshop'
                name='photoshop'
                value='?????????'
                type='checkbox'
                onChange={checkboxCheck}
                checked={checkBoxInput.photoshop}
              />
              <label htmlFor='Yphotoshop'>?????????</label>
              <input
                id='Yillustrater'
                name='illustrater'
                value='????????????'
                type='checkbox'
                onChange={checkboxCheck}
                checked={checkBoxInput.illustrater}
              />
              <label htmlFor='Yillustrater'>????????????</label>
              <input
                id='Yblender'
                onChange={checkboxCheck}
                name='blender'
                value='?????????'
                type='checkbox'
                checked={checkBoxInput.blender}
              />
              <label htmlFor='Yblender'>?????????</label>
              <input
                id='Ymaya'
                onChange={checkboxCheck}
                name='maya'
                value='??????'
                type='checkbox'
                checked={checkBoxInput.maya}
              />
              <label htmlFor='Ymaya'>??????</label>
            </li>
          </ul>
        </div>
        <div className='thumb-quill'>
          <div className='thumb-infomation'>?????? ??????</div>
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

export default ThumbModify;
