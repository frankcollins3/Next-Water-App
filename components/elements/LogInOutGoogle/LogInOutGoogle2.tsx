    import styles from "components/elements/LogInOutGoogle/LogInOutGoogle.module.scss"
    import Container from 'react-bootstrap/Container'
    import {useState, useEffect} from 'react'
    import axios from 'axios'

    // @redux/toolkit global management
    import { RootState } from 'redux/store/rootReducer';
    import { useSelector, useDispatch } from 'react-redux';
    import { 
        TOGGLE_LOGIN_SIGNUP_BTN, SET_USERNAME_INPUT, SET_EMAIL_INPUT, SET_PASSWORD_INPUT, TOGGLE_LET_USER_REMEMBER_ME, SET_IS_LOGGED_IN_USER,
        SET_AGE_INPUT, TOGGLE_SHOW_FORM, SET_ALL_USERNAMES, SET_ALL_EMAILS, TOGGLE_INPUT_FOCUS, SET_EMAIL_OR_USERNAME_LOGIN_INPUT, SET_PASSWORD_LOGIN_INPUT, INCREMENT_INCORRECT_LOGIN_ATTEMPT        
    } from "redux/logInOutGoogle/logInOutGoogleSlice"
    
    
        

    // components
    import SignupInput from "components/elements/SignupInputs"
    import LoginSignupCont from "./LoginSignupCont"
    import LoginSignupForm from "./LoginSignupForm"
    import LoginSignupBtn from "./LoginSignupBtn"
    
    // graphql queries object with endpoints to grab all users.
    import { allDBusersquery, allDBsettingsquery, allDBdataquery } from 'graphql/queries';
    
    // utils
    import {useImage} from "Contexts/ImgContext"    
    import {usePromise} from "Contexts/Promises";
    import {useRegex} from "Contexts/RegexMenu"    
    import {User} from "interfaces/interface"
    import {userLoginQueryStringFunc} from "graphql/queries"
    

    export default function LogInOutGoogle () { 
    // export default function LogInOutGoogle ( { redis }: any ) { 

        // redux state variables
        const dispatch = useDispatch()
        const LOGIN_SIGNUP_BTN = useSelector((state: RootState) => state.logInOutGoogle.LOGIN_SIGNUP_BTN);
        const DISPLAY_FORM = useSelector((state: RootState) => state.logInOutGoogle.DISPLAY_FORM);
        const SUBMIT_INPUT_DATA = useSelector((state: RootState) => state.logInOutGoogle.SUBMIT_INPUT_DATA);
        const INPUT_FOCUS = useSelector((state: RootState) => state.logInOutGoogle.INPUT_FOCUS);        

        const ALL_USERNAMES = useSelector((state: RootState) => state.logInOutGoogle.ALL_USERNAMES);
        const ALL_EMAILS = useSelector((state: RootState) => state.logInOutGoogle.ALL_EMAILS);
        const CURRENT_USER = useSelector((state: RootState) => state.logInOutGoogle.CURRENT_USER);
        const LET_USER_REMEMBER_ME = useSelector((state: RootState) => state.logInOutGoogle.LET_USER_REMEMBER_ME);

        const [containerhover, setContainerhover] = useState(false)

        // destructured image URL from useContext
        const { hand, faucet } = useImage()
        const { iPROMISEcookies } = usePromise()
        const { RreturnNumbers} = useRegex()

        useEffect( () => {        
            
            (async() => {                       
                    // let tokenID:any = await iPROMISEcookies
                    // console.log('tokenID loginoutgoogle2', tokenID)
                    // await axios.post('/api/graphql', { query: `${allDBusersquery}` })
                    // .then( (data:any) => {     
                    //     if (data.data) {
                    //         let allDBusers = data.data.data.allDBusers                            
                    //         console.log('allDBusers', allDBusers)
                    //     const allUsernames = allDBusers.map(user => user.username)        
                    //         const allEmails = allDBusers.map(user => user.email)                
                    //         console.log('allUsernames', allUsernames)
                    //         dispatch(SET_ALL_USERNAMES(allUsernames))
                    //         dispatch(SET_ALL_EMAILS(allEmails))
                    //     } else {
                    //         console.log("successful route hitting but no data returned")
                    //         return "nothing"
                    //     }
                    // }).catch( (err:any) => {
                    //     console.log("err", err)
                    //     return err
                    // })
            })()

        }, [])        
                
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
                    dispatch(TOGGLE_INPUT_FOCUS(''))
                    dispatch(SET_EMAIL_OR_USERNAME_LOGIN_INPUT(''))
                    dispatch(SET_PASSWORD_LOGIN_INPUT(''))
                }        
        }

        const rememberMeFunc = () => {
            if (containerhover === false) {
                iPROMISEcookies().then(async(cookie) => {
                    console.log("cont hover cookie", cookie)
                    const IDtokenINT = parseInt(cookie)
                    console.log('ID INT', IDtokenINT)
                    await axios.post('/api/graphql', { query: `${allDBusersquery}` })
                    .then( (data:any) => {     
                        if (data.data) {
                            let allDBusers = data?.data?.data?.allDBusers                            
                            if (!allDBusers) {
                                return;
                            }
                            console.log('allDBusers', allDBusers)
                        const allUsernames = allDBusers.map(user => user.username)        
                            const allEmails = allDBusers.map(user => user.email)         
                            const rememberMeUser = allDBusers.find(user => user.id === IDtokenINT)       
                            console.log(rememberMeUser)
                            console.log('allUsernames', allUsernames)
                            dispatch(SET_ALL_USERNAMES(allUsernames))
                            dispatch(SET_ALL_EMAILS(allEmails))
                            dispatch(SET_IS_LOGGED_IN_USER(rememberMeUser))

                        } else {
                            console.log("successful route hitting but no data returned")
                            return "nothing"
                        }
                    }).catch( (err:any) => {
                        console.log("err", err)
                        return err
                    })

                    // !Number.isNaN(IDtokenINT)
                    if (LET_USER_REMEMBER_ME === false && !Number.isNaN(IDtokenINT)) {
                        dispatch(TOGGLE_LET_USER_REMEMBER_ME())
                    }
                })
                setContainerhover(true)
            }
        }

        const RENDER = () => {
            return (
                <>  

                <>
                <img onClick={showHideLoginSignupBtn} className={styles.img} style={{ cursor: 'pointer', border: 'none' }} src={hand}/>                                         
                </>
                
                {
                        DISPLAY_FORM === "login" || DISPLAY_FORM === "signup"
                        ?  <LoginSignupForm/>
                        :  <LoginSignupBtn/>
                }            

                { LOGIN_SIGNUP_BTN && <button style={{ opacity: '0.0', backgroundColor: '#73defe', height: '15px', width: '15px', borderRadius: '40%'}}> G </button> }
                {/* { LOGIN_SIGNUP_BTN && <button onClick={rememberMeFunc} style={{ backgroundColor: '#73defe', height: '15px', width: '15px', borderRadius: '40%'}}> G </button> } */}
                </>
            )
        }

        return <Container onMouseEnter={rememberMeFunc} style={{ minWidth: '50vw', justifyContent: LOGIN_SIGNUP_BTN ? "space-between" : "center" }} className={styles.loginContainer}> {RENDER()} </Container>
        // return <Container style={{ justifyContent: LOGIN_SIGNUP_BTN ? "space-between" : "center" }} className={styles.loginContainer}> {RENDER()} </Container>

        // return <Container style={{ justifyContent: LOGIN_SIGNUP_BTN ? "space-between" : "center"}}
        //     className={flexPropertyColumnCombo} id={styles.loginSignupBtnCont}> {RENDER()} 
        // </Container>
        
    }