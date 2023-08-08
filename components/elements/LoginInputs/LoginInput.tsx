import React, {useState} from 'react'
import {useImage} from 'Contexts/ImgContext'

// components and styles
import styles from "./LoginInput.module.scss"

// @redux/toolkit global state management
import { RootState } from "redux/store/rootReducer"
import { useSelector, useDispatch } from 'react-redux';
import { SET_EMAIL_OR_USERNAME_LOGIN_INPUT, SET_PASSWORD_LOGIN_INPUT, TOGGLE_LOGIN_INPUT_FOCUS, TOGGLE_LET_USER_REMEMBER_ME } from "redux/logInOutGoogle/logInOutGoogleSlice"
// adding comment for deployment 

// import { SET_EMAIL_OR_USERNAME_LOGIN_INPUT, SET_PASSWORD_LOGIN_INPUT } from '../../../redux/actionsimport {  } from "utility/UtilityValues"
import {nothingFunc, passwordTogglevalue, flexPropertyColumnCombo} from 'utility/UtilityValues'

// interface Props { inputType: string, EMAIL_OR_USERNAME_LOGIN_INPUT: string, PASSWORD_LOGIN_INPUT: string, SET_EMAIL_OR_USERNAME_LOGIN_INPUT: any SET_PASSWORD_LOGIN_INPUT: any }
interface Props { inputType: string }


export default function LoginInput(props: Props) {

    const dispatch = useDispatch()

    const EMAIL_OR_USERNAME_LOGIN_INPUT = useSelector((state: RootState) => state.logInOutGoogle.EMAIL_OR_USERNAME_LOGIN_INPUT);
    const PASSWORD_LOGIN_INPUT = useSelector((state: RootState) => state.logInOutGoogle.PASSWORD_LOGIN_INPUT);
    const LOGIN_INPUT_FOCUS = useSelector((state: RootState) => state.logInOutGoogle.LOGIN_INPUT_FOCUS);
    const LOGIN_PASSWORD_SHOW_CLICK = useSelector((state: RootState) => state.logInOutGoogle.LOGIN_PASSWORD_SHOW_CLICK);
    const LET_USER_REMEMBER_ME = useSelector((state: RootState) => state.logInOutGoogle.LET_USER_REMEMBER_ME);
    const IS_LOGGED_IN_USER = useSelector((state: RootState) => state.logInOutGoogle.IS_LOGGED_IN_USER);

    const [loginPasswordToggleValue, setLoginPasswordToggleValue] = useState(false)

    // const { inputType, EMAIL_OR_USERNAME_LOGIN_INPUT, PASSWORD_LOGIN_INPUT, SET_EMAIL_OR_USERNAME_LOGIN_INPUT, SET_PASSWORD_LOGIN_INPUT, } = props
    const { inputType } = props

    const { statistics } = useImage()

    const loginOnChangeHandler = (event:any) => {
        let target = event.target
        let value:string = event.target.value
        let id:string = target.id
        if (id === 'email') {
            dispatch(SET_EMAIL_OR_USERNAME_LOGIN_INPUT(value))
        } else if (id === 'password') {
            dispatch(SET_PASSWORD_LOGIN_INPUT(value))
        }
    }

    const togglePasswordFocus = (event:any) => {
        let id:string = event.target.id
        if (id === 'email') {
            if (LOGIN_INPUT_FOCUS === 'password') dispatch(TOGGLE_LOGIN_INPUT_FOCUS(id))
        }
        else if (id === 'password') {
            dispatch(TOGGLE_LOGIN_INPUT_FOCUS(id))
        }
    }
    
    const passwordToggleValueFunc = () => {
        passwordTogglevalue(loginPasswordToggleValue, setLoginPasswordToggleValue)
    }

    const declineRememberMe = () => {
        console.log('remember me?',LET_USER_REMEMBER_ME)
        // change let user remember to me to logged in user!!!!!
        dispatch(TOGGLE_LET_USER_REMEMBER_ME())    
        console.log("me? ", IS_LOGGED_IN_USER)   
    }

    const renderLoginInput = () => {
        return (
            <div className={styles.flexPropertyColumnCombo}> {/* <div className="column"> */}
                
            <input onFocus={togglePasswordFocus} className={styles.input} id={inputType} value={inputType === 'email' ? EMAIL_OR_USERNAME_LOGIN_INPUT : PASSWORD_LOGIN_INPUT } spellCheck="false" onChange={loginOnChangeHandler} type={inputType === 'password' ? LOGIN_PASSWORD_SHOW_CLICK ? "text" : "password" : "text"} />                
                
            </div>            
        )
    }

    return <div className={styles.loginInputContainer}>{renderLoginInput()}</div>

}
