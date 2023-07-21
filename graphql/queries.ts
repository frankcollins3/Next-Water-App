export const allDBsettingsquery = `query { allDBsettings { id, height, weight, age, start_time, end_time, reminder, users_id } }`
export const allDBdataquery = `query { allDBdata { id, google_id, date, progress, weekday, status, users_id } }`
export const allDBusersquery = `query { allDBusers { id, google_id, username, password, email, age, icon } }`

export const userLoginQueryStringFunc = (email:string, password:string) => {
    // args have to be within double quotes for strings!
const query = `
       query {
         userLogin(email: "${email}", password: "${password}" ) {       
           id,
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

export const userSignupQueryStringFunc = (username, password, email, age, icon, google_id) => {
  // userSignup(username: "tonyhawk", password: "birdman900", email: "tonyhawk@gmail.com", age: 54, icon: "/water_img/pants.png", google_id: "no google-id") {
 const query = `
  mutation {
    userSignup(username: "${username}", password: "${password}", email: "${email}", age: ${age}, icon: "${icon}", google_id: "${google_id}") {
      username,
      password,
      email,
      age,
      icon,
      google_id
    }
  }
  `
  return query;
}

