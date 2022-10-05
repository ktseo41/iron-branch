import { GraphQLClient } from "graphql-request";
import dotenv from "dotenv";

dotenv.config();

export default new GraphQLClient("https://api.stratz.com/graphql", {
  headers: {
    Authorization: `Bearer ${process.env.STRATZ_API_TOKEN}`,
  },
});
