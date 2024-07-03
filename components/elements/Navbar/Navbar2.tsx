import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container'
import $ from 'jquery'


// components and styling
import Display from "components/elements/Display"
import DisplayWave from "components/elements/DisplayWave"
import styles from "./Navbar.module.scss"


// @redux/toolkit global state management
import { useSelector, useDispatch } from 'react-redux'
import {RootState} from "redux/store/rootReducer"
import { SET_CURRENT_PAGE, TOGGLE_SHOW_HYDRO_SETTINGS, TOGGLE_SHOW_CALENDAR } from "redux/main/mainSlice"
import { TOGGLE_SHOW_WEB_ICONS } from "redux/icons/iconsSlice"
import { SET_NON_GOOGLE_IMG_URL } from "redux/logInOutGoogle/logInOutGoogleSlice"
import { TOGGLE_WEATHER_CHANNEL } from "redux/dashboard/dashboardSlice"

// utility
import {nothingFunc} from "utility/UtilityValues"
import {useImage} from "Contexts/ImgContext"
import {useRegex} from "Contexts/RegexMenu"
import {usePromise} from "Contexts/Promises"
import { clearCookie } from 'utility/cookies';

export default function Navbar(props:any) {

  const dispatch = useDispatch()
  
  const CURRENT_USER = useSelector((state:RootState) => state.logInOutGoogle.CURRENT_USER)
  const IS_LOGGED_IN = useSelector((state:RootState) => state.logInOutGoogle.IS_LOGGED_IN)
  const NON_GOOGLE_IMG_URL = useSelector((state:RootState) => state.logInOutGoogle.NON_GOOGLE_IMG_URL)
  
  const CURRENT_PAGE = useSelector((state:RootState) => state.main.CURRENT_PAGE)
  const CURRENT_CYCLE_IS_OVER = useSelector((state:RootState) => state.main.CURRENT_CYCLE_IS_OVER)
  const SHOW_CALENDAR = useSelector((state:RootState) => state.main.SHOW_CALENDAR)
  const HYDRO_SCHEDULE = useSelector((state:RootState) => state.main.HYDRO_SCHEDULE)

  const HYDRO_INTAKE = useSelector((state:RootState) => state.main.HYDRO_INTAKE)
  const STATUS = useSelector((state:RootState) => state.main.STATUS)
  const DISABLED = useSelector((state:RootState) => state.main.DISABLED)
  const PROGRESS = useSelector((state:RootState) => state.main.PROGRESS)

  const SHOW_WEB_ICONS = useSelector((state:RootState) => state.icons.SHOW_WEB_ICONS)
  
  const WEATHER_CHANNEL = useSelector((state:RootState) => state.dashboard.WEATHER_CHANNEL)

  const { smallDroplet, msgBottle, statistics, settings, exit, clouds, home } = useImage()
  const { MwordBeforeEqualsForCookies } = useRegex()
  const { poorMansLogoutPROMISE, iPROMISEcookies } = usePromise()

  // CSS flex.
  const flexColumnCenter = ["flex", "row", "justCenterAlignCenter", "noFlexWrap"].join(" ");

  useEffect( () => {
    if (CURRENT_PAGE === "/MeIcon") { 
      $('#left-image').addClass(styles.msgBottleAnimation) 
    } else {
      $('#left-image').removeClass(styles.msgBottleAnimation) 
    }     
  }, [])

  useEffect( () => {
    if (CURRENT_PAGE === "/MeIcon") { 
      $('#left-image').addClass(styles.msgBottleAnimation) 
    } else {
      $('#left-image').removeClass(styles.msgBottleAnimation) 
    }     
  }, [SHOW_WEB_ICONS])

    const leftIconClick = (event:any) => {
      let imgSrc:string = event.target.src
      console.log('imgSrc', imgSrc)
      if (imgSrc.includes('msg-bottle')) {
        console.log("hey how are you");
        dispatch(TOGGLE_SHOW_WEB_ICONS())
        setTimeout( () => {
          console.log(SHOW_WEB_ICONS)
        },1000)
      // if (imgSrc === "/water_img/msg-bottle.png") {
      }
      if (imgSrc.includes('clouds')) {
        dispatch(TOGGLE_WEATHER_CHANNEL())
      }
    }

    const settingsClick = (event:any) => {
      dispatch(TOGGLE_SHOW_HYDRO_SETTINGS())

    }

    const statsClick = () => { 
      if (CURRENT_USER?.id === 0) { return; }      
      window.location.href = "/dashboard";
    }  

    const homeClick = () => {
      console.log('hey were clicking');
      window.location.href = "/";
    }

    const logout = async (event:any) => {
        const imgSrc:string = event.target.src
        console.log('imgSrc', imgSrc)
        await poorMansLogoutPROMISE(imgSrc)
        window.location.href = "/"
    }

    const loginSignupRedirect = () => { 
      window.location.href = "/" 
    }

    const test = () => {
      console.log('CURRENT_USER', CURRENT_USER)
      console.log('HYDRO_SCHEDULE', HYDRO_SCHEDULE)
      console.log('HYDRO_INTAKE', HYDRO_INTAKE)
      console.log('IS_LOGGED_IN', IS_LOGGED_IN)
      console.log('PROGRESS', PROGRESS)
      console.log('STATUS', STATUS)
      console.log('DISABLED', DISABLED)
    }

    const cloudClick = () => {
      dispatch(TOGGLE_WEATHER_CHANNEL())
    }

  return (
    <Container className={styles.navbarcontainer}>

    <h1 onClick={test} id="LifeWaterWaterLife"> {CURRENT_USER?.username ? `${CURRENT_USER?.username} is Water` : "Life is Water" } </h1>

      
      <div id={styles.iconCont}
      >
        { CURRENT_PAGE === "/" && HYDRO_SCHEDULE?.length > 1 && PROGRESS > 0 && <Display progress={PROGRESS}/> }
        <img
        style={{ position: 'relative', top: CURRENT_PAGE === "/" && HYDRO_SCHEDULE?.length > 1 && PROGRESS > 0 ? '10px' : '0' }}
         onClick={CURRENT_PAGE !== "/" ? homeClick : nothingFunc} src={home}/>
        
        <img
        style={{ position: 'relative', top: CURRENT_PAGE === "/" && HYDRO_SCHEDULE?.length > 1 && PROGRESS > 0 ? '10px' : '0' }}
         className={ CURRENT_CYCLE_IS_OVER ? "floatingPesterAnimation" : "" } onClick={CURRENT_USER?.id > 0 ? statsClick : nothingFunc} src={statistics}/>
        
        { CURRENT_PAGE === "/" && <img style={{ position: 'relative', top: CURRENT_PAGE === "/" && HYDRO_SCHEDULE?.length > 1 && PROGRESS > 0 ? '10px' : '' }} className={ CURRENT_USER?.id > 0 && HYDRO_SCHEDULE === null ? "floatingPesterAnimation" : "" } onClick={settingsClick} src={settings}/> }

        {/* { CURRENT_PAGE === "/" && HYDRO_SCHEDULE?.length > 1 && <DisplayWave/>} */}
        { CURRENT_PAGE === "/dashboard" && <img onClick={CURRENT_USER?.id > 0 ? cloudClick : nothingFunc} src={clouds} /> }

        <img style={{ position: 'relative', top: CURRENT_PAGE === "/" && HYDRO_SCHEDULE?.length > 1 && PROGRESS > 0 ? '10px' : '0' }}   onClick={NON_GOOGLE_IMG_URL ? logout : loginSignupRedirect} id="loginLogoutIcon" src={ NON_GOOGLE_IMG_URL ? NON_GOOGLE_IMG_URL : exit} />                    
        
      {/* <img id="loginLogoutIcon" src={NON_GOOGLE_IMG_URL && USER_ICON_CONFIRM && APP_PAGE_ICON_CONFIRM ? NON_GOOGLE_IMG_URL : exit} />         */}
          
      </div>            

    </Container>
  );
}
