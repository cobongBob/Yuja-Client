import React, { useRef } from 'react';
import '../Youtuber/Ylist.scss';
import './Components.scss';
import { AiOutlineSearch } from 'react-icons/ai';

export default function Search({ boardData, term, setTerm, searchKeyword }) {
  const inputEl = useRef('');

  const submit = (e) => {
    e.preventDefault();
    searchKeyword(inputEl.current.value);
  };

  return (
    <div className='search-box'>
      <div className='search-form'>
        <form onSubmit={(e) => submit(e)}>
          <input
            type='text'
            ref={inputEl}
            placeholder='검색어를 입력해주세요.'
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
          <AiOutlineSearch className='search-icon'>
            <input type='submit' />
          </AiOutlineSearch>
        </form>
      </div>
    </div>
  );
}
