// react
        // import {useState, useEffect} from 'react'

// components and styles
import SelectedIconImage from "components/elements/MeIcon/SelectedIconImage"
import Container from 'react-bootstrap/Container'
import styles from "./AppIconGrid.module.scss"

// @redux/toolkit global state management
import {useSelector, useDispatch} from 'react-redux'
import {RootState} from "redux/store/rootReducer"
import { TOGGLE_SPIN_BOTTLE_SHOW_INPUT, TOGGLE_SELECT_ICON_SCREEN } from "redux/icons/iconsSlice"
import { SET_NON_GOOGLE_IMG_URL } from "redux/logInOutGoogle/logInOutGoogleSlice"


// utils
import {useImage} from 'Contexts/ImgContext'
import Boop from 'utility/ParentchildParent/Boop'
import { flexPropertyColumnCombo } from 'utility/UtilityValues'

export default function AppIconGrid() {

    const dispatch = useDispatch()

    const SPIN_BOTTLE_SHOW_INPUT = useSelector((state: RootState) => state.icons.SPIN_BOTTLE_SHOW_INPUT);
    const NON_GOOGLE_IMG_URL = useSelector((state: RootState) => state.icons.NON_GOOGLE_IMG_URL);
    const SELECT_ICON_SCREEN = useSelector((state: RootState) => state.icons.SELECT_ICON_SCREEN);

    const { bottles, pants, shark, panda, target, turtle, dolphin, pool, bucket } = useImage()

    const RENDER = () => {
        return (

                <>
                {
                        SELECT_ICON_SCREEN === false
                        ? 
                        <>
                        <Boop rotateAngle={45} speed={800} setImg={SET_NON_GOOGLE_IMG_URL} iconScreenFlag={TOGGLE_SELECT_ICON_SCREEN} showBoat={TOGGLE_SPIN_BOTTLE_SHOW_INPUT} boat={SPIN_BOTTLE_SHOW_INPUT} className={styles.img}>
                <img className={styles.img} src={bottles}/>
        </Boop>
<Boop rotateAngle={45} speed={800} setImg={SET_NON_GOOGLE_IMG_URL} iconScreenFlag={TOGGLE_SELECT_ICON_SCREEN} showBoat={TOGGLE_SPIN_BOTTLE_SHOW_INPUT} boat={SPIN_BOTTLE_SHOW_INPUT} className={styles.img}>
                <img className={styles.img} src={pants}/>
        </Boop>
<Boop rotateAngle={45} speed={800} setImg={SET_NON_GOOGLE_IMG_URL} iconScreenFlag={TOGGLE_SELECT_ICON_SCREEN} showBoat={TOGGLE_SPIN_BOTTLE_SHOW_INPUT} boat={SPIN_BOTTLE_SHOW_INPUT} className={styles.img}>        
                <img className={styles.img} src={shark}/>
        </Boop>
<Boop rotateAngle={45} speed={800} setImg={SET_NON_GOOGLE_IMG_URL} iconScreenFlag={TOGGLE_SELECT_ICON_SCREEN} showBoat={TOGGLE_SPIN_BOTTLE_SHOW_INPUT} boat={SPIN_BOTTLE_SHOW_INPUT} className={styles.img}>        
                <img className={styles.img} src={panda}/>
        </Boop>
<Boop rotateAngle={45} speed={800} setImg={SET_NON_GOOGLE_IMG_URL} iconScreenFlag={TOGGLE_SELECT_ICON_SCREEN} showBoat={TOGGLE_SPIN_BOTTLE_SHOW_INPUT} boat={SPIN_BOTTLE_SHOW_INPUT} className={styles.img}>        
                <img className={styles.img} src={target}/>
        </Boop>
<Boop rotateAngle={45} speed={800} setImg={SET_NON_GOOGLE_IMG_URL} iconScreenFlag={TOGGLE_SELECT_ICON_SCREEN} showBoat={TOGGLE_SPIN_BOTTLE_SHOW_INPUT} boat={SPIN_BOTTLE_SHOW_INPUT} className={styles.img}>        
                <img className={styles.img} src={turtle}/>
        </Boop>
<Boop rotateAngle={45} speed={800} setImg={SET_NON_GOOGLE_IMG_URL} iconScreenFlag={TOGGLE_SELECT_ICON_SCREEN} showBoat={TOGGLE_SPIN_BOTTLE_SHOW_INPUT} boat={SPIN_BOTTLE_SHOW_INPUT} className={styles.img}>        
                <img className={styles.img} src={dolphin}/>
        </Boop>
<Boop rotateAngle={45} speed={800} setImg={SET_NON_GOOGLE_IMG_URL} iconScreenFlag={TOGGLE_SELECT_ICON_SCREEN} showBoat={TOGGLE_SPIN_BOTTLE_SHOW_INPUT} boat={SPIN_BOTTLE_SHOW_INPUT} className={styles.img}>        
                <img className={styles.img} src={pool}/>
        </Boop>

<Boop rotateAngle={45} speed={800} setImg={SET_NON_GOOGLE_IMG_URL} iconScreenFlag={TOGGLE_SELECT_ICON_SCREEN} showBoat={TOGGLE_SPIN_BOTTLE_SHOW_INPUT} boat={SPIN_BOTTLE_SHOW_INPUT} className={styles.img}>        
                <img className={styles.img} src={bucket}/>
        </Boop>
                </>                        
                                :
                        <SelectedIconImage/>        
                }


                {/* </Container> */}
            </>
        )
    }
    return <Container id={SELECT_ICON_SCREEN === false ? styles.appIconGridContainer : styles.MeIconContainer }> {RENDER()} </Container>
    // return <Container id={styles.appIconGridContainer}> {RENDER()} </Container>
}