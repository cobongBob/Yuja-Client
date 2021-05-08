import React, { useState, useEffect } from 'react';

const AuthCodeTimer = (props) => {

  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(10);
  const start = props.start;
  const setStart = props.setStart;

  let total = minutes + seconds

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
  total !== 0 ?
    <>
      {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </>
    :
    <>
        만료
    </>
  );
};

export default AuthCodeTimer;