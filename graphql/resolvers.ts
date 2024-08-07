import axios from 'axios'
import bcrypt from "bcryptjs"
import { hashPasser, SERIALIZESTRING, PARSESERIALIZEDSTRING } from 'utility/UtilityValues';
import {JWTsecretKeyMaker} from "utility/UtilityValues"
import puppeteer from "puppeteer"
import passport from "../utility/passport"; 
import jwt from "jsonwebtoken"
// import Redis from 'ioredis'
import { waterScheduleFromStartTimeEndTime } from "utility/UtilityValues"
import { SettingsInterface, HydroDataInterface } from "interfaces/interface"

// const redis = new Redis({
//   port: 6379,
//   host: '127.0.0.1'
  // password: NEXT_PUBLIC_APP_REDIS_PASSWORD
// })

import prisma from "prisma/prismaClient"

// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient()

const alldataDB = prisma.data.findMany
const allusersDB = prisma.users.findMany
const allsettingsDB = prisma.settings.findMany



// const reWriteRedisSettings = async () => {
//   await redis.del("settings")
//     const allSettings = await allsettingsDB()
//     const settingsStrForRedis = SERIALIZESTRING(allSettings)
//     await redis.set("settings", settingsStrForRedis)
// }

// const reWriteRedisUserSettings = async (users_id:number, usersSettings:SettingsInterface) => {
//   await redis.del(`userSettings:${users_id}`)
//     const userSettingsStrForRedis = SERIALIZESTRING(usersSettings)
//     await redis.set(`userSettings:${users_id}`, userSettingsStrForRedis)
// }

// const reWriteRedisUserData = async (users_id:number, usersData:HydroDataInterface) => {
//   await redis.del(`userData:${users_id}`)
//   const userDataStrForRedis = SERIALIZESTRING(usersData)
//   await redis.set(`userData:${users_id}`, userDataStrForRedis)
// }



const deleteSettingsWithId = async (id:number) => { await prisma.settings.delete({ where: { id: id } }) }

