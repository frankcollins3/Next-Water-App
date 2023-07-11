import {gql} from 'apollo-server-micro';

// the link object will have the following fields in:                    type Link { ... fields }
export const typeDefs = gql`
    type Link {
        id: String,
        title: String,
        description: String,
        url: String,
        category: String,
        imageUrl: String,
        users: [String]
    }
    type Pokemon {
        id: Int,
        name: String
    }

    type Settings {
        id: Int,
        age: Int,
        weight: Int,
        height: Int,
        reminder: Int,
        activity: Int,
        start_time: Int,
        end_time: Int,
        users_id: Int
    }

    type Users {
        id Int,
        google_id: String,
        icon: String,
        username: String,
        password: String,
        email: String,
        age: Int
    }

    type Data {
        id: Int,
        google_id: String,
        date: String,
        progress: String,
        weekday: String,
        status: [String],
        users_id: Int
    }

    type ENV {
        DATABASE_URL: String,
        API: String,
        NODE_ENV: String,
        GOOGLE_ID: String,
        WEATHER_KEY: String
    }

    type Query {
        links: [Link]!     
        pokemon: Pokemon,
        settings: Settings,
        users: Users,
        data: Data,
        env: ENV,        
    }
    `
    //     type Query { }     // reads This is saying return the resolver "links" with array of [Link]
