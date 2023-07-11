// this is for apollo servr 3.              thank you Prisma, Youtube, and this Gent:         https://www.youtube.com/watch?v=RJpevpbC4YY
import { ApolloServer } from "apollo-server-micro";
import { typeDefs } from "graphql/schema"
import { resolvers } from "graphql/resolvers"
import Cors from "micro-cors"

const cors = Cors() 
const apolloServer = new ApolloServer( { typeDefs, resolvers } )

const startServer = apolloServer.start()

export default cors(async function handler(req, res) {
    if (req.method === "OPTIONS") {
        res.end();
        return false;
    }

    await startServer;

    await apolloServer.createHandler({
        path: '/api/graphql'        // I think if the path were pages/api/index.ts it would just be:                /api/           
    })(req, res);  
});

export const config = {
    api: {
        bodyParser: false
    }
}