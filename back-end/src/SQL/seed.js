const { sequelize } = require("./SQL");

async function seedDB() {
  await sequelize
    .query(
      `
    drop table if exists users;
    
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        first_name varchar(50) NOT NULL,
        last_name varchar(50) NOT NULL,
        email varchar(80) NOT NULL UNIQUE,
        username varchar(40) NOT NULL UNIQUE,
        password varchar(80) NOT NULL,
        ppurl varchar(200),
        bio varchar(1000)
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
