import styles from "../LogInOutGoogle.module.scss"
import axios from 'axios'

// @redux/toolkit global state management
import { RootState } from 'redux/store/rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import { TOGGLE_PASSWORD_SHOW_CLICK, TOGGLE_LOGIN_PASSWORD_SHOW_CLICK, TOGGLE_SUBMIT_INPUT_DATA, SET_CURRENT_USER, SET_LOGIN_MSG, INCREMENT_INCORRECT_LOGIN_ATTEMPT } from "redux/logInOutGoogle/logInOutGoogleSlice"
import { SET_CURRENT_PAGE } from "redux/main/mainSlice"

// components  
import Container from "react-bootstrap/Container"
import SignupInput from "components/elements/SignupInputs"
import LoginInput from "components/elements/LoginInputs"
import SignupLoginChecker from "components/elements/SignupLoginChecker"
import Captcha from "components/elements/Captcha"
import RememberMeUser from "../RememberMeUser/RememberMeUser";

// utils
import {useImage} from "Contexts/ImgContext"
import {signupGoodCheck} from "utility/UtilityValues"
import {UsersLoginInterface} from "utility/interfaceNtypes"

// queries for GraphQL
import {userLoginQueryStringFunc} from "graphql/queries"
import { getCookie, clearCookie, userIdFromCookie } from "utility/cookies"

