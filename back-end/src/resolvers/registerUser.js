const { createUser } = require("../SQL/user");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config();

async function registerUser(
  root,
  { username, email, password, first_name, last_name }
) {
  console.log("hit");
  try {
    const user = await createUser({
      first_name,
      last_name,
      username,
      email,
      password: await bcrypt.hash(password, 10),
    });
    if (user !== undefined) {
      if (user.id) {
        //the user was successfully created, now create jwt token
        const token = jsonwebtoken.sign(
          { id: user.id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: "1y" }
        );
        //return the jwt token to the user
        return {
          token,
          user,
          message: "Authentication Successful",
        };
      } else {
        //if the user creation had some sort of error
        return user;
      }
    } else {
      //couldn't create the server in the db with no other code
      return { msg: "Can't create in db", code: 1 };
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = registerUser;
