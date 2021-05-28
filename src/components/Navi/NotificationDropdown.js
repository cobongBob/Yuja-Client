import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { noticeWithPush } from '../../modules/ToastWithPush';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { deleteNotification } from '../../redux/loading/notiReducer';

const NotificationDropdown = ({
  allNotifications,
  setHideMenu,
  setModalIsOpen,
}) => {
  const { userData } = useSelector((state) => state.loginReducer);
  const history = useHistory();
  const dispatch = useDispatch();
  const deleteNoti = useCallback(
    (notiId) => {
      dispatch(deleteNotification(notiId));
    },
    [dispatch]
  );

  return (
    userData &&
    userData.id !== 0 && (
      <div className='notiOnNav'>
        {allNotifications.length > 0 &&
        userData &&
        userData.id !== 0 &&
        allNotifications[0].resipeint.id === userData.id ? (
          <div>
            <ul>
              {allNotifications.map((notice, idx) => {
                if (notice.type === 'commentNoti') {
                  return (
                    <li key={idx} className='each_notice'>
                      <span
                        onClick={() => {
                          setHideMenu(false);
                          noticeWithPush(notice, history);
                        }}
                      >
                        <span>{`${notice.sender.nickname}
                        님께서 
                        `}</span>
                        <span className='span_title'>{`${notice.comment.board.title}`}</span>
                        <span>글에 댓글을 남기셨습니다.</span>
                      </span>
                      <li>
                        <RiDeleteBin6Line
                          onClick={() => deleteNoti(notice.notiId)}
                          size='20'
                          className='notice_delete'
                        />
                      </li>
                    </li>
                  );
                } else if (notice.type === 'nestedComment') {
                  return (
                    <li key={idx} className='each_notice'>
                      <span
                        onClick={() => {
                          setHideMenu(false);
                          noticeWithPush(notice, history);
                        }}
                      >
                        <span>{`${notice.sender.nickname}
                        님께서 
                        `}</span>
                        <span className='span_title'>{`${notice.comment.board.title}`}</span>
                        <span>글의 댓글에 답글을 남기셨습니다.</span>
                      </span>
                      <li>
                        <RiDeleteBin6Line
                          onClick={() => deleteNoti(notice.notiId)}
                          size='20'
                          className='notice_delete'
                        />
                      </li>
                    </li>
                  );
                } else if (notice.type === 'chatNoti') {
                  return (
                    <li
                      key={idx}
                      className='each_notice'
                      onClick={() => {
                        setModalIsOpen(true);
                      }}
                    >
                      <span>{`${notice.sender.nickname}님으로부터 새로운 채팅이 있습니다.`}</span>
                      <li>
                        <RiDeleteBin6Line
                          onClick={() => deleteNoti(notice.notiId)}
                          size='20'
                          className='notice_delete'
                        />
                      </li>
                    </li>
                  );
                } else if (notice.type === 'editNoti') {
                  return (
                    <li key={idx}>
                      <span>{`에디터로 등록되셨습니다.`}</span>
                      <RiDeleteBin6Line
                        onClick={() => deleteNoti(notice.notiId)}
                        size='20'
                        className='notice_delete'
                      />
                    </li>
                  );
                } else if (notice.type === 'thumbNoti') {
                  return (
                    <li key={idx} className='each_notice'>
                      <span>{`썸네일러로 등록되셨습니다.`}</span>
                      <RiDeleteBin6Line
                        onClick={() => deleteNoti(notice.notiId)}
                        size='20'
                        className='notice_delete'
                      />
                    </li>
                  );
                } else if (notice.type === 'youtubeNoti') {
                  return (
                    <li key={idx} className='each_notice'>
                      <span>{`유튜버로 등록되셨습니다.`}</span>
                      <RiDeleteBin6Line
                        onClick={() => deleteNoti(notice.notiId)}
                        size='20'
                        className='notice_delete'
                      />
                    </li>
                  );
                } else if (notice.type === 'rejectNoti') {
                  return (
                    <li key={idx} className='each_notice'>
                      <span>{`유튜버로 등록이 거절되었습니다. 신청 절차를 다시 확인해주세요.`}</span>
                      <RiDeleteBin6Line
                        onClick={() => deleteNoti(notice.notiId)}
                        size='20'
                        className='notice_delete'
                      />
                    </li>
                  );
                } else {
                  return null;
                }
              })}
            </ul>
          </div>
        ) : (
          <li style={{ cursor: 'default', fontSize: '17px' }}>
            새로운 알림이 없습니다.
          </li>
        )}
      </div>
    )
  );
};
export default NotificationDropdown;
