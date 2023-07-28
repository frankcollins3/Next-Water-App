  import React, { useState, useEffect } from 'react';
  import $ from 'jquery'
  import axios from 'axios'
  
  // components and styles
  import Container from 'react-bootstrap/Container'
  import styles from "./Reminder.module.scss"

  // @redux/toolkit global state management
  import {RootState} from "redux/store/rootReducer"
  import {useSelector, useDispatch} from "react-redux"
  import { SET_STATUS, SET_PROGRESS, SET_DISABLED, INCREMENT_REMINDER_CLICK, TOGGLE_REMINDER_FINISHED_UPDATE } from "redux/main/mainSlice"

  // utils
  import {useImage} from "Contexts/ImgContext"
  import {useRegex} from "Contexts/RegexMenu"
  import { getDayOfWeek } from "utility/UtilityValues"
  import { updateDailyDataQueryString } from 'graphql/queries';

  // import { SET_PROGRESS, SET_STATUS_INDEX, INCREMENT_REMINDER_CLICK, TOGGLE_REMINDER_NOT_ENOUGH_TIME, SET_API, SET_NODE_ENV, SET_DATE } from '../../../redux/actions'
    
export default function Reminder(props: any) {

  const dispatch = useDispatch()
  
  const disable = [1, 2, 3]

    const [isShown, setIsShown] = useState(false);
    const [updateFunc, setUpdateFunc] = useState(false)

    const reminderContJQ = $('#Reminder-Cont')[0]

    const {mouseWaterCup, mouseDroplet, bg} = useImage()
    const { MbetweenYearAndTimeZone, MreturnAlphaChar, McharBeforeFirstColon, RreturnNumbers, RcolonSandwichInt, APIsplit } = useRegex()

    const HYDRO_SCHEDULE = useSelector( (state:RootState) => state.main.HYDRO_SCHEDULE)
    const HYDRO_INTAKE = useSelector( (state:RootState) => state.main.HYDRO_INTAKE)
    const STATUS = useSelector( (state:RootState) => state.main.STATUS)
    const DISABLED = useSelector( (state:RootState) => state.main.DISABLED)
    const PROGRESS = useSelector( (state:RootState) => state.main.PROGRESS)
    const DATE = useSelector( (state:RootState) => state.main.DATE)
    const REMINDER_CLICK = useSelector( (state:RootState) => state.main.REMINDER_CLICK)
    const CURRENT_USER = useSelector( (state:RootState) => state.logInOutGoogle.CURRENT_USER)

    let [clickLimit, setClickLimit] = useState(0)

    const percentage:any = 100 / HYDRO_SCHEDULE.length
    // const percentage = (100 * PROGRESS) / HYDRO_SCHEDULE.length;

    // const percentage:any = 100 / HYDRO_SCHEDULE.length

    const { 
      time, amt, amtper, percent, index, REMINDER_CLICK_COUNT,      
    } = props


    let startWidth = 50

    const elementWidth = startWidth += percent/5

    // console.log(`index: ${index}, elementWidth: ${elementWidth}`)

    // console.log(`index: ${index}, time: ${time} percent: ${percent}`)

    const transformers = ["rotate(90deg)", "scale(0.25)"].join(" ")

    const saveData = () => {
      
      // updateDailyData(users_id: ${users_id}, date: "${date}", progress: ${progress}, weekday: "${weekday}", status: ${status}) {

    }


    useEffect( () => {            
        if (REMINDER_CLICK === HYDRO_SCHEDULE.length && index + 1 === HYDRO_SCHEDULE.length) {        
          dispatch(TOGGLE_REMINDER_FINISHED_UPDATE())
        }      
      }, [REMINDER_CLICK])





    
    

    const handleClick = async (index:number) => {


      console.log('progress', PROGRESS)
      console.log('percentage', percentage)

      // toggles disabled prop to true so that it cannot be clicked again. that then-current water cycle would be updated as Pass|Fail.
      dispatch(INCREMENT_REMINDER_CLICK())
      const newDisabled = [...DISABLED];
      newDisabled[index] = true;
      dispatch(SET_DISABLED(newDisabled))
      // setDisabled(newDisabled);
      //  gets the "8 am | 10 am | 12 am" times from Reminder-Bars on Home.tsx. current user && HYDRO_SCHEDULE.length > 1 ?  Compare that time with new Date() time.now() to evaluate successful water intake filling
      // console.log($(`#timeSpan${index}`))
      let indexTargetSpan = $(`#timeSpan${index}`)[0]  
      let elemindex = $(`#timeSpan${index}`)
      let todaydate = new Date()
      let actualtoday = todaydate.getDate()

      const year = await todaydate.getFullYear()
      const month = await todaydate.getMonth() + 1; 
      const day = await todaydate.getDate();
      const formattedDate = `${year}-${month}-${day}`;
      // if (DATE.length < 1) SET_DATE({payload: formattedDate})

      let timeRightNow:any|null = todaydate.toString().match(MbetweenYearAndTimeZone)
      let currentTime = timeRightNow[1]
      let elemText = indexTargetSpan.innerHTML
      let elemNums:any;
      
      let currentTimeHours = currentTime.match(McharBeforeFirstColon)
      let timeHours = currentTimeHours[0]
      
      // test perfect success.
      // const newStatus = [...STATUS];   
      // newStatus[index] = 'check';
      // dispatch(SET_STATUS(newStatus));     
        
        if (time - timeHours >= 2) {
          // console.log("We need to drop in within 90 minutes");
          // TOGGLE_REMINDER_NOT_ENOUGH_TIME()
          // setTimeout( () => TOGGLE_REMINDER_NOT_ENOUGH_TIME(), 2000)
          // SET_PROGRESS( {payload: 100 / HYDRO_SCHEDULE.length / 100 } )
        }
        const newStatus = [...STATUS];   
        if (time > timeHours) {
          newStatus[index] = 'check';
          dispatch(SET_STATUS(newStatus));     
          // dispatch(SET_PROGRESS(percentage))          
          } else {
          // if testing success only just comment this out for an object extensible error 
          newStatus[index] = "false"     
          dispatch(SET_STATUS(newStatus))            
      }    
    }

      
    // reminder component
    return (
      <Container id={styles.reminderCont}>
        <li className={styles.li} key={index}>
          <button
            disabled={DISABLED[index]}
            className={styles.btn}
            onClick={() => handleClick(index)}
            style={{
              transform: 'scale(0.75)',
              backgroundColor: STATUS[index] === '' ? `#98ddfc${percent}` : STATUS[index] === 'check' ? `#98ddfc${percent}` : '#dedede70',
              // backgroundColor: STATUS[index] === '' ? `#98ddfc${percent}` : STATUS[index] === 'check' ? `#98ddfc${percent}` : '#dedede70',
              width: `${elementWidth}px`,
              border: isShown ? "1px dashed #73defe" : "none",
              borderRadius: '0%',
            }}
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
            >
            <span>
              <span>
                {STATUS[index] === 'check' ? '' : amtper.toFixed(2)} /{' '} {amt.toFixed(0)} fl oz
{ STATUS[index] === '' ?  <pre></pre> : STATUS[index] === "check" ? <img className={styles.reminderImg} src={mouseDroplet}/> : <img className={styles.reminderImg} style={{ transform: transformers }} src={bg}/>}                
              </span>
            </span>
          </button>
          <Container className={styles.timelineText}>
            <span
              id={`timeSpan${index}`}
              className={styles.timelineDisplay}
              style={{ color:  '#00000030', textAlign: 'center'  }} // style={{ color: `${disabled[index] ? '#00000030' : '#000000'}` }}
              >
              {time <= 12 ? time : time - 12} {time < 12 ? 'am' : 'pm'}
            </span>
          </Container>
        </li>
        </Container>    
    );
  }
