import React, { createContext, useContext, ReactNode, useState } from "react";
import axios from "axios"

// components and styles.
import Settings from "components/elements/Settings";
import Schedule from "components/elements/Schedule/Schedule";

// @redux/toolkit global state management
import { RootState } from "redux/store/rootReducer"
import { useSelector, useDispatch } from "react-redux"
import { SET_HYDRO_SCHEDULE, SET_HYDRO_DATA, SET_DATE, SET_HYDRO_INTAKE, SET_STATUS, SET_DISABLED, SET_PROGRESS, SET_CURRENT_PAGE, } from "redux/main/mainSlice"
import { SET_ALL_USERNAMES, SET_ALL_EMAILS, SET_CURRENT_USER, SET_NON_GOOGLE_IMG_URL, TOGGLE_SUBMIT_INPUT_DATA, TOGGLE_IS_LOGGED_IN, INCREMENT_INCORRECT_LOGIN_ATTEMPT, RESET_INCORRECT_LOGIN_ATTEMPT } from "redux/logInOutGoogle/logInOutGoogleSlice"

// utils
import { signupGoodCheck } from "utility/UtilityValues"
import { SettingsInterface, HydroDataInterface, User } from "interfaces/interface";
import { allDBusersquery, userSettingsQueryString, getUserDailyDataQueryString, userLoginQueryStringFunc } from "graphql/queries";
import waterIntakeWeightFormula from "utility/waterIntakeWeightFormula";
import { clearCookie } from "utility/cookies";

type PromiseTypes = {
    tokenID: number;
    // always ask... what data type is being returned? I thought you could return these as void but then there's no .then() block    
    iPROMISEcookies: () => any;
    getAndSetCurrentUserPROMISE: () => any;
    getUserSettingsPROMISE: () => any;
    setUserSettingsPROMISE: () => any;
    userSettingsSchedulePROMISE: () => any;
    userSettingsIntakePROMISE: () => any;
    getDailyDataPROMISE: () => any;
    setDataStatePROMISE: () => any;
    poorMansLogoutPROMISE: (imgSrc: string) => any;

    signupFunctions: {
        submitFaucetClickSignup: () => any;
        setUsernamesAndEmails: () => any;
    },
    loginFunctions: {
        submitFaucetClickLogin: () => any;
    }
    waterFunctions: {
        updateDailyDataPROMISE: (users_id:number, date:string, progress:number, status:string[]) => any;    //  weekday (maybe)
    }

    
    // submitFaucetClickSignup: () => Promise<Boolean>;
}

const PromiseDefaults = {
    tokenID: 1,
    iPROMISEcookies: () => { },
    getAndSetCurrentUserPROMISE: () => { },
    setUserSettingsPROMISE: () => { },
    getUserSettingsPROMISE: () => { },
    userSettingsSchedulePROMISE: () => { },
    userSettingsIntakePROMISE: () => { },
    getDailyDataPROMISE: () => { },
    setDataStatePROMISE: () => { },
    poorMansLogoutPROMISE: (imgSrc: string) => { },

    signupFunctions: {
        submitFaucetClickSignup: () => { },
        setUsernamesAndEmails: () => { }      
    },
    loginFunctions: {
        submitFaucetClickLogin: () => { },
    },

    waterFunctions: {
        updateDailyDataPROMISE: (users_id:number, date:string, progress:number, status:string[]) => { }
    }
}

const PromiseContext = createContext<PromiseTypes>(PromiseDefaults)

export function usePromise() {
    return useContext(PromiseContext)
}

type Props = { children: ReactNode }

