import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLoggedInUserData } from '../../apiService/AuthenticationService';
import { getUserProfileData } from '../../apiService/UserApiService';
import { userCheck } from '../../redux/redux-login/loginReducer';

const MyPage = () => {
  const dispatch = useDispatch();
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

  return (
    <div className='tableWrapper'>
      <span className='beforeModifyTitle'>즐겨찾기 목록</span>
      {defaultData.data &&
        defaultData.data?.map((data, idx) => (
          <ul key={idx}>
            <li>
              <div>{data.channelName} 공고자 채널이름</div>
              <div>{data.career} 지원자격</div>
              <div>{data.expiredDate} 마감날짜</div>
              <div>{data.manager} 담당자</div>
              <div>{data.receptionMethod} 담당자연락처</div>
              <div>{data.title} 공고제목</div>
              <div>{data.worker} 모집분야</div>
              <div>{data.ywhen} 상시모집/채용마감</div>
              <div>{data.tools} 사용기술</div>
            </li>
          </ul>
        ))}
    </div>
  );
};

export default MyPage;
