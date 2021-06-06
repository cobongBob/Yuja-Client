import React, { useCallback, useEffect, useMemo, useRef } from "react";
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
const QuillModify = ({ modify, addingFileList, qModiData, setQModiData, board_type }) => {
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
          quill.insertEmbed(range.index, "image", `https://api.withyuja.com/files/temp/${response.data[0].fileName}`);
          quill.setSelection(range.index + 1);
          addingFileList.current.push(response.data[0].attachId);
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
          quill.insertEmbed(range.index, "image", `https://api.withyuja.com/files/temp/${response.data[0].fileName}`);
          quill.setSelection(range.index + 1);
          addingFileList.current.push(response.data[0].attachId);
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
      value: qModiData,
    });
    const videoHandler = () => {
      let url = prompt("유튜브 URL를 입력해주세요. ");
      if (url != null) {
        url = getVideoUrl(url);
        let range = quill.getSelection();
        quill.insertEmbed(range, "video", url);
      }
    };

    const getVideoUrl = (url) => {
      let match =
        url.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtube\.com\/watch.*v=([a-zA-Z0-9_-]+)/) ||
        url.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtu\.be\/([a-zA-Z0-9_-]+)/) ||
        url.match(/^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\\&\\?]*).*/);
      if (match && match[2].length === 11) {
        return "https://www.youtube.com/embed/" + match[2] + "?showinfo=0";
      }
      if ((match = url.match(/^(?:(https?):\/\/)?(?:www\.)?vimeo\.com\/(\d+)/))) {
        // eslint-disable-line no-cond-assign
        return (match[1] || "https") + "://player.vimeo.com/video/" + match[2] + "/";
      }
      return ToastCenter("유튜브 URL만 가능합니다.");
    };

    quill.getModule("toolbar").addHandler("video", videoHandler);

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
      setQModiData(quill.root.innerHTML);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  let done = useRef(false);
  useMemo(() => {
    if (quill && quill.root && qModiData && !done.current) {
      quill.root.innerHTML = qModiData;
      done.current = true;
    }
  }, [qModiData]);
  return (
    <>
      <div className='QuillWrapper'>
        <div id='ReactQuill'></div>
      </div>
      <div>
        <div className='button-line'>
          <button
            onClick={() => {
              if (!qModiData || qModiData === "<p><br></p>" || qModiData === "<p></p>") {
                ToastCenter(`내용을 입력해주세요`);
                return quill.focus();
              }
              modify();
            }}
            className='register-ok'
          >
            확인
          </button>
          <button onClick={() => history.goBack()} className='register-back'>
            뒤로가기
          </button>
        </div>
      </div>
    </>
  );
};

export default QuillModify;
