const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { User } = require("../mongodb");

module.exports = function (passport) {
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id).then((user) => {
      done(null, user);
    });
  });

  passport.use(
    "local",
    new localStrategy({ usernameField: "email" }, (email, password, done) => {
      //Match User

      User.findOne({ email: email })
        .then((user) => {
          if (!user) {
            return done(null, false, { message: "Email is not registered" });
          }
          //Match Password

          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Password is incorrect" });
            }
          });
        })
        .catch((err) => console.log(err));
    })
  );
};
