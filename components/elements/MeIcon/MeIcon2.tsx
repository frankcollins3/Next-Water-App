// react and friends.
import React from 'react'
import {connect} from 'react-redux'
import {useState, useEffect} from 'react'
import $ from 'jquery'

// components and styles
import AppIconGrid from "components/elements/MeIcon/AppIconGrid"
import WebIconBoatGrid from "components/elements/MeIcon/WebIconBoatGrid"
import SelectedIconImage from "components/elements/MeIcon/SelectedIconImage"
import Container from "react-bootstrap/Container"
import styles from "./MeIcon.module.scss"

// image and regex contexts.
import {useImage} from 'Contexts/ImgContext'
import {useRegex} from 'Contexts/RegexMenu'
// import LetterLife from '../../../utility/ParentchildParent/LetterLife'

// @redux/toolkit global state management
import {useSelector, useDispatch} from 'react-redux'
import {RootState} from "redux/store/rootReducer"
import { SET_NON_GOOGLE_IMG_URL } from "redux/icons/iconsSlice"

// utils

export default function MeIcon() {

  const SHOW_WEB_ICONS = useSelector((state: RootState) => state.icons.SHOW_WEB_ICONS);
  const SELECTED_WEB_ICONS = useSelector((state: RootState) => state.icons.SELECTED_WEB_ICONS);
  const NON_GOOGLE_IMG_URL = useSelector((state: RootState) => state.icons.NON_GOOGLE_IMG_URL);

    const RENDER = () => {
        return (
                <>

                {/* nested ternary SELECTED_WEB_ICON show the ternary below in the falsy block. truthy block show SelectedIconImage */}

                
                { 
                    SHOW_WEB_ICONS 
                    ? 
                    SELECTED_WEB_ICONS ? <SelectedIconImage/> : <WebIconBoatGrid/>
                    : <AppIconGrid/>      
                }

                {/* {
                  SELECTED_WEB_ICONS
                  ? <SelectedIconImage img={NON_GOOGLE_IMG_URL}/>
                  : <WebIconBoatGrid/> 
                } */}
                    
                </>                
            )
        }

    return <> {RENDER()} </>    
    // return <Container id={styles.meIconContainer}>{RENDER()}</Container>
}

// bottles, pants|bikini, shark, 
// panda, SPIN_BOTTLE_IMG | target (probably changing)
// turtle, dolphin, pool, bucket

{/* <>                        
<Boop rotateAngle={45} speed={800} setImg={SET_NON_GOOGLE_IMG_URL} iconScreenFlag={TOGGLE_SELECT_ICON_SCREEN} showBoat={TOGGLE_SPIN_BOTTLE_SHOW_INPUT} boat={SPIN_BOTTLE_SHOW_INPUT}>
  <img style={{ transform: `rotate(0deg)` }} src="/water_img/bottles.png" />
  </Boop>

  <Boop rotateAngle={45} speed={800} setImg={SET_NON_GOOGLE_IMG_URL} iconScreenFlag={TOGGLE_SELECT_ICON_SCREEN} showBoat={TOGGLE_SPIN_BOTTLE_SHOW_INPUT} boat={SPIN_BOTTLE_SHOW_INPUT}>
<img onClick={clickElem} onMouseEnter={()=> setBathingSuit(!bathingSuit)} src={bathingSuit ? bikini: pants}></img>
</Boop>  

<Boop rotateAngle={45} speed={800} setImg={SET_NON_GOOGLE_IMG_URL} iconScreenFlag={TOGGLE_SELECT_ICON_SCREEN} showBoat={TOGGLE_SPIN_BOTTLE_SHOW_INPUT} boat={SPIN_BOTTLE_SHOW_INPUT}>                      
<img src={shark}></img>
</Boop>

<Boop rotateAngle={45} speed={800} setImg={SET_NON_GOOGLE_IMG_URL} iconScreenFlag={TOGGLE_SELECT_ICON_SCREEN} showBoat={TOGGLE_SPIN_BOTTLE_SHOW_INPUT} boat={SPIN_BOTTLE_SHOW_INPUT}>                
  <img src={panda}></img>
</Boop>

<div className="column">
<Boop rotateAngle={45} speed={800} setImg={SET_NON_GOOGLE_IMG_URL} iconScreenFlag={TOGGLE_SELECT_ICON_SCREEN} showBoat={TOGGLE_SPIN_BOTTLE_SHOW_INPUT} boat={SPIN_BOTTLE_SHOW_INPUT}>
<img style={{ display: SPIN_BOTTLE_SEARCHING ? "none" : ""}}  src={SPIN_BOTTLE_IMG || target}></img>
</Boop>  
<pre style={{ display: SPIN_BOTTLE_SEARCHING ? "" : "none" }}> Pouring. Please Wait.  </pre>
</div>  

<Boop rotateAngle={45} speed={800} setImg={SET_NON_GOOGLE_IMG_URL} iconScreenFlag={TOGGLE_SELECT_ICON_SCREEN} showBoat={TOGGLE_SPIN_BOTTLE_SHOW_INPUT} boat={SPIN_BOTTLE_SHOW_INPUT}>
<img src={turtle}></img>
</Boop>

<Boop rotateAngle={45} speed={800} setImg={SET_NON_GOOGLE_IMG_URL} iconScreenFlag={TOGGLE_SELECT_ICON_SCREEN} showBoat={TOGGLE_SPIN_BOTTLE_SHOW_INPUT} boat={SPIN_BOTTLE_SHOW_INPUT}>
<img src={dolphin}></img>
</Boop> 

<Boop rotateAngle={45} speed={800} setImg={SET_NON_GOOGLE_IMG_URL} iconScreenFlag={TOGGLE_SELECT_ICON_SCREEN} showBoat={TOGGLE_SPIN_BOTTLE_SHOW_INPUT} boat={SPIN_BOTTLE_SHOW_INPUT}>
<img src={pool}></img>
</Boop>
              
<Boop rotateAngle={45} speed={800} setImg={SET_NON_GOOGLE_IMG_URL} iconScreenFlag={TOGGLE_SELECT_ICON_SCREEN} showBoat={TOGGLE_SPIN_BOTTLE_SHOW_INPUT} boat={SPIN_BOTTLE_SHOW_INPUT}>
<img src={bucket}></img>
</Boop>
</> */}