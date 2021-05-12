import YapiService from '../../pages/Main/Youtuber/YapiService';
import * as likeService from '../../pages/Main/likeService';
// 액션
const GET_LIKE = 'GET_LIKE';
const ADD_LIKE = 'ADD_LIKE';
const GET_LIKE_REQUEST = 'GET_LIKE_REQUEST';
const GET_LIKE_SUCCESS = 'GET_LIKE_SUCCESS';
const GET_LIKE_FAIL = 'GET_LIKE_FAIL';
const DELETE_LIKE = 'DELETE_LIKE';

// 액션 함수

export const getLiked = async (board_id, user_id) => {
  const likesData = await YapiService.fetchBoard(board_id, user_id);
  return {
    type: GET_LIKE,
    countLikes: likesData.data.likes,
    isLiked: likesData.data.liked,
  };
};

export const addLike = async (board_id, user_id) => {
  const data = {
    boardId: board_id,
    userId: user_id,
  };
  await likeService.addLike(data);
  return {
    type: ADD_LIKE,
  };
};
export const deleteLike = async (board_id, user_id) => {
  const data = {
    boardId: board_id,
    userId: user_id,
  };
  await likeService.deleteLike(data);
  return {
    type: DELETE_LIKE,
  };
};

// 초기값

const initialState = {
  countLikes: 0,
  isLiked: false,
};

// 리듀서

export default function likedReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIKE:
      return {
        ...state,
        countLikes: action.countLikes,
        isLiked: action.isLiked,
      };
    case ADD_LIKE:
      return {
        ...state,
        countLikes: state.countLikes + 1,
        isLiked: true,
      };
    case DELETE_LIKE:
      return {
        ...state,
        countLikes: state.countLikes - 1,
        isLiked: false,
      };
    default:
      return state;
  }
}
