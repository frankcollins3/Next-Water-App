import React, { createContext, useContext, ReactNode, useState } from "react";
import { userSettingsQueryString } from "graphql/queries";
import axios from "axios"


type PromiseTypes = {
    tokenID: number

    iPROMISEcookies: () => any;
    getUserSettingsPROMISE: () => any;
}

const PromiseDefaults = {
    tokenID: 1,

    iPROMISEcookies: () => {},
    getUserSettingsPROMISE: () => {}
}

const PromiseContext = createContext<PromiseTypes>(PromiseDefaults)

export function usePromise() {
    return useContext(PromiseContext)
}

type Props = { children: ReactNode }

export function PromiseProvider({children}:Props) {
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

    function getUserSettingsPROMISE () {
        return iPROMISEcookies()
        .then(async(cookieID) => {
            const ID = parseInt(cookieID)
            const userSettingsQueryStr = await userSettingsQueryString(ID)
            let mySettings = await axios.post('/api/graphql', { query: `${userSettingsQueryStr}` } )
            return mySettings
        })        
        // return (async() => {            

        //     const userSettingsQueryStr = await userSettingsQueryString()
        //     let mySettings = await axios.post('/api/graphql', { query: `${userSettingsQueryStr}` } )
        //     return mySettings
        // })()
    }

        const value = {
            tokenID,
            iPROMISEcookies,
            getUserSettingsPROMISE
        }        

        // let cookieID = cookieIdString.replace(RreturnNumbers, '') // replace doesn't exist on string or object

    return (
        <PromiseContext.Provider value={value}>
            {children}
        </PromiseContext.Provider>
    )

}


