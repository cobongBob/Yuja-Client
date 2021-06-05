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
  removeUserData,
  fetchAllQnABoards,
  removeQnA,
} from "../../apiService/AdminApiService";
import AdminBoard from "./AdminBoard";
import { deleteUser } from "../../apiService/UserApiService";
import AdminQnA from "./AdminQnA";

const Admin_main = () => {
  const { authorities } = useSelector((state) => state.loginReducer);
  const history = useHistory();
  const [allUsers, setAllUsers] = useState([]);
  const [youtuberConfirm, setYoutuberConfirm] = useState([]);
  const [allReports, setAllReports] = useState([]);
  const [allBoards, setAllBoards] = useState([]);
  const [allQnAs, setAllQnAs] = useState([]);
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
    fetchAllQnABoards().then((res) => {
      setAllQnAs(res.data);
    });
  }, []);

  const pathname = useLocation().pathname;

  const userSetBan = useCallback(
    (user_id, username, isBanned) => {
      if (!isBanned) {
        if (window.confirm(`${username}를 밴 하시겠습니까?`)) {
          banUser(user_id).then((res) => {
            ToastCenter(res.data);
            setAllUsers(
              allUsers.map((user) => {
                if (user.id === user_id) {
                  user.banned = true;
                }
                return user;
              })
            );
          });
        }
      } else {
        if (window.confirm(`${username}를 밴 해제 하시겠습니까?`)) {
          banUser(user_id).then((res) => {
            ToastCenter(res.data);
            setAllUsers(
              allUsers.map((user) => {
                if (user.id === user_id) {
                  user.banned = false;
                }
                return user;
              })
            );
          });
        }
      }
    },
    [allUsers]
  );

  const promoteUser = useCallback(
    (youtubeConfirmId, bsn, youtubeUrl, user_id) => {
      const data = {
        youtubeConfirmId: youtubeConfirmId,
        bsn: bsn,
        youtubeUrl: youtubeUrl,
        userId: user_id,
      };
      promoteUserService(data).then((res) => {
        setYoutuberConfirm(
          youtuberConfirm.filter((confirm) => {
            return confirm.youtubeConfirmId !== youtubeConfirmId;
          })
        );
      });
    },
    [youtuberConfirm]
  );
  const rejectUser = useCallback(
    (youtubeConfirmId) => {
      rejectUserService(youtubeConfirmId).then((res) => {
        setYoutuberConfirm(
          youtuberConfirm.filter((confirm) => {
            return confirm.youtubeConfirmId !== youtubeConfirmId;
          })
        );
      });
    },
    [youtuberConfirm]
  );
  const deleteReported = useCallback(
    (title, id) => {
      const idx = title.indexOf("##");
      const reportedBoardCode = Number(title.substr(0, idx).trim());
      const reportedBoardId = Number(title.substr(idx + 2).trim());
      deleteReportedBoard(reportedBoardId, reportedBoardCode).then((res) => {
        ToastTopRight(res.data);
      });
      deleteReportedBoard(id, 8).then((result) => {
        setAllReports(
          allReports.filter((report) => {
            return report.id !== id;
          })
        );
      });
    },
    [allReports]
  );

  const reject = useCallback(
    (id) => {
      deleteReportedBoard(id, 8).then((result) => {
        ToastCenter(result.data);
        setAllReports(
          allReports.filter((report) => {
            return report.id !== id;
          })
        );
      });
    },
    [allReports]
  );

  const noticeSwitch = useCallback(
    (board_id) => {
      noticePrivateSwitch(board_id).then((result) => {
        setAllBoards(
          allBoards.map((board) => {
            if (board.id === board_id) {
              board.isPrivate = !board.isPrivate;
            }
            return board;
          })
        );
      });
    },
    [allBoards]
  );

  const userRecovery = useCallback(
    (user_id) => {
      deleteUser(user_id).then((res) => {
        ToastCenter(res.data);
        setAllUsers(
          allUsers.map((user) => {
            if (user.id === user_id) {
              user.deleted = false;
            }
            return user;
          })
        );
      });
    },
    [allUsers]
  );

  const userRemove = useCallback(
    (user_id) => {
      if (window.confirm("삭제되면 복구하실수 없습니다. 정말 삭제 하시겠습니까?")) {
        removeUserData(user_id).then((res) => {
          ToastCenter(res.data);
          setAllUsers(
            allUsers.filter((user) => {
              return user.id !== user_id;
            })
          );
        });
      }
    },
    [allUsers]
  );

  const deleteQnA = useCallback(
    (qna_id) => {
      if (window.confirm("정말 삭제 하시겠습니까?")) {
        removeQnA(qna_id).then((res) => {
          ToastCenter(res.data);
          setAllQnAs(
            allQnAs.filter((qna) => {
              return qna.id !== qna_id;
            })
          );
        });
      }
    },
    [allQnAs]
  );
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
                {pathname.includes("/AdminUsers") ? (
                  <AdminUsers
                    allUsers={allUsers}
                    userSetBan={userSetBan}
                    userRemove={userRemove}
                    userRecovery={userRecovery}
                  />
                ) : null}
                {pathname.includes("/AdminYoutuber") ? (
                  <AdminYoutuber youtuberConfirm={youtuberConfirm} promoteUser={promoteUser} rejectUser={rejectUser} />
                ) : null}
                {pathname.includes("/AdminReports") ? (
                  <AdminReports allReports={allReports} deleteReported={deleteReported} reject={reject} />
                ) : null}
                {pathname.includes("/AdminBoard") ? (
                  <AdminBoard allBoards={allBoards} noticeSwitch={noticeSwitch} />
                ) : null}
                {pathname.includes("/AdminQnA") ? <AdminQnA allQnAs={allQnAs} deleteQnA={deleteQnA} /> : null}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default Admin_main;
