import React, { useState, useEffect } from 'react';

const AuthCodeTimer = (props) => {

  const [minutes, setMinutes] = useState(3);
  const [seconds, setSeconds] = useState(0);
  const start = props.start;
  const setStart = props.setStart;

  useEffect(() => {
    if(start) {
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
    }, 1000)
    return () => clearInterval(countdown);
    } else {
      setMinutes(3);
      setSeconds(0);
      setStart(!start);
    }
  }, [minutes, seconds, start]);

  return (
    <div className='authCodeTimerBox'>
      {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </div>
  );
};

export default AuthCodeTimer;