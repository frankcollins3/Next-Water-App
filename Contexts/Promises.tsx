import React, { createContext, useContext, ReactNode, useState } from "react";


type PromiseTypes = {
    tokenID: number

    iPROMISEcookies: () => any;
}

const PromiseDefaults = {
    tokenID: 1,

    iPROMISEcookies: () => {}
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

        const value = {
            tokenID,
            iPROMISEcookies
        }        

        // let cookieID = cookieIdString.replace(RreturnNumbers, '') // replace doesn't exist on string or object

    return (
        <PromiseContext.Provider value={value}>
            {children}
        </PromiseContext.Provider>
    )

}


