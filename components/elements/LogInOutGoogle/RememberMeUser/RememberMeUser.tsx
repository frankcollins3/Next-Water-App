
// components and styles
import styles from "./RememberMeUser.module.scss"
import Container from 'react-bootstrap/Container'

// @redux/toolkit global state management
import { RootState } from 'redux/store/rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import { TOGGLE_LET_USER_REMEMBER_ME } from "redux/logInOutGoogle/logInOutGoogleSlice"

// utils
import {useImage} from "Contexts/ImgContext"

export default function RememberMeUser() {

    const dispatch = useDispatch()

    const IS_LOGGED_IN_USER = useSelector( (state:RootState) => state.logInOutGoogle.IS_LOGGED_IN_USER)
    let loggedInUsername = IS_LOGGED_IN_USER.username

    const { confirmation, close } = useImage()
    const sty = styles;

    const confirmRememberMe = () => {
        window.location.href = "/"
    }

    const rejectRememberMe = () => {
        dispatch(TOGGLE_LET_USER_REMEMBER_ME())
    }

    const RENDER = () => {
        return (
            <>
            <pre id={sty.pre}> Welcome back <span id={sty.span}>{loggedInUsername} </span> </pre>

            <Container id={sty.row}>
            <img onClick={confirmRememberMe} className={sty.img} src={confirmation}/>
            <img onClick={rejectRememberMe} className={sty.img} src={close}/>
            </Container>
            </>
        )
    }
    return <Container id={sty.cont}> {RENDER()} </Container>
}