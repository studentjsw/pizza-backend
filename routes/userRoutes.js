const express = require("express");

const User =require ("../model/UserModel.js");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const newUser = new User({ name, email, password });

  try {
    newUser.save();
    res.status(200).send({ msg: "User Registered Successfully" });
  } catch (error) {
    res.status(400).send({ msg: error });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.find({ email, password });

    if (user.length > 0) {
      const currentUser = {
        name: user[0].name,
        email: user[0].email,
        isAdmin: user[0].isAdmin,
        _id: user[0]._id,
      };

      res.send(currentUser);
    } else {
      res.status(400).send({ msg: "User Login FAILED" });
    }
  } catch (error) {
    res.status(400).send({ msg: "Something went Wrong" });
  }
});
userRouter.get("/getallusers", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

userRouter.post("/deleteuser", async (req, res) => {
  const userid = req.body.userid;

  try {
    await User.findOneAndDelete({ _id: userid });
    res.send("User Deleted Successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = userRouter;