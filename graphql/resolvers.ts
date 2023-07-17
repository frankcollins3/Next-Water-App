import axios from 'axios'
import bcrypt from "bcryptjs"
import { hashPasser, SERIALIZESTRING, PARSESERIALIZEDSTRING } from 'utility/UtilityValues';

import Redis from 'ioredis'
const redis = new Redis({
  port: 6379,
  host: '127.0.0.1'
  // password: NEXT_PUBLIC_APP_REDIS_PASSWORD
})

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

const alldataDB = prisma.data.findMany
const allusersDB = prisma.users.findMany
const allsettingsDB = prisma.settings.findMany

const userRedisCheck = async () => {  // thinking about making this a func with param
    return redis.get("users", (error, users) => {
      if (error) {
        return error
      } else {      
        return users
      }
  });
}

const settingsRedisCheck = async () => {  // thinking about making this a func with param
    return redis.get("settings", (error, users) => {
      if (error) {
        return error
      } else {      
        return users
      }
  });
}

const dataRedisCheck = async () => {  // thinking about making this a func with param
    return redis.get("data", (error, users) => {
      if (error) {
        return error
      } else {      
        return users
      }
  });
}

const userSettingsRedisCheck = async (id) => {  // thinking about making this a func with param
          // string interpolation so that the cache data saved to redis corresponds to userId as well, concatenated with "userSettings" string that corresponds to this resolver function
      return redis.get(`userSettings:${id}`, (error, users) => {
        if (error) {
          return error
        } else {      
          return users
        }
  });
}

const userDataRedisCheck = async (id) => {
      return redis.get(`userData:${id}`, (error, users) => {
        if (error) {
          return error
        } else {
          return 
        }
      })
}

