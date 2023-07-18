export const allDBsettingsquery = `query { allDBsettings { id, height, weight, age, start_time, end_time, reminder, users_id } }`
export const allDBdataquery = `query { allDBdata { id, google_id, date, progress, weekday, status, users_id } }`
export const allDBusersquery = `query { allDBusers { id, google_id, username, password, email, age, icon } }`

export const userLoginQueryStringFunc = (email:string, password:string) => {
    // args have to be within double quotes for strings!
const query = `
       query {
         userLogin(email: "${email}", password: "${password}" ) {       
           username,
           password,
           email,
           age,
           icon,
           token          
         }
       }
     `
    return query;
}

// data: id | google_id | date | progress | weekday | status | users_id 
