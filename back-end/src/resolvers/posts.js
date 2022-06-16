const { createPostSQL, getUsersPostsSQL } = require("../SQL/post");

async function createPost(
  _,
  { content, picture_url, public, tags },
  { ip, user }
) {
  if (!user) return { msg: "User is not authenticated", code: 6 };
  if (content && picture_url && public !== null && public !== undefined) {
    //The begining of creating a post, we are authenticated and supplied some info.
    let sqlRes = await createPostSQL({
      picture_url,
      content,
      public,
      tags,
      user_id: user.id,
    });

    console.log(sqlRes);
    return sqlRes;
  } else {
    return { msg: "Not enough supplied fields", code: 7 };
  }
}

async function userPosts(_, { user_id }, { ip, user }) {
  if (user_id) {
    //here we should check if we are a follwer of the user
    console.log("yeah");
    let sqlRes = await getUsersPostsSQL(user_id);
    return sqlRes;
  } else {
    //no user exists
    return null;
  }
}

module.exports = { createPost, userPosts };
