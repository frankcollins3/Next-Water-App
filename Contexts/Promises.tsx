import React, { createContext, useContext, ReactNode, useState } from "react";
import axios from "axios"


import Settings from "components/elements/Settings";
import Schedule from "components/elements/Schedule/Schedule";



// @redux/toolkit global state management
import {RootState} from "redux/store/rootReducer"
import {useSelector, useDispatch} from "react-redux"
import { SET_HYDRO_SCHEDULE, SET_HYDRO_DATA, SET_DATE, SET_HYDRO_INTAKE } from "redux/main/mainSlice"

// utils
import { SettingsInterface } from "utility/interfaceNtypes";
import { userSettingsQueryString, getUserDailyDataQueryString } from "graphql/queries";
import waterIntakeWeightFormula from "utility/waterIntakeWeightFormula";


type PromiseTypes = {
    tokenID: number

    iPROMISEcookies: () => any;
    getUserSettingsPROMISE: () => any;
    userSettingsSchedulePROMISE: () => any;
    userSettingsIntakePROMISE: () => any;
    getDailyDataPROMISE: () => any;
}

const PromiseDefaults = {
    tokenID: 1,

    iPROMISEcookies: () => {},
    getUserSettingsPROMISE: () => {},
    userSettingsSchedulePROMISE: () => {},
    userSettingsIntakePROMISE: () => {},
    getDailyDataPROMISE: () => {}
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
    catch(err:any) { return err }    
    // catch(err) { throw new Error(err) }    
}

    async function userSettingsIntakePROMISE() {
        return new Promise( (resolve:any, reject:any) => {
            getUserSettingsPROMISE()
            .then(async(mySettings:any) => {
                mySettings = mySettings.data.data.userSettings
                let weight:number = mySettings.weight
                const intake:number = await waterIntakeWeightFormula(weight)
                if (intake > 1) {
                    dispatch(SET_HYDRO_INTAKE(intake))
                    resolve(intake)
                }
                reject('cant take in')
            })
        })
    }
// * * *  END OF SETTINGS PROMISES * * * 

    async function getDailyDataPROMISE() {
        try {
          return iPROMISEcookies()
          .then(async(cookieID) => {
            const ID = parseInt(cookieID)
            const userDailyDataQueryStr = await getUserDailyDataQueryString(ID)
            let myDailyData = await axios.post('/api/graphql', { query: `${userDailyDataQueryStr}`})
            console.log(myDailyData)
            if (myDailyData.data.data.getDailyData) {
                let dailyData = myDailyData.data.data.getDailyData
                console.log('date', dailyData)
                await dispatch(SET_DATE(dailyData.date))
                await dispatch(SET_HYDRO_DATA(dailyData))
            }
            return myDailyData

        })

        }   
        catch {

        }
    }

        const value = {
            tokenID,
            iPROMISEcookies,
            getUserSettingsPROMISE,
            userSettingsSchedulePROMISE,
            userSettingsIntakePROMISE,
            getDailyDataPROMISE
        }        

        // let cookieID = cookieIdString.replace(RreturnNumbers, '') // replace doesn't exist on string or object

    return (
        <PromiseContext.Provider value={value}>
            {children}
        </PromiseContext.Provider>
    )

}


