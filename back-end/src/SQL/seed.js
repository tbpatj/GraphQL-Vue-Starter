const { sequelize } = require("./SQL");

function seedDB() {
  sequelize
    .query(
      `
    drop table if exists users;
    
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        first_name varchar(50) NOT NULL,
        last_name varchar(50) NOT NULL,
        email varchar(40) NOT NULL UNIQUE,
        password varchar(80) NOT NULL
    );

    
    `
    )
    .then((dbRes) => {
      console.log("seeded");
    })
    .catch((err) => console.log(err));
}
seedDB();
