import React from 'react';

function NextArrow(props) {
  const { className, onClick, style } = props;
  return (
    <>
    {window.screen.width < 780 ?
        ""
        :
    <div
      className={className}
      onClick={onClick}
      style={{ ...style, display: 'block' }}
    >
      <img src='/img/parts_pic/arrow_r.png' alt='arrow next' />
    </div>
    }
    </>
  );
}
export default NextArrow;
