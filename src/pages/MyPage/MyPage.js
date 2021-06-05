import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLoggedInUserData } from '../../apiService/AuthenticationService';
import { getUserProfileData } from '../../apiService/UserApiService';
import { userCheck } from '../../redux/redux-login/loginReducer';
import MyPageTable from './MyPageTable';

const MyPage = () => {
  const dispatch = useDispatch();
  const { userData, authorities } = useSelector((state) => state.loginReducer);
  const [defaultData, setDefaultData] = useState([]);
  const loggedInUserData = getLoggedInUserData();
  const userId =
    loggedInUserData && loggedInUserData.id ? loggedInUserData.id : null;
  useEffect(() => {
    userCheck().then((res) => {
      dispatch(res);
    });
  }, [dispatch]);
  useEffect(() => {
    getUserProfileData(userId).then((res) => {
      setDefaultData(res);
    });
  }, [dispatch, userId]);
  return <MyPageTable boardData={defaultData} userData={userData} />;
};

export default MyPage;
