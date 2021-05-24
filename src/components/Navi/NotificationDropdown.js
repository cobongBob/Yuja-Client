import React, { useCallback } from "react";
import { Dropdown } from "react-bootstrap";
import { IoMdNotifications, IoMdNotificationsOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { noticeWithPush } from "../../modules/ToastWithPush";
import { AiTwotoneDelete } from "react-icons/ai";
import { deleteNotification } from "../../redux/loading/notiReducer";

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
      <Dropdown className='notiOnNav'>
        {allNotifications.length > 0 && userData && userData.id !== 0 ? (
          <>
            <Dropdown.Toggle variant='' id='dropdown-basic'>
              <IoMdNotifications className='noti_icon' size='30' />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {allNotifications.map((notice, idx) => {
                if (notice.type === "commentNoti") {
                  return (
                    <div key={idx} className='each_notice'>
                      <AiTwotoneDelete onClick={() => deleteNoti(notice.notiId)} size='22' className='notice_delete' />
                      <Dropdown.Item onClick={() => noticeWithPush(notice, history)}>
                        <span>{`${notice.resipeint.nickname}님께서 ${notice.comment.board.title}글에 댓글을 남기셨습니다.`}</span>
                      </Dropdown.Item>
                    </div>
                  );
                } else if (notice.type === "chatNoti") {
                  return (
                    <div key={idx} className='each_notice'>
                      <AiTwotoneDelete onClick={() => deleteNoti(notice.notiId)} size='22' className='notice_delete' />
                      <Dropdown.Item>
                        <span>{`${notice.sender.nickname}님으로부터 새로운 채팅이 있습니다.`}</span>
                      </Dropdown.Item>
                    </div>
                  );
                } else if (notice.type === "editNoti") {
                  return (
                    <div key={idx} className='each_notice'>
                      <AiTwotoneDelete onClick={() => deleteNoti(notice.notiId)} size='22' className='notice_delete' />
                      <Dropdown.Item>
                        <span>{`에디터로 등록되셨습니다.`}</span>
                      </Dropdown.Item>
                    </div>
                  );
                } else if (notice.type === "thumbNoti") {
                  return (
                    <div key={idx} className='each_notice'>
                      <AiTwotoneDelete onClick={() => deleteNoti(notice.notiId)} size='22' className='notice_delete' />
                      <Dropdown.Item>
                        <span>{`썸네일러로 등록되셨습니다.`}</span>
                      </Dropdown.Item>
                    </div>
                  );
                } else if (notice.type === "youtubeNoti") {
                  return (
                    <div key={idx} className='each_notice'>
                      <AiTwotoneDelete onClick={() => deleteNoti(notice.notiId)} size='22' className='notice_delete' />
                      <Dropdown.Item>
                        <span>{`유튜버로 등록되셨습니다.`}</span>
                      </Dropdown.Item>
                    </div>
                  );
                } else if (notice.type === "rejectNoti") {
                  return (
                    <div key={idx} className='each_notice'>
                      <AiTwotoneDelete onClick={() => deleteNoti(notice.notiId)} size='22' className='notice_delete' />
                      <Dropdown.Item>
                        <span>{`유튜버로 등록이 거절되었습니다. 신청 절차를 다시 확인해주세요.`}</span>
                      </Dropdown.Item>
                    </div>
                  );
                } else {
                  return null;
                }
              })}
            </Dropdown.Menu>
          </>
        ) : (
          <>
            <Dropdown.Toggle variant='' id='dropdown-basic'>
              <IoMdNotificationsOutline className='noti_icon' size='30' />
            </Dropdown.Toggle>
            <Dropdown.Menu>비어있습니다.</Dropdown.Menu>
          </>
        )}
      </Dropdown>
    )
  );
};
export default NotificationDropdown;
