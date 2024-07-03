// import LogInOutGoogle as ...
import axios from "axios"

// components and stylign
import Container from 'react-bootstrap/Container'
import LogInOutGoogle from "components/elements/LogInOutGoogle"
import Capptcha from "components/elements/Captcha"
import SignupLoginChecker from "components/elements/SignupLoginChecker"
import LoginInput from "components/elements/LoginInputs"
import SignupInput from "components/elements/SignupInputs"
import LoginSignupBtn from "components/elements/LogInOutGoogle/LoginSignupBtn"
import MeIcon from "components/elements/MeIcon"
import styles from "./SignupLoginForm.module.scss"

// redux global state management
import { useSelector, useDispatch} from 'react-redux'

import { 
    TOGGLE_LET_USER_REMEMBER_ME, TOGGLE_SHOW_FORM, CLEAR_LOGIN_SIGNUP_INPUTS, TOGGLE_INPUT_FOCUS, 
    TOGGLE_PASSWORD_SHOW_CLICK, TOGGLE_LOGIN_PASSWORD_SHOW_CLICK,
    SET_EMAIL_OR_USERNAME_LOGIN_INPUT, SET_PASSWORD_LOGIN_INPUT
 } from "redux/logInOutGoogle/logInOutGoogleSlice"
import {RootState} from "redux/store/rootReducer"


// utility
import { userLoginQueryStringFunc } from "graphql/queries"
import { nothingFunc } from "utility/UtilityValues"
import {usePromise} from "Contexts/Promises"
import {useImage} from "Contexts/ImgContext"

export default function SignupLoginForm() {
    return <RENDER/>
}

