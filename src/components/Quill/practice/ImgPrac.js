import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as YapiService from "../../../apiService/YapiService";
import { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../QuillComponents.scss";
import ImgApiService from "./ImgApiService";
import ImageResize from "@looop/quill-image-resize-module-react";
Quill.register("modules/imageResize", ImageResize);
let Image = Quill.import("formats/image");
Image.className = "custom-class-to-image";
Quill.register(Image, true);

let quill;
const ImgPrac = () => {
  //단순 안의 변수의 값만 바뀌는 거라면 useRef와 useRef.current도 괜찮다.
  const addingFileList = useRef([]);
  //imageHandler같은 함수는 useCallback로 감싸서 렌더링될때 한번만 실행되게 해야한다.
  const imageHandler = useCallback(() => {
    //Quill 기존의 이미지 업로드는 base64인코딩후 그걸 그대로 텍스트 안에 삽입하게 되는데
    //서버단에서 그걸 받기에는 너무나 긴 문장이 되어 처리하기 힘들다
    //그래서 자체적으로 customize 시켜 서버단에 가벼운 이미지로 넘겨준다
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
          "content-type": "multipart/form-data", // 파일을 보낼때는 type이 multipart여야한다.
        },
      };
      await ImgApiService.addImgs(formData, config)
        .then((response) => {
          if (response.status === 200) {
            const range = quill.getSelection(true) !== null ? quill.getSelection(true) : 0;
            // 로딩 이미지를 잠깐 넣는다. 실행되는 함수 ex)
            quill.insertEmbed(range.index, "image", `http://localhost:8888/imgs/placeholder.gif`);
            // 커서를 이미지 바로 뒤로 움직여서 이미지 넣은 후 글쓰기 쉽게 해준다
            quill.setSelection(range.index + 1);
            // 로딩 이미지를 지운다
            quill.deleteText(range.index, 1);
            // 업로드된 이미지를 서버에서 받아서 넣어준다
            quill.insertEmbed(range.index, "image", `http://localhost:8888/files/temp/${response.data[0].fileName}`);
            // console.log(response.data[0]);
            addingFileList.current.push(response.data[0].attachId);
            // 파일을 서버단의 static에 저장할거라면
            // quill.insertEmbed(range.index, "image", "http://localhost:8888/static/imgs/test.png");
            // quill.insertEmbed(range.index, "image", `http://localhost:8888/imgs/${response.data[0].fileName}`);
            // 서버가 켜있으므로 서버의 주소 정적 폴더 밑 파일을 가져올수있다!
          }
        })
        .catch((error) => {
          alert(error);
        });
    };
  }, []);

  //modules,format같은 값은 useMemo로 감싸서 렌더링될때 한번만 실행되게 해야한다.
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
      imageResize: { modules: ["Resize"] },
    }),
    [imageHandler]
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

  //클래스형 으론 써본적 없지만
  //React Quill을 함수형으로 쓰기 위해서는 Quill 객체를 선언해서 그걸 div안에 넣어줘야한다.
  //react에서 div에 접근할때 바로 접근하면 rendering이 되기전에 해당 div를 접근하려하기때문에
  //render가 끝난뒤에 해당 div의 id값을 잡을수 있게끔 useEffect로 접근한다.
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
      userId: 1,
      title: "제목테스트1",
      content: data.replaceAll(
        `src="http://localhost:8888/files/temp/`,
        `src="http://localhost:8888/files/YoutuberBoard/`
      ), //업로드된 이미지들은 temp가 아닌 YoutuberBoard에 저장된다.
      thumbnail: "썸네일테스트",
      boardAttachIds: addingFileList.current,
    };
    YapiService.addBoards(sendingData);
  };

  return (
    <div>
      <div>
        <div style={{ height: "350px" }} id='ReactQuill'></div>
      </div>
      <div>
        <div>
          <button onClick={testCheking}>전송</button>
        </div>
      </div>
    </div>
  );
};

export default ImgPrac;
