import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getWinBoard } from "../../../redux/board/winwin/winBoardReducer";
import { MdFiberNew } from "react-icons/md";
import "./Winwin.scss";
// nav에서 윈윈게시판을 누르면 보이는 전체 컴포넌트
const Winwin = () => {
  const winBoard = useSelector((state) => state.winBoardReducer);
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.loginReducer);

  // yyyy-MM-dd 포맷으로 반환
  const getFormatDate = useCallback((date) => {
    let year = date.getFullYear();
    let month = 1 + date.getMonth();
    month = month >= 10 ? month : "0" + month;
    let day = date.getDate();
    day = day >= 10 ? day : "0" + day;
    return year + "-" + month + "-" + day;
  }, []);

  useEffect(() => {
    if (userData.id) {
      dispatch(getWinBoard(userData.id));
    } else {
      dispatch(getWinBoard(0));
    }
  }, [userData, dispatch]);

  return winBoard.loading ? (
    <h2>Loading...</h2>
  ) : winBoard.err ? (
    <h2>{winBoard.err}</h2>
  ) : (
    <div>
      <h1>윈윈 게시판</h1>
      <div className='tableWrapper'>
        <Link to='/Wregister' className='registerBtn'>
          글쓰기
        </Link>
        <table className='table'>
          <thead>
            <tr>
              <th className='no'>번호</th>
              <th className='title'>제목</th>
              <th className='writer'>작성자</th>
              <th className='updatedDate'>작성일</th>
              <th className='hit'>조회수</th>
            </tr>
          </thead>
          <tbody>
            {winBoard &&
              winBoard.wBoards &&
              winBoard.wBoards.map((board, idx) => (
                <tr key={board.id}>
                  <td>{winBoard.wBoards.length - idx}</td>
                  <td>
                    <Link className='table_link' to={`/Wdetail/${board.id}`}>
                      {board.title}
                      <span className='commentNum'> [{board.comments}]</span>
                    </Link>
                    {board.createDate === getFormatDate(new Date()) ? <MdFiberNew className='new_icon' /> : null}
                  </td>
                  <td>{board.user.nickname}</td>
                  <td>{board.updatedDate.substr(0, 10)}</td>
                  <td>{board.hit}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Winwin;
