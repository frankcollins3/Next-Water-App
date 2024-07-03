// react and friends.
import React from 'react'
import {connect} from 'react-redux'
import {useState, useEffect} from 'react'
import $ from 'jquery'

// @redux/toolkit global state management
import {useSelector, useDispatch} from 'react-redux'
import {RootState} from "redux/store/rootReducer"
import { 
  SET_NON_GOOGLE_IMG_URL, TOGGLE_SPIN_BOTTLE_SHOW_INPUT, TOGGLE_SHOW_APP_ICONS, TOGGLE_SHOW_WEB_ICONS,
  TOGGLE_APP_ICONS_BTN_CLICK_ICONS, TOGGLE_APP_ICONS_BTN_CLICK_FILES, TOGGLE_SELECT_ICON_SCREEN
} from "redux/icons/iconsSlice" 

// components and styles
import AppIconGrid from "components/elements/MeIcon/AppIconGrid"
import WebIconBoatGrid from "components/elements/MeIcon/WebIconBoatGrid"
import SelectedIconImage from "components/elements/MeIcon/SelectedIconImage"
import Container from "react-bootstrap/Container"
import styles from "./MeIcon.module.scss"

// utility:
import {useImage} from 'Contexts/ImgContext'
import {useRegex} from 'Contexts/RegexMenu'
// import LetterLife from '../../../utility/ParentchildParent/LetterLife'




// utils

export default function MeIcon() {

  const dispatch = useDispatch()
  const { computer, waterDrop } = useImage(); 

  const SHOW_WEB_ICONS = useSelector((state: RootState) => state.icons.SHOW_WEB_ICONS);
  const SELECT_ICON_SCREEN = useSelector((state: RootState) => state.icons.SELECT_ICON_SCREEN);
  const SHOW_APP_ICONS = useSelector((state: RootState) => state.icons.SHOW_APP_ICONS);
  const SELECTED_WEB_ICONS = useSelector((state: RootState) => state.icons.SELECTED_WEB_ICONS);
  const NON_GOOGLE_IMG_URL = useSelector((state: RootState) => state.icons.NON_GOOGLE_IMG_URL);
  const SPIN_BOTTLE_SHOW_INPUT = useSelector((state: RootState) => state.icons.SPIN_BOTTLE_SHOW_INPUT);
  const APP_ICONS_BTN_CLICK_ICONS = useSelector((state: RootState) => state.icons.APP_ICONS_BTN_CLICK_ICONS);
  const APP_ICONS_BTN_CLICK_FILES = useSelector((state: RootState) => state.icons.APP_ICONS_BTN_CLICK_FILES);

  const computerClick = () => {
    if (SHOW_APP_ICONS === true) {
      dispatch(TOGGLE_SHOW_APP_ICONS())
    }
    if (SHOW_WEB_ICONS === false) {
      dispatch(TOGGLE_SHOW_WEB_ICONS())
    }
  }

  const waterDropClick = () => {
    if (SHOW_WEB_ICONS === true) {
      dispatch(TOGGLE_SHOW_WEB_ICONS())
    }
    if (SHOW_APP_ICONS === false) {
      dispatch(TOGGLE_SHOW_APP_ICONS())
    }
  }

  const goBackFromAppIcons = () => {
    if (SHOW_APP_ICONS === true) {
      dispatch(TOGGLE_SHOW_APP_ICONS())
    }
  }
  
  const iconsBtnClick = () => {
    if (APP_ICONS_BTN_CLICK_FILES === true) {
      dispatch(TOGGLE_APP_ICONS_BTN_CLICK_FILES())
    }
    if (APP_ICONS_BTN_CLICK_ICONS === false) {
      dispatch(TOGGLE_APP_ICONS_BTN_CLICK_ICONS())
    }    
  }

  const filesBtnClick = () => {
    if (SELECT_ICON_SCREEN === true) {
      dispatch(TOGGLE_SELECT_ICON_SCREEN())
    }
    if (NON_GOOGLE_IMG_URL !== null || NON_GOOGLE_IMG_URL !== null || NON_GOOGLE_IMG_URL !== '') {
      dispatch(SET_NON_GOOGLE_IMG_URL(''))
    }

    if (APP_ICONS_BTN_CLICK_ICONS === true) {
      dispatch(TOGGLE_APP_ICONS_BTN_CLICK_ICONS())
    }
    if (APP_ICONS_BTN_CLICK_FILES === false) {
      dispatch(TOGGLE_APP_ICONS_BTN_CLICK_FILES())
    }    
  }

    const RENDER = () => {
        return (
                <Container id={styles.mainContainerMeIcon}>
                
                {
                  SHOW_WEB_ICONS === true                   
                  ?
                  <WebIconBoatGrid/>
                  :
                  SHOW_APP_ICONS === true
                  ?
                  <>
                  <Container id={styles.iconBtnContainer}>
                  {/* <button className={styles.btn}> icons </button> */}
                  {/* <p style={{ left: '-10px', top: '-10px' }} onClick={displayFormClickBack} id={styles.backBtn}> {"<<"} </p> */}
                  {/* <p className={styles.btn} id={styles.backBtn}> {"<<"} </p> */}
                  <button onClick={goBackFromAppIcons} style={{ color: '#73defe' }} className={styles.btn}> {"<<"} </button>
                  <button onClick={iconsBtnClick} id={APP_ICONS_BTN_CLICK_ICONS === true ? styles.activeBtn : "" } className={styles.btn}> icons </button>
                  <button onClick={filesBtnClick} id={APP_ICONS_BTN_CLICK_FILES === true ? styles.activeBtn : "" } className={styles.btn}> files </button>
                  </Container>                  

                  {
                    SELECT_ICON_SCREEN === true
                    ? 
                    <SelectedIconImage/>
                    :
                  <AppIconGrid/>
                  }
                  </>                  
                  :
              <Container id={styles.meIconContainer}>
                <p id={styles.text}> icon selection: </p> 

              <Container id={styles.meIconRow}>

              <Container onClick={computerClick} id={styles.computerCont}></Container>
              <Container onClick={waterDropClick} id={styles.waterDropCont}></Container>
               
              </Container>

              </Container>
                }

                



                {/* {
                  SELECTED_WEB_ICONS
                  ? <SelectedIconImage img={NON_GOOGLE_IMG_URL}/>
                  : <WebIconBoatGrid/> 
                } */}
                    
                </Container>                
                // </>                
            )
        }

    return <> {RENDER()} </>    
}
