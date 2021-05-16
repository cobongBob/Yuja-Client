import instance from '../AxiosConfig.js';

export const addReport = async (data) => {
  return await instance({
    url: 'reported',
    method: 'post',
    data: data,
  });
};
