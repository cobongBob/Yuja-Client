import React, { useCallback, useState } from 'react';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import * as ReportApiService from '../../apiService/ReportApiService';
import { ToastCenter } from '../../modules/ToastModule';
import '../Components.scss';
import { AiFillAlert } from 'react-icons/ai';

const Report = ({ board_id, modalIsOpen, setModalIsOpen, board_code }) => {
  const { userData } = useSelector((state) => state.loginReducer);
  const [input, setInput] = useState({
    content: '',
  });

  const reportcustomStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      width: '30%',
      transform: 'translate(-50%, -50%)',
      background: 'rgba(117, 117, 117, 0.699)',
      borderRadius: '30px',
      border: 'none',
    },
    overlay: { zIndex: 9999 },
  };

  const openModal = useCallback(() => {
    if (userData && userData.id) {
      setModalIsOpen(true);
    } else {
      ToastCenter('로그인 해주세요');
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
        title: `${board_code}##${board_id}`,
        boardId: board_id,
        userId: userData.id,
      };
      if (userData && input.reportedReason !== '') {
        ReportApiService.addReport(report).then((res) => {
          ToastCenter('신고 접수 완료!');
        });
        closeModal();
      } else {
        ToastCenter('내용을 입력해주세요');
      }
    },
    [board_id, userData, closeModal, input, board_code]
  );

  return (
    <>
      <button onClick={openModal}>신고하기</button>
      <Modal
        isOpen={modalIsOpen}
        style={reportcustomStyles}
        onRequestClose={closeModal}
      >
        <form id='ReportForm' onSubmit={(e) => onSubmit(e)}>
          <AiFillAlert
            size={50}
            style={{
              color: '#e02020',
              display: 'inline-block',
              marginBottom: '23px',
            }}
          />
          <span>신고사유</span>
          <textarea
            name='content'
            id='ReportContent'
            placeholder='신고내용'
            onChange={onChange}
          ></textarea>
          <ul className='BtnWrapper'>
            <li>
              <input id='ReportSubmit' type='submit' value='신고하기' />
            </li>
            <li>
              <button id='ReportCloseBtn' onClick={() => setModalIsOpen(false)}>
                닫기
              </button>
            </li>
          </ul>
        </form>
      </Modal>
    </>
  );
};

export default Report;
