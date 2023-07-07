import React from 'react'
import "./captcha.css"
import {connect, useDispatch} from 'react-redux'
import {useState, useEffect} from 'react'
import {useImage} from '../../../utility/Contexts/ImgContext'
import {useRegex} from '../../../utility/Contexts/RegexMenu'
import {intervalTimeouts} from '../../../utility/UtilityValues'
import $ from 'jquery'

import { RESET_INCORRECT_LOGIN_ATTEMPT } from '../../../redux/actions'
import { Target } from 'puppeteer'

interface Props {
    INCORRECT_LOGIN_ATTEMPT: number,
    RESET_INCORRECT_LOGIN_ATTEMPT: any
}

function Captcha(props: Props) {

    const { RESET_INCORRECT_LOGIN_ATTEMPT } = props

    const [wrongClick, setWrongClick] = useState(false)
    
    const { bg, mouseDroplet, mouseWaterCup } = useImage()   
        
    const { MimgSrc } = useRegex()

        const [blueOrNot, setBlueOrNot] = useState(false)    
        useEffect( () => { for (let i = 0; i < 3; i++) { intervalTimeouts.pop() } }, [])

        setInterval( () => {
            setBlueOrNot(!blueOrNot)             
        }, 2000 )

        const CaptchaClick = (event:any) => {

            const CaptchaPromise = new Promise( (resolve:any, reject:any) => {
                let target = event.target
                let src:string = target.src
                console.log('src')
                console.log(src)
                let matchSrc = src.match(MimgSrc)
                resolve(src = matchSrc ? matchSrc[0] : target.src)             
            })
            CaptchaPromise
            .then( (src:any) => {
                console.log('src from the promise')
                console.log(src)
                if (src === mouseDroplet) {
                    RESET_INCORRECT_LOGIN_ATTEMPT()
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
                    <img className={wrongClick ? "boop" : ""} onClick={CaptchaClick} id="drop" src={blueOrNot ? mouseDroplet : bg }/>                            
                </>
            )
        }
        return <div style={{ transform: 'scale(0.5)' }} className="Captcha-Cont"> {RenderCaptcha()} </div>
}

const mapStateToProps = (state:any) => ({
    INCORRECT_LOGIN_ATTEMPT: state.INCORRECT_LOGIN_ATTEMPT
})

const mapDispatchToProps = (dispatch:any) => ({
    RESET_INCORRECT_LOGIN_ATTEMPT: () => dispatch(RESET_INCORRECT_LOGIN_ATTEMPT())
})

const ConnectedCaptcha = connect(mapStateToProps, mapDispatchToProps)(Captcha)
export default ConnectedCaptcha