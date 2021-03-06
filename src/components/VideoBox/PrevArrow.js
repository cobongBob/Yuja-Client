import React from 'react';

function PrevArrow(props) {
  const { className, style, onClick } = props;
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
          <img src="/img/parts_pic/arrow_l.png" alt="arrow next" />
        </div>
      }
      </>
  );
}

export default PrevArrow;
