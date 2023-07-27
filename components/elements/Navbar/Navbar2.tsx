import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container'
import styles from "./Navbar.module.scss"
import $ from 'jquery'


// @redux/toolkit global state management
import { useSelector, useDispatch } from 'react-redux'
import {RootState} from "redux/store/rootReducer"
import { SET_CURRENT_PAGE, TOGGLE_HYDRO_SETTINGS } from "redux/main/mainSlice"
import { TOGGLE_SHOW_WEB_ICONS } from "redux/icons/iconsSlice"

// utility
import {useImage} from "Contexts/ImgContext"

export default function Navbar(props:any) {

  const dispatch = useDispatch()
  
  const CURRENT_PAGE = useSelector((state:RootState) => state.main.CURRENT_PAGE)
  const SHOW_WEB_ICONS = useSelector((state:RootState) => state.icons.SHOW_WEB_ICONS)

  // useImage context for variable declared image paths 
  const { smallDroplet, msgBottle, statistics, settings, exit, clouds, home } = useImage()

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
    }

    const settingsClick = () => {
      if (CURRENT_PAGE !== "/") {
        document.cookie = `token=pageNavSettings; max-age=${7 * 24 * 60 * 60}; path=/;`;
      } else {
        console.log("hey guys")
        dispatch(TOGGLE_HYDRO_SETTINGS())
      }
    }

    const homeClick = () => {
      window.location.href = "/"
    }

  return (
    <Container className={styles.navbarcontainer}>
    <div>
    {/* <img src={smallDroplet || msgBottle || clouds }/>  */}
    <img onClick={leftIconClick} id="left-image" src={ CURRENT_PAGE === "/MeIcon" ? msgBottle : CURRENT_PAGE === "/dashboard" ? clouds : smallDroplet } />  
    
    </div>
      
      <div>
        <img onClick={homeClick} src={home}/>
        <img src={statistics}/>
        <img onClick={settingsClick} src={settings}/>
      <img id="loginLogoutIcon" src={exit}/>            
      {/* <img id="loginLogoutIcon" src={NON_GOOGLE_IMG_URL && USER_ICON_CONFIRM && APP_PAGE_ICON_CONFIRM ? NON_GOOGLE_IMG_URL : exit} />         */}
          
      </div>
 
    </Container>
  );
}
