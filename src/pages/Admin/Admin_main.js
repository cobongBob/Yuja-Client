import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { ToastCenter, ToastTopRight } from "../../modules/ToastModule";
import AdminReports from "./AdminReports";
import AdminUsers from "./AdminUsers";
import AdminYoutuber from "./AdminYoutuber";
import AdminSide from "./AdminSide";
import "./Admin.scss";
import { fetchReports } from "../../apiService/ReportApiService";
import {
  banUser,
  deleteReportedBoard,
  fetchAllUnauthYoutuber,
  fetchUsers,
  promoteUserService,
  rejectUserService,
  fetchAllNoticeBoards,
  noticePrivateSwitch,
} from "../../apiService/AdminApiService";
import AdminBoard from "./AdminBoard";

const Admin_main = () => {
  const { authorities } = useSelector((state) => state.loginReducer);
  const history = useHistory();
  const [allUsers, setAllUsers] = useState([]);
  const [youtuberConfirm, setYoutuberConfirm] = useState([]);
  const [allReports, setAllReports] = useState([]);
  const [allBoards, setAllBoards] = useState([]);
  useEffect(() => {
    if (authorities && !authorities.includes("ADMIN")) {
      ToastCenter("잘못 된 접근입니다");
      history.push("/");
    }
  }, [authorities, history]);

  useEffect(() => {
    fetchReports().then((res) => {
      setAllReports(res.data);
    });
    fetchUsers().then((res) => {
      setAllUsers(res.data);
    });
    fetchAllUnauthYoutuber().then((res) => {
      setYoutuberConfirm(res.data);
    });
    fetchAllNoticeBoards().then((res) => {
      setAllBoards(res.data);
    });
  }, []);

  const pathname = useLocation().pathname;

  const userSetBan = useCallback((user_id, username, isBanned) => {
    if (!isBanned) {
      if (window.confirm(`${username}를 밴 하시겠습니까?`)) {
        banUser(user_id).then((res) => {
          ToastCenter(res.data);
          fetchUsers().then((result) => {
            setAllUsers(result.data);
          });
        });
      }
    } else {
      if (window.confirm(`${username}를 밴 해제 하시겠습니까?`)) {
        banUser(user_id).then((res) => {
          ToastCenter(res.data);
          fetchUsers().then((result) => {
            setAllUsers(result.data);
          });
        });
      }
    }
  }, []);

  const promoteUser = useCallback((youtubeConfirmId, bsn, youtubeUrl, user_id) => {
    const data = {
      youtubeConfirmId: youtubeConfirmId,
      bsn: bsn,
      youtubeUrl: youtubeUrl,
      userId: user_id,
    };
    promoteUserService(data).then((res) => {
      fetchAllUnauthYoutuber().then((res) => {
        setYoutuberConfirm(res.data);
      });
    });
  }, []);
  const rejectUser = useCallback((youtubeConfirmId) => {
    rejectUserService(youtubeConfirmId).then((res) => {
      fetchAllUnauthYoutuber().then((res) => {
        setYoutuberConfirm(res.data);
      });
    });
  }, []);
  const deleteReported = useCallback((title, id) => {
    const idx = title.indexOf("##");
    const reportedBoardCode = Number(title.substr(0, idx).trim());
    const reportedBoardId = Number(title.substr(idx + 2).trim());
    deleteReportedBoard(reportedBoardId, reportedBoardCode).then((res) => {
      ToastTopRight(res.data);
    });
    deleteReportedBoard(id, 8).then((result) => {
      fetchReports().then((res) => {
        setAllReports(res.data);
      });
    });
  }, []);

  const noticeSwitch = useCallback((board_id) => {
    noticePrivateSwitch(board_id).then((result) => {
      fetchAllNoticeBoards().then((res) => {
        setAllBoards(res.data);
      });
    });
  }, []);

  return (
    allUsers &&
    allReports &&
    youtuberConfirm && (
      <>
        <div className='sideBox'>
          <AdminSide />
        </div>
      <div className='admin_main'>
        <div className='admin_items'>
          <div className='admin_item'>
            <div>
              {pathname.includes("/AdminUsers") ? <AdminUsers allUsers={allUsers} userSetBan={userSetBan} /> : null}
              {pathname.includes("/AdminYoutuber") ? (
                <AdminYoutuber youtuberConfirm={youtuberConfirm} promoteUser={promoteUser} rejectUser={rejectUser} />
              ) : null}
              {pathname.includes("/AdminReports") ? (
                <AdminReports allReports={allReports} deleteReported={deleteReported} />
              ) : null}
              {pathname.includes("/AdminBoard") ? (
                <AdminBoard allBoards={allBoards} noticeSwitch={noticeSwitch} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
      </>
    )
  );
};

export default Admin_main;
