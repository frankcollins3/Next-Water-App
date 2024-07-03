import React, { useEffect } from 'react';
import axios from 'axios'

// components and styles
import WaterThoughts from "components/elements/WaterThoughts"
import Panel from "components/elements/Panel"
import Dropinbucket from 'components/elements/DropInBucket';
import Settings from 'components/elements/Settings';
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
import { TOGGLE_SHOW_HYDRO_SETTINGS, SET_CURRENT_PAGE, SET_HYDRO_INTAKE, SET_HYDRO_SCHEDULE, SET_HYDRO_DATA, SET_STATUS, SET_DATE, SET_DISABLED, SET_PROGRESS, TOGGLE_INTRO_WATER_DROP_IS_HOVERED  } from 'redux/main/mainSlice'
import { TOGGLE_IS_LOGGED_IN } from "redux/logInOutGoogle/logInOutGoogleSlice"

// utils
import { nothingFunc, waterScheduleFromStartTimeEndTime } from "utility/UtilityValues"
import { allDBdataquery, allDBusersquery, userSettingsQueryString, addUserSettingsQueryStringFunc, getUserDailyDataQueryString } from 'graphql/queries';
import {MainInterface, SettingsInterface} from "interfaces/interface"
import {usePromise} from "Contexts/Promises"
import {useImage} from "Contexts/ImgContext"
import waterIntakeWeightFormula from "utility/waterIntakeWeightFormula"
import Calendar from 'react-calendar';


export default function Main(props) {

  
  return (
    <Container id={styles.Page_1}>
      {/*  functional component below has HYDRO_SETTINGS props which are then put into the props of component during renderMain() */}
      <RenderMain/>
    </Container>
  );
}

function RenderMain(props: any) {    
  const {waterDrop, speechBubble} = useImage();

  const CURRENT_USER = useSelector( (state:RootState) => state.logInOutGoogle.CURRENT_USER)
  const IS_LOGGED_IN = useSelector( (state:RootState) => state.logInOutGoogle.IS_LOGGED_IN)
  const SHOW_HYDRO_SETTINGS = useSelector( (state:RootState) => state.main.SHOW_HYDRO_SETTINGS)

return (    
      CURRENT_USER?.id > 0
      ?      
      // <Container id={styles.isLoggedInMain}>

      //   <Container id={styles.primary}>                  
      //   <DynamicSchedule height={100} width={100} margin={null} padding={null} elementId={null} elementClassname={null} style={null} isExample={false} />
      //   </Container>

      //   <Container id={styles.panel}>
      //     {
      //       SHOW_HYDRO_SETTINGS === true
      //       ?
      //       <Settings/>
      //       :
      //       <p style={{ color: 'black' }}> ai </p>
      //     }
      //   </Container>
      // </Container>
    
      <RENDERINTRO2/>      
      :    
      <RenderIntro/>
  );
}

