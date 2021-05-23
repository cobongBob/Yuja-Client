import React, { useCallback, useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { IoMdNotifications, IoMdNotificationsOutline } from "react-icons/io";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { fetchAllNotifications, removeNotiPermanently } from "../../apiService/MainApiService";
import { noticeWithPush } from "../../modules/ToastWithPush";

import { AiTwotoneDelete } from "react-icons/ai";

const NotificationDropdown = () => {
  const [allNoti, setAllNoti] = useState([]);
  const { userData } = useSelector((state) => state.loginReducer);
  const history = useHistory();
  useEffect(() => {
    if (userData && userData.id !== 0) {
      fetchAllNotifications(userData.id).then((res) => {
        setAllNoti(res.data);
      });
    }
  }, [userData]);

  const deleteNoti = useCallback(
    (notiId) => {
      removeNotiPermanently(notiId).then((res) => {
        fetchAllNotifications(userData.id).then((res) => {
          setAllNoti(res.data);
        });
      });
    },
    [userData]
  );

  return (
    userData &&
    userData.id !== 0 && (
      <Dropdown className='notiOnNav'>
        {allNoti.length > 0 && userData && userData.id !== 0 ? (
          <>
            <Dropdown.Toggle variant='' id='dropdown-basic'>
              <IoMdNotifications className='noti_icon' size='30' />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {allNoti.map((notice, idx) => {
                if (notice.type === "commentNoti") {
                  return (
                    <div key={idx} className='each_notice'>
                      <AiTwotoneDelete onClick={() => deleteNoti(notice.notiId)} size='22' className='notice_delete' />
                      <Dropdown.Item onClick={() => noticeWithPush(notice, history)}>
                        <span>{`${notice.resipeint.nickname}님께서 ${notice.comment.board.title}글에 댓글을 남기셨습니다.`}</span>
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
