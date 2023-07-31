import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container'
import styles from "./Navbar.module.scss"
import $ from 'jquery'


// @redux/toolkit global state management
import { useSelector, useDispatch } from 'react-redux'
import {RootState} from "redux/store/rootReducer"
import { SET_CURRENT_PAGE, TOGGLE_HYDRO_SETTINGS } from "redux/main/mainSlice"
import { TOGGLE_SHOW_WEB_ICONS } from "redux/icons/iconsSlice"
import { SET_NON_GOOGLE_IMG_URL } from "redux/logInOutGoogle/logInOutGoogleSlice"
import { TOGGLE_WEATHER_CHANNEL } from "redux/dashboard/dashboardSlice"

// utility
import {useImage} from "Contexts/ImgContext"
import {useRegex} from "Contexts/RegexMenu"
import {usePromise} from "Contexts/Promises"
import { clearCookie } from 'utility/cookies';

export default function Navbar(props:any) {

  const dispatch = useDispatch()
  
  const CURRENT_PAGE = useSelector((state:RootState) => state.main.CURRENT_PAGE)
  const SHOW_WEB_ICONS = useSelector((state:RootState) => state.icons.SHOW_WEB_ICONS)

  const NON_GOOGLE_IMG_URL = useSelector((state:RootState) => state.logInOutGoogle.NON_GOOGLE_IMG_URL)

  // useImage context for variable declared image paths 
  const { smallDroplet, msgBottle, statistics, settings, exit, clouds, home } = useImage()
  const { MwordBeforeEqualsForCookies } = useRegex()
  const { iPROMISEcookies } = usePromise()
  // const { poorMansLogoutPROMISE, iPROMISEcookies } = usePromise()

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
      if (CURRENT_PAGE !== "/") {
        // document.cookie = `token=pageNavSettings; max-age=${7 * 24 * 60 * 60}; path=/;`;
        $(event.target).css('opacity', 0.1)
      } else {
        dispatch(TOGGLE_HYDRO_SETTINGS())
      }
    }

    const statsClick = () => { window.location.href = "/dashboard" }

    const homeClick = () => {
      window.location.href = "/"
    }

    const logout = (event:any) => {
        const imgSrc:string = event.target.src
        console.log('imgSrc', imgSrc)
        // poorMansLogoutPROMISE(imgSrc)
                if (imgSrc.includes(NON_GOOGLE_IMG_URL)) {
            console.log('i like cookies')
            const getCookiePROMISE = new Promise((cookies:any, milk:any) => {
              if (document.cookie) {
                  const webcookies = document.cookie.split('; ');
                  // console.log('webcookies', webcookies)
                  cookies(webcookies)
                  milk('spill')
              }
          }) 
    }

    const loginSignupRedirect = () => { window.location.href = "/logInOutGoogle" }

  return (
    <Container className={styles.navbarcontainer}>
    <div>
    {/* <img src={smallDroplet || msgBottle || clouds }/>  */}
    <img onClick={leftIconClick} id="left-image" src={ CURRENT_PAGE === "/MeIcon" ? msgBottle : CURRENT_PAGE === "/dashboard" ? clouds : smallDroplet } />  
    {/* <img onClick={leftIconClick} id="left-image" src={ CURRENT_PAGE === "/MeIcon" ? msgBottle : CURRENT_PAGE === "/dashboard" ? clouds : smallDroplet } />   */}
    
    </div>
      
      <div>
        <img onClick={homeClick} src={home}/>
        <img onClick={statsClick} src={statistics}/>
        <img onClick={settingsClick} src={settings}/>
      <img onClick={NON_GOOGLE_IMG_URL ? logout : loginSignupRedirect} id="loginLogoutIcon" src={ NON_GOOGLE_IMG_URL ? NON_GOOGLE_IMG_URL : exit}/>            
      {/* <img id="loginLogoutIcon" src={NON_GOOGLE_IMG_URL && USER_ICON_CONFIRM && APP_PAGE_ICON_CONFIRM ? NON_GOOGLE_IMG_URL : exit} />         */}
          
      </div>
 
    </Container>
  );
}
