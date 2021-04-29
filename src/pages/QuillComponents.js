import React, { Component, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../components/scss/QuillComponents.scss";

const QuillComponents = () => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      ["link", "image", "video"],
      [{ align: [] }, { color: [] }, { background: [] }],
      ["clean"],
    ],
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
        value={data || ""}
        onChange={(content, delta, source, editor) => {
          setData(editor.getHTML());
          console.log(editor.getHTML());
        }}
      />
    </div>
  );
};

export default QuillComponents;
