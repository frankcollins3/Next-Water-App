import React, {useState, useEffect} from 'react'
import axios from "axios"
import moment from "moment-timezone"

// components and styles
import CalendarDetails from "./CalendarDetails"
import Calendar from "react-calendar"
import DropInBucket from "components/elements/DropInBucket"
// import RainyData from "components/elements/Rainydata"
import Container from "react-bootstrap/Container"
// import styles from "./Dashboard.module.scss"

// @redux/toolkit global state management
import {RootState} from "redux/store/rootReducer"
import {useSelector, useDispatch} from 'react-redux'
import { SET_HYDRO_DATA, SET_CURRENT_PAGE } from "redux/main/mainSlice"
import { SET_SELECTED_DAY, TOGGLE_NO_SELECTED_DAY, TOGGLE_PROGRESS_SHOW,  } from "redux/dashboard/dashboardSlice"

// utils
import {getUserDailyDataQueryString, allUserDataQueryString} from "graphql/queries"
import {useImage} from 'Contexts/ImgContext'
import {usePromise} from "Contexts/Promises"


export default function Dashboard() {

  const { iPROMISEcookies } = usePromise();
  const dispatch = useDispatch()
  const { confirmation, close } = useImage();   

  const HYDRO_DATA = useSelector((state:RootState) => state.main.HYDRO_DATA)
  const SELECTED_DAY = useSelector((state:RootState) => state.dashboard.SELECTED_DAY)
  const NO_SELECTED_DAY = useSelector((state:RootState) => state.dashboard.NO_SELECTED_DAY)

  const [value, onChange] = useState(new Date());

  const [hydroData, setHydroData] = useState();
  const [hydroDays, setHydroDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  //     console.log(process.env.NEXT_PUBLIC_WEATHER_APP)
//     dispatch(SET_CURRENT_PAGE("/dashboard"))\

  useEffect(() => {

    iPROMISEcookies()
    .then( (cookie) => {
        const INTcookieID = parseInt(cookie)
        const queryStr = allUserDataQueryString(INTcookieID)
          axios.post('/api/graphql', {
          query: `query { ${queryStr} }`,
        }).then( (alldata) => {
          console.log('alldata', alldata)
          alldata = alldata?.data?.data?.allUserData                    
          dispatch(SET_HYDRO_DATA(alldata))
        })        
      })

  }, [])
  
  function getDataForClickedDay(highlightedDay) {
    const formatHighlightDay = moment(highlightedDay)
      .tz('UTC')
      .format('MM-DD-YYYY');

    const getDay = HYDRO_DATA.find(
      (day) =>
        moment(day.date).tz('UTC').format('MM-DD-YYYY') === formatHighlightDay
    );
    if (getDay === null || getDay === undefined) {
      if (!NO_SELECTED_DAY) {
        dispatch(TOGGLE_NO_SELECTED_DAY())  
      }
      return;      
    }
    setSelectedDay(getDay);
    console.log('getDay', getDay)
    dispatch(SET_SELECTED_DAY(getDay))
    if (NO_SELECTED_DAY) {
      dispatch(TOGGLE_NO_SELECTED_DAY())
    }
  }

  function tileClassName({ date, view }) {
    // Add class to tiles in month view only
    if (view === 'month') {
      // Check if a date React-Calendar wants to check is on the list of dates to add class to
      const formatDate = moment(date).tz('UTC').format('MM-DD-YYYY');
      if (hydroDays.find((dDate) => formatDate === dDate)) {
        return 'calendarHighlight';
      }
    }
  }

  const changeMonthClick = () => {
    // if user doesn't have data during that month don't let them change to that month. 
    console.log("hey atleast were clicking");

  }

  const renderDashboard = () => {
    if (loading) {
      // return <Spinner />;
      <DropInBucket/>
    }

    if (error) {
      return <div>Error</div>;
    }

    return (
      <>
        {/* <div className="calendar-details">
          {SELECTED_DAY ? (
            <>
               <div className="calendar-date">
                {moment(SELECTED_DAY.date).tz('UTC').format('ddd, MMM-DD-YY')}
              </div>
              <div className="calendar-progress">
                Progress: {Math.ceil(SELECTED_DAY.progress * 100)}%
              </div> 

              
               <Container className="calendar-status">
              {SELECTED_DAY.status && SELECTED_DAY.status.length > 0 ? (
              SELECTED_DAY.status[0].split(',').map((d, index) => (
                <Container key={`div${index}`}>
                  {d.trim() === 'check' ? (
                    <img key={`confirm${index}`} src={confirmation} />
                  ) : (
                    <img key={`close${index}`} src={close} />
                  )}
                </Container>
              ))
            ) : null}
            </Container>               
            </>
          ) : (
            <div style={{ color: 'black' }} className="calendar-progress">Pick A Highlighted Day</div>
          )}
        </div> */}
        <div className="calendar">
          <Calendar            
            tileClassName={tileClassName}
            // tileClassName={tileClassName}
            // onChange={onChange}
            value={value}
            onClickDay={(value, event) => getDataForClickedDay(value)}
            onActiveStartDateChange={changeMonthClick}
          />
        </div>
      </>
    );
  };

  return <div className="dashboard-container">{renderDashboard()}</div>;
}                                                                                                       
