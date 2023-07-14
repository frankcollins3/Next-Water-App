import styles from "../LogInOutGoogle.module.scss"
import axios from 'axios'

// @redux/toolkit global state management
import { RootState } from 'redux/store/rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import { 
    TOGGLE_PASSWORD_SHOW_CLICK
 } from "redux/logInOutGoogle/logInOutGoogleSlice"

// components  
import Container from "react-bootstrap/Container"
import SignupInput from "components/elements/SignupInputs"
import LoginInput from "components/elements/LoginInputs"
import SignupLoginChecker from "components/elements/SignupLoginChecker"
import Captcha from "components/elements/Captcha"

// utils
import {useImage} from "Contexts/ImgContext"

export default function LoginSignupForm() {
    const dispatch = useDispatch()
    const INPUT_FOCUS = useSelector((state: RootState) => state.logInOutGoogle.INPUT_FOCUS);
    const PASSWORD_SHOW_CLICK = useSelector((state: RootState) => state.logInOutGoogle.PASSWORD_SHOW_CLICK);
    const PASSWORD_SHOW = useSelector((state: RootState) => state.logInOutGoogle.PASSWORD_SHOW);
    const DISPLAY_FORM = useSelector((state: RootState) => state.logInOutGoogle.DISPLAY_FORM);
    const LOGIN_MSG = useSelector((state: RootState) => state.logInOutGoogle.LOGIN_MSG);

    const INCORRECT_LOGIN_ATTEMPT = useSelector((state: RootState) => state.logInOutGoogle.INCORRECT_LOGIN_ATTEMPT);
    const USERNAME_INPUT = useSelector((state: RootState) => state.logInOutGoogle.USERNAME_INPUT);
    const PASSWORD_INPUT = useSelector((state: RootState) => state.logInOutGoogle.PASSWORD_INPUT);
    const EMAIL_INPUT = useSelector((state: RootState) => state.logInOutGoogle.EMAIL_INPUT);
    const AGE_INPUT = useSelector((state: RootState) => state.logInOutGoogle.AGE_INPUT);




    const { faucet, statistics } = useImage()

    const showPassIconClick = () => { dispatch(TOGGLE_PASSWORD_SHOW_CLICK()) }

    const submitFaucetClick = () => {
        console.log(USERNAME_INPUT)
        console.log(typeof USERNAME_INPUT)
        console.log(PASSWORD_INPUT)
        console.log(EMAIL_INPUT)
        console.log(AGE_INPUT)
        
        axios
    .post('/api/graphql', {
      query: `
        mutation {
          addUser(
            id: 0,
            google_id: "no google-id", 
            icon: "/water_img/panda.png",
            username: "${USERNAME_INPUT}",
            password: "${PASSWORD_INPUT}", 
            email:  "${EMAIL_INPUT}",
            age: ${AGE_INPUT}
          ) {
            id, google_id, icon, username, email, password, age
          }
        }
      `,
    })
    .then((data: any) => {
      console.log('data');
      console.log(data);
    })
    .catch((err: any) => {
      console.log('err');
      console.log(err);
    });


    }

    const RENDER = () => {
        return (

            <>
        {
            DISPLAY_FORM === "signup"
            ?
            <form className={styles.signupLoginForm} id={styles.signupForm}>                         
            <img onClick={submitFaucetClick} className={styles.submitFaucet} src={faucet}/>                    
                        <SignupInput inputType={'username'}/>
                        <SignupInput inputType={'email'}/>
                        <SignupInput inputType={'age'}/>
                        <SignupInput inputType={'password'}/>                        
                      
                                <img
                        onClick={showPassIconClick}
style={{ border: 'none', opacity: PASSWORD_SHOW_CLICK ? "1.0" : PASSWORD_SHOW ? "0.5" : "0.1", 
         display: INPUT_FOCUS === "password" ? "" : "none",
         height: '25px', width: '25px', alignSelf: 'center', marginTop: '0.25em' }}
                        src={statistics}
                                />
                                                        
                        { INPUT_FOCUS ? <SignupLoginChecker loginstate={INPUT_FOCUS} /> : <pre> </pre> }                                                
                        </form>
                        // </div>
                        :
                        <pre></pre>
                    }
                    {
                        DISPLAY_FORM === "login"
                        ?                        
                        <form className={styles.signupLoginForm} id={styles.loginForm}>    
                        <img onClick={submitFaucetClick} className={styles.submitFaucet} src={faucet}/>                       
                        {
                            INCORRECT_LOGIN_ATTEMPT > 0
                            ? 
                            <Captcha/>
                            : 
                            <>
                        <LoginInput inputType={'emailOrUsername'}/>                      
                        <LoginInput inputType={'password'}/>
                            </>
                        }                     
                        <pre id={styles.loginMsgText}> {LOGIN_MSG} </pre>
                            {/* <pre> forgot password? possible empty cup lol </pre> */}
                        </form>
                        :
                        <pre></pre>
                    }
        </>
                )
    }
    
    return <Container> {RENDER()} </Container>
}