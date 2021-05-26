import React, { useCallback } from 'react';
import { IoMdNotifications } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { noticeWithPush } from '../../modules/ToastWithPush';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { deleteNotification } from '../../redux/loading/notiReducer';
import { Link } from 'react-router-dom';

const NotificationDropdown = ({ allNotifications }) => {
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
        <ul>
          <li className='modifyBox'>
            <Link to='/BeforeModify' className='modifyBtn'>
              정보수정
            </Link>
          </li>
        </ul>
        {allNotifications.length > 0 &&
        userData &&
        userData.id !== 0 &&
        allNotifications[0].resipeint.id === userData.id ? (
          <div>
            <div variant='' id='dropdown-basic'>
              <IoMdNotifications className='noti_icon' size='30' />
            </div>
            <ul>
              {allNotifications.map((notice, idx) => {
                if (notice.type === 'commentNoti') {
                  return (
                    <div key={idx} className='each_notice'>
                      <RiDeleteBin6Line
                        onClick={() => deleteNoti(notice.notiId)}
                        size='22'
                        className='notice_delete'
                      />
                      <li onClick={() => noticeWithPush(notice, history)}>
                        <span>{`${notice.resipeint.nickname}님께서 ${notice.comment.board.title}글에 댓글을 남기셨습니다.`}</span>
                      </li>
                    </div>
                  );
                } else if (notice.type === 'chatNoti') {
                  return (
                    <div key={idx} className='each_notice'>
                      <RiDeleteBin6Line
                        onClick={() => deleteNoti(notice.notiId)}
                        size='10'
                        className='notice_delete'
                      />
                      <li>
                        <span>{`${notice.sender.nickname}님으로부터 새로운 채팅이 있습니다.`}</span>
                      </li>
                    </div>
                  );
                } else if (notice.type === 'editNoti') {
                  return (
                    <div key={idx} className='each_notice'>
                      <RiDeleteBin6Line
                        onClick={() => deleteNoti(notice.notiId)}
                        size='22'
                        className='notice_delete'
                      />
                      <li>
                        <span>{`에디터로 등록되셨습니다.`}</span>
                      </li>
                    </div>
                  );
                } else if (notice.type === 'thumbNoti') {
                  return (
                    <div key={idx} className='each_notice'>
                      <RiDeleteBin6Line
                        onClick={() => deleteNoti(notice.notiId)}
                        size='22'
                        className='notice_delete'
                      />
                      <li>
                        <span>{`썸네일러로 등록되셨습니다.`}</span>
                      </li>
                    </div>
                  );
                } else if (notice.type === 'youtubeNoti') {
                  return (
                    <div key={idx} className='each_notice'>
                      <RiDeleteBin6Line
                        onClick={() => deleteNoti(notice.notiId)}
                        size='22'
                        className='notice_delete'
                      />
                      <li>
                        <span>{`유튜버로 등록되셨습니다.`}</span>
                      </li>
                    </div>
                  );
                } else if (notice.type === 'rejectNoti') {
                  return (
                    <div key={idx} className='each_notice'>
                      <RiDeleteBin6Line
                        onClick={() => deleteNoti(notice.notiId)}
                        size='22'
                        className='notice_delete'
                      />
                      <li>
                        <span>{`유튜버로 등록이 거절되었습니다. 신청 절차를 다시 확인해주세요.`}</span>
                      </li>
                    </div>
                  );
                } else {
                  return null;
                }
              })}
            </ul>
          </div>
        ) : (
          <>
            <li>비어있습니다.</li>
          </>
        )}
      </div>
    )
  );
};
export default NotificationDropdown;
