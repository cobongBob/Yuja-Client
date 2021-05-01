import React, { useCallback, useEffect, useMemo, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import ImgApiService from "./ImgApiService";
import "react-quill/dist/quill.snow.css";
import "../../components/scss/QuillComponents.scss";
let Image = Quill.import("formats/image");
Image.className = "custom-class-to-image";
Quill.register(Image, true);
let quill;
const ImgPrac = () => {
  //클래스형 으론 써본적 없지만
  //React Quill을 함수형으로 쓰기위해서는 Quill 객체를 선언해서 그걸 div안에 넣어줘야한다.
  //react에서 div에 접근할때 바로 접근하면 rendering이 되기전에 해당 div를 접근하려하기때문에
  //render가 끝난뒤에 해당 div의 id값을 잡을수 있게끔 useEffect로 접근한다.

  //imageHandler같은 함수는 useCallback로 감싸서 렌더링될때 한번만 실행되게 해야한다.
  const imageHandler = useCallback(() => {
    console.log(quill.getSelection(true));
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
          "content-type": "multipart/form-data",
        },
      };
      const res = await ImgApiService.addImgs(formData, config)
        .then((response) => {
          if (response.status === 200) {
            const range = quill.getSelection(true) === null ? quill.getSelection(true) : 0;
            // 로딩 이미지를 잠깐 넣는다. 실행되는 함수 ex)
            // this.quill.insertEmbed(range.index, 'image', `${window.location.origin}/images/loaders/placeholder.gif`);
            // 커서를 이미지 바로 뒤로 움직여서 이미지 넣은 후 글쓰기 쉽게 해준다
            quill.setSelection(range.index + 1);
            // 로딩 이미지를 지운다
            quill.deleteText(range.index, 1);
            // 업로드된 이미지를 서버에서 받아서 넣어준다
            quill.insertEmbed(range.index, "image", response.data[0].uploadPath);
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
  const onChange = (content, delta, source, editor) => {
    setData(editor.getHTML());
    console.log(editor.getHTML());
  };
  useEffect(() => {
    let container = document.getElementById("ReactQuill");
    quill = new Quill(container, {
      modules: modules,
      formats: formats,
      theme: "snow",
      placeholder: "내용 입력..",
      value: data,
      onChange: onChange,
    });
    console.log(quill);
  });

  return (
    <div>
      <div style={{ height: "650px" }} id='ReactQuill'></div>
      <div>
        <button onClick={() => console.log(data)}>클릭!</button>
      </div>
    </div>
  );
};

export default ImgPrac;
