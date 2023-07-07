import React, { useState, useEffect, useRef } from 'react';
import './timer.css';

// keeps track of the callback (/something)
// "keeps the class var in line" -  if the callback ever changes
// does not cause any re-rendering
// the useeffect has a function tick that calls the current class variable
// then tick is called with the setInterval function
// the delay on the setInterval is passed through the useInterval
// every time the delay value changes, change the setInterval
// the return value from useffect can clean up after last useeffect

function useInterval(callback, delay) {
  const savedCallback = useRef();
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default function Timer({ hydroSchedule, timer, setTimer }) {

  let clock = timer / 60

  useEffect(() => {
    const currentTime = new Date().getTime();
    const currentHour = new Date().getHours();

    // find the closest matching time

    const remainingReminders = hydroSchedule.filter((time) => {
      return time > currentHour;
    });

    if (remainingReminders.length) {
      const nextHour = new Date();
      nextHour.setMinutes(0);
      nextHour.setSeconds(0);

      const timeToNextRemind = Math.ceil(
        (nextHour.setHours(remainingReminders[0]) - currentTime) / 1000
      );

      setTimer(timeToNextRemind);
    }
  }, [hydroSchedule]);

  useInterval(() => {
    if (timer !== undefined) {
      setTimer(timer - 1);
    }
  }, 1000);

  const renderTimer = () => {
    // right way to do the timer within an hour or so:          I dont want this I want the timer to be timing no matter what.

    // if (timer < 0 || timer > 3600 * 6 || timer === NaN) {
    //   return (
    //     <div>
    //     </div>
    //   );
    // } else if (!timer) {
    //   return (
    //     <div>
    //       0:00
    //     </div>
    //   )
    // }
    return (
      <div style={{ color: clock < 45 ? "#DC143C" : "silver"}} >
      {/* <div style={{ display: clock === NaN ? "none" : "", color: clock < 45 ? "#DC143C" : "silver"}} > */}
        {Math.floor(timer / 60).toString().length < 2     // want to leave timer / 60 to show what's going on.
          ? `0${Math.floor(timer / 60).toString()}`
          : Math.floor(timer / 60)}
        :
        {(timer % 60).toString().length < 2
          ? `0${(timer % 60).toString()}`
          : (timer % 60).toString()}
      </div>
    );
  };

  return (      
    <div style={{ color: 'silver', fontWeight: 'bolder'}} className="timer">      
      { typeof timer === "number" ? "Next Reminder:" : "" }
      { typeof timer === "number" ? renderTimer() : "" }
    {/* <p> {typeof timer === "number" ? "yesnumber" : "nonumber" } </p> */}
    </div>
  );
}
