import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLike, deleteLike, getDetailData } from "../../../redux/board/editer/eboardReducer";
import * as EditerApiService from "../../../apiService/EditerApiService";
import "../Editer/EditorDetail.scss";
import { useHistory } from "react-router";
import ReactQuill from "react-quill";
import { ToastCenter, ToastTopRight } from "../../../modules/ToastModule";

const ThumbDetail = ({ match }) => {
  const { current: board_type } = useRef(match.params.board_type);
  const { current: pageNum } = useRef(match.params.current_page);
  const dispatch = useDispatch();
  const history = useHistory();
  const { userData } = useSelector((state) => state.loginReducer);
  const { detailData } = useSelector((state) => state.EboardReducer);

  useEffect(() => {
    const board_id = match.params.board_id;
    if (board_id) {
      getDetailData(board_id).then((res) => {
        dispatch(res);
      });
    }
  }, [dispatch, match.params.board_id, userData]);

  const deleteBoard = () => {
    if (window.confirm(`정말 삭제 하시겠습니까?`)) {
      EditerApiService.deleteBoard(match.params.board_id).then((res) => {
        ToastTopRight(res.data);
        history.push(`/Thboard/${board_type}/${pageNum}`);
      });
    }
  };

  const likeHandler = useCallback(() => {
    if (userData && userData.id) {
      if (detailData && detailData.liked) {
        deleteLike(match.params.board_id, userData.id).then((res) => {
          dispatch(res);
        });
      } else {
        addLike(match.params.board_id, userData.id).then((res) => {
          dispatch(res);
        });
      }
    } else {
      ToastCenter("로그인 해주세요");
    }
  }, [userData, dispatch, match, detailData]);

  return (
    detailData && (
      <div>
        <div className='editordetail-wrapper'>
          <div className='comment-options'>
            <button onClick={() => history.push(`/Thboard/${board_type}/${pageNum}`)}>목록</button>
          </div>
          {userData && userData.id === detailData.user.id ? (
            <div className='comment-options-user'>
              {/* <button onClick={modifyBoard}>수정</button> */}
              <button onClick={deleteBoard}>삭제</button>
            </div>
          ) : null}
          <div className='editordetail-header-wrapper'>
            <div className='editordetail-header'>이력서</div>
            <div>{detailData.title}</div>
            <div className='DetailQuill'>
              <ReactQuill className='QuillContent' value={detailData.content || ""} readOnly={true} theme={"bubble"} />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ThumbDetail;
