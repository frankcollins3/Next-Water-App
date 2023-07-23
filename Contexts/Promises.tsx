import React, { createContext, useContext, ReactNode, useState } from "react";
import { userSettingsQueryString } from "graphql/queries";
import axios from "axios"
import { SettingsInterface } from "utility/interfaceNtypes";
import Settings from "components/elements/Settings";
import Schedule from "components/elements/Schedule/Schedule";

// @redux/toolkit global state management
import {RootState} from "redux/store/rootReducer"
import {useSelector, useDispatch} from "react-redux"

import { SET_HYDRO_SCHEDULE } from "redux/main/mainSlice"


type PromiseTypes = {
    tokenID: number

    iPROMISEcookies: () => any;
    getUserSettingsPROMISE: () => any;
    userSettingsSchedulePROMISE: () => any;
}

const PromiseDefaults = {
    tokenID: 1,

    iPROMISEcookies: () => {},
    getUserSettingsPROMISE: () => {},
    userSettingsSchedulePROMISE: () => {}
}

const PromiseContext = createContext<PromiseTypes>(PromiseDefaults)

export function usePromise() {
    return useContext(PromiseContext)
}

type Props = { children: ReactNode }

export function PromiseProvider({children}:Props) {
    const dispatch = useDispatch()

    const [tokenID, setTokenID] = useState<number>(0)

    function iPROMISEcookies () {
        const getCookiePROMISE = new Promise((cookies:any, milk:any) => {
            const webcookies = document.cookie.split('; ');
            cookies(webcookies)
            milk('spill')
        })
        return getCookiePROMISE
        .then( (c:any) => {
            let cookieIdString = c[1]
            const sliceID = cookieIdString.slice(3)
            return sliceID || "no ID to return! sorry!"
            // setTokenID(sliceID)
        })
    }

    // SETTINGS PROMISES! 
    function getUserSettingsPROMISE () {
        return iPROMISEcookies()
        .then(async(cookieID) => {
            const ID = parseInt(cookieID)
            const userSettingsQueryStr = await userSettingsQueryString(ID)
            let mySettings = await axios.post('/api/graphql', { query: `${userSettingsQueryStr}` } )

            return mySettings
        })        
    }

    async function userSettingsSchedulePROMISE() {
        let schedule:any[] = []
        try {
            const mySettings = (await getUserSettingsPROMISE()).data.data.userSettings;   
            console.log(mySettings)         
    if (!mySettings) {
        return "no settings"
    } else if (mySettings) {              
        console.log('mySettings', mySettings)
        const SchedulePromise = new Promise(async(resolve:any, reject:any) => {
            const setSchedule = () => { for (let i = mySettings.start_time; i <= mySettings.end_time; i += mySettings.reminder) { schedule.push(i)} }
            await setSchedule()
        resolve(schedule.length ? schedule : "schedule fail")
      })
      return SchedulePromise
      .then( (schedule) => {
        dispatch(SET_HYDRO_SCHEDULE(schedule))
        return schedule
      })
    }
    }
    catch { return "aaye catch" }
}


        const value = {
            tokenID,
            iPROMISEcookies,
            getUserSettingsPROMISE,
            userSettingsSchedulePROMISE
        }        

        // let cookieID = cookieIdString.replace(RreturnNumbers, '') // replace doesn't exist on string or object

    return (
        <PromiseContext.Provider value={value}>
            {children}
        </PromiseContext.Provider>
    )

}


