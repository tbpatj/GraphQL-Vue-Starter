const { findUserBy } = require("../SQL/user");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config();

async function login(_, { email, password }) {
  try {
    const user = await findUserBy("email", email);
    if (!user) {
      throw new Error("No user with that email");
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
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
