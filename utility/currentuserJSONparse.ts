export default async function currentuserJSONparse () {
    const currentuserPROMISE = new Promise(async(resolve:any, reject:any) => {
        let pre_user = localStorage.getItem("currentuser")
        if (pre_user != null) {
            let user = await JSON.parse(pre_user)
            resolve(user ? user : "it looked hopeful")        
        } else { reject(null) }        
    })
    return currentuserPROMISE.then( (user) => {return user} )
}