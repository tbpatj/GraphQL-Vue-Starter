const { gql } = require("apollo-server");
const typeDefs = gql`
  type User {
    id: Int!
    username: String
    email: String!
    first_name: String
    last_name: String
    ppurl: String
  }
  type AuthPayload {
    token: String!
    user: User!
  }
  type Error {
    msg: String!
    code: Int!
  }
  union UserResponse = AuthPayload | Error
  type Query {
    user(user_id: Int!): User
    allUsers: [User!]!
    me: User
  }

  type Mutation {
    registerUser(
      username: String
      first_name: String
      last_name: String
      email: String!
      password: String!
    ): UserResponse
    login(email: String!, password: String!): UserResponse
  }
`;

module.exports = typeDefs;
