import React from 'react'
import styles from "./Captcha.module.scss"
import {useState, useEffect} from 'react'
import {useImage} from 'Contexts/ImgContext'
import {useRegex} from 'Contexts/RegexMenu'
// import {intervalTimeouts} from 'utility/UtilityValues'
import $ from 'jquery'

import { RootState } from 'redux/store/rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import { RESET_INCORRECT_LOGIN_ATTEMPT } from "redux/logInOutGoogle/logInOutGoogleSlice"

// interface Props { INCORRECT_LOGIN_ATTEMPT: number, RESET_INCORRECT_LOGIN_ATTEMPT: any }  // @redux/toolkit doesn't pass through as props.

export default function Captcha() {

    const dispatch = useDispatch()

    const [wrongClick, setWrongClick] = useState(false)
    
    const { bg, mouseDroplet, mouseWaterCup } = useImage()   
        
    const { MimgSrc } = useRegex()

        const [blueOrNot, setBlueOrNot] = useState(false)    
        // useEffect( () => { for (let i = 0; i < 3; i++) { intervalTimeouts.pop() } }, [])

        // this state toggling timeout toggles the water drop from being empty or not
        setInterval( () => { setBlueOrNot(!blueOrNot) }, 2000 )

        const CaptchaClick = (event:any) => {
// if the user clicks and the water droplet is blue, meaning it's filled and not empty, then user passes as being seen as human and proceeds back to login input
            const CaptchaPromise = new Promise( (resolve:any, reject:any) => {
                let target = event.target
                let src:string = target.src                
                let matchSrc = src.match(MimgSrc)
                resolve(src = matchSrc ? matchSrc[0] : target.src)             
            })
            CaptchaPromise
            .then( (src:any) => {                
                if (src === mouseDroplet) {
                    dispatch(RESET_INCORRECT_LOGIN_ATTEMPT())
                } else {
                    setWrongClick(true)
                    $('#drop').fadeOut()
                    $('#drop').fadeIn()
                }
            })
        }
        
    
        
        const RenderCaptcha = () => {
            return (
                <>
                    <img className={wrongClick ? styles.boop : ""} onClick={CaptchaClick} id={styles.drop} src={blueOrNot ? mouseDroplet : bg }/>                            
                </>
            )
        }
        return <div style={{ transform: 'scale(0.5)' }} id={styles.captchaCont}> {RenderCaptcha()} </div>
}
