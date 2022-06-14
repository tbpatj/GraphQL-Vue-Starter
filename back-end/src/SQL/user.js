const axios = require("axios");
const { sequelize } = require("./SQL");

async function findUserById(userID) {
  let foundUser = null;
  await sequelize
    .query(
      `
        SELECT * FROM users
        WHERE id = '${userID}';
    `
    )
    .then((dbRes) => {
      foundUser = dbRes[0][0];
      console.log(foundUser);
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
    .catch((error) => {
      result = "error";
      console.log(error);
    });
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
  let picURL = await axios
    .get("http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true")
    .then((res) => {
      console.log("picture");
      console.log(res.data[0].trim());
      return res.data[0].trim().split("\n")[0];
    })
    .catch((err) => {
      console.log(err);
      return "";
    });
  let newUser;
  let sqlRes = await sequelize
    .query(
      `
        INSERT INTO users (username,first_name, last_name, email,password,ppurl,pinged_ips)
        VALUES ('${user.username}','${user.first_name}','${user.last_name}','${user.email}','${user.password}','${picURL}','${user.ip}')
        RETURNING *;
    `
    )
    .then((dbRes) => {
      const { first_name, last_name, email, password, id, username, ppurl } =
        dbRes[0][0];
      newUser = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        id: id,
        username: username,
        ppurl: ppurl,
      };
      console.log("newUser", newUser);
    })
    .catch((error) => {
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
