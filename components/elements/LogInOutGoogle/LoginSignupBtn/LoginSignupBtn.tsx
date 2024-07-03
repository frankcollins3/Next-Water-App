import $ from 'jquery'
// @redux/toolkit global state management
import { RootState } from 'redux/store/rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import { 
    TOGGLE_LOGIN_SIGNUP_BTN, SET_USERNAME_INPUT, SET_EMAIL_INPUT, SET_PASSWORD_INPUT, 
    SET_AGE_INPUT, TOGGLE_SHOW_FORM, SET_EMAIL_OR_USERNAME_LOGIN_INPUT, TOGGLE_SUBMIT_INPUT_DATA,
 } from "redux/logInOutGoogle/logInOutGoogleSlice"

 import { TOGGLE_SHOW_WEB_ICONS, TOGGLE_SHOW_APP_ICONS } from "redux/icons/iconsSlice"

// components and styling
import Container from "react-bootstrap/Container"
import styles from "components/elements/SignupLoginForm/SignupLoginForm.module.scss"

// utils
import {flexPropertyRowCombo} from "utility/UtilityValues"

export default function LoginSignupBtn() {
    return <RENDER/>
}

function RENDER() {
    const dispatch = useDispatch()
    
    const DISPLAY_FORM = useSelector((state:RootState) => state.logInOutGoogle.DISPLAY_FORM)
    const SUBMIT_INPUT_DATA = useSelector((state:RootState) => state.logInOutGoogle.SUBMIT_INPUT_DATA)
    const SHOW_WEB_ICONS = useSelector((state:RootState) => state.icons.SHOW_WEB_ICONS)
    const SHOW_APP_ICONS = useSelector((state:RootState) => state.icons.SHOW_APP_ICONS)
    
                                                                                          

    const showForm = (event:any) => {   
        console.log("clicky clicky!");                                                                                        
        let id:(string|null) = event?.target?.id || null;
        console.log('id', id)
        if (id === null || id === '') {
            return;
        }
        if (id === "login") {
            if (SHOW_WEB_ICONS === true) {
                dispatch(TOGGLE_SHOW_WEB_ICONS())
            }
            if (SHOW_APP_ICONS === true) {
                dispatch(TOGGLE_SHOW_APP_ICONS())                
            }
            if (SUBMIT_INPUT_DATA === true) {
                console.log("truer than deep blue");
                $(event.target).hide()
            }
        }
        dispatch(TOGGLE_SHOW_FORM(id))
    }

    return (
        <Container id={styles.loginSignupBtnCont}>    
        {/* <> */}
        <button style={{ backgroundColor: 'transparent' }} id="login" onClick={(event) => showForm(event)} className={styles.loginSignupBtn}> Login </button>        
        <button style={{ backgroundColor: 'transparent' }} id="signup" onClick={(event) => showForm(event)} className={styles.loginSignupBtn}> Signup </button>                     
        {/* </> */}
        </Container>
    )
}


// export default function LoginSignupBtn() {
//     const dispatch = useDispatch()
//     const LOGIN_SIGNUP_BTN = useSelector((state: RootState) => state.logInOutGoogle.LOGIN_SIGNUP_BTN);
//     // const DISPLAY_FORM = useSelector((state: RootState) => state.logInOutGoogle.DISPLAY_FORM);

//     const flexPropertyRowCombo = ["flex", "row"].join(" ")

//     const showform = (event:any) => {
//         let targetid:string = event.target.id
//         // dispatch(TOGGLE_LOGIN_SIGNUP_BTN())
//         dispatch(TOGGLE_SHOW_FORM(targetid))
//     }

//     const RENDER = () => {
//         return (
//             <>            
            
//                 {
//                     LOGIN_SIGNUP_BTN &&
//                     <Container className={flexPropertyRowCombo} id={styles.btnBucket}>  
//                         <button onClick={showform} id="login" className={styles.loginSignupBtn}><span id={styles.invisible}>s</span>login<span id={styles.invisible}>s</span></button>
//                         <button onClick={showform} id="signup" className={styles.loginSignupBtn}>signup</button>                            
//                     </Container>                    
//                 }                
//             </>       
//         )
//      }    
//     return <Container> {RENDER()} </Container>
// }