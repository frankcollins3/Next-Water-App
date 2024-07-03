import {useEffect} from "react"                                                                                                                                                                                       

// components and styles
import CalendarDetails from "components/elements/Dashboard/CalendarDetails"
import styles from "components/elements/Dashboard/Dashboard.module.scss"
import DashboardComponent from "components/elements/Dashboard"
import Container from "react-bootstrap/Container"
import DropInBucket from "components/elements/DropInBucket"
import RainyData from "components/elements/Rainydata"

// @redux/toolkit global state management
import {RootState} from "redux/store/rootReducer"
import {useSelector, useDispatch} from 'react-redux'
import { TOGGLE_CALENDAR_DAY_DRIED_UP, TOGGLE_WEATHER_CHANNEL, TOGGLE_CALENDAR_SHOW, TOGGLE_PROGRESS_SHOW, SET_CITY_NAME } from "redux/dashboard/dashboardSlice"

// utils
import {usePromise} from "Contexts/Promises"

export default function Dashboard () {                                                                                                                                                            
    return <RENDER/>
}

function RENDER() {
    const {getAndSetCurrentUserPROMISE} = usePromise();     
    const CURRENT_USER = useSelector((state:RootState) => state.logInOutGoogle.CURRENT_USER)                                
    const SELECTED_DAY = useSelector((state:RootState) => state.dashboard.SELECTED_DAY)                                
    const NO_SELECTED_DAY = useSelector((state:RootState) => state.dashboard.NO_SELECTED_DAY)                                
    const WEATHER_CHANNEL = useSelector((state:RootState) => state.dashboard.WEATHER_CHANNEL)                                
    const WW_LOCATION = useSelector((state:RootState) => state.dashboard.WW_LOCATION)                                
    const WW_CURRENT_CONDITIONS = useSelector((state:RootState) => state.dashboard.WW_CURRENT_CONDITIONS)                                
    const WW_WRONG_LOC = useSelector((state:RootState) => state.dashboard.WW_WRONG_LOC)                                

    useEffect(() => {
        // void; change state.
        getAndSetCurrentUserPROMISE()

    }, [])
                                              
    const gridRows = () => {
        return new Array(4).fill("").map((mapitem, index) => (
            <p 
            style={{ textTransform: WW_WRONG_LOC && index !== 0 ? "uppercase" : "none", fontSize: WW_LOCATION ? "24px" : "" }}
            className={index % 2 === 0 ? styles.row : styles.altRow } key={index}> {
                index === 0 
                ? WW_LOCATION ? WW_LOCATION : "Where's" 
                : 
                index === 2
                ?
                WW_CURRENT_CONDITIONS ? WW_CURRENT_CONDITIONS : WW_WRONG_LOC ? "Wat?" : "Water?"
                : ""
            } </p>
        ))
    }        
    return (
        <Container id={styles.newCont}>
                { 
                    WEATHER_CHANNEL ? 
                    <>                    
                    <Container id={styles.waldoCont}>
                    {gridRows()}
                    </Container>

                    <RainyData/> 
                    </>
                    :                    
                        SELECTED_DAY?.date
                        ?
                        <CalendarDetails/>                        
                        :
                        <DashboardComponent/> 
                    // : NO_SELECTED_DAY ? <DropInBucket/> : <CalendarDetails/> 
                }



                
            

                {/* {    */}
                    {/* WEATHER_CHANNEL === false && !SELECTED_DAY?.date &&  */}
                    {/* <> */}
                    {/* <p className="ghost"> yh </p> */}
                    {/* <DashboardComponent/>  */}
                    {/* <p className="ghost"> yh </p> */}
                    {/* </> */}
                {/* } */}
                

                {/* { !WEATHER_CHANNEL && !SELECTED_DAY && <DashboardComponent/> } */}


        </Container>                                                                                                                                                    
    )
}