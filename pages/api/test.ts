const axios = require('axios');
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, graphql } = require('graphql');

// Define the PokemonType GraphQLObjectType
const PokemonType = new GraphQLObjectType({
  name: 'Pokemon',
  fields: {
    name: { type: GraphQLString },
    id: { type: GraphQLInt },
  },
});

// Define the root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    getPokemon: {
      type: PokemonType,
      resolve: async () => {
        try {
          const response = await axios.get('https://pokeapi.co/api/v2/pokemon/ditto');
          const { name, id } = response.data;
          return { name, id };
          // return { name: 'me', id: 1 }
        } catch (error) {
          console.error(error);
          throw new Error('Failed to fetch Pokemon data');
        }
      },
    },
  },
});

// Define the schema
const schema = new GraphQLSchema({
  query: RootQuery,
});

// Example usage
const query = '{ getPokemon { name, id } }';

graphql(schema, query)
  .then((result) => {
    console.log(result.data);
  })
  .catch((error) => {
    console.error(error);
  });




// export const testfunc = () => {
//     let test:string = "my_test"
//     console.log(test);
//     return `test-concatenated: I failed ${test}`
// }

// export default testfunc