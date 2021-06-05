import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedInUserData } from "../../apiService/AuthenticationService";
import { getUserProfileData } from "../../apiService/UserApiService";
import MyPageTable from "./MyPageTable";

const MyPage = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.loginReducer);
  const [defaultData, setDefaultData] = useState([]);
  const loggedInUserData = getLoggedInUserData();
  const userId = loggedInUserData && loggedInUserData.id ? loggedInUserData.id : null;

  useEffect(() => {
    getUserProfileData(userId).then((res) => {
      setDefaultData(res);
    });
  }, [dispatch, userId]);

  return <MyPageTable boardData={defaultData} userData={userData} />;
};

export default MyPage;
