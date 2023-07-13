import axios from 'axios'
import bcrypt from "bcryptjs"

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

const alldataDB = prisma.data.findMany
const allusersDB = prisma.users.findMany


export const resolvers = {
    Query: {
    links:() => [
            // this is the resolver so doing anything in this function is fair game.
        {
            id: 1,
            title: "mouse droplet",
            description: 'small water drop',
            category: 'water drops',
            imageUrl: "/water_img/mouse_droplet",
            url: "localhost:3000",
            users: [1],
        },
        {
            id: 2,
            title: "empty drop",
            description: 'empty water drop',
            category: 'water drops',
            imageUrl: "/water_img/bg_blue",
            url: "localhost:3000",
            users: [1],
        },

    ],
    pokemon: async () => {
        let pokeurl:string = `http://pokeapi.co/api/v2/pokemon/`
        let predata = await axios.get(pokeurl)        
        let pokemon = predata.data.results
        let randompokemon = pokemon[Math.floor(Math.random() * pokemon.length)]
        let randomName:string = randompokemon.name
        // let randomId:string = randompokemon.id

        return { name: randompokemon.name, id: 0 }
    },
    allDBsettings: async () => { return await prisma.settings.findMany() },   
// these are the age, height, etc. settings for the user. These settings determine the water schedule. reminder is the notification intensity. 8am - 8pm is 8 - 16. notification intensity of 2 means every 2 hours get notified.
    userSettings: async (parent, args) => {
        let { id } = args        
        let allsettings = await prisma.settings.findMany()    
        let settingsLength = allsettings.length + 1
        let allusers = await prisma.users.findMany()
        let me = allusers.filter(us => us.id === id)
        let myage = me[0].age
        let mySettings = allsettings.filter(settings => settings.users_id === id)
        mySettings = mySettings[0]
        return mySettings
        // return { id, weight, height, age, reminder, start_time, end_time, reminder, activity, users_id } = settings 
      },
    // postgres data. This is the actual water cycle data that pertains to calendar day. User clicks, if they're within a block of time, success | failure
    allDBdata: async () => { return await prisma.data.findMany() },
    
    allUserData: async (parent, args) => {
      const { users_id } = args
      let alldata = await alldataDB()
      const mydata = alldata.filter(waterCycleData => waterCycleData.users_id === users_id)
      return mydata
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
        // let me = allusers.filter(us => us.email || us.username === e mailOrUsername)
        let myDBpassword = me.password
        // handle account recovery over here
        if (!me) { throw new Error("Username or Password Don't match")}
  
        const passTheSalt = bcrypt.compareSync(password, myDBpassword)
  
        if (passTheSalt) {
          return { id: me.id, googleId: me.google_id, icon: me.icon, username: me.username, password: me.password, email: me.email, age: me.age }
        }
         else {
          return { id: 0, google_id: 'yes', icon: 'yea', username: 'name', password: 'password', email: 'email', age: 1 }        
        }        
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
      const { id, google_id, icon, username, email, password, age } = args;
      const newUser = await prisma.users.create({ data: { id, google_id, icon, username, email, password, age } })
      if (!newUser) return
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
