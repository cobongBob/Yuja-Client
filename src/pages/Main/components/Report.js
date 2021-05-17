import React, { useCallback, useState } from 'react';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import * as ReportApiService from '../../../apiService/ReportApiService';

const Report = ({ board_id, modalIsOpen, setModalIsOpen }) => {
  const { userData } = useSelector((state) => state.loginReducer);
  const [input, setInput] = useState({
    reportedReason: '',
  });

  const reportcustomStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      background: '#dddddd',
    },
    overlay: { zIndex: 9999 },
  };

  const openModal = useCallback(() => {
    if (userData && userData.id) {
      setModalIsOpen(true);
    } else {
      alert('로그인 해주세요');
    }
  }, [userData, setModalIsOpen]);

  const closeModal = useCallback(() => {
    setModalIsOpen(false);
  }, [setModalIsOpen]);

  const onChange = useCallback(
    (e) => {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    },
    [input]
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const report = {
        ...input,
        boardId: board_id,
        userId: userData.id,
      };
      if (userData && input.reportedReason !== '') {
        ReportApiService.addReport(report);
        alert('신고 접수 완료!');
        closeModal();
      } else {
        alert('내용을 입력해주세요');
      }
    },
    [board_id, userData, closeModal, input]
  );

  return (
    <div>
      <button onClick={openModal}>신고하기</button>
      <Modal
        isOpen={modalIsOpen}
        style={reportcustomStyles}
        onRequestClose={closeModal}>
        <form id='ReportForm' onSubmit={(e) => onSubmit(e)}>
          <h1>무슨 이유로 신고 하시나요?</h1>
          <textarea
            name='reportedReason'
            id='ReportContent'
            placeholder='신고내용'
            onChange={onChange}></textarea>
          <div className='BtnWrapper'>
            <input id='ReportSubmit' type='submit' value='신고하기' />
            <button id='ReportCloseBtn' onClick={() => setModalIsOpen(false)}>
              닫기
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Report;
