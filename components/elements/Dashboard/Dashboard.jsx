import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import Calendar from 'react-calendar';
import './dashboard.css';
import 'react-calendar/dist/Calendar.css';

import currentuserJSONparse from '../../../utility/currentuserJSONparse'
import getAllUserData from '../../../utility/fetch/getAllUserData'
import {useImage} from '../../../utility/Contexts/ImgContext'
import {useRegex} from '../../../utility/Contexts/RegexMenu'
import CSS from '../../../utility/CSS'
import {currentDayBorderOn} from '../../../utility/UtilityValues'
import {currentDayBorderOff} from '../../../utility/UtilityValues'
import {connect} from 'react-redux'
import { set } from 'date-fns';
import Spinner from '../Spinner';
import $ from 'jquery';

import Rainydata from '../../../components/elements/Rainydata'
import Container from 'react-bootstrap/Container'

import { TOGGLE_CALENDAR_DAY_DRIED_UP, SET_CITY_NAME, TOGGLE_WEATHER_CHANNEL, TOGGLE_CALENDAR_SHOW, TOGGLE_PROGRESS_SHOW, } from '../../../redux/actions'

 function Dashboard( { CALENDAR_DAY_DRIED_UP, TOGGLE_CALENDAR_DAY_DRIED_UP, WEATHER_CHANNEL, TOGGLE_WEATHER_CHANNEL, CALENDAR_SHOW, TOGGLE_CALENDAR_SHOW, PROGRESS_SHOW, TOGGLE_PROGRESS_SHOW, CITY_NAME, SET_CITY_NAME, APIBOTH }) {
  const [value, onChange] = useState(new Date());
  const [hydroData, setHydroData] = useState();
  const [hydroDays, setHydroDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const tilenow = $('.react-calendar__tile--now')

  const { close, confirmation, bg, calendar } = useImage()
  const { dayofMonthSplit } = useRegex()

  useEffect(() => {
    (async() => {
      $(tilenow).css('background-color', 'none')
      // $(tilenow).css('border', '5px solid purple')
       let currentUser = await currentuserJSONparse()
       console.log('currentUser')
       console.log(currentUser)
       let currentuserID = currentUser.id
       let currentUserDataArray = await getAllUserData(currentuserID)
       let dataLength = currentUserDataArray.length      
       const datePROMISE = new Promise( (resolve, reject) => {
          setHydroData(currentUserDataArray);          
          const getDates = currentUserDataArray.map((day, index) => {            
            const formattedDate = moment(day.date, 'YYYY-M-D').format('MM-DD-YYYY');
            return formattedDate;
          });
          resolve(getDates ? getDates : "no dates")          
        })
        datePROMISE
        .then( (actualdates) => {            
            console.log('actualdates')
            console.log(actualdates)
        })              
    })()
   }, []);

   useEffect( () => {
    $(tilenow).css('background-color', 'none')
   }, [PROGRESS_SHOW])  


   async function getDataForClickedDay(highlightedDay) {
    if (WEATHER_CHANNEL) TOGGLE_WEATHER_CHANNEL()
    



    console.log('hydroData')
    console.log(hydroData)

    const formatHighlightDay = moment(highlightedDay, 'YYYY-M-D').format('MM-DD-YYYY')      
    const today = new Date().getDate()  
    const todaySlicer = formatHighlightDay.slice(3, 5)
  
    if (today.toString() === todaySlicer)  currentDayBorderOn($(tilenow)) 
    else if (today.toString() !== todaySlicer) currentDayBorderOff($(tilenow))


    const getDay = hydroData.find(      
      (day) =>
        moment(day.date, 'YYYY-M-D').format('MM-DD-YYYY') === formatHighlightDay
        // moment(highlightedDay, 'YYYY-M-D').format('MM-DD-YYYY')
    );
    if (getDay) {      
      console.log('getDay')
      console.log(getDay)
      setSelectedDay(getDay);
      TOGGLE_PROGRESS_SHOW()
    } else {
      setSelectedDay(null)
      if (CALENDAR_DAY_DRIED_UP === false) TOGGLE_CALENDAR_DAY_DRIED_UP()
    }
  }



  function tileClassName({ date, view }) {
    // Add class to tiles in month view only
    if (view === 'month') {
      // Check if a date React-Calendar wants to check is on the list of dates to add class to
      const formatDate = moment(date.date, 'YYYY-M-D').format('MM-DD-YYYY')
      if (hydroDays.find((dDate) => formatDate === dDate)) {
        return 'calendarHighlight';
      }
    }
  }

  const calendarclick = () => {
    TOGGLE_PROGRESS_SHOW()
  }

  const renderDashboard = () => {
    if (loading) {
      // return <Spinner />;
    }

    if (error) {
      return <div>Error</div>;
    }

    return (
      <>
        {/* { */}
          {/* WEATHER_CHANNEL === false */}
                {/* // ? */}
                {
                  PROGRESS_SHOW === true && WEATHER_CHANNEL === false
                        ?
        <Container className="calendar-details">
          {selectedDay ? (
            <>
              <div className="calendar-date">
                {moment(selectedDay.date, 'YYYY-M-D').format('ddd, MMM-DD-YY')}
              </div>
              <div className="calendar-progress">
                        {
                          selectedDay.progress < 1
                               ?  <img style={{ marginTop: '0.5em'}} src={bg}/>
                               : <pre> Progress: {Math.ceil(selectedDay.progress)}% </pre>
                        }
                
              </div>
              <Container className="calendar-status">
              {
                  selectedDay.status[0]
                            ?
              selectedDay.status[0].split(',').map((d, index) => (
                  <Container key={`div${index}`}>
                    {d.trim() === 'check' ? (
                      <img key={`confirm${index}`} src={confirmation} />
                    ) : (
                      <img key={`close${index}`} src={close} />
                    )}
                  </Container>
                ))                  
                        :
                  <pre></pre>
                
                }
                <img onClick={calendarclick} src={calendar}/>
              </Container>
            </>
          ) : (
            <Container style={{ color: 'silver', fontWeight: 'bolder' }} className="calendar-progress">Pick A Highlighted Day</Container>
          )}
        </Container>
                        :
                        <pre></pre>
                }

          {
            WEATHER_CHANNEL 
            ?
             <Container  className="calendar-details">
                <Rainydata/>
            </Container> 
            : <pre> </pre>            
          }

          {/* <Container  className="calendar-details">
              <Rainydata/>
          </Container> */}
          {
            PROGRESS_SHOW === false && WEATHER_CHANNEL === false
                      ?
        <Container className="calendar">
          <Calendar
            tileClassName={tileClassName}
            // tileClassName={tileClassName}
            onChange={onChange}
            value={value}
            onClickDay={(value, event) => getDataForClickedDay(value)}
          />
        </Container>
                    :
                <pre></pre>
          }
      </>
    );
  };

  return <Container className="dashboard-container">{renderDashboard()}</Container>;
}

const mapStateToProps = (state) => ({
  CALENDAR_DAY_DRIED_UP: state.CALENDAR_DAY_DRIED_UP,
  WEATHER_CHANNEL: state.WEATHER_CHANNEL,
  CALENDAR_SHOW: state.CALENDAR_SHOW,
  PROGRESS_SHOW: state.PROGRESS_SHOW,
  APIBOTH: state.APIBOTH,
  CITY_NAME: state.CITY_NAME
})

const mapDispatchToProps = (dispatch) => ({
  TOGGLE_CALENDAR_DAY_DRIED_UP: () => dispatch(TOGGLE_CALENDAR_DAY_DRIED_UP()),
  TOGGLE_WEATHER_CHANNEL: () => dispatch(TOGGLE_WEATHER_CHANNEL()),
  TOGGLE_CALENDAR_SHOW: () => dispatch(TOGGLE_CALENDAR_SHOW()),
  TOGGLE_PROGRESS_SHOW: () => dispatch(TOGGLE_PROGRESS_SHOW()),
  SET_CITY_NAME: (dispatch) => dispatch(SET_CITY_NAME(dispatch))
})

const ConnectedDashboard = connect(mapStateToProps, mapDispatchToProps)(Dashboard)
export default ConnectedDashboard