import { useEffect, useState } from 'react'
import moment from "moment-timezone"

// components and styling 
import Container from "react-bootstrap/Container"
import DropInBucket from "components/elements/DropInBucket"
import styles from "../Dashboard.module.scss"

// redux 
import { RootState } from "redux/store/rootReducer"
import { useSelector, useDispatch } from 'react-redux'
import { TOGGLE_PROGRESS_SHOW, SET_SELECTED_DAY } from "redux/dashboard/dashboardSlice"
import { useImage } from "Contexts/ImgContext"

export default function CalendarDetails() {

  const dispatch = useDispatch()
  const { confirmation, close, calendar, bg } = useImage()

  const SELECTED_DAY = useSelector((state: RootState) => state.dashboard.SELECTED_DAY)
  const PROGRESS_SHOW = useSelector((state: RootState) => state.dashboard.PROGRESS_SHOW)
  const WEATHER_CHANNEL = useSelector((state: RootState) => state.dashboard.WEATHER_CHANNEL)
  
  const NO_SELECTED_DAY = useSelector((state: RootState) => state.dashboard.NO_SELECTED_DAY)


  const dateRegex = /^\d{4}-(0?[1-9]|1[0-2])-(0?[1-9]|[12]\d|3[01])$/;
  
  const calendarClick = () => dispatch(TOGGLE_PROGRESS_SHOW())

  const clickIt = () => {
    dispatch(SET_SELECTED_DAY(null))
  }

  const RENDER = () => (
    <Container className={styles.calendarDetailsBox}> 
    {/* <> */}
      {SELECTED_DAY ? (
        <>
        {
          dateRegex.test(SELECTED_DAY?.date)
          ?
          <>
          <div style={{ color: 'silver' }} className={styles.calendarDate}>
          {/* <div style={{ color: 'silver' }} className="calendar-date"> */}
            {moment(SELECTED_DAY?.date, 'YYYY-M-D').format('ddd, MMM-DD-YY')}
          </div>
          <div className={styles.calendarProgress}>
            {SELECTED_DAY?.progress < 1 ? (
              <img style={{ marginTop: '0.5em', height: '40px', width: '40px' }} src={bg} />
              ) : (
                <pre style={{ color: 'silver' }}> Progress: {Math.ceil(SELECTED_DAY?.progress)}% </pre>
                )}
          </div>
          </>
          :
          null
          // <DropInBucket/>
        }
          <Container className={styles.calendarStatus}>
            {SELECTED_DAY.status && SELECTED_DAY.status.length > 0 ? (
              SELECTED_DAY.status[0].split(',').map((d, index) => (
                <Container key={`div${index}`}>
                  {d.trim() === 'check' ? (
                    <img style={{ height: '40px', width: '40px' }} key={`confirm${index}`} src={confirmation} />
                  ) : (
                    <img style={{ height: '40px', width: '40px' }} key={`close${index}`} src={close} />
                  )}
                  {/* <img style={{ height: '50px', width: '50px' }} onClick={calendarClick} src={calendar} />  */}
                  <img style={{ display: 'flex', alignSelf: 'center', height: '50px', width: '50px', left: '-5px', top: '10px', position: 'relative'  }} onClick={clickIt} src={calendar} /> 
                </Container>
              ))
            ) : 
            null
            // <DropInBucket/>
            }
          </Container>          
        
          
        </>
      ) : (
        <Container style={{ color: 'silver', fontWeight: 'bolder' }} className="calendar-progress">
          Pick A Highlighted Day
        </Container>
      )}      

    </Container>
  )
  return <>{RENDER()}</>  
}


