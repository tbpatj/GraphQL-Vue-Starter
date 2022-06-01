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
  let newUser;
  let sqlRes = await sequelize
    .query(
      `
        INSERT INTO users (username,first_name, last_name, email,password)
        VALUES ('${user.username}','${user.first_name}','${user.last_name}','${user.email}','${user.password}')
        RETURNING *;
    `
    )
    .then((dbRes) => {
      const { first_name, last_name, email, password, id, username } =
        dbRes[0][0];
      newUser = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        id: id,
        username: username,
      };
      console.log("newUser", newUser);
    })
    .catch((error) => {
      console.log(error);
      if (error.name === "SequelizeUniqueConstraintError") {
        let errDet = error.errors[0];
        if (errDet.validatorKey === "not_unique") {
          if (errDet.path === "email")
            return { msg: "Email is not unique", code: "2" };
          if (errDet.path === "username")
            return { msg: "Username is not unique", code: "3" };
        }
      }
      console.log(error);
    });
  //if we return an error then send it back up stack
  if (sqlRes !== undefined) {
    return sqlRes;
  }
  return newUser;
}

module.exports = { findUserById, getUsers, createUser, findUserBy };
