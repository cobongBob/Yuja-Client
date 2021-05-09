import React, { useEffect, useState } from 'react';
import YapiService from '../YapiService';

const MODE_SORT_EXPIRED_DATE = 'sortExpiredDate';
const MODE_SORT_LIKES = 'sortLikes';

const [data, setData] = useState([]);

export const sortExpiredDate = (sortedData) => ({
  type: MODE_SORT_EXPIRED_DATE,
  sortedData: setData({ sortedData }),
});

export const sortLikes = (sortedData) => ({
  type: MODE_SORT_LIKES,
  sortedData: setData({ sortedData }),
});

const initialState = useEffect(() => {
  YapiService.fetchBoards().then((res) => {
    res.data.sort((a, b) => {
      return (
        new Date(b.expiredDate).getTime() - new Date(a.expiredDate).getTime()
      );
    });
    console.log(initialState);
  });
}, []);

export function YboardReducer(state = initialState, action) {
  switch (action.type) {
    case MODE_SORT_EXPIRED_DATE:
      return {
        data: initialState.sort((a, b) =>
          (b.expiredDate.getTime() - a.expiredDate.getTime()).reverse()
        ), // setData를 써야할꺼같긴함
      };
    case MODE_SORT_LIKES:
      return {
        data: initialState.sort((a, b) => b.likes - a.likes),
        // setData를 써야할꺼같긴함
      };
  }
}
