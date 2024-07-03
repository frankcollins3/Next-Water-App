// @redux/toolkit global state management
import { useSelector, useDispatch } from 'react-redux'
import {RootState} from "redux/store/rootReducer"

// components and styling
import DisplayWave from "components/elements/DisplayWave"
import Streak from 'components/elements/Streak';
import Timer from 'components/elements/Timer';
import styles from "./Panel.module.scss"

// utility
import {useImage} from "Contexts/ImgContext"

export default function Panel({ date, hydroIntake, hydroSchedule }) {

  const HYDRO_SCHEDULE = useSelector((state:RootState) => state.main.HYDRO_SCHEDULE)

  const { calendar, target, clock } = useImage();

  return (
    <div className={styles.panelContainer}>

      <div className={styles.panelCard}>


        {/* <Boop rotation={10} timing={150}> */}
          <img className={styles.img} src={clock} />
        {/* </Boop> */}
        <Timer hydroSchedule={HYDRO_SCHEDULE} />
      </div>

      <div className={styles.panelCard}>
        <Streak />        
      </div>

      <div className={styles.panelCard}>
        <div>
          {/* <Boop rotation={10} timing={150}> */}
            <img className={styles.img} src={calendar} />
          {/* </Boop> */}
          <span style={{ position: 'relative', top: '-7.5px' }} className={styles.span}>{date}</span>
        </div>
        <div>
          {/* <Boop rotation={10} timing={150}> */}
            <img className={styles.img} src={target} />
          {/* </Boop> */}
          <span
          className={styles.span}
          >
            {hydroIntake? hydroIntake.toFixed(2): 0} fl oz / {(hydroIntake? hydroIntake: 0 / 8).toFixed(2)} cups
          </span>
        </div>
      </div>      
    </div>
  );
}

// import {useState} from 'react'

// // components and styles
// import React from 'react';
// import Boop from 'components/elements/Boop';
// import Streak from 'components/elements/Streak';
// import Timer from 'components/elements/Timer';
// // import styles from "./Panel.module.scss"


// // @redux/toolkit global state management.
// import {RootState} from "redux/store/rootReducer"
// import {useSelector} from "react-redux"


// // utils
// import {useImage} from 'Contexts/ImgContext'

// export default function Panel({ date, hydroIntake, hydroSchedule }) {  

//   const MAIN_BORDER_HOVER = useSelector( (state:RootState) => state.main.MAIN_BORDER_HOVER)
//   //        * * *             * * *             * * *           * * *           * * *           * * * mainBorderHover props from index.tsx * * * 
//   const [timer, setTimer] = useState();
//   const [targetHover, setTargetHover] = useState<boolean>(false)
//   const [calendarHover, setCalendarHover] = useState<boolean>(false)

//   const { clock, panda, calendar, target } = useImage()

//   const clockclick = () => {
//       console.log('timer')
//       console.log(timer)
//       console.log(typeof timer)

//       console.log('date', date)
//   }  

//   const RenderPanel = () => {
//     return (
//       <>
//         <div style={{ border: "none"}} className="panel-card">

//           {/* <Boop rotation={10} timing={150}> */}
//           {/* timer < 0 || timer > 3600 * 6 || timer === NaN */}
//             <img onClick={clockclick} src={ typeof timer === "number" ? clock : panda }/>
//             {/* <img src={ timer < 0 || timer > 3600 * 6 || timer === NaN ? clock : panda} /> */}
//           {/* </Boop> */}

//           <Timer hydroSchedule={hydroSchedule} timer={timer} setTimer={setTimer} />
//         </div>

//         <div style={{ border: "none"}} className="panel-card">
//           <Streak />
//         </div>

//         <div style={{ border: "none"}} className="panel-card">
//           <div>

//             {/* <Boop rotation={10} timing={150}> */}

//             { !calendarHover && <img style={{ marginTop: '0.25em' }} onClick={() => setCalendarHover(true)} className="panel-target" src={calendar} /> }
//             { calendarHover && <pre onClick={() => setCalendarHover(false)} id="calendarHoverPre" style={{ color: 'silver' }}> yeah </pre> }
//             {/* { <p style={{ color: 'black' }}> {date} </p> } */}

//             {/* <span onClick={() => setTargetHover(false)} style={{ marginTop: '0.25em', color: 'silver', fontWeight: 'bolder', display: targetHover ? "" : "none", textAlign: 'center' }}>
//               { hydroIntake ? hydroIntake.toFixed(3) : 0} fl oz
//             </span> */}

//             {/* </Boop> */}
//             {/* {calendarHover && <span onClick={() => setCalendarHover(false)} style={{ color: 'silver', fontWeight: 'bolder', textAlign: 'center', position: 'relative', left: '0.25em' }}>{date}</span> } */}


//           </div>
//           <div>
//           {/* <div style={{ marginLeft: '12px'}}> */}

//             {/* <Boop rotation={10} timing={150}> */}
//               { !targetHover && <img style={{ marginTop: '0.45em' }} onClick={() => setTargetHover(true)} className="panel-target" src={target} /> }
//               {/* <img style={{ display: targetHover ? "none" : "" }} onClick={() => setTargetHover(true)} className="panel-target" src={target} /> */}
//             {/* </Boop> */}
          
//             <span onClick={() => setTargetHover(false)} style={{ marginTop: '0.25em', color: 'silver', fontWeight: 'bolder', display: targetHover ? "" : "none", textAlign: 'center' }}>
//               { hydroIntake ? hydroIntake.toFixed(3) : 0} fl oz
//               {/* { hydroIntake ? hydroIntake.toFixed(3) : 0} fl oz / {(hydroIntake? hydroIntake: 0 / 8).toFixed(3) } cups */}
//             </span>
//           </div>
//         </div>
      
//       </>
//     );
//   } 

//   return <div className="panel-container"> {RenderPanel()} </div>
//   // return <div style={{ className="panel-container"> {RenderPanel()} </div>

//   }



