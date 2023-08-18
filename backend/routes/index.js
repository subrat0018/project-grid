const express = require("express");
const router = express.Router();
const { User } = require("../database/models/user");
const passport = require("../passport");
//This function handles & serves the signup requests
//Creates a new user using the Database' User Schema and stores it 
router.post("/signup", (req, res) => {
  console.log("user signup");

  const { name, email, password } = req.body;
  // ADD VALIDATION
  User.findOne({ email:email}).then((err, user) => {
    if (err) {
      console.log("User.js post error: ", err);
    } else if (user) {
      res.json({
        error: `Sorry, already a user with the username: ${empID}`,
      });
    } else {
      const newUser = new User({
        name: name,
        email: email,
        password: password,
      });
      newUser.save().then((err, savedUser) => {
        if (err) return res.json(err);
        res.json(savedUser);
      });
    }
  });
});
module.exports = router