const { sequelize } = require("./SQL");

async function findUserById(userID) {
  let foundUser = null;
  await sequelize
    .query(
      `
        SELECT * FROM users
        WHERE user_id = '${userID}';
    `
    )
    .then((dbRes) => {
      foundUser = dbRes[0][0];
    })
    .catch((error) => console.log(error));
  return foundUser;
}
async function findUserBy(field, value) {
  let result = null;
  await sequelize
    .query(
      `
    SELECT * FROM users WHERE ${field} = '${value}'`
    )
    .then((dbRes) => {
      result = dbRes[0][0];
    })
    .catch((error) => console.log(error));
  return result;
}

async function getUsers() {
  let foundUsers = null;
  await sequelize
    .query(
      `
        SELECT * FROM users;
    `
    )
    .then((dbRes) => {
      foundUsers = dbRes[0];
    })
    .catch((error) => console.log(error));
  return foundUsers;
}

async function createUser(user) {
  console.log(user.password);
  let newUser;
  await sequelize
    .query(
      `
        INSERT INTO users (first_name, last_name, email,password)
        VALUES ('${user.firstname}','${user.lastname}','${user.email}','${user.password}')
        RETURNING *;
    `
    )
    .then((dbRes) => {
      console.log(dbRes[0][0]);
      const { first_name, last_name, email, password, user_id } = dbRes[0][0];
      newUser = {
        firstname: first_name,
        lastname: last_name,
        email: email,
        id: user_id,
      };
      console.log("newUser", newUser);
    })
    .catch((error) => console.log(error));
  return newUser;
}

module.exports = { findUserById, getUsers, createUser, findUserBy };
