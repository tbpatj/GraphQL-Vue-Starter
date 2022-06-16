const { sequelize } = require("./SQL");

async function createPostSQL(post) {
  let sqlRes = await sequelize
    .query(
      `
          INSERT INTO posts (picture_url,content, user_id, public)
          VALUES ('${post.picture_url}','${post.content}','${post.user_id}','${post.public}')
          RETURNING *;
      `
    )
    .then((dbRes) => {
      return dbRes[0][0];
    })
    .catch((error) => {
      console.log(error);
    });

  let tags = post.tags.split(",");
  if (sqlRes.post_id && tags.length > 0) {
    let query = ``;
    for (let i = 0; i < tags.length; i++) {
      query += `INSERT INTO posts_tags (post_id, tag)
        VALUES ('${sqlRes.post_id}','${tags[i]}');`;
    }
    let sqlRes2 = await sequelize
      .query(query)
      .then((dbRes) => dbRes)
      .catch((err) => console.log(err));
  }
  //if we return an error then send it back up stack
  return sqlRes;
}

//get all the posts from a user
async function getUsersPostsSQL(user_id) {
  let posts;
  let sqlRes = await sequelize
    //   SELECT p.*, pt.tag FROM posts p
    //   LEFT JOIN posts_tags pt ON p.post_id=pt.post_id
    //   WHERE p.user_id = ${user_id};
    .query(
      `
      SELECT p.*, STRING_AGG(pt.tag, ', ') as tags FROM posts p
        INNER JOIN posts_tags pt ON p.post_id=pt.post_id
        WHERE p.user_id = ${user_id}
        GROUP BY p.post_id
        ORDER BY p.post_id DESC;
      `
    )
    .then((dbRes) => {
      posts = dbRes[0];
      console.log("users posts", posts);
    })
    .catch((error) => {
      console.log(error);
    });

  return posts;
}

module.exports = { createPostSQL, getUsersPostsSQL };
