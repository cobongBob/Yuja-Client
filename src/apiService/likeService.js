import instance from '../AxiosConfig.js';

export const addLike = async (data) => {
  return await instance({
    url: 'board/liked',
    method: 'post',
    data: data,
  });
};
export const deleteLike = async (data) => {
  return await instance({
    url: 'board/liked',
    method: 'delete',
    data: data,
  });
};
