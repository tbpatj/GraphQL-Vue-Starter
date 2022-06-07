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
  uri: "http://192.168.0.97:8080/",
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.get("Authorization") || "";
    const clientIp = req.connection.remoteAddress;
    // console.log(req);
    return { user: getUser(token.replace("Bearer", "")), ip: clientIp };
  },
  fetchOptions: {
    mode: "no-cors",
  },
  // csrfPrevention: true, // see below for more about this
  // cors: {
  //   credentials: true,
  //   origin: process.env.ALLOWED_ORIGINS.split(","),
  // },
  introspection: true,
  playground: true,
});
server.listen({ port: SERVER_PORT || 4000 }).then((url) => {
  console.log(`🚀 Server has launched on ${url}`);
});
