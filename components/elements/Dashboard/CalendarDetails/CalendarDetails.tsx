import {useEffect, useState} from 'react'
import moment from "moment-timezone"

// components and styles
import Container from "react-bootstrap/Container"
        // global CSS for this one because .react__calendar-tileNow and friends have dashes which SASS won't allow so it uses global CSS.

// @redux/toolkit global state management
import {RootState} from "redux/store/rootReducer"
import {useSelector, useDispatch} from 'react-redux'
import { TOGGLE_PROGRESS_SHOW } from "redux/dashboard/dashboardSlice"

// utils
import {useImage} from "Contexts/ImgContext"


export default function CalendarDetails() {

  const dispatch = useDispatch()

  const { confirmation, close, calendar, bg } = useImage()

  const SELECTED_DAY = useSelector( (state:RootState) => state.dashboard.SELECTED_DAY)
  const PROGRESS_SHOW = useSelector( (state:RootState) => state.dashboard.PROGRESS_SHOW)
  const WEATHER_CHANNEL = useSelector( (state:RootState) => state.dashboard.WEATHER_CHANNEL)

  const calendarClick = () => dispatch(TOGGLE_PROGRESS_SHOW())
  
    const RENDER = () => {                   
  <Container className="calendar-details">
    {SELECTED_DAY ? (
      <>
        <div style={{ color: 'silver' }} className="calendar-date">
          {moment(SELECTED_DAY.date, 'YYYY-M-D').format('ddd, MMM-DD-YY')}
        </div>
        <div className="calendar-progress">
                  {
                    SELECTED_DAY.progress < 1
                         ?  <img style={{ marginTop: '0.5em'}} src={bg}/>
                         : <pre style={{ color: 'silver' }}> Progress: {Math.ceil(SELECTED_DAY.progress)}% </pre>
                  }
          
        </div>
        <Container className="calendar-status">
        {
            SELECTED_DAY.status[0] &&                            
        SELECTED_DAY.status[0].split(',').map((d, index) => (
            <Container key={`div${index}`}>
              {d.trim() === 'check' ? (
                <img key={`confirm${index}`} src={confirmation} />
              ) : (
                <img key={`close${index}`} src={close} />
              )}
            </Container>
          ))                                  
          }
        </Container>
        <img style={{ height: '50px', width: '50px' }} onClick={calendarClick} src={calendar}/>
      </>
    ) : (
      <Container style={{ color: 'silver', fontWeight: 'bolder' }} className="calendar-progress">Pick A Highlighted Day</Container>
    )}
  </Container>
    }
    return <> {RENDER()} </>
}