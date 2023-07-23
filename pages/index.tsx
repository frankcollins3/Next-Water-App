import React, { useEffect } from 'react';
import axios from 'axios'

// components and styles
import Dropinbucket from 'components/elements/DropInBucket';
import Settings from 'components/elements/Settings';
import Container from 'react-bootstrap/Container';
import styles from 'components/webpage/Main/Main.module.scss'

// @redux/toolkit state management
import { RootState } from 'redux/store/rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import { TOGGLE_HYDRO_SETTINGS, SET_CURRENT_PAGE, SET_HYDRO_INTAKE } from 'redux/main/mainSlice'



// utils
import { allDBusersquery, userSettingsQueryString } from 'graphql/queries';
import {MainInterface, SettingsInterface} from "utility/interfaceNtypes"
import {usePromise} from "Contexts/Promises"
import waterIntakeWeightFormula from "utility/waterIntakeWeightFormula"


export default function Main() {
  
    
  return (
    <Container id={styles.Page_1}>
      {/*  functional component below has HYDRO_SETTINGS props which are then put into the props of component during renderMain() */}
      <RenderMain/>
    </Container>
  );
}

function RenderMain() {  
  // const { hydroSchedule, hydroIntake, status, setStatus, disabled, setDisabled, HYDRO_SCHEDULE } = props

  const HYDRO_SETTINGS = useSelector( (state:RootState) => state.main.HYDRO_SETTINGS)
  const HYDRO_SCHEDULE = useSelector( (state:RootState) => state.main.HYDRO_SCHEDULE)
  const HYDRO_INTAKE = useSelector( (state:RootState) => state.main.HYDRO_INTAKE)
  const STATUS = useSelector( (state:RootState) => state.main.STATUS)
  const DISABLED = useSelector( (state:RootState) => state.main.DISABLED)

  // HYDRO_SETTINGS: false, HYDRO_SCHEDULE: [], HYDRO_INTAKE: 0, STATUS: [], DISABLED: [],

  // const HYDRO_SETTINGS = props.HYDRO_SETTINGS
  const { iPROMISEcookies, getUserSettingsPROMISE, userSettingsSchedulePROMISE, getDailyDataPROMISE } = usePromise()


  useEffect(() => { 
    dispatch(SET_CURRENT_PAGE("/"))
    iPROMISEcookies()
    .then(async(cookie) => {
      const IDcookieINT = parseInt(cookie)
      const allDBusers = await axios.post('/api/graphql', { query: `${allDBusersquery}` })
      if (!Number.isNaN(IDcookieINT)) {
        const allUsers = allDBusers.data.data.allDBusers
        const meUser = allUsers.find(user => user.id === IDcookieINT)



        // Promise.all() no?
        userSettingsSchedulePROMISE()      
        getDailyDataPROMISE()       
        getUserSettingsPROMISE()
        .then(async(mySettings:any) => {
          mySettings = mySettings.data.data.userSettings
          console.log('settings client', mySettings)
          let weight:number = mySettings.weight
          console.log('weight', weight)
          let intake:number = await waterIntakeWeightFormula(weight)
          console.log('intake', intake)
          dispatch(SET_HYDRO_INTAKE(intake))
          console.log('intake', intake)
          console.log('type intake', typeof intake)
        })  
        
        
      }
    })

  }, []);

// function RenderMain({ HYDRO_SETTINGS }: { HYDRO_SETTINGS: boolean }) {  

  const dispatch = useDispatch()

  const test = () => {
    console.log('hydro main', HYDRO_SETTINGS)
  }

  return (
    <>
      <Container onClick={test} className={styles.primary}>
        <div className={styles.display}>
          {/* { HYDRO_SETTINGS === true && <Dropinbucket /> } */}
          <Dropinbucket />
          {/* <p style={{ color: 'black'}}> display </p> */}
        </div>

        <Container className={styles.schedule}></Container>
      </Container>

      <Container className={styles.panel}>
        {/* Use the hydroSettings state here */}
      
        { HYDRO_SETTINGS === true && <Settings/> }
        
        {/* { HYDRO_SETTINGS === true && <h1> hey </h1>} */}

      </Container>
    </>
  );
}
