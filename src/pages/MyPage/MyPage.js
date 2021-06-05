import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfileData } from "../../apiService/UserApiService";
import MyPageTable from "./MyPageTable";

const MyPage = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.loginReducer);
  const [defaultData, setDefaultData] = useState([]);

  useEffect(() => {
    userData &&
      userData.id > 0 &&
      getUserProfileData(userData.id).then((res) => {
        setDefaultData(res.data);
      });
  }, [dispatch, userData]);

  const [youtubeLikeList, setYoutubeList] = useState([]);
  const [editorLikeList, setEditorLikeList] = useState([]);
  const [thumbLikeList, setThumbLikeList] = useState([]);
  const [freeLikeList, setFreeLikeList] = useState([]);

  useEffect(() => {
    if (defaultData.length > 0) {
      setYoutubeList(defaultData.filter((data) => data.boardType.boardCode === 1));
      setEditorLikeList(defaultData.filter((data) => data.boardType.boardCode === 2));
      setThumbLikeList(defaultData.filter((data) => data.boardType.boardCode === 3));
      setFreeLikeList(
        defaultData.filter(
          (data) =>
            data.boardType.boardCode === 4 ||
            data.boardType.boardCode === 5 ||
            data.boardType.boardCode === 6 ||
            data.boardType.boardCode === 7
        )
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
