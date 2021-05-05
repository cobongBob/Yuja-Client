import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./YQuillComponents.scss";
import "./Yregister.scss";
import YapiService from "./YapiService";
import YImgApiService from "./YImgApiService";
import ImageResize from "@looop/quill-image-resize-module-react";
import QuillImageDropAndPaste from "quill-image-drop-and-paste";
Quill.register("modules/imageResize", ImageResize);
Quill.register("modules/imageDropAndPaste", QuillImageDropAndPaste);
let Image = Quill.import("formats/image");
Image.className = "custom-class-to-image";
Quill.register(Image, true);
window.Quill = Quill;

let quill;
const Yregister = () => {
  const addingFileList = useRef([]);
  const imageHandler = useCallback(() => {
    const input = document.createElement("input");

    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/png, image/jpeg, image/gif");

    //모든파일을 클릭해 이상한 파일을 삽입할수 있으므로 정규식으로 xss공격에 대비해야한다.
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append("file", file);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      await YImgApiService.addImgs(formData, config)
        .then((response) => {
          if (response.status === 200) {
            const range = quill.getSelection(true) !== null ? quill.getSelection(true) : 0;
            quill.insertEmbed(range.index, "image", `http://localhost:8888/files/temp/${response.data[0].fileName}`);
            quill.setSelection(range.index + 1);
            addingFileList.current.push(response.data[0].attachId);
          }
        })
        .catch((error) => {
          alert(error);
        });
    };
  }, []);
  // end of imageHandler

  const dropHandler = useCallback((imageDataUrl, type, imageData) => {
    let filename = "my_cool_image.png";
    let file = imageData.toFile(filename);

    const formData = new FormData();

    formData.append("file", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    YImgApiService.addImgs(formData, config)
      .then((response) => {
        if (response.status === 200) {
          const range = quill.getSelection(true) !== null ? quill.getSelection(true) : 0;
          quill.insertEmbed(range.index, "image", `http://localhost:8888/files/temp/${response.data[0].fileName}`);
          quill.setSelection(range.index + 1);
          addingFileList.current.push(response.data[0].attachId);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }, []);
  //end of drop handler

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
          ["link", "image", "video"],
          [{ align: [] }, { color: [] }, { background: [] }],
          ["clean"],
        ],
        handlers: { image: imageHandler },
      },
      imageResize: { modules: ["Resize", "DisplaySize"] },
      imageDropAndPaste: {
        handler: dropHandler,
      },
    }),
    [imageHandler, dropHandler]
  );

  const formats = useMemo(
    () => [
      "header",
      "bold",
      "italic",
      "underline",
      "strike",
      "blockquote",
      "list",
      "bullet",
      "indent",
      "link",
      "image",
      "align",
      "video",
      "color",
      "background",
    ],
    []
  );
  const [data, setData] = useState();

  useEffect(() => {
    let container = document.getElementById("ReactQuill");
    quill = new Quill(container, {
      modules: modules,
      formats: formats,
      theme: "snow",
      placeholder: "내용입력",
      value: data,
    });
    quill.on("text-change", (delta, oldDelta, source) => {
      setData(quill.root.innerHTML);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const testCheking = () => {
    const sendingData = {
      ...input,
      userId: 1, //글쓰고있는 사람의 아이디로 변경요망
      content: data.replaceAll(
        `src="http://localhost:8888/files/temp/`,
        `src="http://localhost:8888/files/YoutuberBoard/`
      ), //업로드된 이미지들은 temp가 아닌 YoutuberBoard에 저장된다.
      thumbnail: "썸네일테스트", //썸네일 서버쪽 만들어지면 변경 필
      boardAttachIds: addingFileList.current,
    };
    YapiService.addBoards(sendingData);
  };

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
    title: "",
    channelname: "",
    worker: "",
    workercount: "",
    careervalue: "",
    ywhen: "",
    tools: checkedlist.current,
  });

  return (
    <div className='YregisterBigWrapper'>
      <div className='YregisterWrapper'>
        <div className='YregisterHeader'>
          <h1>공고등록</h1>
        </div>
        <div className='YregisterTitleWrapper'>
          <input id='YregisterWriter' name='title' onChange={onChange} placeholder='제목' maxLength='200' type='text' />
        </div>
        <div>
          <label htmlFor='YregisterChannel'>채널명:</label>
          <input id='YregisterChannel' onChange={onChange} name='channelname' type='text' />
        </div>
        <div>
          <label htmlFor=''>모집분야:</label>

          <input id='editor' type='radio' name='worker' value='editor' onChange={radioCheck} />
          <label htmlFor='editor'>영상편집</label>

          <input type='radio' id='thumbnailer' name='worker' value='thumbnailer' onChange={radioCheck} />
          <label htmlFor='thumbnailer'>썸네일러</label>

          <input type='radio' id='both' onChange={radioCheck} name='worker' value='both' />
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
                console.log("hi");
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />
            명
          </label>
        </div>

        <div>
          <input id='newbie' name='careervalue' onChange={radioCheck} value='newbie' type='radio' />
          <label htmlFor='newbie'>신입</label>

          <input id='career' onChange={radioCheck} name='careervalue' value='career' type='radio' />
          <label htmlFor='career'>경력</label>

          <input id='notcareer' name='careervalue' value='notcareer' type='radio' onChange={radioCheck} />
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
          <input id='Ypremiere' name='ypremiere' value='ypremiere' type='checkbox' onChange={checkboxCheck} />
          <label htmlFor='Ypremiere'>프리미어 프로</label>

          <input id='Yaftereffect' name='yaftereffect' value='yaftereffect' type='checkbox' onChange={checkboxCheck} />
          <label htmlFor='Yaftereffect'>애프터이펙트</label>

          <input id='Yfinalcut' name='yfinalcut' value='yfinalcut' type='checkbox' onChange={checkboxCheck} />
          <label htmlFor='Yfinalcut'>파이널컷</label>

          <input id='Yvegas' name='yvegas' onChange={checkboxCheck} value='yvegas' type='checkbox' />
          <label htmlFor='Yvegas'>베가스</label>

          <input
            id='Ypowerdirector'
            name='ypowerdirector'
            value='ypowerdirector'
            type='checkbox'
            onChange={checkboxCheck}
          />
          <label htmlFor='Ypowerdirector'>파워 디렉터</label>

          <input id='Yphotoshop' name='yphotoshop' value='yphotoshop' type='checkbox' onChange={checkboxCheck} />
          <label htmlFor='Yphotoshop'>포토샵</label>

          <input id='Yillustrater' name='yillustrater' value='yillustrater' type='checkbox' onChange={checkboxCheck} />
          <label htmlFor='Yillustrater'>일러스트</label>

          <input id='Yblender' onChange={checkboxCheck} name='yblender' value='yblender' type='checkbox' />
          <label htmlFor='Yblender'>블렌더</label>

          <input id='Ymaya' onChange={checkboxCheck} name='ymaya' value='ymaya' type='checkbox' />
          <label htmlFor='Ymaya'>마야</label>
        </div>
        <div>
          <label htmlFor=''>마감일:</label>
          <input id='YendDate' onChange={onChange} name='yenddate' type='date' />

          <input id='always' onChange={radioCheck} name='ywhen' value='always' type='radio' />
          <label htmlFor='always'>상시모집</label>

          <input id='deadline' name='ywhen' value='deadline' type='radio' onChange={radioCheck} />
          <label htmlFor='deadline'>채용시 마감</label>
        </div>
        {/* <div>
        <input id='Ycontact' placeholder='연락방법' type='text' />
        이메일 / 온라인 접수 / 직접 방문 / 우편 접수 / 팩스 / 당사 홈페이지
      </div> */}
        <div>
          <label htmlFor='YregisterService'>담당자:</label>
          <input id='YregisterService' onChange={onChange} name='manager' type='text' />
          {/* default = 회원 이름 */}
        </div>
        <br />
        <h2>상세 내용</h2>
      </div>
      <div>
        <div style={{ height: "350px" }} id='ReactQuill'></div>
      </div>
      <div>
        <div>
          <button onClick={testCheking}>확인</button>
        </div>
      </div>
    </div>
  );
};

export default Yregister;
