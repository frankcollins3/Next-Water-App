import {useState, useEffect} from 'react'
import React from 'react'
// import "./signupinput.css"
import styles from "./SignupInput.module.scss"
import $ from 'jquery'

// utility functions
import inputHandler from 'utility/inputHandler'
import attributeJQ from 'utility/attributeJQ'
// import RegexObject from '../../../utility/RegexObject'

import {useRegex} from 'Contexts/RegexMenu'

// redux actions
import { useSelector, useDispatch } from 'react-redux';
import { SET_USERNAME_INPUT, SET_PASSWORD_INPUT, SET_EMAIL_INPUT, SET_AGE_INPUT, TOGGLE_INPUT_FOCUS } from 'redux/logInOutGoogle/logInOutGoogleSlice'
import { RootState } from "redux/store/rootReducer"

// import { SET_USERNAME_INPUT, SET_EMAIL_INPUT, SET_PASSWORD_INPUT, SET_AGE_INPUT, TOGGLE_INPUT_FOCUS, TOGGLE_PASSWORD_SHOW, TOGGLE_PASSWORD_SHOW_CLICK, TOGGLE_USERNAME_INPUT_HOVER, TOGGLE_PASSWORD_INPUT_HOVER, TOGGLE_EMAIL_INPUT_HOVER, TOGGLE_AGE_INPUT_HOVER } from '../../../redux/actions'

interface Props {
    inputType: string,
}

export default function SignupInput (props: Props) {    

    const [ghostTextShow, setGhostTextShow] = useState(false)
    const [spaceCount, setSpaceCount] = useState(0)

    const USERNAME_INPUT = useSelector( (state: RootState) => state.logInOutGoogle.USERNAME_INPUT)
    const PASSWORD_INPUT = useSelector( (state: RootState) => state.logInOutGoogle.PASSWORD_INPUT)
    const EMAIL_INPUT = useSelector( (state: RootState) => state.logInOutGoogle.EMAIL_INPUT)
    const AGE_INPUT = useSelector( (state: RootState) => state.logInOutGoogle.AGE_INPUT)
    const PASSWORD_SHOW_CLICK = useSelector( (state: RootState) => state.logInOutGoogle.PASSWORD_SHOW_CLICK)
    // const HYDRO_SETTINGS = useSelector((state: RootState) => state.main.HYDRO_SETTINGS);


    const [passwordShowClick, setPasswordShowClick] = useState<boolean>(false)
    const [dontSet, setDontSet] = useState<boolean>(false)

    const dispatch = useDispatch()

    const  { RhasNums, MsplitAtDot, McharAfterComma, McharBeforeAt, RdotAtEscape } = useRegex()

    let RegexObject:any;    

const { inputType,     
      } = props

    const inputOnChange = async (event:any) => {
        let value:string = event.target.value            
        const lastChar:string = value[value.length-1]

        if (/\s/.test(lastChar)) {
            if (inputType === 'username') {
                if (spaceCount === 0) {
                    dispatch(SET_USERNAME_INPUT(''))
                    setSpaceCount(spaceCount + 1)
                } else if (spaceCount === 1) {
                    dispatch(SET_USERNAME_INPUT("space isn't wet!"))
                    setSpaceCount(spaceCount + 1)
                } else if (spaceCount === 2) dispatch(SET_USERNAME_INPUT(''))         
            }

            if (inputType === 'email') dispatch(SET_EMAIL_INPUT(''))
            if (inputType === 'password') dispatch(SET_PASSWORD_INPUT(''))
            if (inputType === 'age') dispatch(SET_AGE_INPUT(''))
        } else {

            if (inputType === 'username') { dispatch(SET_USERNAME_INPUT(value)) }
            if (inputType === 'email') {
                const splitHelper = event?.target?.value?.split('@.')
                if (value[value.length-1] === '.') {
                    let splitEmail:any = value?.match(MsplitAtDot)                
                    if (splitEmail != null) {
                        const matchedValue:string = splitEmail[0]
                        const premail:any = value?.match(McharBeforeAt)
                        const emailNoAt:string = premail[0]                
        //  if the regex-affected string: (all characters between) [ ' @ ' __ '.' ]  Includes all the letters to gmail but is spelled incorrectly:      Fix string and update state. if not update state.
                        if (matchedValue?.includes('g') && matchedValue.includes('m') && matchedValue.includes('a') && matchedValue.includes('i') && matchedValue.includes('l') && matchedValue !== '@gmail.') {
                            setDontSet(true)
                            let remail:string = `${emailNoAt}gmail.com`                        
                            // setTimeout( () => SET_EMAIL_INPUT( {payload: remail } ), 500)                         
                            setTimeout( () => {
                                dispatch(SET_EMAIL_INPUT(remail))
                                // setDontSet(!dontSet)
                                setDontSet(false) 
                            }, 500)                        
                        } 
                        else {
                            setDontSet(false)
                            dispatch(SET_EMAIL_INPUT(value))
                            // inputHandler(event, SET_EMAIL_INPUT)
                        }
                    }
                }
                            dontSet ? console.log('aaye') : dispatch(SET_EMAIL_INPUT(value))
                            // dontSet ? console.log('aaye') : inputHandler(event, SET_EMAIL_INPUT)
                }                
                    
            if (inputType === 'age') {
                dispatch(SET_AGE_INPUT(value))
            }
            if (inputType === 'password') {
                let hasNums4 = RhasNums.test(PASSWORD_INPUT)
                const statePromise = new Promise( (resolve, reject) => {
                    resolve([ dispatch(SET_PASSWORD_INPUT(value)) ])
                })                 
                statePromise
                .then( () => {return})                                  
                .catch( (err) => console.log(err))
            }
        }
    }
          


    const ghostText = (event:any) => { attributeJQ(event.target, 'value', event.target.id) }
    
    const inputfocus = async (event:any) => { 
        console.log("inputfocus")
        dispatch(TOGGLE_INPUT_FOCUS(inputType))
                    
     }
        
        const RenderSignupInput = () => {
            return (
            <>
             <input
              className={styles.input}
              style={{ backgroundColor: 'transparent', marginTop: '1em', color: 'silver' }}                            
              type={ inputType === "password" && PASSWORD_SHOW_CLICK === false ? "password" : "text"}
              spellCheck="false"
              id={inputType}
              value={ inputType === "username" ? USERNAME_INPUT : inputType === "email" ? EMAIL_INPUT : inputType === 'password' ? PASSWORD_INPUT : inputType === "age" ? AGE_INPUT : "text" }
              onChange={inputOnChange}
              onMouseEnter={ghostText}
              onFocus={inputfocus}
            />        
               </>                
            )
        }

         return <div className={styles.SignupInputContainer}> {RenderSignupInput()} </div>

}
