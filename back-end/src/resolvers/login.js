const { findUserBy } = require("../SQL/user");
const getLocationViaIP = require("../Util/IpFetch");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config();

async function login(_, { email, password }, { ip }) {
  try {
    getLocationViaIP(ip);
    let user = await findUserBy("email", email);
    if (!user || user === "error") {
      //check the username as well
      user = await findUserBy("username", email);
      if (user === "error") {
        return {
          msg: "Can't find user with supplied email or username",
          code: 4,
        };
        throw new Error("No user with that email/username");
      }
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      console.log("nope");
      return {
        msg: "Password validation did not authenticate",
        code: 5,
      };
      throw new Error("Incorrect password");
    }
    //return jwt
    const token = jsonwebtoken.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return {
      token,
      user,
    };
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = login;
