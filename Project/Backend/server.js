const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
//const passportLocalMongoose = require('passport-local-mongoose');
//const http = require('http');
// const ejs = require("ejs");
//app.use(express.urlencoded({extended: true}));
const passport = require("passport");
const expressSession = require("express-session");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  expressSession({ secret: "secret", resave: false, saveUninitialized: false })
);
app.use(passport.initialize());

app.use(passport.session());
// app.set("view engine", "ejs");

//const { initialize, passport } = require('passport');
// const LocalStrategy = require("passport-local").Strategy;

//const { initializingPasssport } = require('./passportConfig');
//const connectEnsureLogin = require('connect-ensure-login');
const dbURL =
  "mongodb+srv://202001449:ITPROJECT_69@cluster0.dtdhh6b.mongodb.net/passport?retryWrites=true&w=majority";
mongoose
  .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) =>
    app.listen(port, () => console.log("Server started on port 5000"))
  )
  .catch((err) => console.log(err));

const userRoutes = require("./routes/user.routes");

// passport.use(
//   new LocalStrategy(async (username, password, done) => {
//     try {
//       const user = await User.findOne({ username });
//       if (!user) return done(null, false);
//       let submittedPassword = password;
//       let storedPassword = user.password;
//       const passwordMatch = await bcrypt.compare(
//         submittedPassword,
//         storedPassword
//       );

//       if (passwordMatch) {
//         return done(null, user);
//       } else {
//         return done(null, false);
//       }
//     } catch (error) {
//       return done(error);
//     }
//   })
// );
// isAuthenticated = (req, res, next) => {
//   if (req.user) return next();
//   res.redirect("/login");
// };

// passport.serializeUser((user, done) => done(null, user.id));

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id);
//     done(null, user);
//   } catch (error) {
//     done(error);
//   }
// });

// app.get("/", (req, res) => {
//   res.render("index");
// });

// app.get("/register", (req, res) => {
//   res.render("register");
// });

// app.get("/login", (req, res) => {
//   res.render("login");
// });

app.use("/user", userRoutes);

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

app.get('/follow',isAuthenticated,(req,res)=>{
	res.render('follow');
});
app.get('/unfollow',isAuthenticated,(req,res)=>{
	res.render('unfollow');
});
//add a follower in the followers array of a user
app.post('/follow',async (req,res)=>{
	//get the username of the user who is being followed
	const follwedUser = req.body.username;
	//get the username of the user who is following
	const follower = req.user.username;

	//check if the user is already following the user

	//add the follower in the followers array of the user
	const x = await User.findOneAndUpdate({username : follwedUser},{$push : {followers : follower}},{new : true})
	.then((result)=>{
		;
	})
	.catch((err)=>{
		res.send(err);
	});
	//add the user in the following array of the follower
	const y = await User.findOneAndUpdate({username : follower},{$push : {following : follwedUser}},{new : true})
	.then((result)=>{
		res.send('done');
	})
	.catch((err)=>{
		res.send(err);
	});
});
//unfollow a user
app.post('/unfollow',async (req,res)=>{
	//get the username of the user who is being unfollowed
	const unfollwedUser = req.body.username;
	//get the username of the user who is unfollowing
	const unfollower = req.user.username;

	//delete the unfollower in the followers array of the user
	const Updatedfolloweduser =await User.findOneAndUpdate({username : unfollwedUser},{$pull : {followers : unfollower}},{new : true})
	.then((result)=>{
		;
	})
	.catch((err)=>{
		res.send(err);
	});
	//delete the user in the following array of the unfollower
	const UpdatedfollowedrserUser = await User.findOneAndUpdate({username : unfollower},{$pull : {following : unfollwedUser}},{new : true})
	.then((result)=>{
		res.send('done');
	})
	.catch((err)=>{
		res.send(err);
	});

});

