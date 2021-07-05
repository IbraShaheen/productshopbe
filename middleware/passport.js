// const LocalStrategy = require("passport-local")
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../db/models");
const bcrypt = require("bcrypt");
const JWTSrategy = require("passport-jwt").Strategy;
const JWT_SECRET = require("../config/keys")

const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;


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


exports.jwtSrategy = new JWTSrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: "asupersecretkey", // insted of JWT_SECRET we wrote "asupersecretkey"
  },

  async (payload, done) => {
    if (Date.now() > payload.exp) {
      return done(null, false); // this will throw a 401
    }
    try {
      const user = await User.findByPk(payload.id); 
      done(null, user); // if there is no user, this will throw a 401
    } catch (error) {
      done(error);
    }
  }

)