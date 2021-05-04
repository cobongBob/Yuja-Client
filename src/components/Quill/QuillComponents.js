import React, { Component, useState } from 'react';
import { Button } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './QuillComponents.scss';
import YapiService from '../../pages/Main/Youtuber/YapiService';

const QuillComponents = () => {
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
  const [data, setData] = useState('');

  const insertBoard = () => {
    const dita = {
      userId: 1,
      title: '제목1',
      content: data,
      thumbnail: '썸네일',
    };
    YapiService.addBoards(dita);
  };

  return (
    <div style={{ height: '650px' }}>
      <Button onClick={insertBoard}>전송</Button>
      <ReactQuill
        style={{ height: '600px' }}
        theme='snow'
        modules={modules}
        formats={formats}
        value={data || ''}
        onChange={(content, delta, source, editor) => {
          setData(editor.getHTML());
          console.log(editor.getHTML());
        }}></ReactQuill>
    </div>
  );
};

export default QuillComponents;
