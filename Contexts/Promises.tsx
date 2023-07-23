import React, { createContext, useContext, ReactNode, useState } from "react";
import axios from "axios"


import Settings from "components/elements/Settings";
import Schedule from "components/elements/Schedule/Schedule";



// @redux/toolkit global state management
import {RootState} from "redux/store/rootReducer"
import {useSelector, useDispatch} from "react-redux"
import { SET_HYDRO_SCHEDULE, SET_HYDRO_DATA, SET_DATE, SET_HYDRO_INTAKE, SET_STATUS, SET_DISABLED } from "redux/main/mainSlice"

// utils
import { SettingsInterface, HydroDataInterface } from "utility/interfaceNtypes";
import { userSettingsQueryString, getUserDailyDataQueryString } from "graphql/queries";
import waterIntakeWeightFormula from "utility/waterIntakeWeightFormula";


type PromiseTypes = {
    tokenID: number

    iPROMISEcookies: () => any;
    getUserSettingsPROMISE: () => any;
    userSettingsSchedulePROMISE: () => any;
    userSettingsIntakePROMISE: () => any;
    getDailyDataPROMISE: () => any;
    setDataStatePROMISE: (date:boolean, hydro_data:boolean, hydro_schedule:boolean, hydro_intake:boolean, status:boolean, disabled:boolean) => any;
}   

const PromiseDefaults = {
    tokenID: 1,

    iPROMISEcookies: () => {},
    getUserSettingsPROMISE: () => {},
    userSettingsSchedulePROMISE: () => {},
    userSettingsIntakePROMISE: () => {},
    getDailyDataPROMISE: () => {},
    setDataStatePROMISE: (date:boolean, hydro_data:boolean, hydro_schedule:boolean, hydro_intake:boolean, status:boolean, disabled:boolean) => {},
}

const PromiseContext = createContext<PromiseTypes>(PromiseDefaults)

export function usePromise() {
    return useContext(PromiseContext)
}

type Props = { children: ReactNode }

export function PromiseProvider({children}:Props) {
    const HYDRO_DATA = useSelector( (state:RootState) => state.main.HYDRO_DATA)
    const HYDRO_SCHEDULE = useSelector( (state:RootState) => state.main.HYDRO_SCHEDULE)
    const HYDRO_INTAKE = useSelector( (state:RootState) => state.main.HYDRO_INTAKE)
    const DATE = useSelector( (state:RootState) => state.main.DATE)
    const STATUS = useSelector( (state:RootState) => state.main.STATUS)
    const DISABLED = useSelector( (state:RootState) => state.main.DISABLED)

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

    // DATA PROMISES
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
                // await dispatch(SET_DATE(dailyData.date))
                // await dispatch(SET_HYDRO_DATA(dailyData))
            }
            return myDailyData
        })
        }   
        catch (err) { return err }
    }

    async function setDataStatePROMISE(date:boolean, hydro_data:boolean, hydro_schedule:boolean, hydro_intake:boolean, status:boolean, disabled:boolean):Promise<PromiseTypes> {        
        return getDailyDataPROMISE()
        .then(async(dailyData:any) => { 
            return new Promise(async(resolve:any, reject:any) => {
                console.log('dailyData from the promise', dailyData)      
                dailyData = dailyData.data.data.getDailyData                  
                if (date) dispatch(SET_DATE(dailyData.date))
            if (hydro_data) dispatch(SET_HYDRO_DATA(dailyData))
            if (status) dispatch(SET_STATUS(dailyData.status))
            if (hydro_intake) {
                const waterintake:any = await userSettingsIntakePROMISE()
                console.log('waterintake', waterintake)
                dispatch(SET_HYDRO_INTAKE(waterintake))
            }
            if (hydro_schedule) {
                const userDailyWaterSchedule = await userSettingsSchedulePROMISE()
                let scheduleLength:number = userDailyWaterSchedule.length;                
                dispatch(SET_HYDRO_SCHEDULE(userDailyWaterSchedule))

                if (disabled) {
                    dispatch(SET_DISABLED(Array(scheduleLength).fill(false)))
                }

                console.log('schedule in promise', userDailyWaterSchedule)
            }           
            resolve([{hydro_data: `${HYDRO_DATA}`, hydro_schedule: `${HYDRO_SCHEDULE}`, hydro_intake: `${HYDRO_INTAKE}`, date: `${DATE}`, status: `${STATUS}`, disabled: `${DISABLED}`}])            
            reject("error")
        })
    })
    }

    // DATA PROMISES

    // SET_DATE, SET_HYDRO_DATA, SET_HYDRO_SCHEDULE, SET_STATUS, 



        const value = {
            tokenID,
            iPROMISEcookies,
            getUserSettingsPROMISE,
            userSettingsSchedulePROMISE,
            userSettingsIntakePROMISE,
            getDailyDataPROMISE,
            setDataStatePROMISE
        }        

        // let cookieID = cookieIdString.replace(RreturnNumbers, '') // replace doesn't exist on string or object

    return (
        <PromiseContext.Provider value={value}>
            {children}
        </PromiseContext.Provider>
    )

}


