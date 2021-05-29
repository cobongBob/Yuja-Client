import React, { useRef, useState } from 'react';
import { ToastCenter } from './ToastModule';

export const isNotFilled = (input, ref) => {
  ref.forEach((ref) => {
    if (!input.title) {
      ref.current.focus();
      return false;
    }
  });
  return true;
};
