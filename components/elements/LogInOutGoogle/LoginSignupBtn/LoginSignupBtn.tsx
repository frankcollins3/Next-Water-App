import styles from "../LogInOutGoogle.module.scss"

// @redux/toolkit global state management
import { RootState } from 'redux/store/rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import { 
    TOGGLE_LOGIN_SIGNUP_BTN, SET_USERNAME_INPUT, SET_EMAIL_INPUT, SET_PASSWORD_INPUT, 
    SET_AGE_INPUT, TOGGLE_SHOW_FORM, SET_EMAIL_OR_USERNAME_LOGIN_INPUT
 } from "redux/logInOutGoogle/logInOutGoogleSlice"

// components
import SignupInput from "components/elements/SignupInputs"
import Container from "react-bootstrap/Container"

// utils
import {flexPropertyRowCombo, flexPropertyColumnCombo} from "utility/UtilityValues"

export default function LoginSignupBtn() {
    const dispatch = useDispatch()
    const LOGIN_SIGNUP_BTN = useSelector((state: RootState) => state.logInOutGoogle.LOGIN_SIGNUP_BTN);
    const DISPLAY_FORM = useSelector((state: RootState) => state.logInOutGoogle.DISPLAY_FORM);

    const combineFlexProperties = ["flex", "column"].join(" ")
    const flexPropertyRowCombo = ["flex", "row"].join(" ")

    const test = () => {
        console.log('DISPLAY_FORM')
        console.log(DISPLAY_FORM)
        // dispatch(TOGGLE_LOGIN_SIGNUP_BTN())
    }

    const showform = (event:any) => {
        let targetid:string = event.target.id
        // dispatch(TOGGLE_LOGIN_SIGNUP_BTN())
        dispatch(TOGGLE_SHOW_FORM(targetid))
    }

    const showHideLoginSignupBtn = () => {        

            dispatch(TOGGLE_LOGIN_SIGNUP_BTN())
            if (DISPLAY_FORM.length < 1) dispatch(TOGGLE_SHOW_FORM(""))            

            if (DISPLAY_FORM === "login" || DISPLAY_FORM === "signup") {
                dispatch(SET_USERNAME_INPUT(''))
                dispatch(SET_PASSWORD_INPUT(''))
                dispatch(SET_EMAIL_INPUT(''))
                dispatch(SET_AGE_INPUT(''))
            }        
    }

    const RENDER = () => {
        return (
            <>            
            
                {
                    LOGIN_SIGNUP_BTN 
                    ?                        
                    <Container className={flexPropertyRowCombo} id={styles.btnBucket}>  
                        <button onClick={showform} id="login" className={styles.loginSignupBtn}><span id={styles.invisible}>s</span>login<span id={styles.invisible}>s</span></button>
                        <button onClick={showform} id="signup" className={styles.loginSignupBtn}>signup</button>                            
                    </Container>
                    :
                    <pre></pre>                       
                }                
            </>       
        )
     }    
     return <> {RENDER()} </>
    // return <Container style={{ justifyContent: LOGIN_SIGNUP_BTN ? "space-between" : "center"}}
    //     className={flexPropertyColumnCombo} id={styles.loginSignupBtnCont}> {RENDER()} 
    // </Container>
}