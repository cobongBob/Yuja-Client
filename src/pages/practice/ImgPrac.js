import React, { useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import ImgApiService from "./ImgApiService";
import "react-quill/dist/quill.snow.css";
import "../../components/scss/QuillComponents.scss";
let Image = Quill.import("formats/image");
Image.className = "custom-class-to-image";
Quill.register(Image, true);

const ImgPrac = () => {
  const imageHandler = () => {
    let self = this;
    const input = document.createElement("input");

    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
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
          if (response.data.error == "false" || response.data.error == false) {
            if (response.data.status == 200 && response.data.message == "Image uploaded successfully") {
              const range = self.quill.getSelection(true);
              // Insert temporary loading placeholder image
              // this.quill.insertEmbed(range.index, 'image', `${window.location.origin}/images/loaders/placeholder.gif`);
              // Move cursor to right side of image (easier to continue typing)
              self.quill.setSelection(range.index + 1);
              // Remove placeholder image
              self.quill.deleteText(range.index, 1);
              // Insert uploaded image
              self.quill.insertEmbed(range.index, "image", response.data.data[0].imageURL);
            }
          }
          console.log(response);
        })
        .catch((error) => {
          alert(error);
        });
    };
  };
  const modules = {
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
  };

  const formats = [
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
  ];

  const [data, setData] = useState("");
  return (
    <div style={{ height: "650px" }}>
      <ReactQuill
        style={{ height: "600px" }}
        theme='snow'
        modules={modules}
        formats={formats}
        placeholder='Add a description of your event'
        id='txtDescription'
        value={data || ""}
        onChange={(content, delta, source, editor) => {
          setData(editor.getHTML());
        }}
      />
    </div>
  );
};

export default ImgPrac;
