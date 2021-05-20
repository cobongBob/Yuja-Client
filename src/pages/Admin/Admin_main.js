import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { ToastCenter } from "../../modules/ToastModule";
import AdminReports from "./AdminReports";
import AdminUsers from "./AdminUsers";
import AdminYoutuber from "./AdminYoutuber";
import AdminSide from "./AdminSide";
import "./Admin.scss";
import { fetchReports } from "../../apiService/ReportApiService";
import { banUser, fetchAllUnauthYoutuber, fetchUsers } from "../../apiService/AdminApiService";

const Admin_main = () => {
  const { authorities } = useSelector((state) => state.loginReducer);
  const history = useHistory();
  const [allUsers, setAllUsers] = useState([]);
  const [youtuberConfirm, setYoutuberConfirm] = useState([]);
  const [allReports, setAllReports] = useState([]);

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
      console.log(123, res);
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

  return (
    allUsers &&
    allReports && (
      <div className='admin_main'>
        <AdminSide />
        <div className='admin_items'>
          <div className='admin_item'>
            <div>
              {pathname.includes("/AdminReports") ? <AdminReports allReports={allReports} /> : null}
              {pathname.includes("/AdminUsers") ? <AdminUsers allUsers={allUsers} userSetBan={userSetBan} /> : null}
              {pathname.includes("/AdminYoutuber") ? <AdminYoutuber youtuberConfirm={youtuberConfirm} /> : null}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Admin_main;
