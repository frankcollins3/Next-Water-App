import React, {useState, useEffect} from 'react'
import axios from "axios"
import moment from "moment-timezone"

// components and styles
import Calendar from "react-calendar"
import Container from "react-bootstrap/Container"
import styles from "./Dashboard.module.scss"

// @redux/toolkit global state management
import {RootState} from "redux/store/rootReducer"
import {useSelector, useDispatch} from 'react-redux'
import { SET_HYDRO_DATA, SET_CURRENT_PAGE } from "redux/main/mainSlice"
import { SET_SELECTED_DAY, TOGGLE_PROGRESS_SHOW,  } from "redux/dashboard/dashboardSlice"

// utils
import {getUserDailyDataQueryString, allUserDataQueryString} from "graphql/queries"
import {useImage} from 'Contexts/ImgContext'
import {usePromise} from "Contexts/Promises"

export default function DashboardComponent() {

  const dispatch = useDispatch()

  const HYDRO_DATA = useSelector( (state:RootState) => state.main.HYDRO_DATA)  
  const SELECTED_DAY = useSelector( (state:RootState) => state.dashboard.SELECTED_DAY)
  const PROGRESS_SHOW = useSelector( (state:RootState) => state.dashboard.PROGRESS_SHOW)
  const WEATHER_CHANNEL = useSelector( (state:RootState) => state.dashboard.WEATHER_CHANNEL)

  const { confirmation, close, bg, calendar } = useImage()

  const [hydroData, setHydroData] = useState<any>();
  const [selectedDay, setSelectedDay] = useState<any>();

  const { iPROMISEcookies } = usePromise()

  useEffect( () => {
    console.log(process.env.NEXT_PUBLIC_WEATHER_APP)
    dispatch(SET_CURRENT_PAGE("/dashboard"))

    iPROMISEcookies()
    .then( (cookie) => {
        const INTcookieID = parseInt(cookie)

        const queryStr = allUserDataQueryString(INTcookieID)

          axios.post('/api/graphql', {
          query: `query { ${queryStr} }`,
        }).then( (alldata) => {
          alldata = alldata.data.data.allUserData
          console.log('alldata', alldata)
          setHydroData(alldata)
        })
        
      })
    }, [])
                
    async function getDataForClickedDay(highlightedDay) {
      // console.log('HYDRO_DATA', HYDRO_DATA)

      const formatHighlightDay = moment(highlightedDay, 'YYYY-M-D').format('MM-DD-YYYY')      
    const today = new Date().getDate()  
    const todaySlicer = formatHighlightDay.slice(3, 5)

    console.log('hydroData', hydroData)

      // moment(highlightedDay, 'YYYY-M-D').format('MM-DD-YYYY')

      const getDay:any = hydroData.find(      
        (day) =>
          moment(day.date, 'YYYY-M-D').format('MM-DD-YYYY') === formatHighlightDay
      );
      if (getDay) {      
        console.log('getDay')
        console.log(getDay)
        // setSelectedDay(getDay);
        dispatch(SET_SELECTED_DAY(getDay))
        dispatch(TOGGLE_PROGRESS_SHOW())
      } 
    }

    const calendarclick = () => {
      dispatch(TOGGLE_PROGRESS_SHOW())
    }





    return (
        <>
        <Container>

          {
            !PROGRESS_SHOW &&
          <Calendar
            // tileClassName={tileClassName}
            // onChange={onChange}
            // value={value}
            onClickDay={(value, event) => getDataForClickedDay(value)}
        />
          }

            {
                  PROGRESS_SHOW === true && WEATHER_CHANNEL === false &&                        
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
              <img style={{ height: '50px', width: '50px' }} onClick={calendarclick} src={calendar}/>
            </>
          ) : (
            <Container style={{ color: 'silver', fontWeight: 'bolder' }} className="calendar-progress">Pick A Highlighted Day</Container>
          )}
        </Container>
                }

        </Container>        
        </>                
    )
}
