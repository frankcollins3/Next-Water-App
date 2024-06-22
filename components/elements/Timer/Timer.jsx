import React, { useState, useEffect, useRef } from 'react';

// components and styling
import styles from "./Timer.module.scss"

// @redux/toolkit state management
import { RootState } from 'redux/store/rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import { TOGGLE_SHOW_HYDRO_SETTINGS, SET_CURRENT_PAGE, SET_HYDRO_INTAKE, SET_HYDRO_SCHEDULE, SET_HYDRO_DATA, SET_STATUS, SET_DATE, SET_DISABLED, SET_PROGRESS, TOGGLE_INTRO_WATER_DROP_IS_HOVERED  } from 'redux/main/mainSlice'
import { TOGGLE_IS_LOGGED_IN } from "redux/logInOutGoogle/logInOutGoogleSlice"

// utility
import {useImage} from "Contexts/ImgContext";

// Custom hook to handle intervals
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

export default function Timer({ hydroSchedule }) {

  const HYDRO_SCHEDULE = useSelector((state) => state.main.HYDRO_SCHEDULE)
  const { panda } = useImage();
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    const currentTime = new Date().getTime();
    const currentHour = new Date().getHours();

    // Find the next reminder time
    const remainingReminders = HYDRO_SCHEDULE.filter(time => time > currentHour);

    if (remainingReminders.length) {
      const nextHour = new Date();
      nextHour.setMinutes(0);
      nextHour.setSeconds(0);
      nextHour.setMilliseconds(0);
      nextHour.setHours(remainingReminders[0]);

      const timeToNextRemind = Math.ceil((nextHour.getTime() - currentTime) / 1000);
      setTimer(timeToNextRemind);
    } else {
      // No remaining reminders today
      setTimer(null);
    }
  }, [hydroSchedule]);

  useInterval(() => {
    if (timer !== null && timer > 0) {
      setTimer(timer - 1);
    }
  }, 1000);

  const renderTimer = () => {
    const pandaImg = (
      <img id={styles.panda} src={panda} alt="bearnecessities"/>  
    )
    // if (timer === null) {
    //   return (
    //     <div>
    //       <img src="/img/panda.png" alt="Panda" />
    //     </div>
    //   );
    if (timer <= 0) {
      return <div>0:00</div>;
    } else {      
      // wow no lie look at chatGPT already go with padStart() never heard of it.
      // timer would display: 
      const minutes = Math.floor(timer / 60).toString().padStart(2, '0');
      const seconds = (timer % 60).toString().padStart(2, '0');
      return (
        minutes < 60 || timer === null
        ? 
         <div style={{ color: minutes < 59 ? "#E0115" : "#73defe" }} className={styles.timerText}> {`${minutes}:${seconds}`} </div>
        :
        pandaImg
      ) 
    }
  };

  return (
    <div className={styles.timerText}>
      Time until the next Reminder:
      {renderTimer()}
    </div>
  );
}



// import React, { useState, useEffect, useRef } from 'react';

// // components and styling
// import styles from "./Timer.module.scss"

// // @redux/toolkit state management
// import { RootState } from 'redux/store/rootReducer';
// import { useSelector, useDispatch } from 'react-redux';
// import { TOGGLE_SHOW_HYDRO_SETTINGS, SET_CURRENT_PAGE, SET_HYDRO_INTAKE, SET_HYDRO_SCHEDULE, SET_HYDRO_DATA, SET_STATUS, SET_DATE, SET_DISABLED, SET_PROGRESS, TOGGLE_INTRO_WATER_DROP_IS_HOVERED  } from 'redux/main/mainSlice'
// import { TOGGLE_IS_LOGGED_IN } from "redux/logInOutGoogle/logInOutGoogleSlice"

// // utility
// import {useImage} from "Contexts/ImgContext";

// // keeps track of the callback (/something)
// // "keeps the class var in line" -  if the callback ever changes
// // does not cause any re-rendering
// // the useeffect has a function tick that calls the current class variable
// // then tick is called with the setInterval function
// // the delay on the setInterval is passed through the useInterval
// // every time the delay value changes, change the setInterval
// // the return value from useffect can clean up after last useeffect

// function useInterval(callback, delay) {
//   const savedCallback = useRef();
//   // Remember the latest callback.
//   useEffect(() => {
//     savedCallback.current = callback;
//   }, [callback]);
//   // Set up the interval.
//   useEffect(() => {
//     function tick() {
//       savedCallback.current();
//     }
//     if (delay !== null) {
//       let id = setInterval(tick, delay);
//       return () => clearInterval(id);
//     }
//   }, [delay]);
// }

// export default function Timer({ hydroSchedule }) {
//   const [timer, setTimer] = useState();

//   const HYDRO_SCHEDULE = useSelector((state) => state.main.HYDRO_SCHEDULE)

//   const { panda, clock } = useImage();

//   useEffect(() => {
//     const currentTime = new Date().getTime();
//     const currentHour = new Date().getHours();

//     const remainingReminders = HYDRO_SCHEDULE.filter((time) => {
//       console.log('time', time)
//       return time > currentHour;
//     });

//     if (remainingReminders.length) {
//       const nextHour = new Date();
//       nextHour.setMinutes(0);
//       nextHour.setSeconds(0);

//       const timeToNextRemind = Math.ceil(
//         (nextHour.setHours(remainingReminders[0]) - currentTime) / 1000
//       );

//       setTimer(timeToNextRemind);
//     }
//   }, [HYDRO_SCHEDULE]);

//   useInterval(() => {
//     if (timer !== undefined) {
//       setTimer(timer - 1);
//     }
//   }, 1000);

//   const renderTimer = () => {
//     if (timer < 0 || timer > 3600 * 6 || timer === NaN) {
//       return (
//         <div>
//           <img className={styles.img} src={panda} />
//         </div>
//       );
//     } else if (!timer) {
//       return (
//         <div>
//           0:00
//         </div>
//       )
//     }
//     return (
//       <div style={{ color: 'rgb(71, 69, 69)' }}>
//         {Math.floor(timer / 60).toString().length < 2
//           ? `0${Math.floor(timer / 60).toString()}`
//           : Math.floor(timer / 60)}
//         :
//         {(timer % 60).toString().length < 2
//           ? `0${(timer % 60).toString()}`
//           : (timer % 60).toString()}
//       </div>
//     );
//   };

//   return (
//     <div id={styles.timer}>
//       Time until the next Reminder:
//       {renderTimer()}
//     </div>
//   );
// }s
