  import React, { useState, useEffect } from 'react';
  import { connect, useDispatch } from 'react-redux'
  import {useImage} from '../../../utility/Contexts/ImgContext'
  import {useRegex} from '../../../utility/Contexts/RegexMenu'
  import allDBurl from '../../../utility/fetch/allDBurl'
  import './reminder.css';
  import $ from 'jquery'
  import Container from 'react-bootstrap/Container'

  import { SET_PROGRESS, SET_STATUS_INDEX, INCREMENT_REMINDER_CLICK, TOGGLE_REMINDER_NOT_ENOUGH_TIME, SET_API, SET_NODE_ENV, SET_DATE } from '../../../redux/actions'
    
  function Reminder(props: any) {

    const [isShown, setIsShown] = useState(false);
    const [updateFunc, setUpdateFunc] = useState(false)

    const reminderContJQ = $('#Reminder-Cont')[0]

    const {mouseWaterCup, mouseDroplet, bg} = useImage()
    const { MbetweenYearAndTimeZone, MreturnAlphaChar, McharBeforeFirstColon, RreturnNumbers, RcolonSandwichInt, APIsplit } = useRegex()

    const { 
      time, amt, amtper, percent, index, status, setStatus, disabled, setDisabled, HYDRO_SCHEDULE, HYDRO_DATA, HYDRO_INTAKE, STATUS, DISABLED, REMINDER_CLICK_COUNT, PROGRESS, API, NODE_ENV, DATE, APIBOTH,
      SET_PROGRESS, SET_STATUS_INDEX, INCREMENT_REMINDER_CLICK, TOGGLE_REMINDER_NOT_ENOUGH_TIME, SET_API, SET_NODE_ENV, SET_DATE
    } = props
    const environment = process.env.NODE_ENV
    let width = $(window).width()

    const transformers = ["rotate(90deg)", "scale(0.25)"].join(" ")

    useEffect( () => {  
      if (REMINDER_CLICK_COUNT === HYDRO_SCHEDULE.length) {
        if (!updateFunc) {      
          (async() => {          
            const urlbank = await allDBurl() 
            const env = urlbank.ENVdata.data.ENV              
              let pre_api = APIBOTH.split(APIsplit)
              // let pre_api = env.API.split(APIsplit)
              SET_API( {payload: env.NODE_ENV === 'development' ? pre_api[0] : pre_api[1]})      
            let currentUserStorage = localStorage.getItem("currentuser")                  
            if (currentUserStorage != null) {
              let pre_user = JSON.parse(currentUserStorage)                        
              let id = pre_user.id                        
              let roundedProgress = Math.ceil(PROGRESS * 100)                     
                console.log("greater than 95 so perfect 100 ")
                console.log('status')
                console.log(status)
                let predata = await fetch(`${API}fill_cont?query={updateDailyData(progress:${roundedProgress},date:"${DATE.toString()}",status:"${status}",users_id:${pre_user.id}){google_id,date,progress,weekday,status,users_id}}`)              
                let data = await predata.json()
                console.log('data')
                console.log(data)
                setUpdateFunc(true)
              // } else {          
              //   console.log('submitting updated user data without near perfection adjustment')
              //   let predata = await fetch(`${API}fill_cont?query={updateDailyData(progress:${roundedProgress},status:"${status}",users_id:${pre_user.id}){google_id,date,progress,weekday,status,users_id}}`)        
              //   let data = await predata.json()              
              //   setUpdateFunc(true)
              // }
            }
          })() 
        }
      } else { return }
          // return { google_id: d.google_id, date: d.date, progress: d.progress, weekday: d.weekday, status: d.status, users_id: d.users_id }
    }, [REMINDER_CLICK_COUNT])

    //  time, amt, amtper, percent, index, status, disabled

    // const { amt, amtper, percent, index, status} = props

    const handleClick = async (index:number) => {
      const newDisabled = [...disabled];
      newDisabled[index] = true;
      setDisabled(newDisabled);
  //  gets the "8 am | 10 am | 12 am" times from Reminder-Bars on Home.tsx. current user && HYDRO_SCHEDULE.length > 1 ?  Compare that time with new Date() time.now() to evaluate successful water intake filling
      console.log($(`#timeSpan${index}`))
      let indexTargetSpan = $(`#timeSpan${index}`)[0]  
      let elemindex = $(`#timeSpan${index}`)
      let todaydate = new Date()
      let actualtoday = todaydate.getDate()

      const year = await todaydate.getFullYear()
      const month = await todaydate.getMonth() + 1; 
      const day = await todaydate.getDate();
      const formattedDate = `${year}-${month}-${day}`;
      if (DATE.length < 1) SET_DATE({payload: formattedDate})

      let timeRightNow:any|null = todaydate.toString().match(MbetweenYearAndTimeZone)
      let currentTime = timeRightNow[1]
      let elemText = indexTargetSpan.innerHTML
      let elemNums:any;
      
      let currentTimeHours = currentTime.match(McharBeforeFirstColon)
      let timeHours = currentTimeHours[0]
        
        if (time - timeHours >= 2) {
          console.log("We need to drop in within 90 minutes");
          TOGGLE_REMINDER_NOT_ENOUGH_TIME()
          setTimeout( () => TOGGLE_REMINDER_NOT_ENOUGH_TIME(), 2000)
          // SET_PROGRESS( {payload: 100 / HYDRO_SCHEDULE.length / 100 } )
        }
        const newStatus = [...status];   
        if (time > timeHours) {
          newStatus[index] = 'check';
          setStatus(newStatus);     
          INCREMENT_REMINDER_CLICK()
          SET_PROGRESS( {payload: 100 / HYDRO_SCHEDULE.length / 100 } )
          } else {
        newStatus[index] = 'nope';
            setStatus(newStatus);             
      }    
  }


    // reminder component
    return (
      <Container id="Reminder-Cont">
        <li key={index}>
          <button
            disabled={disabled[index]}
            className="btn"
            onClick={() => handleClick(index)}
            style={{
              backgroundColor: status[index] === '' ? `#98ddfc${percent}` : status[index] === 'check' ? `#98ddfc${percent}` : '#dedede70',
              width: width! <= 600 ? `${percent/3.5}` : width! <= 800 ? `${percent/2.5}` :`${percent}%`,
              border: isShown ? "1px dashed #73defe" : "none",
              borderRadius: '0%',
              // width: `${percent}%`,
            }}
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
            >
            <span>
              <span>
                {status[index] === 'check' ? '' : amtper.toFixed(2)} /{' '} {amt.toFixed(0)} fl oz
                { status[index] === '' ?  <pre></pre> : status[index] === "check" ? <img style={{ transform: transformers }} src={mouseDroplet}/> : <img style={{ transform: transformers }} src={bg}/>}
                {/* { status[index] === 'check' ? <img style={{ transform: transformers }} src={mouseDroplet}/> : <pre></pre>} */}
                {/* {status[index] === 'check' ? '✔DONE!⭐' : amtper.toFixed(2)} /{' '} {amt.toFixed(0)} fl oz */}
              </span>
            </span>
          </button>
          <Container className="timeline-text">
            <span
              id={`timeSpan${index}`}
              className="timeline-display"
              style={{ color:  '#00000030'  }} // style={{ color: `${disabled[index] ? '#00000030' : '#000000'}` }}
              >
              {time <= 12 ? time : time - 12} {time < 12 ? 'am' : 'pm'}
            </span>

            {/* {isShown && <div className="timeline-hover"><img src="/water_img/mouse_droplet.png" /></div>} */}
          </Container>
        </li>
        </Container>    
    );
  }


  const mapStateToProps = (state:any) => ({
      HYDRO_SCHEDULE: state.HYDRO_SCHEDULE,
      HYDRO_DATA: state.HYDRO_DATA,
      HYDRO_INTAKE: state.HYDRO_INTAKE,
      STATUS: state.STATUS,
      DISABLED: state.DISABLED,
      REMINDER_CLICK_COUNT: state.REMINDER_CLICK_COUNT,    
      PROGRESS: state.PROGRESS,
      API:  state.API,
      APIBOTH: state.APIBOTH,
      NODE_ENV: state.NODE_ENV,
      DATE: state.DATE
  })

  const mapDispatchToProps = (dispatch:any) => ({
      SET_PROGRESS: (action:any) => dispatch(SET_PROGRESS(action)), 
      SET_STATUS_INDEX: (action:any) => dispatch(SET_STATUS_INDEX(action)), 
      INCREMENT_REMINDER_CLICK: () => dispatch(INCREMENT_REMINDER_CLICK()), 
      TOGGLE_REMINDER_NOT_ENOUGH_TIME: () => dispatch(TOGGLE_REMINDER_NOT_ENOUGH_TIME()),
      SET_API: (action:any) => dispatch(SET_API(action)),
      SET_NODE_ENV: (action:any) => dispatch(SET_NODE_ENV(action)),
      SET_DATE: (action:any) => dispatch(SET_DATE(action)),
  })

  const ConnectedReminder = connect(mapStateToProps, mapDispatchToProps)(Reminder)
  export default ConnectedReminder


  // const mapDispatchToProps = (state:any) => {

  // }