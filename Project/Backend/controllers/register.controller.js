const User = require("../models/register.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();

exports.loginfunc = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const user = await User.findOne({ username: username });
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      user.password = null;
      user.confirmPassword = null;
      console.log(process.env.ACCESS_TOKEN_SECRET);
     const acesstoken = jwt.sign({username : user.username},process.env.ACCESS_TOKEN_SECRET,(err,token)=>{
        if(err){
          console.log(err);
          return res.json({
            success: false,
            error: "Error!",
          });
        }
        else{
          // req.user = user;
          // console(req.user.username);
          return res.json({
            success: true,
            data: token,
            error: "",
          });
        }
      });

       //user.token = acesstoken;

      // return res.json({
      //   success: true,
      //   data: user,
      //   error: "",
      // });
    } else {
      return res.json({
        success: false,
        error: "Invalid Login Credentials!",
        data: {},
      });
    }
  } catch (error) {
    return res.status(404).send({
      data: {},
      success: false,
      error: "Internal server error",
    });
  }
};

exports.registerfunc = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });

  if (user) return res.status(400).send("User already registered");
  console.log(req.body);

  // //check password length should be greater than or equal to 8
  // if(req.body.password.length < 8) return res.status(400).send("Password should be greater than or equal to 8 characters");
  // //should contain atleast one uppercase letter
  // if(!req.body.password.match(/[A-Z]/)) return res.status(400).send("Password should contain atleast one uppercase letter");
  // //should contain atleast one special character
  // if(!req.body.password.match(/[!@#$%^&*]/)) return res.status(400).send("Password should contain atleast one special character");

  //encrypt password

  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  req.body.password = hashedPassword;
  const newUser = await User.create();
  newUser.name = req.body.name;
  newUser.username = req.body.username;
  newUser.password = req.body.password;
  newUser.birthplace = req.body.birthplace;

  await newUser.save();

  res.status(201).send({
    data: newUser,
    success: true,
    error: "",
  });
};
