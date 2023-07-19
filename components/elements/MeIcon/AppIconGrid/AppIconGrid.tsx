// react
        // import {useState, useEffect} from 'react'

// components and styles
import Container from 'react-bootstrap/Container'
import styles from "./AppIconGrid.module.scss"

// @redux/toolkit global state management
import {useSelector, useDispatch} from 'react-redux'
import {RootState} from "redux/store/rootReducer"
import { 
  SET_NON_GOOGLE_IMG_URL, TOGGLE_SPIN_BOTTLE_SHOW_INPUT, TOGGLE_SELECT_ICON_SCREEN,
  // SET_SPIN_BOTTLE_IMG, TOGGLE_SPIN_BOTTLE_SEARCHING, TOGGLE_SPIN_BOTTLE_SHOW_INPUT, SET_GOOGLE_IMG_URL, SET_NON_GOOGLE_IMG_URL, 
  // TOGGLE_SELECT_ICON_SCREEN, SET_PRE_SELECTED_ICON_SRC, TOGGLE_PSI_HOVER, TOGGLE_GLASS_SCREEN_B4_NAV, TOGGLE_GLASS_HALF_FULL_DB_CHOICE, 
  // TOGGLE_USER_ICON_CONFIRM, SET_LAST_ICON_SELECTION_TEXT, 
  // SET_PUPPETEER_SEARCH_TERM, TOGGLE_LOGIN_SIGNUP_BTN, TOGGLE_ICON_NOT_INPUT, TOGGLE_SUBMIT_INPUT_DATA, TOGGLE_SHOW_FORM
} from "redux/icons/iconsSlice"

// utils
import {useImage} from 'Contexts/ImgContext'
import Boop from 'utility/ParentchildParent/Boop'
import { flexPropertyColumnCombo } from 'utility/UtilityValues'

export default function AppIconGrid() {

    const SPIN_BOTTLE_SHOW_INPUT = useSelector((state: RootState) => state.icons.SPIN_BOTTLE_SHOW_INPUT);
    const NON_GOOGLE_IMG_URL = useSelector((state: RootState) => state.icons.NON_GOOGLE_IMG_URL);
    const SELECT_ICON_SCREEN = useSelector((state: RootState) => state.icons.SELECT_ICON_SCREEN);

    const { bottles, pants, shark, panda, target, turtle, dolphin, pool, bucket } = useImage()

    // <Boop rotateAngle={45} speed={800} setImg={SET_NON_GOOGLE_IMG_URL} iconScreenFlag={TOGGLE_SELECT_ICON_SCREEN} showBoat={TOGGLE_SPIN_BOTTLE_SHOW_INPUT} boat={SPIN_BOTTLE_SHOW_INPUT}>

    const RENDER = () => {
        return (
            <>
                
                {/* <Container> */}

                {/* header:                     nav water drop becomes spin bottle. Click to toggle.        ${currentUser is life} please select icon!            */}

                {/* <p className={styles.pre}> hey cutie </p> */}
<Boop rotateAngle={45} speed={800} setImg={SET_NON_GOOGLE_IMG_URL} iconScreenFlag={TOGGLE_SELECT_ICON_SCREEN} showBoat={TOGGLE_SPIN_BOTTLE_SHOW_INPUT} boat={SPIN_BOTTLE_SHOW_INPUT} className={styles.img}>
                <img className={styles.img} src={bottles}/>
        </Boop>
                <img className={styles.img} src={pants}/>
                <img className={styles.img} src={shark}/>
                <img className={styles.img} src={panda}/>
                <img className={styles.img} src={target}/>
                <img className={styles.img} src={turtle}/>
                <img className={styles.img} src={dolphin}/>
                <img className={styles.img} src={pool}/>
                <img className={styles.img} src={bucket}/>

                {/* </Container> */}
            </>
        )
    }
    return <Container id={styles.appIconGridContainer}> {RENDER()} </Container>
    // return <Container id={styles.appIconGridContainer}> {RENDER()} </Container>
}