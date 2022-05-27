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
    const token = jsonwebtoken.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1y" }
    );
    return {
      token,
      ...user,
      message: "Authentication Successful",
    };
  } catch (err) {
    console.log(err);
  }
}

module.exports = registerUser;
