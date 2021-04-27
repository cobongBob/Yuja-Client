import React, { useEffect, useRef, useState } from 'react';
import './scss/SignUp.scss';
import { Container, Overlay } from 'react-bootstrap';

const SignUp = (props) => {
  // 열기, 닫기, 헤더를 부모로부터 받아옴
  const { open, close, header } = props;

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <Container>
      <div className={open ? 'openModal SignUp' : 'SignUp'}>
        {open ? (
          <section>
            <header>
              {header}
              <button className='close' onClick={close}>
                {' '}
                &times;{' '}
              </button>
            </header>
            <main>{props.children}</main>
            <footer>
              <button className='close' onClick={close}>
                {' '}
                close{' '}
              </button>
            </footer>
          </section>
        ) : null}
      </div>
    </Container>
  );
};

export default SignUp;
