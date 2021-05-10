import React, { useEffect, useState } from 'react';
import { Card, CardDeck, Container } from 'react-bootstrap';
import EditorApiService from './EditorApiService';
import EditorTable from './EditorTable';
import '../Youtuber/Youtuber.scss';

const Editor = () => {
  return (
    <div className='tableWrapper'>
      <EditorTable />
    </div>
  );
};

export default Editor;
