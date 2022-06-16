const getUsers = {
  query: `
    query ExampleQuery {
        allUsers {
            id
            username
            email
            first_name
            last_name
            ppurl
        }
    }
  `,
};

const getUserPostsQuery = (user_id) => {
  return {
    query: `
    query UserPosts {
      userPosts(user_id:${user_id}) {
        post_id
        picture_url
        content
        user_id
        date_created
        tags
        public
      }
    }
  `,
  };
};

const getUserFromIdQuery = (user_id) => {
  return {
    query: `
    query User {
      user(user_id: ${user_id}){
        id
        username
        email
        first_name
        last_name
        ppurl
      }
    }
    
    `,
  };
};

const createPostQuery = (content, pictureURL, isPublic, tags) => {
  return {
    query: `
    mutation CreatePost {
      createPost(content: "${content}", picture_url: "${pictureURL}", public: ${isPublic},tags: "${tags}") {
        ... on Post {
          post_id
          picture_url
          content
          user_id
          date_created
          public
        }
        ... on Error {
          msg
          code
        }
      }
    }
    `,
  };
};

export { getUsers, getUserPostsQuery, getUserFromIdQuery, createPostQuery };
