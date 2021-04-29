import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import { Container, Button, Form } from "react-bootstrap";
import "./YInsertBoard.scss";
import axios from "axios";

const YInsertBoard = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };
  const uploadImageCallBack = (file) => {
    return new Promise((resolve, reject) => {
      const config = { headers: { "content-type": "multipart/form-data" } };
      const data = new FormData();
      data.append("file", file);
      axios.post("http://localhost:8888/api/imgUpload", data, config).then((responseImage) => {
        resolve({ data: { link: file } });
      });
    });
  };
  return (
    <Container>
      <Form>
        <Form.Group>
          <Form.Label>제목</Form.Label>
          <Form.Control type='text' placeholder='제목을 입력하세요' />
        </Form.Group>
        {["checkbox"].map((type) => (
          <div key={`inline-${type}`} className='mb-3'>
            <Form.Check inline label='가능툴1' type={type} id={`inline-${type}-1`} />
            <Form.Check inline label='가능툴2' type={type} id={`inline-${type}-2`} />
          </div>
        ))}
        <div className='customEditor'>
          <Editor
            wrapperClassName='wrapper-class'
            editorClassName='editor'
            toolbarClassName='toolbar-class'
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
            toolbar={{
              options: ["link", "image"],
              image: {
                uploadEnabled: true,
                uploadCallback: uploadImageCallBack,
                previewImage: true,
                inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
                alt: {
                  present: false,
                  mandatory: false,
                },
              },
            }}
            placeholder='내용작성해~'
            localization={{
              locale: "ko",
            }}
          ></Editor>
        </div>
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default YInsertBoard;
