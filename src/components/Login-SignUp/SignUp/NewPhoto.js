import React, { useCallback, useRef } from 'react';

const NewPhoto = () => {
  const addPhoto = useRef(null);
  const photoInput = useRef(null);

  //input 요소에서 파일 선택시 addPhoto 요소에서 이미지 보여주기
  const onChange = useCallback(() => {
    const file = photoInput.current.files[0];
    if(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        addPhoto.current.style.backgroundImage = 'url(${reader.result})';
      }
    }
  }, [])

  //addPhoto 요소가 클릭되면 input 클릭이벤트 트리거
  const onClick = useCallback(() => {
    photoInput.current.click();
  }, [])

  return(
    <div className = 'NewPhoto'>
      <div className = 'modal-block'>
        <form>
          <div
            id = 'addPhoto'
            ref = { addPhoto }
            onClick = { onClick }
          />
          <input
            type = 'file'
            id = 'photoInput'
            accept=".png, .jpg, .jpeg"
            ref = { photoInput }
            onChange = { onChange } />
        </form>
      </div>
    </div>
  );
};

export default NewPhoto;