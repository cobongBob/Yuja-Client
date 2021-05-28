import React, { useRef, useState } from 'react';
import { ToastCenter } from './ToastModule';

const InputFocus = ([input]) => {
  // if ([input.include('')]) {
  //   ToastCenter('빈 칸을 모두 입력 하세요');
  //   inputRef.current.focus();
  // }

  input.forEach((value) => {
    if (value && value.include('')) {
      ToastCenter('내용을 모두 입력 해주세요');
    }
  });
};

export default InputFocus;
