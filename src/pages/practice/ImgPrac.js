import React, { useState } from "react";
import ReactQuill from "react-quill";
let quillObj;

const ImgPrac = (props) => {
  const [Description, setDescription] = useState();
  const imageHandler = () => {
    const input = document.createElement("input");

    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();

      formData.append("image", file);

      // Save current cursor state
      const range = this.quill.getSelection(true);

      // Insert temporary loading placeholder image
      this.quill.insertEmbed(range.index, "image", `${window.location.origin}/images/loaders/placeholder.gif`);

      // Move cursor to right side of image (easier to continue typing)
      this.quill.setSelection(range.index + 1);

      const res = await apiPostNewsImage(formData); // API post, returns image location as string e.g. 'http://www.example.com/images/foo.png'

      // Remove placeholder image
      this.quill.deleteText(range.index, 1);

      // Insert uploaded image
      this.quill.insertEmbed(range.index, "image", res.body.image);
    };
  };
  return (
    <div>
      <ReactQuill
        value={Description}
        modules={{
          toolbar: {
            container: [
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              ["bold", "italic", "underline"],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ align: [] }],
              ["link", "image"],
              ["clean"],
              [{ color: [] }],
            ],
            handlers: {
              image: imageHandler,
            },
          },
          table: true,
        }}
        placeholder='Add a description of your event'
        onChange={(content, delta, source, editor) => setDescription(content, editor)}
        id='txtDescription'
      />
    </div>
  );
};

export default ImgPrac;