export function PromiseProvider({ children }: Props) {

    // login data
    // const checkSignup = signupGoodCheck(ALL_USERNAMES, ALL_EMAILS, USERNAME_INPUT, EMAIL_INPUT, PASSWORD_INPUT, AGE_INPUT, PARENT_CONFIRM)
    const NON_GOOGLE_IMG_URL = useSelector((state: RootState) => state.logInOutGoogle.NON_GOOGLE_IMG_URL)
    const ALL_USERNAMES = useSelector((state: RootState) => state.logInOutGoogle.ALL_USERNAMES)
    const ALL_EMAILS = useSelector((state: RootState) => state.logInOutGoogle.ALL_EMAILS)

    const EMAIL_OR_USERNAME_LOGIN_INPUT = useSelector((state: RootState) => state.logInOutGoogle.EMAIL_OR_USERNAME_LOGIN_INPUT)
    const PASSWORD_LOGIN_INPUT = useSelector((state: RootState) => state.logInOutGoogle.PASSWORD_LOGIN_INPUT)
    const USERNAME_INPUT = useSelector((state: RootState) => state.logInOutGoogle.USERNAME_INPUT)
    const PASSWORD_INPUT = useSelector((state: RootState) => state.logInOutGoogle.PASSWORD_INPUT)
    const EMAIL_INPUT = useSelector((state: RootState) => state.logInOutGoogle.EMAIL_INPUT)
    const AGE_INPUT = useSelector((state: RootState) => state.logInOutGoogle.AGE_INPUT)
    const PARENT_CONFIRM = useSelector((state: RootState) => state.logInOutGoogle.PARENT_CONFIRM)
    const SUBMIT_INPUT_DATA = useSelector((state: RootState) => state.logInOutGoogle.SUBMIT_INPUT_DATA)
    const IS_LOGGED_IN = useSelector((state: RootState) => state.logInOutGoogle.IS_LOGGED_IN)

    // water cycle data
    const HYDRO_DATA = useSelector((state: RootState) => state.main.HYDRO_DATA)
    const HYDRO_SCHEDULE = useSelector((state: RootState) => state.main.HYDRO_SCHEDULE)
    const HYDRO_INTAKE = useSelector((state: RootState) => state.main.HYDRO_INTAKE)
    const DATE = useSelector((state: RootState) => state.main.DATE)
    const STATUS = useSelector((state: RootState) => state.main.STATUS)
    const DISABLED = useSelector((state: RootState) => state.main.DISABLED)
    const PROGRESS = useSelector((state: RootState) => state.main.PROGRESS)

    const dispatch = useDispatch()

    const [tokenID, setTokenID] = useState<number>(0)

    // main app and user PROMISES
    function iPROMISEcookies() {
        const getCookiePROMISE = new Promise((cookies: any, milk: any) => {
            if (document.cookie) {
                const webcookies = document.cookie.split('; ');
                // console.log('webcookies', webcookies)

                cookies(webcookies)
                milk('spill')
            }
        })
        return getCookiePROMISE
            .then((c: any) => {
                console.log('cookie', c)
                let cookieIdString = c[1]
                console.log('cookiedIdString', cookieIdString)
                if (!cookieIdString) {
                        return;
                    }
                    const sliceID = cookieIdString.slice(3)
                console.log('sliceId', sliceID)

                // console.log('sliceID', sliceID)
                return sliceID || "no ID to return! sorry!"
                // setTokenID(sliceID)
            })
    }

    function getAndSetCurrentUserPROMISE() {        
        return new Promise((resolve: any, reject: any) => {
            return iPROMISEcookies()
                .then(async (cookie: any) => {
                    const INTcookieID: number | undefined = parseInt(cookie)
                    // console.log('INT ID', INTcookieID)

                    return axios.post('/api/graphql', {
                        query: `${allDBusersquery}`
                    })
                    .then((data: any) => {
                            data = data?.data?.data?.allDBusers
                            let me:any = data?.find(user => user?.id === INTcookieID)
                            if (!me) {
                                return;
                            }
                            // console.log('me', me)
                            dispatch(SET_CURRENT_USER(me))                            
                            dispatch(SET_NON_GOOGLE_IMG_URL(me?.icon))
                            
                            // reject(null)
                        })
                        .catch((err) => {
                            reject(null);                            
                        })
                })
        })
    }
    // * * * * * end of  main app and user PROMISES



    // SETTINGS PROMISES! 
    function getUserSettingsPROMISE() {
        return iPROMISEcookies()
            .then(async (cookieID) => {
                const ID = parseInt(cookieID)
                const userSettingsQueryStr = await userSettingsQueryString(ID)
                let mySettings = await axios.post('/api/graphql', { query: `${userSettingsQueryStr}` })
                // console.log('mySettings', mySettings)
                if (mySettings) {
                    return mySettings
                } else {
                    return null;
                }
            })
    }



    function setUserSettingsPROMISE() {
        return iPROMISEcookies()
            .then(async (cookieID) => {
                const ID = parseInt(cookieID)                
                console.log('ID', ID)
                // null safety. 
                if (Number.isNaN(ID)) {                    
                    return;
                }

                const queryStr: string = userSettingsQueryString(ID)
                return axios.post('/api/graphql', { query: `${queryStr}` })
                    .then(async (mySettings: any) => {
                        mySettings = mySettings?.data?.data?.userSettings
                        console.log('mySettings', mySettings)
                        if (!mySettings) {
                            // return
                        }
            
                        let schedule: any[] = []
                        // console.log('mySettings', mySettings)
                        let intake = await waterIntakeWeightFormula(mySettings?.weight)
                        // console.log('intake', intake)
                        
                        dispatch(SET_HYDRO_INTAKE(intake))
                        const SchedulePromise = new Promise(async (resolve: any, reject: any) => {
                            const setSchedule = () => { for (let i = mySettings?.start_time; i <= mySettings?.end_time; i += mySettings?.reminder) { schedule.push(i) } }
                            await setSchedule()
                            resolve(schedule.length ? schedule : null)                            
                        })
                        return SchedulePromise
                            .then((schedule: any) => {
                                // if (!schedule) {
                                //     return;        
                                // }
                                const scheduleLength:number = HYDRO_SCHEDULE?.length
                                const scheduleArray:string[] = new Array(scheduleLength).fill('no')
                                // const disabledArray:boolean[] = new Array(scheduleLength).fill(false)                            

                                console.log('schedule', schedule)
                                // dispatch(SET_HYDRO_SCHEDULE(schedule))
                                dispatch(SET_STATUS(scheduleArray))                                
                                // dispatch(SET_DISABLED(HYDRO_SCHEDULE?.length))             
// might leave this unchecked so it checks them disabled client side index.tsx when [HYDRO_SCHEDULE] triggers. 
                                dispatch(SET_DISABLED(Array(schedule?.length).fill(false)))
                                // signup process
                                if (SUBMIT_INPUT_DATA === true) {
                                    // if submit input is true we're in the signup process and the page should reset. 
                                    console.log("yes it is")
                                    window.location.href = "/"
                                } else {
                                    return schedule
                                }
                            })
                    })
            })
    }


    async function userSettingsSchedulePROMISE() {
        let schedule: any[] = []
        try {
            const mySettings: any = await getUserSettingsPROMISE()

            // console.log(mySettings)         
            if (!mySettings) {
                // improvement (probably) -      return null;
                return null
            } else if (mySettings) {
                // console.log('mySettings', mySettings)
                const SchedulePromise = new Promise(async (resolve: any, reject: any) => {
                    const setSchedule = () => { for (let i = mySettings?.start_time; i <= mySettings?.end_time; i += mySettings?.reminder) { schedule?.push(i) } }
                    await setSchedule()
                    resolve(schedule?.length ? schedule : "schedule fail")
                })
                return SchedulePromise
                    .then((schedule: any) => {
                        dispatch(SET_HYDRO_SCHEDULE(schedule))
                        dispatch(SET_DISABLED(Array(schedule?.length).fill(false)))
                        return schedule
                    })
            }
        }
        catch (err: any) { return err }
        // catch(err) { throw new Error(err) }    
    }

    async function userSettingsIntakePROMISE() {
        return new Promise((resolve: any, reject: any) => {
            getUserSettingsPROMISE()
                .then(async (mySettings: any) => {
                    mySettings = mySettings.data.data.userSettings
                    let weight: number = mySettings.weight
                    const intake: number = await waterIntakeWeightFormula(weight)
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
                .then(async (cookieID) => {
                    const ID = parseInt(cookieID)
                    const userDailyDataQueryStr = await getUserDailyDataQueryString(ID)
                    let myDailyData = await axios.post('/api/graphql', { query: `${userDailyDataQueryStr}` })                                                                 

                    console.log(myDailyData)
                    if (myDailyData.data.data.getDailyData) {
                        let dailyData = myDailyData.data.data.getDailyData                                                                                                                                                                                
                    }
                    return myDailyData
                })
        }
        catch (err) { return err }
    }

    async function setDataStatePROMISE() {
        return iPROMISEcookies()
            .then((cookie) => {
                const queryStr: string = getUserDailyDataQueryString(cookie)
                // await axios.post('/api/graphql', { query: `${allDBusersquery}` })
                if (cookie) {
                    return axios.post('/api/graphql', { query: `${queryStr}` })
                        .then((dailyData: any) => {
                            // if (!dailyData) {
                            //     return;
                            // }
                            // no  promise we already have the data at this point and prisma returns;                                                                                                                                                               
                            return new Promise((resolve: any, reject: any) => {
                                dailyData = dailyData?.data?.data?.getDailyData
                                resolve(dailyData)
                                reject('err')
                            }).then((dailyData: any) => {
                                if (dailyData) {                                    
                                    // console.log('dailyData', dailyData)                                    
                                    dispatch(SET_HYDRO_DATA(dailyData))
                                    dispatch(SET_DATE(dailyData?.date))
                                    dispatch(SET_STATUS(dailyData?.status))
                                    dispatch(SET_PROGRESS(parseInt(dailyData?.progress)))
                                    return dailyData
                                }
                            })
                        })
                }
            })
    }



    const poorMansLogoutPROMISE = (imgSrc: string) => {
        if (imgSrc.includes(NON_GOOGLE_IMG_URL)) {
            // console.log('i like cookies')
            clearCookie('id')
            clearCookie('token')
            // const getCookiePROMISE = new Promise((cookies: any, milk: any) => {
            //     if (document.cookie) {
            //         const webcookies = document.cookie.split('; ');
            //         // console.log('webcookies', webcookies)
            //         dispatch(SET_NON_GOOGLE_IMG_URL(''))
            //         cookies(webcookies)
            //         milk('spill')
            //     }
            // })
            // return getCookiePROMISE.then((cookies:any) => {
            //     console.log('cookies in the then block', cookies)
            //     for (let i = 0; i < cookies.length; i++) {
            //         const cookie = cookies[i];
            //         const [cookieName, cookieValue] = cookie.split('=');
    
            //         if (cookieName.trim() === 'id' && cookieValue.trim() === '5') {
            //             // Clear the cookie
            //             clearCookie(cookieName);
            //             // Optionally dispatch actions or perform other cleanup
            //             dispatch(SET_CURRENT_USER({ id: 0, googleId: '', username: '', email: '', age: 0, token: '' }));
                        
            //             // Return the name of the cleared cookie if needed
            //             return cookieName;
            //         }
            //     }
            // }).catch(error => {
            //     console.error('Error retrieving cookies:', error);
            // });
        }
    }

    const submitFaucetClickSignup = () => {
        // console.log("submitFaucetClickSignup function");
        const checkSignup = signupGoodCheck(ALL_USERNAMES, ALL_EMAILS, USERNAME_INPUT, EMAIL_INPUT, PASSWORD_INPUT, AGE_INPUT, PARENT_CONFIRM)
        if (!checkSignup) {
            return false;
        }
        dispatch(SET_CURRENT_USER({ username: USERNAME_INPUT, email: EMAIL_INPUT, password: PASSWORD_INPUT, age: AGE_INPUT }))
        if (SUBMIT_INPUT_DATA === false) {
            console.log("well input data === false")
            dispatch(TOGGLE_SUBMIT_INPUT_DATA())
        }
        return true;
        // dispatch(SET_CURRENT_PAGE("/MeIcon"))
    }

    const setUsernamesAndEmails = async () => {
        const query = allDBusersquery;
        try {
            const predata = await axios.post("/api/graphql", { query: query })
            const data = predata.data.data.allDBusers
            console.log('predata', predata)          
            if (data?.length === 0) {
                return;
            }

            const allUsernames = data.map(users => users.username)  
            const allEmails = data.map(users => users.email)  
                        
            if (allUsernames?.length >= 1) {
                dispatch(SET_ALL_USERNAMES(allUsernames))
            }
            if (allEmails?.length >= 1) {
                dispatch(SET_ALL_EMAILS(allEmails))
            }
            
        }
        catch(error) {
            console.log('error', error)
        }
    }

    const submitFaucetClickLogin = () => {
        console.log("atleast were clicking this");
        const query = userLoginQueryStringFunc(EMAIL_OR_USERNAME_LOGIN_INPUT, PASSWORD_LOGIN_INPUT)
                 
        axios.post('/api/graphql', {
            query: `${query}`
        })
        .then( (user) => {
            const userLogin = user?.data?.data?.userLogin
            console.log('userLogin', userLogin)
            if (userLogin?.errors || userLogin === null) {
                console.log('hey guy we got errors');
                dispatch(INCREMENT_INCORRECT_LOGIN_ATTEMPT())
                return;
            }            
                document.cookie = `token=${userLogin.token}; max-age=${7 * 24 * 60 * 60}; path=/;`;                            
                document.cookie = `id=${userLogin.id}; max-age=${7 * 24 * 60 * 60}; path=/;`;                                    
                window.location.href = "/"

        })
        .catch( (err) => {
            // console.log('err')
            // console.log(err)
        })
                                                      
    }

    const updateDailyDataPROMISE = (users_id:number, date:string, progress:number, status:string[]) => {
        console.log('users_id', users_id)
        console.log('status', status)
        
        const query = `mutation { updateDailyData(users_id: ${users_id}, date: "${date}", progress: ${progress}, status: "${status}") { 
            id, date, progress, weekday, status
        }}
        `        
        axios.post('/api/graphql', {
            query: `${query}`
        }).then((data) => {
                console.log('data', data)
        }).catch((error) => {
                console.log('error', error)
        })     
    }   

    

    const signupFunctions = {
        submitFaucetClickSignup: submitFaucetClickSignup,
        setUsernamesAndEmails: setUsernamesAndEmails
    }

    const loginFunctions = {
        submitFaucetClickLogin: submitFaucetClickLogin,                                                                                                  
    }

    const waterFunctions = {
        updateDailyDataPROMISE: updateDailyDataPROMISE
    }
    // waterFunctions: {
    //     updateDailyDataPROMISE: () => { }
    // }

    const value = {
        tokenID,
        iPROMISEcookies,
        getAndSetCurrentUserPROMISE,
        setUserSettingsPROMISE,
        getUserSettingsPROMISE,
        userSettingsSchedulePROMISE,
        userSettingsIntakePROMISE,
        getDailyDataPROMISE,
        setDataStatePROMISE,
        poorMansLogoutPROMISE,
        // submitFaucetClickSignup,

        signupFunctions,
        loginFunctions,

        waterFunctions,
    }

    // let cookieID = cookieIdString.replace(RreturnNumbers, '') // replace doesn't exist on string or object

    return (
        <PromiseContext.Provider value={value}>
            {children}
        </PromiseContext.Provider>
    )

}
