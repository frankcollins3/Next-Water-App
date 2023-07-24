import $ from 'jquery'
import bcrypt from "bcryptjs"
import crypto from "crypto"

export const AgeArray = [1,2,3,4,5,6,7,8,9,10]
export const ALPHABET = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
export const intervalTimeouts = [1000,2000]
// export const intervalTimeouts = [1000,2000,3000,4000,5000]

export function nothingFunc () { return }
export const nothing = "nothing"

export const passwordTogglevalue = (state:any, setState:any) => { setState(!state) }

export function currentDayBorderOn (elem:any) {
        CSS($(elem), 'backgroundColor', '#bbeafe')
        CSS($(elem), 'borderTop', 'none')
        CSS($(elem), 'color', 'silver')                    
}

export function currentDayBorderOff (elem:any) {
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

export function signupGoodCheck (allusers, allemails, username, email, password, age, parentconfirm) {
        if (!allusers.includes(username) && username.length > 6 && username.length < 30) {
                console.log("username good");
if (!allemails.includes(email) && email.includes('@') && email.replace(/^.*\.(.*)$/, '$1') === "com" || email.replace(/^.*\.(.*)$/, '$1') === "net" || email.replace(/^.*\.(.*)$/, '$1') === "org") {
                        console.log("email good")
                        if (/[\!@#$%^&*\(\)]/.test(password) && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
                        console.log("password good")
                        // if the user is older than 10 
                        if (age > 10 ) {
                                console.log("age is older than 10")
                                return true
                        } else if (age < 10) {
                                console.log("age younger than 10")
                                return parentconfirm ? true : false
                        }                        
                }    
                } else return false   // else block for email check which toggles: export const signupGood:boolean[] = [usernamegood, passwordgood, emailgood, agegood]; emailGood to be ru        
                // } else return signupGood[1] = false;   // else block for email check which toggles: export const signupGood:boolean[] = [usernamegood, passwordgood, emailgood, agegood]; emailGood to be ru        
                } else return false
}

export function SERIALIZESTRING (obj:any) { return JSON.stringify(obj) }
export function PARSESERIALIZEDSTRING (str:string) { return JSON.parse(str) }

export const JWTsecretKeyMaker = () => { return crypto.randomBytes(64).toString('hex') }

export function attributeJQ(obj:any, attr:string, value:string ) { $(obj).attr(attr, value) }
export function CSS(selector:any, property:string, value:string) { $(selector).css(property, value) }

const backupArrayForIcons:string[] = 
[
"/water_img/squid.png", "/water_img/bottles.png", "/water_img/hand.png", 
"/water_img/faucet.png", "/water_img/pool.png", "/water_img/panda.png", "/water_img/dolphin.png" 
]

export function randomIcon () { return  backupArrayForIcons[Math.floor(Math.random() * backupArrayForIcons.length) ] }

export function getDayOfWeek (newDateGetDayInt:number) {
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const today = new Date()
        const dayOfWeekIndex = today.getDay()
        const dayOfWeek = daysOfWeek[dayOfWeekIndex]
        return dayOfWeek
}



// prisma utilities: (sent without invocation)

// export const prismaUserUtils = prisma.users.findMany
// export const prismaSettingsUtils = prisma.settings.findMany
// export const prismaDataUtils = prisma.data.findMany

