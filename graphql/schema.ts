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

    type Query {
        links: [Link]!     
        pokemon: Pokemon
    }

    `
    //     type Query { }     // reads This is saying return the resolver "links" with array of [Link]
    //      

    // id, category, description, imageUrl, users, title, url