const passport = require("passport");
const LocalStrategy = require("./localStrategy");
const { User } = require("../database/models/user");
const mongoose = require("mongoose");

// called on login, saves the id to session req.session.passport.user = {id:'..'}
passport.serializeUser((user, done) => {
  console.log("*** serializeUser called, user: ");
  //console.log(user) // the whole raw user object!
  console.log("---------");
  done(null, { empID: user.empID });
});

// user object attaches to the request as req.user
passport.deserializeUser((id, done) => {
  console.log("DeserializeUser called");

  User.findOne({ username: String(id.username) }).then((user) => {
    console.log("*** Deserialize user, user:");

    console.log("--------------");
    done(null, user);
  });
});

//  Use Strategies
passport.use(LocalStrategy);

module.exports = passport;