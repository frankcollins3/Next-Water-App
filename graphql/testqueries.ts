import axios from 'axios'

// userSettings
axios
.post('/api/graphql', {
  query: `
    query {
      userSettings(
        users_id: Int!
      ) {
        id
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
})
// * * * * *  userSettings

//  allDBusers
  axios.post('/api/graphql', {
      query: `query { allDBusers { id, google_id, username, password, email, age,  } }`
  })
  .then( (data) => {
      console.log('data')
      console.log(data)
  })
  .catch( (err) => {
      console.log('err')
      console.log(err)
  })
// * * * * *   allDBusers


//  allDBsettings
export const allDBsettingsquery = `query { allDBsettings { id, height, weight, age, start_time, end_time, reminder, users_id } }`
const fetchdata = axios.post('/api/graphql', {
    query: `${allDBsettingsquery}`
})
.then( (data) => {
    console.log('data')
    console.log(data)
})
.catch( (err) => {
    console.log('err')
    console.log(err)
})
// * * * * *  end of allDBsettings * * * * * 


// adduserSettings
axios
  .post('/api/graphql', {
    query: `
      mutation {
        addUserSettings(
          id: 3,
          age: 25,
          height: 90,
          weight: 190,
          start_time: 2,
          end_time: 10,
          reminder: 1,
          activity: 1,
          users_id: 3
        ) {
          id
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
  })
  // * * * * *  adduserSettings

// addUser
axios
.post('/api/graphql', {
  query: `
    mutation {
      addUser(
        id: 4,
        google_id: "no google-id", 
        icon: "/water_img/panda.png",
        username: "lavaplace",
        password: "lavaPassword123", 
        email:  "lavaplace@gmail.com",
        age: 30
      ) {
        id, google_id, icon, username, email, password, age
      }
    }
  `
})
// * * * * *  addUser

// allDBdata
export const allDBdataquery = `query { allDBdata { google_id, date, progress, weekday, status, users_id } }`
axios.post('/api/graphql', {
    query: `${allDBdataquery}`
})
.then( (data) => {
    console.log('data')
    console.log(data)
})
.catch( (err) => {
    console.log('err')
    console.log(err)
})
// * * * * *  allDBdata

// allUserData
axios.post('/api/graphql', {
    query: `query {
      allUserData(users_id: 1) {
        id
        google_id
        date
        progress
        weekday
        status
        users_id
      }
    }`,
  })
// * * * * *  allUserData

// getDailyData
// getDailyData(users_id: ${cookie}) {
axios
.post('/api/graphql', {
  query: `
  mutation {
    getDailyData(users_id: 4) {
      google_id
      date
      progress
      weekday
      status
      users_id
    }
  }
  `
})
// * * * * * getDailyData

// updateDailyData
axios
.post('/api/graphql', {
  query: `
  mutation {
    updateDailyData(users_id: 1, date: "2023-7-13", progress: 100, weekday: "Thursday", status: ["check, check, check, check, check"]) {
      google_id
      date
      progress
      weekday
      status
      users_id
    }
  }
  `
})
// * * * * *  updateDailyData

//  userSignup
axios
.post('/api/graphql', {
  query: `
  mutation {
    userSignup(username: "tonyhawk", password: "birdman900", email: "tonyhawk@gmail.com", age: 54, icon: "/water_img/pants.png", google_id: "no google-id") {
      username,
      password,
      email,
      age,
      icon,
      google_id
    }
  }
  `
})
// * * * * *   userSignup

// linkUserWithGoogle
axios
.post('/api/graphql', {
  query: `
  mutation {
    linkUserWithGoogle(username: "tonyhawk", google_id: "no google-id", icon: "/water_img/bikini.png") {
      username,
      password,
      email,
      icon,
      age,
      google_id
    }
  }
  `
})
// * * * * *  linkUserWithGoogle

// idArgsReturnIcon
axios
.post('/api/graphql', {
  query: `
  query {
    idArgsReturnIcon(users_id: 4) {      
      icon,            
    }
  }
  `
})
// * * * * *  idArgsReturnIcon

// userLogin
axios
.post('/api/graphql', {
query: `
query {
  userLogin(email: "tonyhawk@gmail.com", password: "birdman900" ) {      
    username,
    password,
    email,
    age,
    icon          
  }
}
`
})
// * * * * * userLogin

// readRedisTest
axios.post('/api/graphql', {
  query: `query { readRedisTest(key: "name") }`
})
.then( (data) => {
  console.log('data')
  console.log(data)
})
// * * * * *  readRedisTest



//  redis queries




// userLogin fetch with token
fetch('/api/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  // headers: headers || { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: `
      query {
        userLogin(email: "tonyhawk@gmail.com", password: "birdman900" ) {      
          username,
          password,
          email,
          age,
          icon,
          token          
        }
      }
    `,
  }),
})
  .then((response) => response.json())
  .then((data) => {
    console.log('data', data);
    console.log('login-user', data.data.userLogin);
    let loggedInUser = data.data.userLogin;
    console.log('token', loggedInUser.token);      
    // Set the cookie on the client-side
    document.cookie = `token=${loggedInUser.token}; max-age=${7 * 24 * 60 * 60}; path=/;`;
    // document.cookie = `token=${loggedInUser.token}; httpOnly; max-age=${7 * 24 * 60 * 60}; path=/;`;      
    // Other actions with the logged in user data
  })
  .catch((err) => {
    console.log('err', err);
  })
// * * * * *  userLogin fetch with token


// puppeteer string query with searchTerm: argument
let value = 'searched by user'
let puppeteerdata = axios.post('/api/graphql', {query:`query { puppeteerWebIcon(searchTerm: "${value}") }`} )