// render intro2 exists because now.... <RenderIntro/> let's a visiting user see more of app before logging in, opens <form> after 2 schedule clicks
function RENDERINTRO2 () {
  const { waterDrop } = useImage();
  const dispatch = useDispatch()

  const CURRENT_USER = useSelector( (state:RootState) => state.logInOutGoogle.CURRENT_USER)
  const SUBMIT_INPUT_DATA = useSelector( (state:RootState) => state.logInOutGoogle.SUBMIT_INPUT_DATA)
  const IS_LOGGED_IN = useSelector( (state:RootState) => state.logInOutGoogle.IS_LOGGED_IN)

  const date = new Date();
  const today:string = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

  const SHOW_HYDRO_SETTINGS = useSelector( (state:RootState) => state.main.SHOW_HYDRO_SETTINGS)
  const SHOW_CALENDAR = useSelector( (state:RootState) => state.main.SHOW_CALENDAR)
  const HYDRO_SCHEDULE = useSelector( (state:RootState) => state.main.HYDRO_SCHEDULE)
  const HYDRO_INTAKE = useSelector( (state:RootState) => state.main.HYDRO_INTAKE)
  const PROGRESS = useSelector( (state:RootState) => state.main.PROGRESS)
  const STATUS = useSelector( (state:RootState) => state.main.STATUS)
  const DISABLED = useSelector( (state:RootState) => state.main.DISABLED)
  const DATE = useSelector( (state:RootState) => state.main.DATE)
  const now = new Date()
  const nowHours = now.getHours();
  const INTRO_WATER_DROP_IS_HOVERED = useSelector( (state:RootState) => state.main.INTRO_WATER_DROP_IS_HOVERED)

  const { iPROMISEcookies, getAndSetCurrentUserPROMISE, getUserSettingsPROMISE, userSettingsSchedulePROMISE, getDailyDataPROMISE, userSettingsIntakePROMISE, setDataStatePROMISE, setUserSettingsPROMISE } = usePromise()

useEffect(() => { 

  setUserSettingsPROMISE()
  .then(async (userSettings) => {
      dispatch(SET_HYDRO_SCHEDULE(userSettings))
  })
  }, [])


  useEffect(() => { 
    // re-set the settings and the function runs to redeliver the updated settings as bar chart. 
    console.log('set hydro_intake is running again')

    setDataStatePROMISE()
    .then(async(alldata) => {
      console.log('alldata', alldata)      
      const dataStatus = alldata?.status[0]?.split(',');
      console.log('dataStatus', dataStatus)      
      // dispatch(SET_DISABLED(new Array(dataStatus.length).fill(false))))   
      dispatch(SET_DISABLED(new Array(dataStatus?.length).fill(false)))

      const userSettings = await setUserSettingsPROMISE()
      console.log('userSettings calm before the storm', userSettings)
      if (!userSettings) {
        return;
      }
      dispatch(SET_STATUS(dataStatus))   
      const newDisabled = userSettings.map((time, index) => {        
      // const newDisabled = HYDRO_SCHEDULE.map((time) => {        
          console.log('nowHours', nowHours)
        console.log('time', time)
        // console.log('index', index)
          const scheduledTime = new Date();
          scheduledTime.setHours(parseInt(time));
          // scheduledTime.setHours(parseInt(time) - 1);
        
          if (nowHours > time) {
            return true;
          } else {
            return dataStatus[index] === 'check' ? true : false
            // return false;
          }
        });       
        dispatch(SET_DISABLED(newDisabled))                                 


    })
    
  }, [HYDRO_INTAKE]);
           
        
  const test = () => {
    console.log('SUBMIT_INPUT_DATA', SUBMIT_INPUT_DATA)
  }
  return (
    <div className={styles.mainContent}>

      {/* {
        IS_LOGGED_IN === true
        ?
        <p style={{ color: 'black'}}> yeah </p>
        :
        <p style={{ color: 'black'}}> no </p>
      } */}
                             
        <div id={styles.mainContainer}>  

        <div id={styles.primary}>

          <img id={styles.isLoggedInWaterDrop} src={waterDrop}/>

        <div style={{ height: '450px', width: '450px' }} className={styles.introWaterScheduleCont}>  
        <DynamicSchedule height={100} width={100} margin={null} padding={null} elementId={null} elementClassname={null} style={null} isExample={false} />                 
        </div>

        {/* <h1 style={{ color: 'black' }}> hey </h1> */}
        </div>        

        <div 
        style={{ width: '200px' }}
        id={styles.panel}
        >

                                  

          {
            SHOW_HYDRO_SETTINGS === true
            ?
            <Settings/>
            :
              HYDRO_SCHEDULE &&
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

function RenderIntro() {
  const { waterDrop } = useImage();
  const dispatch = useDispatch()

  const CURRENT_USER = useSelector( (state:RootState) => state.logInOutGoogle.CURRENT_USER)
  const SUBMIT_INPUT_DATA = useSelector( (state:RootState) => state.logInOutGoogle.SUBMIT_INPUT_DATA)
  const IS_LOGGED_IN = useSelector( (state:RootState) => state.logInOutGoogle.IS_LOGGED_IN)

  const SHOW_HYDRO_SETTINGS = useSelector( (state:RootState) => state.main.SHOW_HYDRO_SETTINGS)
  const HYDRO_DATA = useSelector( (state:RootState) => state.main.HYDRO_DATA)
  const HYDRO_SCHEDULE = useSelector( (state:RootState) => state.main.HYDRO_SCHEDULE)
  const HYDRO_INTAKE = useSelector( (state:RootState) => state.main.HYDRO_INTAKE)
  const PROGRESS = useSelector( (state:RootState) => state.main.PROGRESS)
  const STATUS = useSelector( (state:RootState) => state.main.STATUS)
  const DISABLED = useSelector( (state:RootState) => state.main.DISABLED)
  const DATE = useSelector( (state:RootState) => state.main.DATE)
  
  function countChecks(arr) {
    let count = 0;
    arr.forEach((item) => {
      // Convert item to string and count occurrences of "check"
      count += (item.toString().match(/check/g) || []).length;
    });
    return count;
  }
  

  const INTRO_WATER_DROP_IS_HOVERED = useSelector( (state:RootState) => state.main.INTRO_WATER_DROP_IS_HOVERED)

const { iPROMISEcookies, getAndSetCurrentUserPROMISE, getUserSettingsPROMISE, userSettingsSchedulePROMISE, getDailyDataPROMISE, userSettingsIntakePROMISE, setDataStatePROMISE, setUserSettingsPROMISE } = usePromise()

// no need for any state setting functions the <DynamicSchedule/> creates edge case schedule 
// so non-logged in user can see what using app would be like

  useEffect(() => { 
    dispatch(SET_CURRENT_PAGE("/"));    
    getAndSetCurrentUserPROMISE().then((currentUser) => {
    })

    setUserSettingsPROMISE()
    .then( (userSettings) => {
      
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

      {/* {
        IS_LOGGED_IN === true
        ?
        <p style={{ color: 'black'}}> yeah </p>
        :
        <p style={{ color: 'black'}}> no </p>
      } */}



       <div 
       onClick={test}
       id={SUBMIT_INPUT_DATA === true ? "" : styles.waterDropThoughtsBox}
       >
         {
           SUBMIT_INPUT_DATA === true
           ?
           <MeIcon/>            
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
          <SignupLoginForm/>
          //  SUBMIT_INPUT_DATA === false ? <SignupLoginForm/> : SHOW_HYDRO_SETTINGS === true ? <Settings/> : <DynamicSchedule height={100} width={100} margin={null} padding={null} elementId={null} elementClassname={null} style={null} isExample={true} /> 
           :
            SHOW_HYDRO_SETTINGS === true ? 
            <Settings/> 
            : 
            <DynamicSchedule height={100} width={100} margin={null} padding={null} elementId={null} elementClassname={null} style={null} isExample={true} /> 
          }                    

   </div>

   </div>
  )
}