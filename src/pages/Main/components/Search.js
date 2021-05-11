import React, { useRef } from 'react';
import '../Youtuber/Ylist.scss';

export default function Search(props) {
  const { boardData, term, searchKeyword } = props;
  console.log('뭐가 들어옴?', boardData, term, searchKeyword);

  const inputEl = useRef('');

  const getSearchTerm = () => {
    searchKeyword(inputEl.current.value);
  };

  return (
    <div className='search-box'>
      <div className='search-form'>
        <input
          ref={inputEl}
          type='text'
          placeholder='검색어를 입력해주세요.'
          value={term}
          onChange={getSearchTerm}
        />
      </div>
    </div>
  );
}
