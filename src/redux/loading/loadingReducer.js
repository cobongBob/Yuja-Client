/* 액션 */
const GLOBAL_LOADING = "GLOBAL_LOADING/LOADING";
const GLOBAL_LOADED = "GLOBAL_LOADED/LOADED";
/* 액션 함수 */

export const getLoading = () => {
  return {
    type: GLOBAL_LOADING,
  };
};
export const getLoaded = () => {
  return {
    type: GLOBAL_LOADED,
  };
};

/* 초기값 */
export const initialState = {
  loading: false,
};

/* 리듀서 */
export default function loadingReducer(state = initialState, action) {
  switch (action.type) {
    case GLOBAL_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GLOBAL_LOADED:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
