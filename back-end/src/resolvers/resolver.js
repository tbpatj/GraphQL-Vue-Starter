const { createSourceEventStream } = require("graphql");

require("dotenv").config();

const { sequelize } = require("../SQL/SQL");
const registerUser = require("./registerUser");
const login = require("./login");
const { createPost, userPosts } = require("./posts");

const { findUserById, getUsers, createUser } = require("../SQL/user");

const resolvers = {
  UserResponse: {
    __resolveType: (userRes) => {
      if (userRes.token) {
        return "AuthPayload";
      } else if (userRes.code) {
        return "Error";
      }
      return null;
    },
  },
  PostResponse: {
    __resolveType: (postRes) => {
      if (postRes.content) return "Post";
      if (postRes.code) return "Error";
      return null;
    },
  },

  Query: {
    async me(_, args, { user }) {
      if (!user) throw new Error(`You are not authenticated`);
      return await findUserById(user.id);
    },
    async user(root, { user_id }, { user }) {
      try {
        return await findUserById(user_id);
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
    userPosts: userPosts,
  },
  Mutation: {
    createPost: createPost,
    registerUser: registerUser,
    login: login,
  },
};

module.exports = resolvers;
