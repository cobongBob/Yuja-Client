import React, { Component, useEffect, useMemo, useState } from 'react';
import { Button } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../components/scss/QuillComponents.scss';
import YapiService from './YapiService';

const YmodifyTest = (props) => {
  const [duta, setDuta] = useState({});

  useEffect(() => {
    YapiService.fetchBoard(props.match.params.board_id).then((res) => {
      setDuta(res.data);
    });
  });

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image', 'video'],
      [{ align: [] }, { color: [] }, { background: [] }],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'align',
    'video',
    'color',
    'background',
  ];

  const modifyBoard = () => {
    const mail = {
      userId: 1,
      title: '수정제목1',
      content: duta,
      thumbnail: '수정썸네일',
    };
    YapiService.modifyBoard(props.match.params.board_id, mail);
  };

  const [udata, setUdata] = useState();

  return (
    <div style={{ height: '650px' }}>
      <form action=''>
        <Button onClick={modifyBoard}>전송</Button>

        <ReactQuill
          style={{ height: '600px' }}
          theme='snow'
          modules={modules}
          formats={formats}
          value={udata || duta.content}
          onChange={(content, delta, source, editor) => {
            setUdata(editor.getHTML());
          }}></ReactQuill>
      </form>
    </div>
  );
};

export default YmodifyTest;
