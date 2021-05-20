import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { ToastCenter } from "../../modules/ToastModule";
import AdminReports from "./AdminReports";
import AdminUsers from "./AdminUsers";
import AdminYoutuber from "./AdminYoutuber";
import AdminSide from "./AdminSide";
import "./Admin.scss";
import { fetchReports } from "../../apiService/ReportApiService";
import { fetchAllUnauthYoutuber, fetchUsers } from "../../apiService/AdminApiService";

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
      console.log("data=", res.data);
    });
  }, []);

  const pathname = useLocation().pathname;
  console.log(123123, pathname);

  return (
    allUsers &&
    allReports && (
      <div className='admin_main'>
        <AdminSide />
        <div className='admin_items'>
          <div className='admin_item'>
            <div>
              {pathname.includes("/AdminReports") ? <AdminReports allReports={allReports} /> : null}
              {pathname.includes("/AdminUsers") ? <AdminUsers allUsers={allUsers} /> : null}
              {pathname.includes("/AdminYoutuber") ? <AdminYoutuber youtuberConfirm={youtuberConfirm} /> : null}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Admin_main;
