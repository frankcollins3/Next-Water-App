import styles from "../LogInOutGoogle.module.scss"

// redux state management
import { RootState } from 'redux/store/rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import { 
    TOGGLE_LOGIN_SIGNUP_BTN, SET_USERNAME_INPUT, SET_EMAIL_INPUT, SET_PASSWORD_INPUT, 
    SET_AGE_INPUT, TOGGLE_SHOW_FORM, SET_EMAIL_OR_USERNAME_LOGIN_INPUT
 } from "redux/logInOutGoogle/logInOutGoogleSlice"

//  components
import Container from "react-bootstrap/Container"
import LoginSignupBtn from "../LoginSignupBtn"
import LoginSignupForm from "../LoginSignupForm"

export default function LoginSignupCont() {
    const dispatch = useDispatch()
    const LOGIN_SIGNUP_BTN = useSelector((state: RootState) => state.logInOutGoogle.LOGIN_SIGNUP_BTN);
    const DISPLAY_FORM = useSelector((state: RootState) => state.logInOutGoogle.DISPLAY_FORM);

    const test = () => {
        dispatch(TOGGLE_LOGIN_SIGNUP_BTN())
    }

    const showform = (event:any) => {
        let targetid:string = event.target.id
        dispatch(TOGGLE_LOGIN_SIGNUP_BTN())
        dispatch(TOGGLE_SHOW_FORM(targetid))
    }

    const showHideLoginSignupBtn = () => {
            dispatch(TOGGLE_LOGIN_SIGNUP_BTN())
            if (DISPLAY_FORM.length < 1) dispatch(TOGGLE_SHOW_FORM({ payload: "" }))            

            if (DISPLAY_FORM === "login" || DISPLAY_FORM === "signup") {
                dispatch(TOGGLE_SHOW_FORM(''))
                dispatch(SET_USERNAME_INPUT(''))
                dispatch(SET_PASSWORD_INPUT(''))
                dispatch(SET_EMAIL_INPUT(''))
                dispatch(SET_AGE_INPUT(''))
            }        
    }




    const RENDER = () => {
        return (
            <Container className={styles.loginSignupContainer}>
                <img onClick={showHideLoginSignupBtn} className={styles.img} style={{ cursor: 'pointer', border: 'none' }} src="/water_img/hand.png"/>                             
                {
                    DISPLAY_FORM === "login" || DISPLAY_FORM === "signup"
                    ?  <LoginSignupForm/>
                    :  <LoginSignupBtn/>
                }
                {/* <LoginSignupBtn/> */}
        {/* { DISPLAY_FORM === "login" || DISPLAY_FORM === "signup" && <LoginSignupForm/> } */}
            </Container>       
        )
    }
    return <Container> {RENDER()} </Container>
    // return <Container style={{ border: 'none' }} className={styles.loginContainer}> {RENDER()} </Container>
}


{/* <img onClick={showHideLoginSignupBtn} className={styles.img} style={{ cursor: 'pointer', border: 'none' }} src="/water_img/hand.png"/>                 


{
        LOGIN_SIGNUP_BTN 
        ?                        
        <>  
            <button onClick={showform} id="login" className={styles.loginSignupBtn}><span id={styles.invisible}>s</span>login<span id={styles.invisible}>s</span></button>
            <button onClick={showform} id="signup" className={styles.loginSignupBtn}>signup</button>                            
        </>
        :
        <SignupInput inputType={"username"}/>                        
    }

<button onClick={test}> </button> */}
