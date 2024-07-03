import React, {useEffect, useState} from 'react';
import axios from 'axios'
 
// components and styles
import Display from 'components/elements/Display'

import styles from "./Credits.module.scss"

// @redux/toolkit global state management
import {RootState} from "redux/store/rootReducer"
import { useSelector, useDispatch } from 'react-redux'
import Container from 'react-bootstrap/Container'
import { SET_PROGRESS, SET_CURRENT_PAGE } from "redux/main/mainSlice"

// utils
import {useImage} from 'Contexts/ImgContext'
import { getDayOfWeek } from "utility/UtilityValues"
  import { updateDailyDataQueryString } from 'graphql/queries';


export default function Credits() {

    const dispatch = useDispatch()

    const CURRENT_USER = useSelector( (state:RootState) => state.logInOutGoogle.CURRENT_USER)
    const PROGRESS = useSelector( (state:RootState) => state.main.PROGRESS)
    const CURRENT_CYCLE_IS_OVER = useSelector( (state:RootState) => state.main.CURRENT_CYCLE_IS_OVER)
    const CURRENT_PAGE = useSelector( (state:RootState) => state.main.CURRENT_PAGE)                                                                                                                                                              
    const STATUS = useSelector( (state:RootState) => state.main.STATUS)
    const DATE = useSelector( (state:RootState) => state.main.DATE)
    const REMINDER_CLICK = useSelector( (state:RootState) => state.main.REMINDER_CLICK)
    const HYDRO_SCHEDULE = useSelector( (state:RootState) => state.main.HYDRO_SCHEDULE)
    
    const WEATHER_CHANNEL = useSelector( (state:RootState) => state.dashboard.WEATHER_CHANNEL)    

    const hydroScheduleLength:number = HYDRO_SCHEDULE?.length;

    // set page because text won't respond to state with { opacity: % }  only "/" is that page.          

    useEffect( () => {

      const currentPagePath:string = window?.location?.pathname;      
      dispatch(SET_CURRENT_PAGE(currentPagePath))

    }, [])
    
    useEffect( () => {            
      // tinkering might fix wrapping this expression in an  (STATUS)
      if (STATUS) {
        const checkCount = STATUS?.filter((status) => status === 'check')?.length;
        const percentage = 100 / HYDRO_SCHEDULE?.length
        dispatch(SET_PROGRESS(percentage * checkCount))        
        // if (REMINDER_CLICK === HYDRO_SCHEDULE.length) {          
        //   const weekday = getDayOfWeek()
        // }
      }      

  }, [STATUS])

    const { bottle, smallDroplet, bg, mouseDroplet, towelBlueWhite, faucet } = useImage()

     const RENDER = () => {

    return (
      <>    
      <div id={styles.rowDiv}>          

          {/* <RainyData> which became -> <Weather-or-Not> -> <Wheres-Water>   */}
      {/* {
    WEATHER_CHANNEL
    ?
    <h1  id="LifeWaterWaterLife"> ...or not." </h1>
    : */}
    <h1 style={{ opacity: CURRENT_PAGE === "/dashboard" || CURRENT_CYCLE_IS_OVER ? "100%" : `${PROGRESS}%` || "5%" }} id="LifeWaterWaterLife"> Water is Life </h1>
{/* } */}

            {/* { CURRENT_PAGE === "/" && HYDRO_SCHEDULE?.length > 1 && PROGRESS > 0 && <Display progress={PROGRESS}/> } */}

      </div>            
            <img id={styles.bottomBottle} src={CURRENT_PAGE === "/dashboard" && WEATHER_CHANNEL ? towelBlueWhite : bottle} />
      </>
    );

  } 

  return (
    <Container id={styles.creditsContainer}> {RENDER()} </Container>
  )

}  