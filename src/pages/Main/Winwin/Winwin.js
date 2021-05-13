import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWinBoard } from "../../../redux/board/winwin/winBoardReducer";
// nav에서 윈윈게시판을 누르면 보이는 전체 컴포넌트
const Winwin = () => {
  const winBoard = useSelector((state) => state.winBoardReducer);
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.loginReducer);

  useEffect(() => {
    console.log("hihi");
    if (userData.id) {
      dispatch(getWinBoard(userData.id));
    } else {
      dispatch(getWinBoard(0));
    }
  }, [userData]);

  return winBoard.loading ? (
    <h2>Loading...</h2>
  ) : winBoard.err ? (
    <h2>{winBoard.err}</h2>
  ) : (
    <div>
      <h1>윈윈 게시판</h1>
      <div>{winBoard && winBoard.wBoards && winBoard.wBoards.map((board) => <p>{board.title}</p>)}</div>
    </div>
  );
};

export default Winwin;
