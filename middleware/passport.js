// const LocalStrategy = require("passport-local")
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../db/models");
const bcrypt = require("bcrypt");

exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({
      where: { username: username },
    });
    const passwordsMatch = user
      ? await bcrypt.compare(password, user.password)
      : false;
    // passwordsMatch = true if user has a value (if user exiest), or false if user not found or passwords
    //not match
    if (passwordsMatch) {
      return done(null, user);
    } else {
      return done({ status: 401, message: "Incorrect Username or Password" });
    }
        // insted of lines (16-20) return done(null, passwordsMatch ? user : false)
  } catch (error) {
    done(error);
  }
});
