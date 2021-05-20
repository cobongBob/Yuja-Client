import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { ToastCenter } from "../../modules/ToastModule";
import AdminReports from "./AdminReports";
import AdminUsers from "./AdminUsers";
import AdminYoutuber from "./AdminYoutuber";
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

  return (
    allUsers &&
    allReports && (
      <div className='admin_main'>
        <div className='admin_items'>
          <div className='admin_item'>
            <div>
              <AdminUsers allUsers={allUsers} />
            </div>
            <div>
              <AdminYoutuber youtuberConfirm={youtuberConfirm} />
            </div>
            <div>
              <AdminReports allReports={allReports} />
            </div>
            <div>
              <AdminReports allReports={allReports} />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Admin_main;
