import styles from "components/elements/LogInOutGoogle/LogInOutGoogle.module.scss"
import Container from 'react-bootstrap/Container'
import {useState, useEffect} from 'react'
import axios from 'axios'

// redux state management
import { RootState } from 'redux/store/rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import { 
    TOGGLE_LOGIN_SIGNUP_BTN, SET_USERNAME_INPUT, SET_EMAIL_INPUT, SET_PASSWORD_INPUT, 
    SET_AGE_INPUT, TOGGLE_SHOW_FORM, SET_ALL_USERNAMES
 } from "redux/logInOutGoogle/logInOutGoogleSlice"
 
 // components
 import SignupInput from "components/elements/SignupInputs"
 import LoginSignupCont from "./LoginSignupCont"
 import LoginSignupForm from "./LoginSignupForm"
 import LoginSignupBtn from "./LoginSignupBtn"
 
// graphql queries object with endpoints to grab all users.
 import { allDBusersquery } from 'graphql/queries';

// utils
import {useImage} from "Contexts/ImgContext"


export default function RenderLogInOutGoogle () {

    // redux state variables
    const dispatch = useDispatch()
    const LOGIN_SIGNUP_BTN = useSelector((state: RootState) => state.logInOutGoogle.LOGIN_SIGNUP_BTN);
    const DISPLAY_FORM = useSelector((state: RootState) => state.logInOutGoogle.DISPLAY_FORM);
    const SUBMIT_INPUT_DATA = useSelector((state: RootState) => state.logInOutGoogle.SUBMIT_INPUT_DATA);
    const INPUT_FOCUS = useSelector((state: RootState) => state.logInOutGoogle.INPUT_FOCUS);
    const ALL_USERNAMES = useSelector((state: RootState) => state.logInOutGoogle.ALL_USERNAMES);

    // destructured image URL from useContext
    const { hand, faucet } = useImage()

    useEffect( () => {
        // graphQL query -> prisma -> postgres -> return prisma.users.findMany() -> client -> redux so that -> /LoginSignupForm -> signup process can check for unique username constraint.
        console.log("useEffect guys!")
          axios.post('/api/graphql', { query: `${allDBusersquery}` })
          .then( (data:any) => {
            let allDBusers = data.data.data.allDBusers
            const allUsernames = allDBusers.map(user => user.username)
            dispatch(SET_ALL_USERNAMES(allUsernames))

          }).catch( (err:any) => {
            // set error component to true
            return "error"
          })
    // const allusersPROMISE = new Promise( (resolve:any, reject:any) => {
    //   let data = axios.post('/api/graphql', { query: `${allDBusersquery}` })
    //   resolve(data)
    //   reject('bs')
    // })
    }, [])

    /*
    useEffect( () => {
        console.log("useEffect guys!")
    const allusersPROMISE = new Promise( (resolve:any, reject:any) => {
      let data = axios.post('/api/graphql', { query: `${allDBusersquery}` })
      resolve(data)
      reject('bs')
    })
    allusersPROMISE
    .then( (data:any) => {
      console.log('data')
      if (!data.data) {
      } else {    
        let allDBusers = data.data.data.allDBusers
        const allUsernames = allDBusers.map(user => user.username);      
        dispatch(SET_ALL_USERNAMES(allUsernames))        
      }
    })
      }, [])
    */

    const test = () => {
        console.log('INPUT_FOCUS')
        console.log(INPUT_FOCUS)
        // dispatch(TOGGLE_LOGIN_SIGNUP_BTN())
        console.log('ALL_USER_NAMES from logInOutGoogle')
        console.log(ALL_USERNAMES)
    }

    const showform = (event:any) => {
        let targetid:string = event.target.id
        dispatch(TOGGLE_LOGIN_SIGNUP_BTN())
        dispatch(TOGGLE_SHOW_FORM(targetid))
    }


    const showHideLoginSignupBtn = () => {        
            dispatch(TOGGLE_LOGIN_SIGNUP_BTN())
            if (DISPLAY_FORM === "login" || DISPLAY_FORM === "signup") {
    // state resetter in case user clicked signup and meant to click login. It shows the form again. Also in that case it deletes the already entered characters
                dispatch(TOGGLE_SHOW_FORM(""))
                dispatch(SET_USERNAME_INPUT(''))
                dispatch(SET_PASSWORD_INPUT(''))
                dispatch(SET_EMAIL_INPUT(''))
                dispatch(SET_AGE_INPUT(''))
            }        
    }

    const RENDER = () => {
        return (
            // SUBMIT_INPUT_DATA === FALSE wraps LoginSignupCont
            <>            
            {/* <LoginSignupCont/> */}
            <Container>
            <img onClick={showHideLoginSignupBtn} className={styles.img} style={{ cursor: 'pointer', border: 'none' }} src={hand}/>                                         

            </Container>
            {/* <img onClick={submitFaucetClick} style={{ transform: 'scale(0.50)', display: SUBMIT_INPUT_DATA ? "none" : "" }} className="submit-faucet" src={"/water_img/faucet.png"}/>                     */}
            {
                    DISPLAY_FORM === "login" || DISPLAY_FORM === "signup"
                    ?  <LoginSignupForm/>
                    :  <LoginSignupBtn/>
            }            
            { LOGIN_SIGNUP_BTN && <button onClick={test} style={{ backgroundColor: '#73defe', height: '15px', width: '15px', borderRadius: '40%'}}> G </button> }
            </>
        )
    }

    return <Container style={{ justifyContent: LOGIN_SIGNUP_BTN ? "space-between" : "center" }} className={styles.loginContainer}> {RENDER()} </Container>

    // return <Container style={{ justifyContent: LOGIN_SIGNUP_BTN ? "space-between" : "center"}}
    //     className={flexPropertyColumnCombo} id={styles.loginSignupBtnCont}> {RENDER()} 
    // </Container>
    
}
