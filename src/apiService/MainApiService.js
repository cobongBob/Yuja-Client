import instance from '../AxiosConfig.js';

export const getMainData = async () => {
  return await instance({
    url: 'main/board',
    method: 'get',
  });
};
