const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const config = require("config");
const { User, validateUser } = require("../models/user");
const { Products, validateProducts } = require("../models/product");

// Register user
router.post("/user", /*auth,*/ async (req, res) => {
    try {
      const { error } = validateUser(req.body);
      if (error) return res.status(400).send(error);
      //TODO: Validation!
      const salt = await bcrypt.genSalt(10);
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, salt),
      });
  
      await user.save();

      const token = jwt.sign(
        {_id: user.id, name: user.name},
        config.get('jwtSecret')
      );
  
      // const token = user.generateAuthToken();
  
      return res
        .header("x-auth-token", token)
        .header("access-control-expose-headers", "x-auth-token")
        .send({ _id: user._id, name: user.name, email: user.email });
  
      return res.send(user);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  });

  //get all the users data
router.get("/user", async (req, res) => {
  try {
    const user = await User.find();
    return res.send(user);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    return res.send(user);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

  //Delete a user

  router.delete("/:user", async (req, res) => {
    //Verify user ID
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Account has been deleted successfully");
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(403).json("You can only delete your own Account");
    }
  });
  
module.exports = router;

