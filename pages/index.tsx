import React, { useEffect } from 'react';
import axios from 'axios'

// components and styles
import Dropinbucket from 'components/elements/DropInBucket';
import Settings from 'components/elements/Settings';
import Container from 'react-bootstrap/Container';
import Schedule from "components/elements/Schedule"
import Panel from "components/elements/Panel"
import styles from 'components/webpage/Main/Main.module.scss'


// @redux/toolkit state management
import { RootState } from 'redux/store/rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import { TOGGLE_HYDRO_SETTINGS, SET_CURRENT_PAGE, SET_HYDRO_INTAKE, SET_HYDRO_SCHEDULE, SET_HYDRO_DATA, SET_STATUS, SET_DATE, SET_DISABLED, SET_PROGRESS } from 'redux/main/mainSlice'



// utils
import { allDBdataquery, allDBusersquery, userSettingsQueryString, addUserSettingsQueryStringFunc, getUserDailyDataQueryString } from 'graphql/queries';
import {MainInterface, SettingsInterface} from "utility/interfaceNtypes"
import {usePromise} from "Contexts/Promises"
import waterIntakeWeightFormula from "utility/waterIntakeWeightFormula"


export default function Main(props) {

  
  return (
    <Container id={styles.Page_1}>
      {/*  functional component below has HYDRO_SETTINGS props which are then put into the props of component during renderMain() */}
  <RenderMain setLocalCurrentUsername={props.setLocalCurrentUsername} mainBorderHover={props.mainBorderHover} setMainBorderHover={props.setMainBorderHover} />
    </Container>
  );
}

function RenderMain(props: any) {    

  const dispatch = useDispatch()

  const HYDRO_SETTINGS = useSelector( (state:RootState) => state.main.HYDRO_SETTINGS)
  const HYDRO_SCHEDULE = useSelector( (state:RootState) => state.main.HYDRO_SCHEDULE)
  const HYDRO_INTAKE = useSelector( (state:RootState) => state.main.HYDRO_INTAKE)
  const STATUS = useSelector( (state:RootState) => state.main.STATUS)
  const DISABLED = useSelector( (state:RootState) => state.main.DISABLED)
  const DATE = useSelector( (state:RootState) => state.main.DATE)

  // HYDRO_SETTINGS: false, HYDRO_SCHEDULE: [], HYDRO_INTAKE: 0, STATUS: [], DISABLED: [],

  // const HYDRO_SETTINGS = props.HYDRO_SETTINGS
const { iPROMISEcookies, getAndSetCurrentUserPROMISE, getUserSettingsPROMISE, userSettingsSchedulePROMISE, getDailyDataPROMISE, userSettingsIntakePROMISE, setDataStatePROMISE, setUserSettingsPROMISE } = usePromise()


  useEffect(() => { 

    getAndSetCurrentUserPROMISE(props.setLocalCurrentUsername)

    dispatch(SET_CURRENT_PAGE("/"));    
    // export const addUserSettingsQueryStringFunc = (age:number, height:number, weight:number, start_time:number, end_time:number, reminder:number, activity:number, users_id:number) => {

    setUserSettingsPROMISE()
    .then( (userSettings) => {
        console.log('userSettings', userSettings)
    })

    // updateDailyData(users_id: ${users_id}, date: "${date}", progress: ${progress}, weekday: "${weekday}", status: ${status}) {

//   const ID = 4
//   const status = ["check", "check", "false", "false", "check"]

    // axios
    // .post('/api/graphql', {
    //   query: `
    //     query {
    //       userSettings(users_id: 4) {
    //         id
    //         age
    //         height
    //         weight
    //         start_time
    //         end_time
    //         reminder
    //         activity
    //         users_id
    //       }
    //     }
    //   `
    // })


      // axios
      // .post('/api/graphql', {
      //   query: `
      //   mutation {
      //     getDailyData(users_id: 4) {
      //       google_id
      //       date
      //       progress
      //       weekday
      //       status
      //       users_id
      //     }
      //   }
      //   `
      // }).then( (dailydata) => {
      //   console.log('dailydata', dailydata)
      // })

//      axios
//     .post('/api/graphql', {
//       query: `
//       mutation {
//         updateDailyData(users_id: 1, date: "2023-7-13", progress: 50, weekday: "Thursday", status: ["check, false, false, check, check"]) {
//           google_id
//           date
//           progress
//           weekday
//           status
//           users_id
//         }
//       }
//       `
//   }).then( (indexdata) => {
//    console.log('indexdata', indexdata)
//  })



  }, []);

  useEffect(() => { 
    console.log('set hydro_intake is running again')
    setDataStatePROMISE()
    .then( (alldata) => {
      console.log('alldata', alldata)
    })

    setUserSettingsPROMISE()
    .then( (userSettings) => {
        console.log(userSettings)

    })
  }, [HYDRO_INTAKE]);

// function RenderMain({ HYDRO_SETTINGS }: { HYDRO_SETTINGS: boolean }) {  

  const test = () => {
    console.log('hydro main', HYDRO_SETTINGS)
  }

  return (
    <>
      <Container onMouseEnter={() => props.setMainBorderHover(true)} onMouseLeave={() => props.setMainBorderHover(false)} onClick={test} className={styles.primary}>

          {/* {
            HYDRO_SCHEDULE && STATUS
                  ?
              <>
              <Schedule/>
              </>
                  :
            <Dropinbucket />
          } */}

          {HYDRO_SCHEDULE && STATUS && <Schedule/>}
          {!HYDRO_SCHEDULE[1] && <Dropinbucket/>}
          {/* {!HYDRO_SCHEDULE && STATUS && <DropinBucket/>} */}

          {/* <Dropinbucket /> */}

        <div className={styles.display}>

        </div>

      </Container>

      <Container className={styles.panel}>
      
        {
         HYDRO_SETTINGS === true 
              ?
         <Settings/> 
              :
            HYDRO_SCHEDULE &&
            <Panel
            date={DATE}
            hydroIntake={HYDRO_INTAKE}
            hydroSchedule={HYDRO_SCHEDULE}
            mainBorderHover={props.mainBorderHover}
            />
          //  <Panel/>
        }  
              
        {/* { HYDRO_SETTINGS === true && <Settings/> }         */}
      </Container>
      {/* <Credits/> */}
      
    </>
  );
}
