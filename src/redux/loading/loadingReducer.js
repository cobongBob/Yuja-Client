/* 액션 */
export const GLOBAL_LOADING = 'loading/LOADING'
export const GLOBAL_LOADED = 'loading/LOADED'
/* 액션 함수 */

/* 초기값 */
export const initialState = {
  loading: false
}

/* 리듀서 */
const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case GLOBAL_LOADING:
    return {
      ...state,
        loading: true
    }
    case GLOBAL_LOADED:
    return {
      ...state,
      loading: false
    }
  }
}
