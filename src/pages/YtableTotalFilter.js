import React, { useState } from 'react';
import { useAsyncDebounce } from 'react-table';

const YtableTotalFilter = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter);

  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  });

  return (
    <div className='YtableSearch'>
      <span>
        글찾기: {''}
        <input
          value={value || ''}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
        />
      </span>
    </div>
  );
};

export default YtableTotalFilter;