export default function LoginSignupForm() {
    const dispatch = useDispatch()

    const INPUT_FOCUS = useSelector((state: RootState) => state.logInOutGoogle.INPUT_FOCUS);
    const LOGIN_INPUT_FOCUS = useSelector((state: RootState) => state.logInOutGoogle.LOGIN_INPUT_FOCUS);
    const PASSWORD_SHOW_CLICK = useSelector((state: RootState) => state.logInOutGoogle.PASSWORD_SHOW_CLICK);
    const PASSWORD_SHOW = useSelector((state: RootState) => state.logInOutGoogle.PASSWORD_SHOW);
    const DISPLAY_FORM = useSelector((state: RootState) => state.logInOutGoogle.DISPLAY_FORM);
    const LOGIN_MSG = useSelector((state: RootState) => state.logInOutGoogle.LOGIN_MSG);
    const ALL_USERNAMES = useSelector((state: RootState) => state.logInOutGoogle.ALL_USERNAMES);
    const ALL_EMAILS = useSelector((state: RootState) => state.logInOutGoogle.ALL_EMAILS);

    const INCORRECT_LOGIN_ATTEMPT = useSelector((state: RootState) => state.logInOutGoogle.INCORRECT_LOGIN_ATTEMPT);
    const USERNAME_INPUT = useSelector((state: RootState) => state.logInOutGoogle.USERNAME_INPUT);
    const PASSWORD_INPUT = useSelector((state: RootState) => state.logInOutGoogle.PASSWORD_INPUT);
    const EMAIL_INPUT = useSelector((state: RootState) => state.logInOutGoogle.EMAIL_INPUT);
    const AGE_INPUT = useSelector((state: RootState) => state.logInOutGoogle.AGE_INPUT);
    const PARENT_CONFIRM = useSelector((state: RootState) => state.logInOutGoogle.PARENT_CONFIRM)
    const EMAIL_OR_USERNAME_LOGIN_INPUT = useSelector((state: RootState) => state.logInOutGoogle.EMAIL_OR_USERNAME_LOGIN_INPUT)
    const PASSWORD_LOGIN_INPUT = useSelector((state: RootState) => state.logInOutGoogle.PASSWORD_LOGIN_INPUT)
    const LET_USER_REMEMBER_ME = useSelector((state: RootState) => state.logInOutGoogle.LET_USER_REMEMBER_ME)

    const { faucet, statistics } = useImage()

    const showPassIconClick = () => { dispatch(TOGGLE_PASSWORD_SHOW_CLICK()) }
    const loginShowPassIconClick = () => { dispatch(TOGGLE_LOGIN_PASSWORD_SHOW_CLICK()) }

    const submitFaucetClick = async () => {
        
        // can make this a callback function with username, password, email, age parameters. well done

        if (DISPLAY_FORM === 'signup') {
            const checkSignup = signupGoodCheck(ALL_USERNAMES, ALL_EMAILS, USERNAME_INPUT, EMAIL_INPUT, PASSWORD_INPUT, AGE_INPUT, PARENT_CONFIRM)
            if (checkSignup === true) {
                dispatch(SET_CURRENT_USER({ username: USERNAME_INPUT, email: EMAIL_INPUT, password: PASSWORD_INPUT, age: AGE_INPUT }))

                    dispatch(TOGGLE_SUBMIT_INPUT_DATA())
                    dispatch(SET_CURRENT_PAGE("/MeIcon"))
            } else return 

        } else if (DISPLAY_FORM === 'login') {
            const userLoginQuery = userLoginQueryStringFunc(EMAIL_OR_USERNAME_LOGIN_INPUT, PASSWORD_LOGIN_INPUT)            
            axios
            .post('/api/graphql', {
            query: `${userLoginQuery}`
            }).then(async(loginUser:any) => {
                let userLogin = loginUser.data.data.userLogin
                console.log('userLogin', userLogin)
                const pageCookie = getCookie()            
                console.log('pageCookie', pageCookie)
                clearCookie(pageCookie)

                            
                if (userLogin !== null) {
                    console.log("atleast were in here")
    const cookiePROMISE = new Promise( (resolve:any, reject:any) => {
                    //  * * * * * ID AND TOKEN COOKIES SET HERE ! ! ! 
                        document.cookie = `token=${userLogin.token}; max-age=${7 * 24 * 60 * 60}; path=/;`;                            
                        document.cookie = `id=${userLogin.id}; max-age=${7 * 24 * 60 * 60}; path=/;`;                            
                        const pageCookie = getCookie()
                        resolve(pageCookie || 'no milk no cookies')
                    })
                    cookiePROMISE
                    .then(async(promisecookie:any) => {                                                                        
                        dispatch(SET_LOGIN_MSG("welcome back!"))
                        setTimeout( () => dispatch(SET_LOGIN_MSG("")), 1000)
                        window.location.href = "/"
                    })

                } else {
                    dispatch(SET_LOGIN_MSG("Dry Login. Try Again"))
                    setTimeout( () => dispatch(SET_LOGIN_MSG("")), 1000)
                    dispatch(INCREMENT_INCORRECT_LOGIN_ATTEMPT())
                }
            })
        }


    }

    const RENDER = () => {
        return (

            <>
        {
            DISPLAY_FORM === "signup" &&
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
                                                        
                        { INPUT_FOCUS && <SignupLoginChecker loginstate={INPUT_FOCUS} />  }                                                
                        </form>
                        // </div>                                             
                    }

                    {
                        DISPLAY_FORM === "login" &&
                        <form className={styles.signupLoginForm} id={styles.loginForm}>    
                        <img onClick={submitFaucetClick} className={styles.submitFaucet} src={faucet}/>                       
                        {
                            INCORRECT_LOGIN_ATTEMPT > 0
                            ? 
                            <Captcha/>
                            : 
                            <>
                        {
                        LET_USER_REMEMBER_ME
                        ? <RememberMeUser/>
                        :
                        <>
                        <LoginInput inputType={'email'}/>                      
                        <LoginInput inputType={'password'}/>
                        </>
                        }

                        <img
                        onClick={loginShowPassIconClick}
style={{ border: 'none', opacity: PASSWORD_SHOW_CLICK ? "1.0" : PASSWORD_SHOW ? "0.5" : "0.1", 
         display: LOGIN_INPUT_FOCUS === "password" ? "" : "none",
         height: '25px', width: '25px', alignSelf: 'center', marginTop: '0.25em' }}
                        src={statistics}
                        />
                        { LOGIN_MSG && <pre id={styles.loginMsgText}> {LOGIN_MSG} </pre> }
                            </>
                        }                     
                            {/* <pre> forgot password? possible empty cup lol </pre> */}
                        </form>
                    }
        </>
                )
    }
    
    return <> {RENDER()} </>
}