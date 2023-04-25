const express = require("express");
const client = require("./elasticSearch/connection");
const indexSettings = require("./elasticSearch/mappings_and_settings");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const mongoose = require("mongoose");
// const expressSession = require("express-session");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");

const dbURL =
  "mongodb+srv://202001449:ITPROJECT_69@cluster0.dtdhh6b.mongodb.net/passport?retryWrites=true&w=majority";
mongoose
  .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) =>
    app.listen(port, () => console.log("Server started on port 5000"))
  )
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(
//   expressSession({ secret: "secret", resave: false, saveUninitialized: false })
// );

client.ping(
  {
    requestTimeout: 30000,
  },
  function (error) {
    if (error) {
      console.error("Elasticsearch cluster is down!");
    } else {
      console.log("Everything is ok");
      app.listen(7000, () => console.log("Server started on port 7000"));
    }
  }
);

// Check if the index named post exists or not if not create it with mapping and analyzer settings
client.indices.exists(
  {
    index: "post",
  },
  (err, res, status) => {
    if (res) {
      console.log("index already exists");
    } else {
      client.indices.create(
        {
          index: "post",
          body: indexSettings,
        },
        (err, res, status) => {
          if (err) {
            console.log(err);
          } else {
            console.log("created a new index", res);
          }
        }
      );
    }
  }
);

app.use("/user", userRoutes);
app.use("/post", postRoutes);

// app.post(
//   "/login",
//   passport.authenticate("local", {
//     failureRedirect: "/register",
//     successRedirect: "/",
//   }),
//   (req, res) => {}
// );

// app.get("/profile", isAuthenticated, (req, res) => {
//   res.send(req.user);
// });

// app.get("/logout", (req, res) => {
//   req.logout(function (err) {
//     if (err) return next(err);
//     res.redirect("/");
//   });
// });

// app.get('/testing', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
// 	res.render('testing');
// });

// const profileSchema = new mongoose.Schema({
//   user: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   name :{ type : String
//   },
//   description: {
//     type: String,
//     maxlength: 100,
//   },
//   about: {
//     type: String,
//     maxlength: 500,
//   },
// });

// //suggest github
// const Profile = mongoose.model("Profile", profileSchema);
// app.post('/verified',authenticateToken,async (req,res)=>{
//   //console.log(req.user.username);
//   res.send('verified');
// });

// app.post("/createProfile",authenticateToken,async (req, res) => {
//   try {
//     const { name,description,about } = req.body;

//     const profile = new Profile();
//     console.log(req.user.username);
//     profile.user = req.user.username;
//     console.log(req.user.username);

//     profile.name = name;
//     profile.description = description;
//     profile.about = about;

//     await profile.save();
//     res.send(profile);
//   } catch (err) {
//     console.log(err);
//     res.redirect('/create-profile');
//   }
// });
// //update profile

// app.post("/edit_profile",authenticateToken, async (req, res) => {
//   try {
//     //find profile from schema
//     const profile = await Profile.findOne({ user: req.user.username });
//     //update profile
//     //check if not found
//     if (!profile) {
//       return res.send("Profile not found");
//     }
//     else
//     {
//       profile.name = req.body.name;
//       profile.description = req.body.description;
//       profile.about = req.body.about;
//       await profile.save();
//       return res.send(profile);
//     }

//   } catch (err) {
//     console.log(err);
//     res.redirect('/edit-profile');
//   }
// });
// //add a follower in the followers array of a user
// app.post("/follow", async (req, res) => {
//   //get the username of the user who is being followed
//   const follwedUser = req.body.username;
//   //get the username of the user who is following
//   const follower = req.user.username;

//   //check if the user is already following the user

//   //add the follower in the followers array of the user
//   const x = await User.findOneAndUpdate(
//     { username: follwedUser },
//     { $push: { followers: follower } },
//     { new: true }
//   )
//     .then((result) => {})
//     .catch((err) => {
//       res.send(err);
//     });
//   //add the user in the following array of the follower
//   const y = await User.findOneAndUpdate(
//     { username: follower },
//     { $push: { following: follwedUser } },
//     { new: true }
//   )
//     .then((result) => {
//       res.send("done");
//     })
//     .catch((err) => {
//       res.send(err);
//     });
// });
// //unfollow a user
// app.post("/unfollow", async (req, res) => {
//   //get the username of the user who is being unfollowed
//   const unfollwedUser = req.body.username;
//   //get the username of the user who is unfollowing
//   const unfollower = req.user.username;

//   //delete the unfollower in the followers array of the user
//   const Updatedfolloweduser = await User.findOneAndUpdate(
//     { username: unfollwedUser },
//     { $pull: { followers: unfollower } },
//     { new: true }
//   )
//     .then((result) => {})
//     .catch((err) => {
//       res.send(err);
//     });
//   //delete the user in the following array of the unfollower
//   const UpdatedfollowedrserUser = await User.findOneAndUpdate(
//     { username: unfollower },
//     { $pull: { following: unfollwedUser } },
//     { new: true }
//   )
//     .then((result) => {
//       res.send("done");
//     })
//     .catch((err) => {
//       res.send(err);
//     });
// });
// app.get("/forget", (req, res) => {
//   res.render("forget");
// }
// );
// app.post("/forget", async (req, res) => {
//   const { username, birthplace } = req.body;
//   const user = await User.findOne({ username });
//   if (user) {
//     if (user.birthplace === birthplace) {
//       res.render("updatepassword");
//     } else {
//       res.send("wrong birthplace");
//     }
//   } else {
//     res.send("user not found");
//   }
// });
// app.get("/updatepassword", (req, res) => {
//   res.render("updatepassword");
// });

// app.post("/updatepassword", async (req, res) => {
//   const hashedPassword = await bcrypt.hash(req.body.password, 10);
//   req.body.password = hashedPassword;
//   const user = await User.findOneAndUpdate({ username: req.body.username },{password : req.body.password});
//   res.send("password updated");

// } );

// app.post('/getUser',authenticateToken,async (req,res)=>{
//   //get all the users with name

// }
