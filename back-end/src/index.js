const { ApolloServer } = require("apollo-server");
const jwt = require("jsonwebtoken");
const typeDefs = require("./schema/typedefs");
const resolvers = require("./resolvers/resolver");
require("dotenv").config();
const { JWT_SECRET, SERVER_PORT } = process.env;

//jwt token auth
const getUser = (token) => {
  try {
    if (token) {
      return jwt.verify(token, JWT_SECRET);
    }
    return null;
  } catch (error) {
    return null;
  }
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.get("Authorization") || "";

    return { user: getUser(token.replace("Bearer", "")) };
  },
  introspection: true,
  playground: true,
});

server.listen({ port: SERVER_PORT || 4000 }).then((url) => {
  console.log(`🚀 Server has launched on ${url}`);
});
