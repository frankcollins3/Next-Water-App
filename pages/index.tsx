import React, { useEffect } from 'react';
import axios from 'axios'

// components and styles
import WaterThoughts from "components/elements/WaterThoughts"
import Panel from "components/elements/Panel"
import Dropinbucket from 'components/elements/DropInBucket';
import Settings from 'components/elements/Settings';
import DashboardComponent from "components/elements/Dashboard"
import Display from "components/elements/Display"
import DisplayWave from "components/elements/DisplayWave"
import CalendarDetails from "components/elements/Dashboard/CalendarDetails"
import Container from 'react-bootstrap/Container';
import Schedule from "components/elements/Schedule"
import MeIcon from "components/elements/MeIcon"
import DynamicSchedule from "components/elements/DynamicSchedule"
import LogInOutGoogle from "components/elements/LogInOutGoogle"
import SignupLoginForm from "components/elements/SignupLoginForm"
// import Panel from "components/elements/Panel"

import styles from 'styles/Intro.module.scss'

// @redux/toolkit state management
import { RootState } from 'redux/store/rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import { TOGGLE_SHOW_HYDRO_SETTINGS, SET_CURRENT_PAGE, SET_HYDRO_INTAKE, SET_HYDRO_SCHEDULE, SET_HYDRO_DATA, SET_STATUS, SET_DATE, SET_DISABLED, SET_PROGRESS, TOGGLE_INTRO_WATER_DROP_IS_HOVERED } from 'redux/main/mainSlice'
import { TOGGLE_IS_LOGGED_IN } from "redux/logInOutGoogle/logInOutGoogleSlice"

// utils
import { nothingFunc, waterScheduleFromStartTimeEndTime } from "utility/UtilityValues"
import { allDBdataquery, allDBusersquery, userSettingsQueryString, addUserSettingsQueryStringFunc, getUserDailyDataQueryString } from 'graphql/queries';
import { MainInterface, SettingsInterface } from "interfaces/interface"
import { usePromise } from "Contexts/Promises"
import { useImage } from "Contexts/ImgContext"
import waterIntakeWeightFormula from "utility/waterIntakeWeightFormula"
import Calendar from 'react-calendar';


export default function Main(props) {


  return (
    <Container id={styles.Page_1}>
      {/*  functional component below has HYDRO_SETTINGS props which are then put into the props of component during renderMain() */}
      <RenderMain />
    </Container>
  );
}

function RenderMain(props: any) {         
  
  const { waterDrop, speechBubble } = useImage();

  const CURRENT_USER = useSelector((state: RootState) => state.logInOutGoogle.CURRENT_USER)
  const IS_LOGGED_IN = useSelector((state: RootState) => state.logInOutGoogle.IS_LOGGED_IN)
  const SHOW_HYDRO_SETTINGS = useSelector((state: RootState) => state.main.SHOW_HYDRO_SETTINGS)

  return (
    CURRENT_USER?.id > 0
      ?
      <RENDERINTRO2 />
      :
      <RenderIntro />
  );
}

