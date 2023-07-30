export {};

const { ApolloServer, gql } = require('@apollo/server');
const { send } = require('micro');

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello, World!',
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

module.exports = apolloServer.createHandler({ path: '/api/gqlserver' });
