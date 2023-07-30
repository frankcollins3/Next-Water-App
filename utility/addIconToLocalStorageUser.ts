import React from 'react'
import deathCertificate from './deathCertificate'

export default async function addIconToLocalStorageUser (icon:string) {
    const empty:string[]|undefined[] = [];
        const updatedUserIconPromise = new Promise( (resolve:any, reject:any) => {
                let preUser = localStorage.getItem("user")
                if (preUser != null) {
                    let userObj = JSON.parse(preUser)
                    let data:any = userObj.clone.data.userSignup
                    let icon:string = data.icon
                    resolve(userObj)
                    reject(empty)
                }
        })
        return updatedUserIconPromise
        .then( (user:any) => {
            const updatedUserToLocStorPromise = new Promise( (resolve:any, reject:any) => {
                let clonedUser = {...user}
                let userString:string = JSON.stringify(clonedUser)
                // localStorage.setItem("wateruser", userString)
                deathCertificate("wateruser", userString, 10080, true)
                let storageConfirmationToken = localStorage.getItem("wateruser") ? "yes-user" : "no-user"
                resolve(storageConfirmationToken)
                reject(empty)
            })    
            return updatedUserToLocStorPromise              // when documentation (like Prisma) says the functionality returns a Promise this is what returning a promise is. You get to use the .then block client-side.
        })
}
