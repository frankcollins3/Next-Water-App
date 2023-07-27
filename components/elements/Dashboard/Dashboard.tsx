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
import {usePromise} from "Contexts/Promises"

export default function DashboardComponent() {

  const dispatch = useDispatch()

  const HYDRO_DATA = useSelector( (state:RootState) => state.main.HYDRO_DATA)
  
  const SELECTED_DAY = useSelector( (state:RootState) => state.dashboard.SELECTED_DAY)

    // const [value, onChange] = useState(new Date());
  const [hydroData, setHydroData] = useState<any>();
  // const [hydroDays, setHydroDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState();
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState();

  const { iPROMISEcookies } = usePromise()

  useEffect( () => {
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
        setSelectedDay(getDay);
        TOGGLE_PROGRESS_SHOW()
      } 

      // else {
      //   setSelectedDay(null)
      //   if (CALENDAR_DAY_DRIED_UP === false) TOGGLE_CALENDAR_DAY_DRIED_UP()
      // }
    }

      // if (WEATHER_CHANNEL) TOGGLE_WEATHER_CHANNEL()
      
      // console.log('hydrodata', HYDRO_DATA)

      // const formatHighlightDay = moment(highlightedDay, 'YYYY-M-D').format('MM-DD-YYYY')      
      // const today = new Date().getDate()  
      // const todaySlicer = formatHighlightDay.slice(3, 5)



    return (
        <>
        <Container>
        {/* <Container className="calendar"> */}
          <Calendar
            // tileClassName={tileClassName}
            // tileClassName={tileClassName}
            // onChange={onChange}
            // value={value}
            onClickDay={(value, event) => getDataForClickedDay(value)}
        />
        </Container>        
        </>                
    )
}