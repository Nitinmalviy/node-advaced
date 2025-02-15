const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const authModel = require("../model/auth.model");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await authModel.findOne({ username });

      if (!user) return done(null, false, { message: "User Not Found" });

      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) return done(null, user);
      else return done(null, false, { message: "Incorrect Password" });
    } catch (error) {
      console.error(`error ------ passport js config -----> ${error}`);
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  console.log("We are inside serializeUser");
  done(null, user._id);
});

passport.deserializeUser(async (_id, done) => {
  try {
    console.log("We are inside deserializeUser");
    const user = await authModel.findById(_id);
    done(null, user);
  } catch (error) {
    console.error("Error ---- >", error.message);
    done(error);
  }
});


