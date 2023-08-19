const express = require("express");
const router = express.Router();
const { User } = require("../database/models/user");
//This function handles & serves the signup requests
//Creates a new user using the Database' User Schema and stores it 
router.post("/signup", async (req, res) => {
  console.log("user signup");

  const { name, email, userType, walletAddress} = req.body;
  // ADD VALIDATION
  const user = await User.findOne({walletAddress: walletAddress})
  if(user)
  {
    res.json({
      error: `Sorry, already a user with the walletAddress: ${walletAddress}`,
    });
  }
  else
  {
    const newUser = new User({
      name: name,
      email: email,
      userType: userType,
      walletAddress: walletAddress
    });
    newUser.save().then((err, savedUser) => {
      if (err) return res.json(err);
      res.json(savedUser);
    });
  }
});
router.post("/getdetails",async (req,res)=>{
  const {walletAddress} = req.body
  const user = await User.findOne({walletAddress: walletAddress});
  res.send(user)
 
})
router.get("/getsellers", async (req, res)=>{
  const users = await User.find();
  sellers = new Array();
  users.forEach(user => {
    if(user.userType === "Seller")
    {
      sellers.push(user);
    }
  });
  res.send(sellers);
});



module.exports = router