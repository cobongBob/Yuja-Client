import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getWinBoard } from "../../../redux/board/winwin/winBoardReducer";
import { MdFiberNew } from "react-icons/md";
import "./Winwin.scss";
import getFormatDate from "../../../getFormatDate";
// nav에서 윈윈게시판을 누르면 보이는 전체 컴포넌트
const Winwin = () => {
  const winBoard = useSelector((state) => state.winBoardReducer);
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.loginReducer);
  useEffect(() => {
    dispatch(getWinBoard());
  }, [userData, dispatch]);

  return winBoard.loading ? (
    <h2>Loading...</h2>
  ) : winBoard.err ? (
    <h2>{winBoard.err}</h2>
  ) : (
    <div>
      <div className='sideMenu'>
        <h2>커뮤니티</h2>
        <div>
          <Link>윈윈</Link> <br />
          <Link>합방해요</Link>
        </div>
      </div>
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
              <th className='createdDate'>작성일</th>
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
                      <span className='commentNum'> [{board.comments}] </span>
                    </Link>
                    {board.createDate.substr(0, 10) === getFormatDate(new Date()) ? (
                      <MdFiberNew className='new_icon' size='25' />
                    ) : null}
                  </td>
                  <td>{board.user.nickname}</td>
                  <td>{board.createDate.substr(0, 10)}</td>
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
