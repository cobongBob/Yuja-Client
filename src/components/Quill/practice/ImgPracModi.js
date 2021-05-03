import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Quill } from "react-quill";
import ImgApiService from "./ImgApiService";
import "react-quill/dist/quill.snow.css";
import "../QuillComponents.scss";
import YapiService from "../../../pages/Main/Youtuber/YapiService";
let Image = Quill.import("formats/image");
Image.className = "custom-class-to-image";
Quill.register(Image, true);
let quill;
const ImgPracModi = (props) => {
  const imageHandler = useCallback(() => {
    const input = document.createElement("input");

    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/png, image/jpeg, image/gif");
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
      const res = await ImgApiService.addImgs(formData, config)
        .then((response) => {
          if (response.status === 200) {
            const range = quill.getSelection(true) !== null ? quill.getSelection(true) : 0;
            quill.insertEmbed(range.index, "image", `http://localhost:8888/imgs/placeholder.gif`);
            quill.setSelection(range.index + 1);
            quill.deleteText(range.index, 1);
            quill.insertEmbed(range.index, "image", `http://localhost:8888/files/temp/${response.data[0].fileName}`);
          }
        })
        .catch((error) => {
          alert(error);
        });
    };
  }, []);

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
  const [newData, setNewData] = useState();
  const fileList = useRef([]);
  useEffect(() => {
    YapiService.fetchBoard(props.match.params.board_id).then((res) => {
      fileList.current = res.data.boardAttachFileNames;
      quill.root.innerHTML = res.data.content;
      console.log(res);
    });

    let container = document.getElementById("ReactQuill");
    quill = new Quill(container, {
      modules: modules,
      formats: formats,
      theme: "snow",
      placeholder: "내용입력",
    });
    quill.on("text-change", (delta, oldDelta, source) => {
      setNewData(quill.root.innerHTML);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const testCheking = () => {
    let reg = /http:\/\/localhost:8888\/files\/temp\/[0-9]+.[a-z]+/g;
    let imgSrcArr = String(newData).match(reg);
    console.log(imgSrcArr);
    imgSrcArr.forEach((src) => {
      console.log(src.substr(src.indexOf("files/temp") + 11));
    });
    // console.log(
    //   data.replaceAll(`src="http://localhost:8888/files/temp/`, `src="http://localhost:8888/files/dens`)
    // );
  };

  return (
    <div>
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

export default ImgPracModi;
