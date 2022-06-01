const { createSourceEventStream } = require("graphql");

require("dotenv").config();

const { sequelize } = require("../SQL/SQL");
const registerUser = require("./registerUser");
const login = require("./login");

const { findUserById, getUsers, createUser } = require("../SQL/user");

const resolvers = {
  UserResponse: {
    __resolveType: (userRes) => {
      console.log("hmmm running");
      if (userRes.token) {
        return "AuthPayload";
      } else if (userRes.code) {
        return "Error";
      }
      return null;
    },
  },

  Query: {
    async me(_, args, { user }) {
      if (!user) throw new Error(`You are not authenticated`);
      return await findUserById(user.id);
    },
    async user(root, { id }, { user }) {
      try {
        return await findUserById(id);
      } catch (error) {
        throw new Error(error.message);
      }
    },
    async allUsers(root, args, user) {
      console.log(args);
      try {
        if (!user) throw new Error(`You are not authenticated`);
        let myReturn = await getUsers();
        console.log(myReturn);
        return myReturn;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
  Mutation: {
    registerUser: registerUser,
    login: login,
  },
};

module.exports = resolvers;
