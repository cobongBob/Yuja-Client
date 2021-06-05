import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLoggedInUserData } from '../../apiService/AuthenticationService';
import { getUserProfileData } from '../../apiService/UserApiService';
import MyPageTable from './MyPageTable';

const MyPage = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.loginReducer);
  const [defaultData, setDefaultData] = useState([]);
  const loggedInUserData = getLoggedInUserData();
  const userId =
    loggedInUserData && loggedInUserData.id ? loggedInUserData.id : null;

  useEffect(() => {
    getUserProfileData(userId).then((res) => {
      setDefaultData(res.data);
    });
  }, [dispatch, userId]);

  const [youtubeLikeList, setYoutubeList] = useState([]);
  const [editorLikeList, setEditorLikeList] = useState([]);
  const [thumbLikeList, setThumbLikeList] = useState([]);
  const [freeLikeList, setFreeLikeList] = useState([]);

  useEffect(() => {
    if (defaultData.length > 0) {
      setYoutubeList(
        defaultData.filter((data) => {
          if (data.boardType.boardCode === 1) {
            return data;
          }
        })
      );
      setEditorLikeList(
        defaultData.filter((data) => {
          if (data.boardType.boardCode === 2) {
            return data;
          }
        })
      );
      setThumbLikeList(
        defaultData.filter((data) => {
          if (data.boardType.boardCode === 3) {
            return data;
          }
        })
      );
      setFreeLikeList(
        defaultData.filter((data) => {
          if (
            data.boardType.boardCode === 4 ||
            data.boardType.boardCode === 5 ||
            data.boardType.boardCode === 6 ||
            data.boardType.boardCode === 7
          ) {
            return data;
          }
        })
      );
    }
  }, [defaultData]);

  return (
    <MyPageTable
      youtubeLikeList={youtubeLikeList}
      setYoutubeList={setYoutubeList}
      editorLikeList={editorLikeList}
      setEditorLikeList={setEditorLikeList}
      thumbLikeList={thumbLikeList}
      setThumbLikeList={setThumbLikeList}
      freeLikeList={freeLikeList}
      setFreeLikeList={setFreeLikeList}
      userData={userData}
    />
  );
};

export default MyPage;
