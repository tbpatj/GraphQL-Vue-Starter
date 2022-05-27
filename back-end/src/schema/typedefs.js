const { gql } = require("apollo-server");
const typeDefs = gql`
  type User {
    id: Int!
    username: String
    email: String!
  }
  type AuthPayload {
    token: String!
    user: User!
  }
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
    ): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
  }
`;

module.exports = typeDefs;
