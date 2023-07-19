import {gql} from 'apollo-server-micro';

// the link object will have the following fields in:                    type Link { ... fields }
export const typeDefs = gql`

    type Settings {
        id: Int
        age: Int
        weight: Int
        height: Int
        reminder: Int
        activity: Int
        start_time: Int
        end_time: Int
        users_id: Int
    }

    type Users {
        id: Int
        google_id: String
        icon: String
        username: String
        password: String
        email: String
        age: Int
      }

      type UsersLogin {
        id: Int 
        google_id: String
        icon: String
        username: String
        password: String
        email: String
        age: Int
        token: String        
      }

    type Data {
        id: Int
        google_id: String
        date: String
        progress: String
        weekday: String
        status: [String]
        users_id: Int
    }

    type ENV {
        DATABASE_URL: String
        API: String
        NODE_ENV: String
        GOOGLE_ID: String
        WEATHER_KEY: String
    }

    type Query {
        readRedisTest(key: String!): String

        allDBsettings: [Settings]!     
        userSettings(id: Int!): Settings

        allDBusers: [Users]!
        allDBdata: [Data]!
        allUserData(users_id: Int!): [Data]!

        idArgsReturnIcon(users_id: Int!): Users
        userLogin(email: String!, password: String!): UsersLogin
        
        puppeteerWebIcon(searchTerm: String!): String!
    }

    type Mutation {
        addUserSettings(
            id: Int!
            age: Int!
            height: Int!
            weight: Int!
            start_time: Int!
            end_time: Int!
            reminder: Int!
            activity: Int!
            users_id: Int!
        ): Settings

        addUser(
            id: Int!
            google_id: String!
            icon: String!
            username: String!
            email: String!
            password: String!
            age: Int!
        ): Users

        getDailyData(users_id: Int!): Data

        updateDailyData(
            date: String!
            progress: Int!
            weekday: String!
            status: [String]!
            users_id: Int!
        ): Data

        userSignup(
            google_id: String!
            icon: String!
            username:  String!
            email: String!
            password: String!
            age: Int!
        ): Users
        
        linkUserWithGoogle(
            username: String!
            google_id: String!
            icon: String!
        ): Users
        }

        `


// getDailyData(users_id: Int!): Data              // (users_id: Int!) these are the args don't forget. Don't load them with all endpoints if they only need ID
        
    // * * * * *  allDBsettings: [Settings] * * * * *  new GraphQLList(Settings)
    //     type Query { }     // reads This is saying return the resolver "links" with array of [Link]
