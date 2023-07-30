import styles from "../LogInOutGoogle.module.scss"

// @redux/toolkit global state management
import { RootState } from 'redux/store/rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import { 
    TOGGLE_LOGIN_SIGNUP_BTN, SET_USERNAME_INPUT, SET_EMAIL_INPUT, SET_PASSWORD_INPUT, 
    SET_AGE_INPUT, TOGGLE_SHOW_FORM, SET_EMAIL_OR_USERNAME_LOGIN_INPUT
 } from "redux/logInOutGoogle/logInOutGoogleSlice"

// components
import Container from "react-bootstrap/Container"

// utils
import {flexPropertyRowCombo} from "utility/UtilityValues"

export default function LoginSignupBtn() {
    const dispatch = useDispatch()
    const LOGIN_SIGNUP_BTN = useSelector((state: RootState) => state.logInOutGoogle.LOGIN_SIGNUP_BTN);
    // const DISPLAY_FORM = useSelector((state: RootState) => state.logInOutGoogle.DISPLAY_FORM);

    const flexPropertyRowCombo = ["flex", "row"].join(" ")

    const showform = (event:any) => {
        let targetid:string = event.target.id
        // dispatch(TOGGLE_LOGIN_SIGNUP_BTN())
        dispatch(TOGGLE_SHOW_FORM(targetid))
    }

    const RENDER = () => {
        return (
            <>            
            
                {
                    LOGIN_SIGNUP_BTN &&
                    <Container className={flexPropertyRowCombo} id={styles.btnBucket}>  
                        <button onClick={showform} id="login" className={styles.loginSignupBtn}><span id={styles.invisible}>s</span>login<span id={styles.invisible}>s</span></button>
                        <button onClick={showform} id="signup" className={styles.loginSignupBtn}>signup</button>                            
                    </Container>                    
                }                
            </>       
        )
     }    
    return <Container> {RENDER()} </Container>
    // return <Container style={{ justifyContent: LOGIN_SIGNUP_BTN ? "space-between" : "center"}}
    //     className={flexPropertyColumnCombo} id={styles.loginSignupBtnCont}> {RENDER()} 
    // </Container>
}