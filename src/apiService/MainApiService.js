import instance from '../AxiosConfig.js';

export const getfetchMainData = async () => {
  return await instance({
    url: 'main/board',
    method: 'get',
  });
};
