import $ from 'jquery'
import CSS from './CSS'
import bcrypt from "bcryptjs"

export const AgeArray = [1,2,3,4,5,6,7,8,9,10]
export const ALPHABET = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
export const intervalTimeouts = [1000,2000]
// export const intervalTimeouts = [1000,2000,3000,4000,5000]

export const nothingFunc = () => { return }

export const passwordTogglevalue = (state:any, setState:any) => { setState(!state) }

export const currentDayBorderOn = (elem:any) => {
        CSS($(elem), 'backgroundColor', '#bbeafe')
        CSS($(elem), 'borderTop', 'none')
        CSS($(elem), 'color', 'silver')                    
}

export const currentDayBorderOff = (elem:any) => {
        CSS($(elem), 'backgroundColor', '#dedede70')
        CSS($(elem), 'borderTop', '40px dotted #73defe')
        CSS($(elem), 'color', 'silver')              
}

// classes
export const flexPropertyColumnCombo = ["flex", "column"].join(" ")
export const flexPropertyRowCombo = ["flex", "row"].join(" ")

export const hashPasser = (password:string) => {
        const saltRounds = 13
        const tableSalt = bcrypt.genSaltSync(saltRounds)
        const passHasher = bcrypt.hashSync(password, tableSalt)
        return passHasher
}

const usernameGood:boolean = true;
const emailGood:boolean = true;
const passwordGood:boolean = true;
const ageGood:boolean = true;
export const signupGood:boolean[] = [usernameGood, emailGood, passwordGood, ageGood];
export const signupGoodCheck = (allusers, username, password, email, age) => {
        if (!allusers.includes(username) && username.length > 6 && username.length < 30) {
                if (email.includes('@') && email.replace(/^.*\.(.*)$/, '$1') === "com" || email.replace(/^.*\.(.*)$/, '$1') === "net" || email.replace(/^.*\.(.*)$/, '$1') === "org") {
                if (/[\!@#$%^&*\(\)]/.test(password) && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
                    return true
                }    
                } else return false   // else block for email check which toggles: export const signupGood:boolean[] = [usernamegood, passwordgood, emailgood, agegood]; emailGood to be ru        
                // } else return signupGood[1] = false;   // else block for email check which toggles: export const signupGood:boolean[] = [usernamegood, passwordgood, emailgood, agegood]; emailGood to be ru        
                }
}
