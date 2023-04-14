const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) return done(null, false);
      let submittedPassword = password;
      let storedPassword = user.password;
      const passwordMatch = await bcrypt.compare(
        submittedPassword,
        storedPassword
      );

      if (passwordMatch) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error);
    }
  })
);
isAuthenticated = (req, res, next) => {
  if (req.user) return next();
  res.redirect("/login");
};

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
