import React, {useEffect, useState} from 'react';
import axios from 'axios'
 
// components and styles
import Display from 'components/elements/Display'

import styles from "./Credits.module.scss"

// @redux/toolkit global state management
import {RootState} from "redux/store/rootReducer"
import { useSelector, useDispatch } from 'react-redux'
import Container from 'react-bootstrap/Container'
import { SET_PROGRESS } from "redux/main/mainSlice"

// utils
import {useImage} from 'Contexts/ImgContext'
import { getDayOfWeek } from "utility/UtilityValues"
  import { updateDailyDataQueryString } from 'graphql/queries';


export default function Credits() {

    const dispatch = useDispatch()

    const PROGRESS = useSelector( (state:RootState) => state.main.PROGRESS)
    const CURRENT_USER = useSelector( (state:RootState) => state.logInOutGoogle.CURRENT_USER)
    const STATUS = useSelector( (state:RootState) => state.main.STATUS)
    const DATE = useSelector( (state:RootState) => state.main.DATE)
    const REMINDER_CLICK = useSelector( (state:RootState) => state.main.REMINDER_CLICK)
    const HYDRO_SCHEDULE = useSelector( (state:RootState) => state.main.HYDRO_SCHEDULE)

    
    
    useEffect( () => {      
      
      console.log('status in effect', STATUS)
      // tinkering might fix wrapping this expression in an  (STATUS)
      if (STATUS) {
        const checkCount = STATUS.filter((status) => status === 'check').length;
        const percentage = 100 / HYDRO_SCHEDULE.length
        dispatch(SET_PROGRESS(percentage * checkCount))        
        if (REMINDER_CLICK === HYDRO_SCHEDULE.length) {          
          const weekday = getDayOfWeek()
        }



      }      

  }, [STATUS])

    const { bottle, smallDroplet, bg, mouseDroplet } = useImage()

     const RENDER = () => {

    return (
      <>    
      <div id={styles.rowDiv}>          
            <img src={bottle} />          
      </div>
        <div>
          <ul>
            {
              PROGRESS > .01
                    ?
              <Display/>
                    :
                REMINDER_CLICK > 0 && PROGRESS < 0.1 
                ? <img src={bg}/>
                : 
                <img src={smallDroplet}/>
            }
  
          </ul>
        </div>  
      </>
    );

  } 

  return <Container className={styles.creditsContainer}>{RENDER()}</Container>

}  