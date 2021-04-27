import React, { Component, useState } from 'react';
import SignUp from './SignUp';

const SignButton = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <button onClick={openModal}>로그인/회원가입</button>
      {/* header 부분에 텍스트를 입력 */}
      <SignUp open={modalOpen} close={closeModal} header="Modal heading">
        회원가입회원가입회원가입 커밋시험용1입니다
      </SignUp>
    </>
  );
};

export default SignButton;
