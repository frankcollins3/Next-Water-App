import {useEffect} from "react"
// components and styles
// import styles from "./Dashboard.module.scss"
import styles from "components/elements/Dashboard/Dashboard.module.scss"
import DashboardComponent from "components/elements/Dashboard"
import Container from "react-bootstrap/Container"

// @redux/toolkit global state management
import {RootState} from "redux/store/rootReducer"
import { TOGGLE_CALENDAR_DAY_DRIED_UP, TOGGLE_WEATHER_CHANNEL, TOGGLE_CALENDAR_SHOW, TOGGLE_PROGRESS_SHOW, SET_CITY_NAME } from "redux/dashboard/dashboardSlice"

// utils
import {usePromise} from "Contexts/Promises"

export default function Dashboard ({setLocalCurrentUsername, localCurrentUsername, mainBorderHover, setMainBorderHover}) {

    console.log('setLocalCurrentUsername', setLocalCurrentUsername)

    const {getAndSetCurrentUserPROMISE} = usePromise()
    
    useEffect( () => {
        getAndSetCurrentUserPROMISE(setLocalCurrentUsername)
    .then( (userSettings) => {
    console.log('userSettings', userSettings)
    })
    }, []);
    


    const RENDER = () => {
        return (
            <DashboardComponent />
        )
    }
    return <Container onMouseEnter={() => setMainBorderHover(true)} onMouseLeave={() => setMainBorderHover(false)} className="dashboard-container">{RENDER()}</Container>; 
    // return <Container className={styles.dashboardContainer}>{RENDER()}</Container>;
    // return <Container className="dashboard-container">{RENDER()}</Container>;
}