import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './YQuillComponents.scss';
import YImgApiService from '../../apiService/YImgApiService';
import ImageResize from '@looop/quill-image-resize-module-react';
import QuillImageDropAndPaste from 'quill-image-drop-and-paste';
import { useHistory } from 'react-router';
import { ToastCenter } from '../../modules/ToastModule';
Quill.register('modules/imageResize', ImageResize);
Quill.register('modules/imageDropAndPaste', QuillImageDropAndPaste);
let Image = Quill.import('formats/image');
Image.className = 'custom-class-to-image';
Quill.register(Image, true);
window.Quill = Quill;

let quill;
const QuillModify = ({
  modify,
  addingFileList,
  qModiData,
  setQModiData,
  board_type,
}) => {
  const history = useHistory();
  const imageHandler = useCallback(() => {
    const input = document.createElement('input');
    const acceptType = ['image/png', 'image/jpeg', 'image/gif', 'image/jpg'];
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/png, image/jpeg, image/gif, image/jpg');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (!acceptType.includes(file.type)) {
        return ToastCenter('jpg, jpeg, png, gif 만 가능합니다.');
      }
      const formData = new FormData();
      formData.append('file', file);
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };
      await YImgApiService.addImgs(formData, config, board_type).then(
        (response) => {
          if (response.status === 200) {
            const range =
              quill.getSelection(true) !== null ? quill.getSelection(true) : 0;
            quill.insertEmbed(
              range.index,
              'image',
              `http://localhost:8888/files/temp/${response.data[0].fileName}`
            );
            quill.setSelection(range.index + 1);
            addingFileList.current.push(response.data[0].attachId);
          }
        }
      );
    };
  }, [addingFileList, board_type]);
  // end of imageHandler

  const dropHandler = useCallback(
    (imageDataUrl, type, imageData) => {
      let filename = 'my_cool_image.png';
      let file = imageData.toFile(filename);

      const formData = new FormData();

      formData.append('file', file);
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };
      YImgApiService.addImgs(formData, config, board_type).then((response) => {
        if (response.status === 200) {
          const range =
            quill.getSelection(true) !== null ? quill.getSelection(true) : 0;
          quill.insertEmbed(
            range.index,
            'image',
            `http://localhost:8888/files/temp/${response.data[0].fileName}`
          );
          quill.setSelection(range.index + 1);
          addingFileList.current.push(response.data[0].attachId);
        }
      });
    },
    [addingFileList, board_type]
  );
  //end of drop handler

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
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
        handlers: { image: imageHandler },
      },
      imageResize: { modules: ['Resize', 'DisplaySize'] },
      imageDropAndPaste: {
        handler: dropHandler,
      },
    }),
    [imageHandler, dropHandler]
  );

  const formats = useMemo(
    () => [
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
    ],
    []
  );

  useEffect(() => {
    let container = document.getElementById('ReactQuill');
    quill = new Quill(container, {
      modules: modules,
      formats: formats,
      theme: 'snow',
      placeholder: '내용입력',
      value: qModiData,
    });

    quill.on('text-change', (delta, oldDelta, source) => {
      setQModiData(quill.root.innerHTML);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  let done = useRef(false);
  useMemo(() => {
    if (quill && quill.root && qModiData && !done.current) {
      quill.root.innerHTML = qModiData;
      done.current = true;
    }
  }, [qModiData]);
  return (
    <>
      <div className='QuillWrapper'>
        <div id='ReactQuill'></div>
      </div>
      <div>
        <div className='button-line'>
          <button onClick={modify} className='register-ok'>
            확인
          </button>
          <button onClick={() => history.goBack()} className='register-back'>
            뒤로가기
          </button>
        </div>
      </div>
    </>
  );
};

export default QuillModify;
