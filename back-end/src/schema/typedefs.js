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
  type Post {
    post_id: Int!
    picture_url: String!
    content: String!
    user_id: Int!
    date_created: String!
    tags: String
    public: Boolean!
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
  union PostResponse = Post | Error
  type Query {
    user(user_id: Int!): User
    allUsers: [User!]!
    me: User
    feed: [Post!]
    userPosts(user_id: Int!): [Post!]
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
    createPost(
      content: String!
      picture_url: String!
      public: Boolean!
      tags: String
    ): PostResponse
  }
`;

module.exports = typeDefs;
