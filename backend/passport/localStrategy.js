const { User } = require("../database/models/user");
const LocalStrategy = require("passport-local").Strategy;

const strategy = new LocalStrategy(
  {
    usernameField: "username",
    passwordField: "password", 
  },
  function (empID, password, done) {
    //console.log("We are in LocalStrategy")
    User.findOne({ empID: String(empID) })
      .then((user) => {
        //console.log(user)
        return done(null, user);
      })
      .catch((err) => {
        return done(err);
      });
  }
);

module.exports = strategy;