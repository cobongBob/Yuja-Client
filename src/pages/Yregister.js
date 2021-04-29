import { EditorState } from 'draft-js';
import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const Yregister = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };
  const uploadImageCallBack = (file) => {
    console.log(file);
  };
  return (
    <div>
      <Editor
        toolbarClassName='toolbar-class'
        wrapperClassName='wrapper-class'
        editorClassName='editor'
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        toolbar={{
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
          image: {
            uploadCallback: uploadImageCallBack,
            alt: {
              present: true,
              mandatoryL: true,
            },
          },
        }}
        placeholder='내용 작성해~'
        localzation={{
          locale: 'ko',
        }}></Editor>
    </div>
  );
};

export default Yregister;