// render intro2 exists because now.... <RenderIntro/> let's a visiting user see more of app before logging in, opens <form> after 2 schedule clicks
function RENDERINTRO2() {
  const { waterDrop } = useImage();
  const dispatch = useDispatch()

  const CURRENT_USER = useSelector((state: RootState) => state.logInOutGoogle.CURRENT_USER)
  const SUBMIT_INPUT_DATA = useSelector((state: RootState) => state.logInOutGoogle.SUBMIT_INPUT_DATA)
  const IS_LOGGED_IN = useSelector((state: RootState) => state.logInOutGoogle.IS_LOGGED_IN)

  const date = new Date();
  const today: string = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

  const SHOW_HYDRO_SETTINGS = useSelector((state: RootState) => state.main.SHOW_HYDRO_SETTINGS)
  const SHOW_CALENDAR = useSelector((state: RootState) => state.main.SHOW_CALENDAR)
  const HYDRO_SCHEDULE = useSelector((state: RootState) => state.main.HYDRO_SCHEDULE)
  const HYDRO_INTAKE = useSelector((state: RootState) => state.main.HYDRO_INTAKE)
  const PROGRESS = useSelector((state: RootState) => state.main.PROGRESS)
  const STATUS = useSelector((state: RootState) => state.main.STATUS)
  const DISABLED = useSelector((state: RootState) => state.main.DISABLED)
  const DATE = useSelector((state: RootState) => state.main.DATE)
  const now = new Date()
  const nowHours = now.getHours();
  const INTRO_WATER_DROP_IS_HOVERED = useSelector((state: RootState) => state.main.INTRO_WATER_DROP_IS_HOVERED)

  const { signupFunctions, setDataStatePROMISE, setUserSettingsPROMISE } = usePromise()
  // const setUsernamesAndEmails = signupFunctions?.setUsernamesAndEmails

  useEffect(() => {

    setUserSettingsPROMISE()
      .then(async (userSettings) => {
        console.log(userSettings)
        if (!userSettings || userSettings === null) {
          console.log('userSettings', userSettings)
          dispatch(TOGGLE_SHOW_HYDRO_SETTINGS())
        } else {
          dispatch(SET_HYDRO_SCHEDULE(userSettings))          
        }

      })
  }, [])


  useEffect(() => {
    // re-set the settings and the function runs to redeliver the updated settings as bar chart. 
    console.log('set hydro_intake is running again')

    setDataStatePROMISE()
      .then(async (alldata) => {        
        if (!alldata || alldata === undefined) {
          return;
        }

        console.log('alldata', alldata)
        const statusData = alldata?.status
        // establish the array that determines <button disabled={true|false}/> to be same length now as the schedule itself no possible discrepancies. 
        dispatch(SET_DISABLED(new Array(statusData?.length).fill(false)))

        // get the schedule. there are reductions that can be made in queries doing the same thing. working on startup and will release 
        const userSettings = await setUserSettingsPROMISE()
        console.log('userSettings calm before the storm', userSettings)
        if (!userSettings || userSettings === null) {
          console.log('hey we basically end up over here');
          // dispatch(TOGGLE_SHOW_HYDRO_SETTINGS())
          return;
        }

        dispatch(SET_STATUS(statusData))
        const newDisabled = userSettings?.map((time, index) => {
          // const newDisabled = statusData.map((time, index) => {
          // const newDisabled = HYDRO_SCHEDULE.map((time, index) => {        
          console.log('nowHours', nowHours)
          console.log('time', time)
          // console.log('index', index)
          const scheduledTime = new Date();
          scheduledTime.setHours(parseInt(time));
          if (nowHours >= time) {
            return true;
          } else if (statusData[index] === 'check') {
            return true;
          } else {
            return false;
          }
        });
        console.log('newDisabled', newDisabled)
        dispatch(SET_DISABLED(newDisabled))
      })

  }, [HYDRO_INTAKE]);


  const test = () => {
    console.log('SUBMIT_INPUT_DATA', SUBMIT_INPUT_DATA)
  }

  return (
    <div className={styles.mainContent}>


      <div id={styles.mainContainer}>

        <div id={styles.primary}>


          {/* <img id={styles.isLoggedInWaterDrop} src={waterDrop} /> */}


          <div style={{ height: '450px', width: '450px' }} className={styles.introWaterScheduleCont}>
            {
              HYDRO_SCHEDULE === null
              ?
              <>
              <WaterThoughts/>
              <Dropinbucket/> 
              </>              
              :
              <DynamicSchedule height={100} width={100} margin={null} padding={null} elementId={null} elementClassname={null} style={null} isExample={false} />
            }
          </div>

          {/* <h1 style={{ color: 'black' }}> hey </h1> */}
        </div>

        <div
          style={{ width: HYDRO_SCHEDULE === null ? "400px" : '200px' }}
          id={styles.panel}
        >

          {
            SHOW_HYDRO_SETTINGS === true
              ?
              <Settings />
              :
              HYDRO_SCHEDULE 
              &&
              <Panel
                date={today}
                hydroIntake={HYDRO_INTAKE}
                hydroSchedule={HYDRO_INTAKE}
              />
          }
        </div>

      </div>

    </div>
  )
}



