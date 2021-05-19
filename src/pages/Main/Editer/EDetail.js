import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLike, deleteLike, getDetailData } from "../../../redux/board/editer/eboardReducer";
import * as EditerApiService from "../../../apiService/EditerApiService";
import "./EditorDetail.scss";
import { ToastTopRight } from "../../../modules/ToastModule";

const EDetail = (props) => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.loginReducer);
  const { detailData } = useSelector((state) => state.EboardReducer);

  useEffect(() => {
    const board_id = props.match.params.board_id;
    if (board_id) {
      getDetailData(board_id).then((res) => {
        dispatch(res);
      });
    }
  }, [dispatch, props.match.params.board_id, userData]);

  const deleteBoard = () => {
    if (window.confirm(`정말 삭제 하시겠습니까?`)) {
      EditerApiService.deleteBoard(props.match.params.board_id).then((res) => {
        ToastTopRight(res.data);
        props.history.push("/Editor");
      });
    }
  };

  const likeHandler = useCallback(() => {
    if (userData && userData.id) {
      if (detailData && detailData.liked) {
        deleteLike(props.match.params.board_id, userData.id).then((res) => {
          dispatch(res);
        });
      } else {
        addLike(props.match.params.board_id, userData.id).then((res) => {
          dispatch(res);
        });
      }
    } else {
      ToastTopRight("로그인 해주세요");
    }
  }, [userData, dispatch, props.match.params.board_id, detailData]);

  return (
    <div>
      <div className='editordetail-wrapper'>
        <div className='editordetail-header-wrapper'>
          <div className='editordetail-header'>이력서</div>
        </div>
      </div>
    </div>
  );
};

export default EDetail;
