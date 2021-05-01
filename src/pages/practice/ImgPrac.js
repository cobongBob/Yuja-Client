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
  useEffect(() => {
    let container = document.getElementById("ReactQuill");
    quill = new Quill(container);
  }, []);

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
  return (
    <div style={{ height: "650px" }}>
      <ReactQuill
        style={{ height: "600px" }}
        theme='snow'
        modules={modules}
        formats={formats}
        placeholder='Add a description of your event'
        id='ReactQuill'
        value={data || ""}
        onChange={(content, delta, source, editor) => {
          setData(editor.getHTML());
        }}
      />
    </div>
  );
};

export default ImgPrac;