// RenderIntro allows user to see features previously only visible to logged in users, as a UX driven UI 
function RenderIntro() {
  const { waterDrop } = useImage();
  const dispatch = useDispatch()

  const CURRENT_USER = useSelector((state: RootState) => state.logInOutGoogle.CURRENT_USER)
  const SUBMIT_INPUT_DATA = useSelector((state: RootState) => state.logInOutGoogle.SUBMIT_INPUT_DATA)
  const IS_LOGGED_IN = useSelector((state: RootState) => state.logInOutGoogle.IS_LOGGED_IN)

  const SHOW_HYDRO_SETTINGS = useSelector((state: RootState) => state.main.SHOW_HYDRO_SETTINGS)
  const HYDRO_DATA = useSelector((state: RootState) => state.main.HYDRO_DATA)
  const HYDRO_SCHEDULE = useSelector((state: RootState) => state.main.HYDRO_SCHEDULE)
  const HYDRO_INTAKE = useSelector((state: RootState) => state.main.HYDRO_INTAKE)
  const PROGRESS = useSelector((state: RootState) => state.main.PROGRESS)
  const STATUS = useSelector((state: RootState) => state.main.STATUS)
  const DISABLED = useSelector((state: RootState) => state.main.DISABLED)
  const DATE = useSelector((state: RootState) => state.main.DATE)

  // SHOW_WEB_ICONS === true        SHOW_APP_ICONS === true
  const SHOW_WEB_ICONS = useSelector((state: RootState) => state.icons.SHOW_WEB_ICONS)
  const SHOW_APP_ICONS = useSelector((state: RootState) => state.icons.SHOW_APP_ICONS)
  

  function countChecks(arr) {
    let count = 0;
    arr.forEach((item) => {
      // Convert item to string and count occurrences of "check"
      count += (item?.toString().match(/check/g) || []).length;
    });
    return count;
  }


  const INTRO_WATER_DROP_IS_HOVERED = useSelector((state: RootState) => state.main.INTRO_WATER_DROP_IS_HOVERED)

  const { signupFunctions, getAndSetCurrentUserPROMISE, setUserSettingsPROMISE } = usePromise()
  const setUsernamesAndEmails = signupFunctions?.setUsernamesAndEmails

  // no need for any state setting functions the <DynamicSchedule/> creates edge case schedule 
  // so non-logged in user can see what using app would be like

  useEffect(() => {
    dispatch(SET_CURRENT_PAGE("/"));
    setUsernamesAndEmails()
    getAndSetCurrentUserPROMISE().then((currentUser) => {
    })

    setUserSettingsPROMISE()
      .then((userSettings) => {

      }).catch((error) => {
        console.log('error', error)
      })

  }, []);

  const test = () => {
    console.log('SUBMIT_INPUT_DATA', SUBMIT_INPUT_DATA)

  }

  return (
    <div
      className={styles.mainContent}>

      <div
        onClick={test}
        id={SUBMIT_INPUT_DATA === true ? "" : styles.waterDropThoughtsBox}
      >
        {
          SUBMIT_INPUT_DATA === true
            ?
            <MeIcon />
            :
            <>
              <WaterThoughts/>              
              <img
                onClick={() => dispatch(TOGGLE_INTRO_WATER_DROP_IS_HOVERED())}
                id={styles.introWaterDrop} src={waterDrop}
              />
            </>
        }
      </div>

      <div
        style={{
          height: '450px', width: '450px',
        }}
        //  style={{ height: '450px', width: '30%' }}
        className={styles.introWaterScheduleCont}
      >

        {
          countChecks(STATUS) > 1
            ?
            // make below redundant     ? : <Settings> <DymamicSchedule/> 1 component. only redesigning not refactoring.  back to working on another app. 
            //  SUBMIT_INPUT_DATA === true ? <SignupLoginForm/> : SHOW_HYDRO_SETTINGS === true ? <Settings/> : <DynamicSchedule height={100} width={100} margin={null} padding={null} elementId={null} elementClassname={null} style={null} isExample={true} /> 

            <SignupLoginForm />
            // SHOW_APP_ICONS === false && SHOW_WEB_ICONS === false && <SignupLoginForm />          
            :
            SHOW_HYDRO_SETTINGS === true ?
              <Settings />
              :
              <DynamicSchedule height={100} width={100} margin={null} padding={null} elementId={null} elementClassname={null} style={null} isExample={true} />
        }

      </div>

    </div>
  )
}