export const resolvers = {
    Query: {
      allDBusers: async () => {
        return new Promise(async (resolve, reject) => {      
          // invoke the redis-cache checking function userRedisCheck() if there's cache data, return and end the function to return cache instead of query DB
          const users:any = await userRedisCheck()
          if (users) {
            const allUsersObject = PARSESERIALIZEDSTRING(users)
            console.log("In the Redis block", allUsersObject);
            resolve(allUsersObject);
          } else {
            // if we're else blocked then there's no cache data
            console.log("In the NO REDIS block");
            try {
              // allusersDB() -----> prisma.users.findMany()
              const allusers = await allusersDB();
              if (allusers) {
                // there are no redis-cache user data but we have postgres DB data returned from prisma. JSON.stringify(alluser)
                let userStrForRedis = SERIALIZESTRING(allusers);
      // set the "users" key === JSON.stringify(users) so it can be parsed during the next query with userRedisCheck -> redis.get("users")
                await redis.set("users", userStrForRedis);
                // resolve "return new Promise" with {allusers} 
                resolve(allusers);
                // errors and failures below 
              } else {
                resolve("theres been a mistake!");
              }
            } catch (error) {
              reject(error);
            }
          }
        });
      },
    allDBsettings: async () => { 
      let settings:any = await settingsRedisCheck()
      // return settings
      if (settings) {        
        const allSettingsObject = PARSESERIALIZEDSTRING(settings)
        console.log("settings redis block", allSettingsObject)
        return allSettingsObject
      } else {
        console.log("else block NO redis settings in cache")
  //`no "settings" -> prisma.strains.findMany() -> redis-cache, so as with users: handle graphQL return data -> redis.set("settings") -> so userSettingsCheck() returns if block above next query
        const allsettings = await allsettingsDB()
        if (allsettings) {
          let settingsStrForRedis = SERIALIZESTRING(allsettings)
          await redis.set("settings", settingsStrForRedis)
          return allsettings
        } else {
          return "guys there's been a mistake"
        }
      }
    },    
    allDBdata: async () => { 
      let data:any = await dataRedisCheck()
      if (data) {
        const allDataObject = PARSESERIALIZEDSTRING(data)
        console.log("data redis block", allDataObject)
        return allDataObject
      } else {
        console.log("else block for data NO redis cache")
        const alldata = await alldataDB()
        if (alldata) {
          let dataStrForRedis = SERIALIZESTRING(alldata)
          await redis.set("data", dataStrForRedis)
          return alldata
        }  else {
          return "bad handshake"
        }
      }
      // return await prisma.data.findMany() 
    },
// age, height, etc. userSettings that determine water schedule. reminder is the notification intensity. 8am - 8pm is 8 - 16. notification intensity of 2 means every 2 hours get notified.
    userSettings: async (parent, args) => {
      // id that corresponds to postgres.table.user.id
        let { id } = args        
  // function that returns redis.get() return data (redis.get() is a promise which is why using an additional {new Promise} constructor is redundant and technically not DRY code.)
        // evaluate the above function that returns the cache data or not.
        let userSettingsRedis = await userSettingsRedisCheck(id)
        // if cache data comes back good, the if block handles that:      we dont want to query the database, we want to query the cache and spare the user the latency of waiting for data
        if (userSettingsRedis) {
          // JSON.parse(userSettingsRedis) this is done because redis only accepts a string. Return this cache data below.
          const allUserSettingsObject = PARSESERIALIZEDSTRING(userSettingsRedis)
          console.log("userSettings redis block", userSettingsRedis)
          return userSettingsRedis
        } else {
          // else block means there is no cache data & prisma must retrieve data from postgresDB to return to client.
          console.log("NO redis. userSettings ELSE block!!!")
          // prisma down here to separate it from being run in case there is cache data.      DB.users retrieves the id and the id is met within loop and comparison. return that settings Data
          let allsettings = await prisma.settings.findMany()            
          let settingsLength = allsettings.length + 1
          let allusers = await prisma.users.findMany()
          let me = allusers.filter(us => us.id === id)
          let myage = me[0].age
          let mySettings = allsettings.filter(settings => settings.users_id === id)
          mySettings = mySettings[0]
// before we return the graphQL data, set:    JSON.stringify(mySettings)        into the cache so that the next query can return cache from userSettingsRedisCache() / redis.get(`userSettings${id}`)
          let mySettingsForRedis = SERIALIZESTRING(mySettings)
          await redis.set(`userSettings:${id}`, mySettingsForRedis)
          return mySettings
        }
        // return { id, weight, height, age, reminder, start_time, end_time, reminder, activity, users_id } = settings 
      },
    // postgres data. This is the actual water cycle data that pertains to calendar day. User clicks, if they're within a block of time, success | failure
    
    allUserData: async (parent, args) => {
      const { users_id } = args
      let userDataRedis = await userDataRedisCheck(users_id)
      if (userDataRedis) {
        const allUserDataObject = PARSESERIALIZEDSTRING(userDataRedis)
        console.log("userData redis block", userDataRedis)
        return userDataRedis
      } else {
        console.log("NO redis. allUserData ELSE block!")
        let alldata = await alldataDB()
        const mydata = alldata.filter(waterCycleData => waterCycleData.users_id === users_id)
        const myDataForRedis = SERIALIZESTRING(mydata)
        await redis.set(`userData:${users_id}`, myDataForRedis)
        return mydata
      }
    },

    idArgsReturnIcon: async (parent, args) => {
      const { users_id } = args
      let allusers = await allusersDB() 
      let me = allusers.filter(user => user.id === users_id)   
      // me = me[0]            
      let icon = me.icon ? me.icon : "/water_img/bite.png"
      return icon
    },
    userLogin: async (parent, args) => {
        const { emailOrUsername, password } = args 
        const userLoginRedisCheck = async (emailOrUsername) => {
          return redis.get(`userLogin:${emailOrUsername}`)
        }             
        const allusers = await prisma.users.findMany()
        let emailBool = false
        emailOrUsername.includes('@') ? emailBool = true : false
        let me; 
        if (emailBool) {
          me = allusers.filter(us => us.email === emailOrUsername)
        } else {
          me = allusers.filter(us => us.username === emailOrUsername)
        }
        me = me[0]                  
        let myDBpassword = me.password
        if (!me) { throw new Error("Username or Password Don't match")}
  
        const passTheSalt = bcrypt.compareSync(password, myDBpassword)
  
        if (passTheSalt) {
          return { id: me.id, googleId: me.google_id, icon: me.icon, username: me.username, password: me.password, email: me.email, age: me.age }
        }
         else {
          return { id: 0, google_id: 'yes', icon: 'yea', username: 'name', password: 'password', email: 'email', age: 1 }        
        }        
    },       
    readRedisTest: async (parent, args) => {
      const { key } = args
      const value = await redis.get(key)    
      return value
    }, 

    },
    Mutation: {
    addUserSettings: async (parent, args) => {
        const { id, age, height, weight, start_time, end_time, reminder, activity, users_id } = args;
        // check if there are already settings that correspond to user ID
        let meAsUser = await prisma.users.findUnique({ where: { id: users_id }})
        let allSettings = await prisma.settings.findMany()
        let mySettings = allSettings.filter(settings => settings.users_id === users_id)

        mySettings = mySettings[0]        
        if (mySettings) {
          const deleteUser = await prisma.settings.delete({
            where: {
              id: mySettings.id
            },
          })
        }
        // this works. the above code hasn't been checked yet.
        const newSettings = await prisma.settings.create({
          data: {
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
        });  
        if (!newSettings) return
        return newSettings;
    },
    addUser: async (parent, args) => {
      const allusers = await allusersDB()
      let userlength = allusers.length + 1

      const { id, google_id, icon, username, email, password, age } = args;

      const hashWord = hashPasser(password)

      const newUser = await prisma.users.create({ 
        data: { id: userlength, google_id: google_id, icon: icon, username: username, email: email, password: hashWord, age: age } 
      })
      if (!newUser) "Bad Request! Sorry!"
      return newUser
      // id |  google_id   |          icon          |   username   |         email          |   password    | age
    },
    getDailyData: async (parent, args) => {
          const { users_id } = args
          const allusers = await allusersDB()
          const alldata = await alldataDB()
          const dataLength = alldata.length
          let me = allusers.filter(users => users.id === users_id)
          const date = new Date()
          const dayName = date.toLocaleDateString('en-US', { weekday: 'long' } )
          const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`        
          const dateAndUserCheck = alldata.find(data => data.date === dateString && data.users_id === users_id)
          if (dateAndUserCheck) {
            // Data already exists for the given date and user
            return dateAndUserCheck;
          }
  
          if (!me) return
          return prisma.data.create({
            data: {
              id: dataLength + 1,
              google_id: me.google_id || 'no google-id',
              date: dateString,
              progress: 0,
              weekday: dayName,
              status: [],
              users_id: users_id
            }
          }).then( (newdate) => {
            let d = newdate;
            return { id: d.id, google_id: d.google_id, date: d.date, progress: d.progress, weekday: d.weekday, status: d.status, users_id: d.users_id }
          })
      },
    updateDailyData: async (parent, args) => {      
      const { users_id, progress, status, date } = args;
      const allusers = await allusersDB();
      const alldata = await alldataDB()
      const today = new Date().getDate()
      const mydata = alldata.find(data => data.users_id === users_id && data.date === date)
      return await prisma.data.update({
        where: { id: mydata.id },
        data: { progress: progress >= 93 ? 100 : progress, status: status },
      }).then(updatedData => {
        const d = updatedData;
        return { google_id: d.google_id, date: date, progress: d.progress, weekday: d.weekday, status: d.status, users_id: d.users_id };          
      }).catch( (err) => { return "err" } )
    },

    userSignup: async (parent, args) => {
        // might add the google_id
        const { google_id, icon, username, password, email, age } = args;
        let allusers = await prisma.users.findMany()
        let autoIncrementUserId = allusers.length + 1

        const saltRounds = 13
        const tableSalt = bcrypt.genSaltSync(saltRounds)
        const passHasher = bcrypt.hashSync(password, tableSalt)

        return await prisma.users.create({
          data: {
            id: autoIncrementUserId,
            username: username,
            password: passHasher,
            // google_id: google_id,
            // icon: icon,
            email: email,
            age: age
          }
        }).then( (u) => {
            return { id: u.id, googleId: '', icon: '', username: u.username, password: u.password, email: u.email, age: u.age }
        })
      },
    
      linkUserWithGoogle: async (parent, args) => {
          const { username, google_id, icon  } = args
          let argsArray = [google_id, icon]
    
          // let iconGIDconcat = `${googleId}///${icon}`    // this would've joined GoogleAPI userID with their corresponding icon. Instead I dismantled the tables and rebuilt with their own data columns with Postgres.
          let allusers = await allusersDB()
          let me = allusers.filter(user => user.username === username)
          
          let myid = me[0].id  
            
          let encodePromise = new Promise( (resolve, reject) => {
              let encodedArray = argsArray.map((arg) =>                   // map over the elements which will return an array
              // loop through the array of args, any argument that is a string, encode and remove white space with regex, if the arguments aren't strings, return empty array. 
              typeof arg === 'string' ? encodeURIComponent(arg).replace(/\s/g, '') : []
            );
              resolve(encodedArray);
              reject('-____-')
          })
          return encodePromise
          .then(async(encoded) => {
            // loop through allusers to see if any current user has that "GID / googleId" or if the icon is in use. some returns a boolean upon strict equal match. Bool then can be used as flag for truthiness if > 0
            let alreadyUsedGoogleId = allusers.some(user => user.google_id === google_id)
            let alreadyUsedGoogleIcon = allusers.some(user => user.icon === icon)
            
            return await prisma.users.update({  
              // id because the table wasn't specified with a foreign key so using the username would not work in this case.
              where: {
                id: myid
              },
              data: {          
      // alreadyUsedGoogleId? if this condition is true, that means the allusers.some(gid === googleId) returns a truthy one which indicates user already using ID. googleId comes from args which comes from localStorage to persist data
                google_id: alreadyUsedGoogleId ? 'Google Account in Use. Profile can Fix.' : google_id,          // access .map() ----> let argsArray = [googleId, icon]   [0] = googleId  [1] = icon
                icon: alreadyUsedGoogleIcon ? "Good icon is used for another account" : icon,
              },
            }).then( (updatedUser) => {       
              // technically we've chained promises to get here which is why "return encodePromise" must be declared as well. encodePromise leads us to the prisma.users.update({ which returns a Promise } 
              const u = updatedUser
            return { id: u.id || 1, googleId: u.google_id, icon: u.icon, username: u.username, password: u.password, email: u.email, age: u.age }      
            })
          })            
        },

    }
    
}
