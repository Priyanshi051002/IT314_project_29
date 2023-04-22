const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
//const passportLocalMongoose = require('passport-local-mongoose');
//const http = require('http');
const ejs = require("ejs");
//app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");

const passport = require("passport");
//const { initialize, passport } = require('passport');
const LocalStrategy = require("passport-local").Strategy;

//const { initializingPasssport } = require('./passportConfig');
const expressSession = require("express-session");
const { create } = require("domain");
const { error } = require("console");
//const connectEnsureLogin = require('connect-ensure-login');

 
// const crypto = require('crypto');
// const verificationCode = crypto.randomBytes(20).toString('hex');
// const nodemailer = require('nodemailer');
// });

// const verificationLink = 'https://localhost:3000/verify?code=${verificationCode}';

const dbURL =
  "mongodb+srv://202001449:ITPROJECT_69@cluster0.dtdhh6b.mongodb.net/passport?retryWrites=true&w=majority";
mongoose
  .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) =>
    app.listen(3000, () => console.log("Server started on port 3000"))
  )
  .catch((err) => console.log(err));

const userSchema = new mongoose.Schema({
  name: String,
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  followers: [String],
  following: [String],
});

//add new schema followers and following for each user
const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  prf_image: {
    type: String,
    default: "default.png",
  },
  bg_image: {
    type: String,
    default: "default.png",
  },
  description: {
    type: String,
    maxlength: 100,
  },
  about: {
    type: String,
    maxlength: 500,
  },
});

const postSchema = new mongoose.Schema({
  body: String,
  title: String,
  createdAt: String,
  comments: [
    {
      body: String,
      username: String,
      createdAt: String,
    },
  ],
  likes: [
    {
      username: String,
      createdAt: String,
    },
  ],
  name: String,
  username: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);
const Profile = mongoose.model("Profile", profileSchema);
const Post = mongoose.model("Post", postSchema);

//const Followers = mongoose.model('Followers', followersSchema);

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  expressSession({ secret: "secret", resave: false, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/register", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });

  if (user) return res.status(400).send("User already registered");
  console.log(req.body);

  // //check password length should be greater than or equal to 8
  // if(req.body.password.length < 8) return res.status(400).send("Password should be greater than or equal to 8 characters");
  // //should contain atleast one uppercase letter
  // if(!req.body.password.match(/[A-Z]/)) return res.status(400).send("Password should contain atleast one uppercase letter");
  // //should contain atleast one special character
  // if(!req.body.password.match(/[!@#$%^&*]/)) return res.status(400).send("Password should contain atleast one special character");

  //verify email

  //encrypt password

  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  req.body.password = hashedPassword;
  const newUser = await User.create(req.body);

  res.status(201).send({
    data: newUser,
    success: true,
    error: null,
  });
  //res.redirect('/verify')
});

app.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/register",

    successRedirect: "/user_post_show",

   
  }),
  (req, res) => {}
);

// app.get('/profile',isAuthenticated,(req,res)=>{
// 	res.send(req.user);
// });

app.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) return next(err);
    res.redirect("/");
  });
});
app.get("/follow", isAuthenticated, (req, res) => {
  res.render("follow");
});
app.get("/unfollow", isAuthenticated, (req, res) => {
  res.render("unfollow");
});
// TODO : make function separte
app.get("/Post", isAuthenticated, (req, res) => {
  res.render("Post");
});

app.get("/post_show", isAuthenticated, (req, res) => {
  res.render("post_show");
});

app.post("/post_show", async (req, res) => {
  try {
    const post = await Post.find().sort({ createdAt: -1 });
    res.status(200).send({ data: post, success: true, error: null });
  } catch (err) {
    res.status(400).send({ data: null, success: false, error: err });
  }
});


app.get("/upost", isAuthenticated, (req, res) => {
  res.render("/upost");
});

app.get("/user_post_show", isAuthenticated, (req, res) => {
  res.render("user_post_show");
});

app.post("/user_post_show", async (req, res) => {
  try {
    const user_id = req.user.username;
    const post = await Post.find({ username: user_id });
    res.status(200).send({ data: post, success: true, error: null });
  } catch (err) {
    res.status(400).send({ data: null, success: false, error: err });
  }
});

// name : name
// username : email

app.post("/Post", async (req, res) => {
  //check if post is empty
  if (req.body.body.trim() === "") {
    return res.status(400).json({ body: "Body must not be empty" });
  }
  //
  const newPost = new Post({
    title: req.body.title,
    body: req.body.body,
    createdAt: new Date().toISOString(),
    name: req.user.name,
    username: req.user.username,
  });

  const new_post = await newPost.save();
  return res.status(201).send({ data: new_post, success: true, error: null });
});

app.get("/del_Post", isAuthenticated, (req, res) => {
  res.render("del_Post");
});

app.post("/del_Post", async (req, res) => {

  try {
    const post = await Post.findById(req.Post._id);
    if (!post) {
      return res.status(404).send({ data: null, success: false, error: "Post not found" });
    }
    if (req.user.username === post.username) {
      await post.deleteOne(); // check if this works
      return res.status(200).send({ data: null, success: true, error: null });
    } else {
      return res.status(403).send({ data: null, success: false, error: "Unauthorized" });
    }
  } catch (err) {
    console.log(err);
  }
});
app.get('/like_Post',isAuthenticated,(req,res)=>{
  res.render('like_Post');
});
app.post("/like_Post", async (req, res) => {
   // see if this works
  try {
    const post = await Post.findById(req.body.postid);
    if (post) {
      if (post.likes.find((like) => like.username === req.user.username)) {
        // Post already likes, unlike it
        post.likes = post.likes.filter((like) => like.username !== req.user.username); // filter out the like

      } else {
        // Not liked, like post
        post.likes.push({
          // push to the array

          username: req.user.username,

          createdAt: new Date().toISOString(), // current time
        });
      }
      await post.save();

      return res.status(200).send({ data: post, success: true, error: null });

    }
  } catch (err) {
    console.log(err);
  }
});

//add a follower in the followers array of a user
app.post("/follow", async (req, res) => {
  //get the username of the user who is being followed
  const follwedUser = req.body.username;
  //get the username of the user who is following
  const follower = req.user.username;

  //check if the user is already following the user

  //add the follower in the followers array of the user
  const x = await User.findOneAndUpdate(
    { username: follwedUser },
    { $push: { followers: follower } },
    { new: true }
  )
    .then((result) => {})
    .catch((err) => {
      res.send(err);
    });
  //add the user in the following array of the follower
  const y = await User.findOneAndUpdate(
    { username: follower },
    { $push: { following: follwedUser } },
    { new: true }
  )
    .then((result) => {
      res.send("done");
    })
    .catch((err) => {
      res.send(err);
    });
});
//unfollow a user
app.post("/unfollow", async (req, res) => {
  //get the username of the user who is being unfollowed
  const unfollwedUser = req.body.username;
  //get the username of the user who is unfollowing
  const unfollower = req.user.username;

  //delete the unfollower in the followers array of the user
  const Updatedfolloweduser = await User.findOneAndUpdate(
    { username: unfollwedUser },
    { $pull: { followers: unfollower } },
    { new: true }
  )
    .then((result) => {})
    .catch((err) => {
      res.send(err);
    });
  //delete the user in the following array of the unfollower
  const UpdatedfollowedrserUser = await User.findOneAndUpdate(
    { username: unfollower },
    { $pull: { following: unfollwedUser } },
    { new: true }
  )
    .then((result) => {
      res.send("done");
    })
    .catch((err) => {
      res.send(err);
    });
});
