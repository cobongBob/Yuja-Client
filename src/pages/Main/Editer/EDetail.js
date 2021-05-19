import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addLike,
  deleteLike,
  getDetailData,
} from '../../../redux/board/editer/eboardReducer';
import * as EditerApiService from '../../../apiService/EditerApiService';
import './EditorDetail.scss';
import { ToastCenter } from '../../../modules/ToastModule';
import ReactQuill from 'react-quill';

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
    EditerApiService.deleteBoard(props.match.params.board_id).then((res) => {
      alert(res.data);
      props.history.push('/Editor');
    });
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
      ToastCenter('로그인 해주세요');
      //로그인 창으로
    }
  }, [userData, dispatch, props.match.params.board_id, detailData]);
  console.log(122, detailData);
  return (
    detailData && (
      <div>
        <div className='editordetail-wrapper'>
          <div className='editordetail-header-wrapper'>
            <div className='editordetail-header'>이력서</div>
          </div>
          <div className='editordetail-content-wrapper'>
            <div className='editordetail-content-title'>{detailData.title}</div>
            <div className='editordetail-content-user'>작성자</div>
            <div className='editordetail-content-like'>
              좋아요 {detailData.likes}
            </div>
            <div className='editordetail-content-hit'>
              조회수 {detailData.hit}
            </div>
            <div className='editordetail-content-pay'>
              급여방식 {detailData.payType}
              희망급여 {detailData.payAmount}
            </div>
            <div className='editordetail-content-tools'>
              사용기술 {detailData.tools}
            </div>
            <div className='editordetail-content-pr'>
              <ReactQuill
                className='QuillContent'
                value={detailData.content || ''}
                readOnly={true}
                theme={'bubble'}
              />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default EDetail;
