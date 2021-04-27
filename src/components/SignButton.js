import React, { Component, useState } from 'react';
import SignUp from './SignUp';

const SignButton = () => {
  const [modalOpen, setModalOpen] = useState(true);

  const openModal = () => {
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
    console.log('openModal 실행');
    // 모달 오픈시 body에 overflow hidden을 주어 스크롤 방지
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = 'unset';
    // 모달 창 닫으면 스크롤 잠금 풀기
  };

  return (
    <>
      <button onClick={openModal}>로그인/회원가입</button>
      {/* header 부분에 텍스트를 입력 */}
      <SignUp open={modalOpen} close={closeModal} header="Modal heading">
        {/* SignUp.js <main> {props.children} </main>에 내용이 입력된다. */}
        회원가입회원가입회원가입 커밋시험용1입니다
      </SignUp>
    </>
  );
};

export default SignButton;
