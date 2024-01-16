import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { Mutation } from "./resolvers/Mutation.ts";
import { Query } from "./resolvers/Query.ts";
import mongoose from "mongoose"
import { typeDefs } from "./gql/schema.ts";


const resolvers={
  Mutation,
  Query
  
}
const server = new ApolloServer({
  typeDefs,
  resolvers,
});
await mongoose.connect(Deno.env.get("MONGO_URL")!);
if(mongoose.connection){console.info("conectado")}
const { url } = await startStandaloneServer(server);
console.log(`🚀 Server ready at ${url}`);