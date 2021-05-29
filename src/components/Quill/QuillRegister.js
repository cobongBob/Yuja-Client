import React, { useCallback, useEffect, useMemo } from "react";
import { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./YQuillComponents.scss";
import YImgApiService from "../../apiService/YImgApiService";
import ImageResize from "@looop/quill-image-resize-module-react";
import QuillImageDropAndPaste from "quill-image-drop-and-paste";
import { useHistory } from "react-router";
import { ToastCenter } from "../../modules/ToastModule";
import { changeYoutubeUrlToIframe } from "../../modules/QuillYoutubeConvert";
Quill.register("modules/imageResize", ImageResize);
Quill.register("modules/imageDropAndPaste", QuillImageDropAndPaste);
let Image = Quill.import("formats/image");
Image.className = "custom-class-to-image";
Quill.register(Image, true);
window.Quill = Quill;

let quill;

const QuillRegister = ({ register, addingFileList, qData, setQData, board_type }) => {
  const history = useHistory();
  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    const acceptType = ["image/png", "image/jpeg", "image/gif", "image/jpg"];
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/png, image/jpeg, image/gif, image/jpg");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (!acceptType.includes(file.type)) {
        return ToastCenter("jpg, jpeg, png, gif 만 가능합니다.");
      }
      const formData = new FormData();
      formData.append("file", file);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      await YImgApiService.addImgs(formData, config, board_type).then((response) => {
        if (response.status === 200) {
          const range = quill.getSelection(true) !== null ? quill.getSelection(true) : 0;
          quill.insertEmbed(range.index, "image", `http://localhost:8888/files/temp/${response.data[0].fileName}`);
          quill.setSelection(range.index + 1);
          addingFileList.current.push(response.data[0].fileName);
        }
      });
    };
  }, [addingFileList, board_type]);
  // end of imageHandler

  const dropHandler = useCallback(
    (imageDataUrl, type, imageData) => {
      let filename = "my_cool_image.png";
      let file = imageData.toFile(filename);

      const formData = new FormData();

      formData.append("file", file);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      YImgApiService.addImgs(formData, config, board_type).then((response) => {
        if (response.status === 200) {
          const range = quill.getSelection(true) !== null ? quill.getSelection(true) : 0;
          quill.insertEmbed(range.index, "image", `http://localhost:8888/files/temp/${response.data[0].fileName}`);
          quill.setSelection(range.index + 1);
          addingFileList.current.push(response.data[0].fileName);
        }
      });
    },
    [addingFileList, board_type]
  );
  //end of drop handler

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
          ["image", "video"],
          [{ align: [] }, { color: [] }, { background: [] }],
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
      "image",
      "align",
      "video",
      "color",
      "background",
    ],
    []
  );

  useEffect(() => {
    let container = document.getElementById("ReactQuill");
    quill = new Quill(container, {
      modules: modules,
      formats: formats,
      theme: "snow",
      placeholder: "내용입력",
      value: qData,
    });
    quill.on("text-change", (delta, oldDelta, source) => {
      const inserted = delta.ops.filter((i) => i.insert);
      if (inserted.length) {
        const acceptType = "";
        if (typeof inserted[0].insert === typeof acceptType) {
          const emebedurl = changeYoutubeUrlToIframe(inserted[0].insert);
          const len = inserted[0].insert.length;
          if (emebedurl) {
            const range = quill.getSelection(true) !== null ? quill.getSelection(true) : 0;
            quill.insertEmbed(range.index, "video", emebedurl);
            quill.deleteText(range.index + 1, len);
          }
        }
      }
      setQData(quill.root.innerHTML);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className='QuillWrapper'>
        <div id='ReactQuill'></div>
      </div>
      <div className='button-line'>
        <button
          onClick={() => {
            if (!qData || qData === "<p><br></p>" || qData === "<p></p>") {
              ToastCenter(`내용을 입력해주세요`);
              return quill.focus();
            }
            register();
          }}
          className='register-ok'
        >
          등록하기
        </button>
        <button onClick={() => history.goBack()} className='register-back'>
          돌아가기
        </button>
      </div>
    </>
  );
};

export default QuillRegister;
