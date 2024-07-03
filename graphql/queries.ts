export const allDBsettingsquery = `query { allDBsettings { id, height, weight, age, start_time, end_time, reminder, users_id } }`
export const allDBdataquery = `query { allDBdata { google_id, date, progress, weekday, status, users_id } }`
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
      id,
      username,
      password,
      email,
      age,
      icon,
      google_id,
      token
    }
  }
  `
  return query;
}

export const addUserSettingsQueryStringFunc = (age:number, height:number, weight:number, start_time:number, end_time:number, reminder:number, activity:number, users_id:number) => {
  const query = `
  mutation {
    addUserSettings(age: ${age}, height: ${height}, weight: ${weight}, start_time: ${start_time}, end_time: ${end_time}, reminder: ${reminder}, activity: ${activity}, users_id: ${users_id}) {
      age,
      height,
      weight,
      start_time,
      end_time,
      reminder,
      activity,
      users_id
    }
  }
  `
  return query;
}

export const deleteUserSettingsQueryString = (users_id:number) => {
  const query = `
  mutation { deleteUserSettings(users_id: ${users_id}) {
      id,
      age,
      height,
      weight,
      start_time,
      end_time,
      reminder,
      activity,
      users_id
    }
  }
  `
  return query
}

export const userSettingsQueryString = (users_id:number) => {
  const query = `
  query {
    userSettings(users_id: ${users_id}) {
      age
      height
      weight
      start_time
      end_time
      reminder
      activity
      users_id
    }
  }
  `
  return query
}

export const getUserDailyDataQueryString = (users_id:number) => {
  const query = `
    mutation { getDailyData(users_id: ${users_id}) {
      id, 
      google_id,
      date,
      progress,
      weekday,
      status,
      users_id
    }
  }
  `
  return query
}



export const updateDailyDataQueryString = (users_id:number, date:string, progress:number, status:string[]) => {
// export const updateDailyDataQueryString = (users_id:number, date:string, progress:number, weekday:string, status:string[]) => {
  // updateDailyData(users_id: ${users_id}, date: "${date}", progress: ${progress}, weekday: "${weekday}", status: "${status}") {

    const stringifyStatus:string = JSON.stringify(status);

    // status: "${status}"  // without status need the string. 

  const query = `
  mutation {
    updateDailyData(
      users_id: ${users_id}, 
      date: "${date}", 
      progress: ${progress}, 
      status: ${stringifyStatus}
    ) {
      id,
      google_id,
      date,
      weekday,
      progress,
      status,
      users_id
    }
  `
  return query;
}

export const allUserDataQueryString = (users_id:number) => {
    const query = `    
    allUserData(users_id: ${users_id}) {
      google_id
      date
      progress
      weekday
      status  
      users_id
    }  
    `
    return query
}

// axios.post('/api/graphql', {
//   query: `query {
//     allUserData(users_id: 1) {
//       id
//       google_id
//       date
//       progress
//       weekday
//       status
//       users_id
//     }
//   }`,
// })
