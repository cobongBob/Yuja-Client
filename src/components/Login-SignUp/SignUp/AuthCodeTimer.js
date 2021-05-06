import React, { useState, useEffect } from 'react';

const AuthCodeTimer = ( { mm, ss } ) => {
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(countdown);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [minutes, seconds]);

  return (
    <div className='authCodeTimerBox'>
      {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      {console.log("타이머 작동 시작")}
    </div>
  );
};

export default AuthCodeTimer;