const makeDummyTodayData = async (userId:number) => {
  const date = new Date();
  const today:string = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  // const today:string = `${new Date().getMonth()}-${new Date().getDate()}-${new Date().getFullYear()}}`
  const weekdays:string[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const todayData = await prisma.data.create({
      data: {
        users_id: userId,
        google_id: '',
        date: today,
        progress: 0,
        weekday: weekdays[new Date().getDay()],
        status: ['no', 'no', 'no', 'no', 'no'],        
      }
    })
    if (!todayData) {
      return null;
    }
    console.log('todayData', todayData);
    return todayData; 
  }

  const generateLoginToken = async (userId: number) => {
    const SECRET_KEY = await JWTsecretKeyMaker()      
    const token = jwt.sign({ id: userId }, SECRET_KEY); 
    return token;
  }  

  const settingsTableSetNowDataTableStatusUpdate = async (settings, userId:number) => {
    const alldata = await alldataDB();
    const date = new Date()
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' } )
    const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    const dateAndUserCheck = alldata.find(data => data?.date === dateString && data?.users_id === userId)
    if (!dateAndUserCheck) {
      return;
    }
    const dataId:number = dateAndUserCheck?.id
    const myWaterSchedule = await waterScheduleFromStartTimeEndTime(settings)
    const newStatus = new Array(myWaterSchedule?.length).fill("no")
    const newData = prisma.data.update({
      where: {
        id: dataId
      },
      data: {
        status: newStatus
      }
    })
  }

  

// const userRedisCheck = async () => {  // thinking about making this a func with param
//     return redis.get("users", (error, users) => {
//       if (error) {
//         return error
//       } else {      
//         return users
//       }
//   });
// }

// const settingsRedisCheck = async () => {  // thinking about making this a func with param
//     return redis.get("settings", (error, users) => {
//       if (error) {
//         return error
//       } else {      
//         return users
//       }
//   });
// }

// const dataRedisCheck = async () => {  // thinking about making this a func with param
//     return redis.get("data", (error, users) => {
//       if (error) {
//         return error
//       } else {      
//         return users
//       }
//   });
// }

// const userSettingsRedisCheck = async (users_id) => {  // thinking about making this a func with param
//           // string interpolation so that the cache data saved to redis corresponds to userusers_id as well, concatenated with "userSettings" string that corresponds to this resolver function
//       return redis.get(`userSettings:${users_id}`, (error, users) => {
//         if (error) {
//           return error
//         } else {      
//           return users
//         }
//   });
// }

// const userDataRedisCheck = async (users_id) => {
//       return redis.get(`userData:${users_id}`, (error, userData) => {
//         if (error) {
//           return error
//         } else {
//           return userData
//         }
//       })
// }

export const resolvers = {
    Query: {
      allDBusers: async () => {
        return new Promise(async (resolve, reject) => {      
          // invoke the redis-cache checking function userRedisCheck() if there's cache data, return and end the function to return cache instead of query DB

          // const users:any = await userRedisCheck()
          // if (users) {
          //   const allUsersObject = PARSESERIALIZEDSTRING(users)
          //   console.log("In the Redis block", allUsersObject);
          //   resolve(allUsersObject);
          // } else {
            // if we're else blocked then there's no cache data
            // console.log("In the NO REDIS block");
            try {
              // allusersDB() -----> prisma.users.findMany()
              const allusers = await allusersDB();
              if (allusers) {
                // there are no redis-cache user data but we have postgres DB data returned from prisma. JSON.stringify(alluser)
                // let userStrForRedis = SERIALIZESTRING(allusers);
      // set the "users" key === JSON.stringify(users) so it can be parsed during the next query with userRedisCheck -> redis.get("users")
                // await redis.set("users", userStrForRedis);
                // resolve "return new Promise" with {allusers} 
                resolve(allusers);
                // errors and failures below 
              } else {
                resolve("theres been a mistake!");
              }
            } catch (error) {
              reject(error);
            }
          // }
        });
      },
    allDBsettings: async () => { 
      // let settings:any = await settingsRedisCheck()
      // if (settings) {        
      //   const allSettingsObject = PARSESERIALIZEDSTRING(settings)
      //   console.log("settings redis block", allSettingsObject)
      //   return allSettingsObject
      // } else {

        // console.log("else block NO redis settings in cache")
  //`no "settings" -> prisma.strains.findMany() -> redis-cache, so as with users: handle graphQL return data -> redis.set("settings") -> so userSettingsCheck() returns if block above next query
        const allsettings = await allsettingsDB()
        if (allsettings) {

          // redis
          // let settingsStrForRedis = SERIALIZESTRING(allsettings)
          // await redis.set("settings", settingsStrForRedis)

          return allsettings
        } else {
          return "guys there's been a mistake"
        }
      // }
    },    
    allDBdata: async () => { 
      // let data:any = await dataRedisCheck()
      // if (data) {
      //   const allDataObject = PARSESERIALIZEDSTRING(data)
      //   console.log("data redis block", allDataObject)
      //   return allDataObject
      // } else {
        // console.log("else block for data NO redis cache")
        const alldata = await alldataDB()
        if (alldata) {

          // redis
          // let dataStrForRedis = SERIALIZESTRING(alldata)
          // await redis.set("data", dataStrForRedis)

          return alldata
        }  else {
          return "bad handshake"
        }
      // }
      // return await prisma.data.findMany() 
    },
// age, height, etc. userSettings that determine water schedule. reminder is the notification intensity. 8am - 8pm is 8 - 16. notification intensity of 2 means every 2 hours get notified.
    userSettings: async (parent, args) => {
      // id that corresponds to postgres.table.user.id
        let { users_id } = args        
  // function that returns redis.get() return data (redis.get() is a promise which is why using an additional {new Promise} constructor is redundant and technically not DRY code.)
        // evaluate the above function that returns the cache data or not.

        // let userSettingsRedis = await userSettingsRedisCheck(users_id)

        // if cache data comes back good, the if block handles that:      we dont want to query the database, we want to query the cache and spare the user the latency of waiting for data

        // if (userSettingsRedis) {
          // JSON.parse(userSettingsRedis) this is done because redis only accepts a string. Return this cache data below.
        //   const allUserSettingsObject = PARSESERIALIZEDSTRING(userSettingsRedis)
        //   console.log("userSettings redis block", userSettingsRedis)
        //   return allUserSettingsObject

        // } else {
          // else block means there is no cache data & prisma must retrieve data from postgresDB to return to client.
          // console.log("NO redis. userSettings ELSE block!!!")
          // prisma down here to separate it from being run in case there is cache data.      DB.users retrieves the id and the id is met within loop and comparison. return that settings Data
          let allsettings = await prisma.settings.findMany()            
          let settingsLength = allsettings.length + 1
          let allusers = await prisma.users.findMany()
          let me = allusers.filter(us => us.id === users_id)
          let myage = me[0].age
          let mySettings = allsettings.filter(settings => settings.users_id === users_id)
          mySettings = mySettings[0]
// before we return the graphQL data, set:    JSON.stringify(mySettings)        into the cache so that the next query can return cache from userSettingsRedisCache() / redis.get(`userSettings${id}`)
          // await reWriteRedisUserSettings(me[0].id, mySettings)
          return mySettings

        // }
        // return { id, weight, height, age, reminder, start_time, end_time, reminder, activity, users_id } = settings 
      },
    // postgres data. This is the actual water cycle data that pertains to calendar day. User clicks, if they're within a block of time, success | failure
    
    allUserData: async (parent, args) => {
      const { users_id } = args
      // let userDataRedis = await userDataRedisCheck(users_id)
      // // if (userDataRedis) {
      // //   const allUserDataObject = PARSESERIALIZEDSTRING(userDataRedis)
      // //   console.log("userData redis block", userDataRedis)
      // //   return allUserDataObject
      // // } 
      // else {
        // console.log("NO redis. allUserData ELSE block!")
        let alldata = await alldataDB()
        const mydata = alldata.filter(waterCycleData => waterCycleData.users_id === users_id)

        // testing
        // console.log('mydata server', mydata)


        // const myDataForRedis = SERIALIZESTRING(mydata)
        // await redis.set(`userData:${users_id}`, myDataForRedis)
        return mydata
      // }
    },

    idArgsReturnIcon: async (parent, args) => {
      const { users_id } = args    
      let allusers = await allusersDB() 
      let me = allusers.filter(user => user.id === users_id)   
      let icon = me.icon ? me.icon : "/water_img/bite.png"
      return icon
    },
    userLogin: async (parent, args) => {
    // userLogin: async (parent, args, {res}) => {
      const { email, password } = args
      try {
        // promise with standard passport.authenticate to hit localDB only. resolve the user or reject with the error
        const user:any = await new Promise((resolve, reject) => {
          passport.authenticate('local', { session: false }, (err, user, info) => {
            if (err || !user) {
              return reject(info ? new Error(info.message) : err);

            }
            resolve(user);
          })({ body: { email, password } });
        });

        // crpyto.randomBytes.toString('hex') return(string)... this secures the JWT.
        
        // generate token.      also: concatenate the user.id onto the end of the token string so that when:   user logs in -> page nav -> .getCookieToken() -> regexIdFromToken -> fetchDB(user.id)
        const token = generateLoginToken(user?.id)
        // const tokenWithId = `${token}***${user.id}`
      
        return {
          id: user.id,
          googleId: user.google_id,
          icon: user.icon,
          username: user.username,
          password: user.password,
          email: user.email,
          age: user.age,
          token: token, 
          // token: tokenWithId, 
          
        };
      } catch (error) {
        // console.log("error", error)
        return null;
        // return { username: 'error' }
        // throw new Error('An error occurred during login. Please try again.');
      }
    },

      puppeteer: async (parent, args) => {
        const { searchTerm } = args;
        const backupArr = [
          '/water_img/water-park.png',
          '/water_img/manta-ray.png',
          '/water_img/aqua-jogging.png',
          '/water_img/whale.png',
        ];
        const randomValue = "/water_img/whale.png";
        // const randomValue = backupArr[Math.floor(Math.random() * backupArr.length)];
    
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();
    
        // Navigate to Google Images
        await page.goto(
          `https://www.google.com/search?q="${searchTerm}"}&tbm=isch`
        );
    
        // Wait for the images to load
        await page.waitForSelector('.rg_i', { timeout: 60000 });
    
        // Evaluate the page and extract the first image URL
        const imageUrl = await page.evaluate(() => {
          const image:any = document.querySelector('.rg_i');
          const url = image.getAttribute('data-src') || image.getAttribute('src');
          return url || randomValue
        }).catch(() => {
          return randomValue;
        });
        // If the URL is present, return the base64 encoded image
        if (!imageUrl) {
          return null;
        }    
          try {
            const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
            if (!response) {
              return null
            }
            const base64Image = Buffer.from(response.data, 'binary').toString('base64');
            return `data:${response.headers['content-type']};base64,${base64Image}` || '';
          } catch (error) {
            // console.error('Error fetching image:', error);
          }
        // If the URL is not present or fetching fails, return the random backup image
        return randomValue;
      },
    },
    Mutation: {
    addUserSettings: async (parent, args) => {
        const { age, height, weight, start_time, end_time, reminder, activity, users_id } = args;
        // const { id, age, height, weight, start_time, end_time, reminder, activity, users_id } = args;
        // check if there are already settings that correspond to user ID
        let allSettings = await allsettingsDB()

        // would've changed .filter() -> .some() but then the ID of that data is needed.
        let mySettings = allSettings.filter(settings => settings?.users_id === users_id)
        console.log('SERVER: mySettings', mySettings)
        // let mySettings = allSettings.filter(settings => settings.users_id === users_id)
        
        // mySettings = mySettings[0]        
        if (mySettings && mySettings[0]?.id > 0) { 
          await deleteSettingsWithId(mySettings[0]?.id) 
          // await prisma.settings.delete({ where: { id: mySettings.id } })
        } 
        
        let allSettingsForLength = await allsettingsDB()
        let allSettingsLength = allSettingsForLength?.length + 1
        // this works. the above code hasn't been checked yet.
        return await prisma.settings.create({
          data: {
            age,
            height,
            weight,
            start_time,
            end_time,
            reminder,
            activity,
            users_id
          }
        }).then(async(addedSettings:SettingsInterface) => {
          let s = addedSettings
          settingsTableSetNowDataTableStatusUpdate(addedSettings, users_id)
          // await reWriteRedisSettings() //await redis.del("settings") //const allSettings = await allsettingsDB() //const settingsStrForRedis = SERIALIZESTRING(allSettings) //await redis.set("settings", settingsStrForRedis)
          // reWriteRedisUserSettings(users_id, addedSettings) 
  return { age: s?.age, height: s?.height, weight: s?.weight, start_time: s?.start_time, end_time: s?.end_time, reminder: s?.reminder, activity: s?.activity, users_id: s.users_id }
          // return addedSettings
        }).catch((error) => {
          // console.log(error)
          
        })
    },
    deleteUserSettings: async (parent, args) => {
      const { users_id } = args;
      let allSettings = await allsettingsDB()
      let mySettings = allSettings.find(settings => settings.users_id === users_id)
      if (mySettings) {
        prisma.settings
          .delete({
            where: {
              id: mySettings.id,
            },
          })
          .then(async() => {
            // await redis.del("settings")
            
          })
          .catch((error) => {
            // console.error("Error deleting settings:", error);
          });
      } else {
        // console.log("Settings not found for the specified users_id.");
      }
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

        let me = allusers.find(user => user?.id === users_id)
        // console.log('me getDailyData', me)

        const date = new Date()
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' } )
        const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        const dateAndUserCheck = alldata.find(data => data.date === dateString && data.users_id === users_id)
        // console.log('SERVER: dateAndUserCheck', dateAndUserCheck)
        // console.log('dateString', dateString)
        // console.log('dateAndUserCheck', dateAndUserCheck)

        if (dateAndUserCheck) {
          // Data already exists for the given date and user
          return dateAndUserCheck;
        }
        console.log("no date user check")
        if (!me) return
        return prisma.data.create({
          data: {
            id: dataLength + 1,
            google_id: me?.google_id || 'no google-id',
            date: dateString,
            progress: 0,
            weekday: dayName,
            status: ['no', 'no', 'no', 'no', 'no'],
            users_id: users_id

          }
        }).then(async(newdata) => {
          let d = newdata;          
return { id: d?.id, google_id: d?.google_id, date: d?.date, progress: d?.progress, weekday: d?.weekday, status: d?.status, users_id: d?.users_id }
        }).catch( (error) => {
          console.log('error', error)        
            return null
          // { id: 1, google_id: 'no google', date: 'no date', progress: 100, weekday: 'nunday', status: ['hey', 'hey', 'hey',], users_id: 4 }
          // return { google_id: 'no google', date: 'no date', progress: 100, weekday: 'nunday', status: ['hey', 'hey', 'hey',], users_id: 4 }
        })
      // }
    },      
    updateDailyData: async (parent, args) => {      
      let { users_id, progress, status, date } = args;      
      status = status[0]?.split(',');
      // const parsedStatus = JSON.parse(status);
      console.log("henry miller");
      // console.log('SERVER: henry wheezer ', parsedStatus)
      console.log('SERVER: status', status)
      console.log("fannie miller");



      // const userDataRedis = await userDataRedisCheck(users_id)
      // if (userDataRedis) {
      //   console.log('in the redis cache for userData')
      //   return userDataRedis
      // }
      const allusers = await allusersDB();
      const alldata = await alldataDB()      

      const today = new Date().getDate()      

      // const mydata = alldata.find(data => data?.users_id === users_id && data?.date === date)
      let mydata = alldata.find(data => data?.users_id === users_id)
      console.log('mydata', mydata)
      // mydata = mydata[0];

      if (!mydata) {
        return;
      }        

      return await prisma.data.update({
        where: { id: mydata?.id },
        data: { 
          progress: progress >= 96 ? 100 : parseInt(progress.toFixed()),                                                                                                                                                                                                         
          status: status          
        }
      }).then((data) => {
        console.log('data', data)
        return data;
      }).catch((error) => {
        console.log('error', error)
        return null;
      })
      // }).then(updatedData => updatedData ? updatedData : null)
      // .catch( (err) => { return "err" } )
    },

    userSignup: async (parent, args) => {
        // might add the google_id
        const { google_id, icon, username, password, email, age } = args;
        if (!args) {
          return;
        }
        let allusers = await prisma.users.findMany();
        let autoIncrementUserId = allusers.length + 1

        const saltRounds = 13
        const tableSalt = bcrypt.genSaltSync(saltRounds)
        const passHasher = bcrypt.hashSync(password, tableSalt)

        return await prisma.users.create({
          data: {
            id: autoIncrementUserId,
            username: username,
            password: passHasher,
            google_id: google_id,
            icon: icon,
            email: email,
            age: age
          }
        }).then(async(u) => {
          // expected iterable error because of :       allUserData(users_id: Int!): [Data]!  *** MAKING A MADE UP DATE ! ! ! ***
          console.log('u', u)
          let allData = await alldataDB()
          let allDataLength = allData.length

          const todayData = await makeDummyTodayData(u?.id)
          console.log('todayData', todayData)

  // await prisma.data.create({ 
  //   data: {
  //     google_id: 'no google-id', date: `6-20-24`, progress: 0, weekday: "Funday", status: ['']
  //   }
  // })

// await prisma.data.create({ data: { id: allDataLength + 1, google_id: 'no google-id', date: '1992-11-21', progress: 0, weekday: 'Funday', status: {}, users_id: u.id }})
const loginToken = await generateLoginToken(u?.id)
console.log('server loginToken', loginToken)
// expected iterable error because of :       allUserData(users_id: Int!): [Data]!  *** MAKING A MADE UP DATE ! ! ! ***
            // await redis.del("users")
            // let allUsers = await allusersDB()
            // let userStrForRedis = SERIALIZESTRING(allUsers)
            // redis.set("users", userStrForRedis)
            return { id: u.id, googleId: '', icon: '', username: u.username, password: u.password, email: u.email, age: u.age, token: loginToken }
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
