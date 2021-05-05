import React, { useEffect, useState } from 'react';
import { Card, CardDeck, Container } from 'react-bootstrap';
import EditorApiService from './EditorApiService';
import EditorTable from './EditorTable';

const Editor = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    EditorApiService.getAllBoard().then((res) => {
      //   editorBoardList.current.push(res.data);
      setData(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <div>
      <EditorTable />
    </div>
  );
};

export default Editor;