function RENDER() {

    const dispatch = useDispatch()
    const { faucet, statistics, testTube } = useImage();
    const { signupFunctions, loginFunctions } = usePromise()
    // userLoginQueryStringFunc
    const submitFaucetClickSignup = signupFunctions?.submitFaucetClickSignup || nothingFunc
    const submitFaucetClickLogin = loginFunctions?.submitFaucetClickLogin || nothingFunc
    
    const DISPLAY_FORM = useSelector((state:RootState) => state.logInOutGoogle.DISPLAY_FORM)
    const INCORRECT_LOGIN_ATTEMPT = useSelector((state:RootState) => state.logInOutGoogle.INCORRECT_LOGIN_ATTEMPT)
    const INPUT_FOCUS = useSelector((state:RootState) => state.logInOutGoogle.INPUT_FOCUS)
    const PASSWORD_SHOW_CLICK = useSelector((state:RootState) => state.logInOutGoogle.PASSWORD_SHOW_CLICK)
    const PASSWORD_SHOW = useSelector((state:RootState) => state.logInOutGoogle.PASSWORD_SHOW)

    const LOGIN_PASSWORD_SHOW_CLICK = useSelector((state:RootState) => state.logInOutGoogle.LOGIN_PASSWORD_SHOW_CLICK)
    const LOGIN_PASSWORD_SHOW = useSelector((state:RootState) => state.logInOutGoogle.LOGIN_PASSWORD_SHOW)
    
    const testTubeClick = async () => {
        await dispatch(SET_EMAIL_OR_USERNAME_LOGIN_INPUT('testwaters@gmail.com'))
        await dispatch(SET_PASSWORD_LOGIN_INPUT('aintTestMyWaters777!'))

        await submitFaucetClickLogin()
    }

    const displayFormClickBack = () => {
        if (INPUT_FOCUS !== "") {

            dispatch(TOGGLE_INPUT_FOCUS(''))
        }
        
        if (DISPLAY_FORM === "login" || DISPLAY_FORM === "signup") {
            dispatch(TOGGLE_SHOW_FORM(''))
            dispatch(CLEAR_LOGIN_SIGNUP_INPUTS())
        }
        return;
    }

    const showPassIconClick = (id) => { 
        console.log('id', id)
        console.log('typeof id', typeof id)
        id = id.target.id;
        if (id === "showLoginBtn") {
            dispatch(TOGGLE_LOGIN_PASSWORD_SHOW_CLICK())
        } else if (id === "showSignupBtn") {
            dispatch(TOGGLE_PASSWORD_SHOW_CLICK())
        }
        return // void;
     }
    // const loginShowPassIconClick = () => { dispatch(TOGGLE_LOGIN_PASSWORD_SHOW_CLICK()) }

    return (
        <Container id={styles.cont}>         
<img onClick={DISPLAY_FORM === "login" ? submitFaucetClickLogin : DISPLAY_FORM === "signup" ? submitFaucetClickSignup : nothingFunc } id={styles.submitFaucet} src={faucet}/>

        <Container 
        style={{ 
            flexDirection: DISPLAY_FORM === 'login' || DISPLAY_FORM === 'signup' ? 'column' : "row",
            justifyContent: DISPLAY_FORM === 'login' || DISPLAY_FORM === 'signup' ? 'space-between' : "center",
            // border: DISPLAY_FORM === 'login' || DISPLAY_FORM === 'signup' ? '5px solid orange' : "2px solid blue"                        
            // top: DISPLAY_FORM  "signup" ? "-10px" : "10px"
    }}
        id={styles.btnCont}>
        {
            DISPLAY_FORM === "login" 
            ?             
                INCORRECT_LOGIN_ATTEMPT > 1 
                ?
                <Capptcha/>
                :
            <>
            <LoginInput inputType="email"/>        
            <Container id={styles.backBtnSignupCheckerRow}>
            <p className="ghost"> yea </p>

            <LoginInput inputType="password"/>

            <img id="showLoginBtn" style={{ top: '6px', left: '5px', height: '25px', width: '25px', border: 'none', opacity: LOGIN_PASSWORD_SHOW_CLICK ? "0.1" : "1.0", position: 'relative' }}
                 onClick={(id) => showPassIconClick(id)} 
                //  onClick={showPassIconClick} 
                 src={statistics}                                                                                                            
            />                                                         
            </Container>
            
            <img onClick={testTubeClick} id={styles.testTubeTestLogin} src={testTube}/>

            <p onClick={displayFormClickBack} id={styles.backBtn}> {"<<"} </p>
            </>        
            // <LoginInput inputType="password"/>            
            :
            DISPLAY_FORM === "signup" 
            ?
            <>            
                <SignupInput inputType={'username'}/>
                <SignupInput inputType={'email'}/>
                <SignupInput inputType={'age'}/>
                <Container id={styles.backBtnSignupCheckerRow}>

                    <p className="ghost"> hey </p>
                <SignupInput inputType={'password'}/>                                              

                    <img 
                        style={{ top: '10px', left: '5px', height: '25px', width: '25px', border: 'none', opacity: PASSWORD_SHOW_CLICK ? "0.1" : "1.0", position: 'relative' }}
                        id="showSignupBtn"
                        onClick={(id) => showPassIconClick(id)} 
                        // onClick={showPassIconClick} 
                        src={statistics}
                    />                                                         
                </Container>

            <Container id={styles.backBtnSignupCheckerRow}>
            { 
            INPUT_FOCUS && 
            <>
            {/* <p onClick={displayFormClickBack} id={styles.backBtn}> {"<<"} </p>  */}
            <p style={{ left: '-10px', top: '-10px' }} onClick={displayFormClickBack} id={styles.backBtn}> {"<<"} </p>
                            

            <SignupLoginChecker loginstate={INPUT_FOCUS} />
            </>
            }
            {/* { INPUT_FOCUS && <SignupLoginChecker loginstate={INPUT_FOCUS} /> }               */}
            <p className="ghost"> {"<<"} </p>
            </Container>
            </>
            :
            <LoginSignupBtn/>
        }
        </Container>


        </Container>
    )
}

// { 
    // INPUT_FOCUS && 
    // <>
    // <p  className="ghost" onClick={displayFormClickBack} id={styles.backBtn}> {"<<"} </p>
    // <SignupLoginChecker loginstate={INPUT_FOCUS} />  
    // </>
    // }  