import React, { useEffect, useState } from 'react';
import { getUserProfileData } from '../../apiService/UserApiService';

const MyPage = ({ userData }) => {
  const [userProfileId, setUserProfileId] = useState('');
  useEffect(() => {
    getUserProfileData(userProfileId).then((res) => {
      setUserProfileId({ id: res.data });
    });
  }, [userProfileId]);
  console.log(1111, userProfileId);
  console.log(2222, userData.nickname);
  return <div> 유저아이디: {userData.nickname} </div>;
};

export default MyPage;
