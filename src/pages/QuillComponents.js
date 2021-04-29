import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../components/scss/QuillComponents.scss';

class QuillComponents extends Component {
  constructor(props) {
    super(props);
  }

  modules = {
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

  formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    ,
    'link',
    'image',
    'align',
    'video',
    'color',
    'background',
  ];

  render() {
    const { value, onChange } = this.props;
    console.log(value);
    return (
      <div style={{ height: '650px' }}>
        <ReactQuill
          style={{ height: '600px' }}
          theme='snow'
          modules={this.modules}
          formats={this.formats}
          value={value || ''}
          onChange={(content, delta, source, editor) =>
            onChange(editor.getHTML())
          }
        />
      </div>
    );
  }
}

export default QuillComponents;
