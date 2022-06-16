const { sequelize } = require("./SQL");

async function seedDB() {
  await sequelize
    .query(
      `
    drop table if exists users_likes;
    drop table if exists posts_tags;
    drop table if exists following;
    drop table if exists posts;
    drop table if exists users;
    
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        first_name varchar(50) NOT NULL,
        last_name varchar(50) NOT NULL,
        email varchar(80) NOT NULL UNIQUE,
        username varchar(40) NOT NULL UNIQUE,
        password varchar(80) NOT NULL,
        background_img_url TEXT,
        ppurl TEXT,
        bio varchar(1000),
        follower_count INTEGER,
        following_count INTEGER,
        created_date DATE NOT NULL default CURRENT_DATE,
        pinged_ips varchar(1000)
    );

    CREATE TABLE posts (
      post_id SERIAL PRIMARY KEY,
      picture_url VARCHAR(200),
      content VARCHAR(1000),
      user_id INTEGER REFERENCES users (id),
      public BOOLEAN NOT NULL,
      date_created DATE NOT NULL default CURRENT_DATE
    );

    CREATE TABLE following (
      user_id INTEGER REFERENCES users (id),
      following_id INTEGER REFERENCES users (id),
      date_followed DATE NOT NULL default CURRENT_DATE
    );

    CREATE TABLE posts_tags (
      post_id INTEGER REFERENCES posts (post_id),
      tag TEXT NOT NULL
    );

    CREATE TABLE users_likes (
      user_id INTEGER REFERENCES users (id),
      post_id INTEGER REFERENCES posts (post_id)
    );


    
    `
    )
    .then((dbRes) => {
      console.log("seeded");
    })
    .catch((err) => console.log(err));
  process.exit();
}
seedDB();
