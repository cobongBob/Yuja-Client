import React, { useRef } from 'react';
import '../Youtuber/Ylist.scss';
import './Components.scss';

export default function Search({ boardData, term, setTerm, searchKeyword }) {
  const inputEl = useRef('');

  const getSearchTerm = () => {
    searchKeyword(inputEl.current.value);
  };
  const submit = (e) => {
    e.preventDefault();
    searchKeyword(inputEl.current.value);
  };

  return (
    <div className='search-box'>
      <div className='search-form'>
        <form onSubmit={(e) => submit(e)}>
          <input
            ref={inputEl}
            type='text'
            placeholder='검색어를 입력해주세요.'
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
          <input value='검색' type='submit' />
        </form>
      </div>
    </div>
  );
}
