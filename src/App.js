import React, { useState, useRef } from 'react';
import styles from './App.css';

function Stopwatch() {
  const [milliseconds, setMilliseconds] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const intervalRef = useRef(null);

  const start = () => {
    if (intervalRef.current) return; // Prevent multiple intervals from being set

    intervalRef.current = setInterval(() => {
      setMilliseconds((prevMilliseconds) => {
        if (prevMilliseconds === 99) {
          setSeconds((prevSeconds) => {
            if (prevSeconds === 59) {
              setMinutes((prevMinutes) => prevMinutes + 1);
              return 0;
            }
            return prevSeconds + 1;
          });
          return 0;
        }
        return prevMilliseconds + 1;
      });
    }, 10);
  };

  const stop = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null; // Clear the interval reference
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setMilliseconds(0);
    setSeconds(0);
    setMinutes(0);
  };

  return (
    <div className="stopwatch">
      <h2>STOPWATCH</h2>
      <div id="time">
        <span id="min">{String(minutes).padStart(2, '0')}</span>:
        <span id="sec">{String(seconds).padStart(2, '0')}</span>:
        <span id="msec">{String(milliseconds).padStart(2, '0')}</span>
      </div>
      <div id="button">
        <button id="start" onClick={start}>Start</button>
        <button id="stop" onClick={stop}>Pause</button>
        <button id="reset" onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

export default Stopwatch;
