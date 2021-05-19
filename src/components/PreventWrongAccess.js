import React from 'react';
import { useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';

const PreventWrongAccess = ( history ) => {

  const notify = useCallback((msg) => {
    toast(msg, {
      autoClose: 2000,
      hideProgressBar: true,
      bodyStyle: {
        color: "black",
        fontSize: "17px",
        fontWeight: "bold",
        fontFamily: "scdream4",
      },
      className: "notify",
    });
  }, []);

  useEffect(() => {
    if (history.action === 'POP') {
      notify('❌ 잘못된 접근 입니다.')
      history.replace('/')
    }
  }, [history, notify])

};

export default PreventWrongAccess;