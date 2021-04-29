import { useState } from 'react';
import Editor from './QuillComponents';

const NoticeWriteComponent = () => {
  const [desc, setDesc] = useState('');
  function onEditorChange(value) {
    setDesc(value);
  }

  return (
    <div>
      <Editor value={desc} onChange={onEditorChange} />
    </div>
  );
};

export default NoticeWriteComponent;
