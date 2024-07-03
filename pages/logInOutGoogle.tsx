// import LogInOutGoogle as ...
import styles from "components/elements/LogInOutGoogle/LogInOutGoogle.module.scss"
import axios from "axios"

// components
import Container from 'react-bootstrap/Container'
import LogInOutGoogle from "components/elements/LogInOutGoogle"
import MeIcon from "components/elements/MeIcon"

// redux global state management
import { useSelector, useDispatch} from 'react-redux'
import { TOGGLE_LET_USER_REMEMBER_ME } from "redux/logInOutGoogle/logInOutGoogleSlice"
import {RootState} from "redux/store/rootReducer"


// utils
import {SERIALIZESTRING, PARSESERIALIZEDSTRING } from "utility/UtilityValues"
import { allDBusersquery } from 'graphql/queries'
import {useImage} from "Contexts/ImgContext"
import {usePromise} from "Contexts/Promises";



export default function logInOutGoogle(props) {
    const dispatch = useDispatch()
    // const selector = useSelector()       // can't do this because an argument needs to be provided.
    const { mouseDroplet } = useImage()
    const SUBMIT_INPUT_DATA = useSelector((state: RootState) => state.logInOutGoogle.SUBMIT_INPUT_DATA);
    const LET_USER_REMEMBER_ME = useSelector((state: RootState) => state.logInOutGoogle.LET_USER_REMEMBER_ME);

    const { iPROMISEcookies } = usePromise()


    {/* <Container style={{ minWidth: '30vw', cursor: `url('${mouseDroplet}')`}}> */}
    return (        
        <LogInOutGoogle/>        
    )    
}

  {/* {
            SUBMIT_INPUT_DATA 
            ? <MeIcon/>
            : <LogInOutGoogle/>
        } */}