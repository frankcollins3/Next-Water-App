import React, { createContext, useContext, ReactNode, useState } from "react";
import axios from "axios"

// components and styles.
import Settings from "components/elements/Settings";
import Schedule from "components/elements/Schedule/Schedule";

// @redux/toolkit global state management
import {RootState} from "redux/store/rootReducer"
import {useSelector, useDispatch} from "react-redux"
import { SET_HYDRO_SCHEDULE, SET_HYDRO_DATA, SET_DATE, SET_HYDRO_INTAKE, SET_STATUS, SET_DISABLED, SET_PROGRESS  } from "redux/main/mainSlice"
import { SET_CURRENT_USER  } from "redux/logInOutGoogle/logInOutGoogleSlice"

// utils
import { SettingsInterface, HydroDataInterface, UsersLoginInterface } from "utility/interfaceNtypes";
import { allDBusersquery, userSettingsQueryString, getUserDailyDataQueryString } from "graphql/queries";
import waterIntakeWeightFormula from "utility/waterIntakeWeightFormula";

type PromiseTypes = {
    tokenID: number

    iPROMISEcookies: () => any;
    getAndSetCurrentUserPROMISE: () => any;

    getUserSettingsPROMISE: () => any;
    userSettingsSchedulePROMISE: () => any;
    userSettingsIntakePROMISE: () => any;
    getDailyDataPROMISE: () => any;
    setDataStatePROMISE: () => any;
}   

const PromiseDefaults = {
    tokenID: 1,
    iPROMISEcookies: () => {},
    getAndSetCurrentUserPROMISE: () => {},
    getUserSettingsPROMISE: () => {},
    userSettingsSchedulePROMISE: () => {},
    userSettingsIntakePROMISE: () => {},
    getDailyDataPROMISE: () => {},
    setDataStatePROMISE: () => {},
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
    const PROGRESS = useSelector( (state:RootState) => state.main.PROGRESS)

    const dispatch = useDispatch()

    const [tokenID, setTokenID] = useState<number>(0)

    // main app and user PROMISES
    function iPROMISEcookies() {
        const getCookiePROMISE = new Promise((cookies:any, milk:any) => {
            if (document.cookie) {
                const webcookies = document.cookie.split('; ');
                cookies(webcookies)
                milk('spill')
            }
        })
        return getCookiePROMISE
        .then( (c:any) => {
            let cookieIdString = c[1]
            const sliceID = cookieIdString.slice(3)
            return sliceID || "no ID to return! sorry!"
            // setTokenID(sliceID)
        })
    }

    function getAndSetCurrentUserPROMISE() {
        return new Promise( (resolve:any, reject:any) => {
            return iPROMISEcookies()
            .then(async(cookie:any) => {
                const INTcookieID:number|undefined = parseInt(cookie)
                // console.log('INT ID', INTcookieID)

                return axios.post('/api/graphql', {
                    query: `${allDBusersquery}`
                })
                .then( (data:any) => {
                    data = data.data.data.allDBusers
                    console.log('data before .find', data)
                    let me:any = data.find(user => user.id === INTcookieID)
                    dispatch(SET_CURRENT_USER(me))
                    resolve(me)
                    reject('nobody')                    

                })
                .catch( (err) => {
                    // console.log('err')
                    // console.log(err)
                })                                
            })
        })
    }
    // * * * * * end of  main app and user PROMISES


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
            // console.log(mySettings)         
    if (!mySettings) {
        return "no settings"
    } else if (mySettings) {              
        // console.log('mySettings', mySettings)
        const SchedulePromise = new Promise(async(resolve:any, reject:any) => {
            const setSchedule = () => { for (let i = mySettings.start_time; i <= mySettings.end_time; i += mySettings.reminder) { schedule.push(i)} }
            await setSchedule()
        resolve(schedule.length ? schedule : "schedule fail")
      })
      return SchedulePromise
      .then( (schedule:any) => {
        dispatch(SET_HYDRO_SCHEDULE(schedule))
        dispatch(SET_DISABLED(Array(schedule.length).fill(false)))
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
                // console.log('date', dailyData)
                // await dispatch(SET_DATE(dailyData.date))
                // await dispatch(SET_HYDRO_DATA(dailyData))
            }
            return myDailyData
        })
        }   
        catch (err) { return err }
    }

    async function setDataStatePROMISE(){        
        iPROMISEcookies()
        .then( (cookie) => {    
          const queryStr:string = getUserDailyDataQueryString(cookie)
          // await axios.post('/api/graphql', { query: `${allDBusersquery}` })
          if (cookie) {
            axios
            .post('/api/graphql', { query: `${queryStr}` })
            .then( (dailyData:any) => {
            new Promise( (resolve:any, reject:any) => {
              dailyData = dailyData.data.data.getDailyData        
              resolve(dailyData)
              reject('err')
            }).then( (dailyData:any) => {
              if (dailyData) {
                dispatch(SET_HYDRO_DATA(dailyData))
                dispatch(SET_DATE(dailyData.date))
                dispatch(SET_STATUS(dailyData.status))
                dispatch(SET_PROGRESS(parseInt(dailyData.progress)))
              }
            })
          })
        }
        })
    }

        const value = {
            tokenID,
            iPROMISEcookies,
            getAndSetCurrentUserPROMISE,            
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


