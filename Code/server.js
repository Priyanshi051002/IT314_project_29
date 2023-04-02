const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
//const passportLocalMongoose = require('passport-local-mongoose');
//const http = require('http');
const ejs = require("ejs");
//app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");

const passport = require('passport');
//const { initialize, passport } = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//const { initializingPasssport } = require('./passportConfig');
const expressSession = require('express-session');
//const connectEnsureLogin = require('connect-ensure-login');

const dbURL = 'mongodb+srv://202001449:ITPROJECT_69@cluster0.dtdhh6b.mongodb.net/passport?retryWrites=true&w=majority'
mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true})
	.then((result) => app.listen(3000, () => console.log('Server started on port 3000')))
	.catch((err) => console.log(err));

const userSchema = new mongoose.Schema({
	name: String,
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
});


const User = mongoose.model('User', userSchema);


	
	passport.use(new LocalStrategy(async(username, password, done) => {
		try{
			const user = await User.findOne({username });
			if(!user) return done(null,false);
			let submittedPassword = password;
			let storedPassword = user.password;
			const passwordMatch = await bcrypt.compare(submittedPassword, storedPassword);
			
			if(passwordMatch){
				return done(null, user);
			}
			else{
				return done(null,false);
			}
			
			
		}catch(error){
			return done(error);
		}
	}));

	passport.serializeUser((user, done) => done(null, user.id));

	passport.deserializeUser(async(id, done) => {
		try{
			const user = await User.findById(id);
			done(null, user);
		}catch(error){
			done(error);
		}
	});




app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(expressSession({secret: "secret" , resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
	  
	  res.render('index');
});

app.get('/register', (req, res) => {
	  
	  res.render('register');
	  
});

app.get('/login', (req, res) => {
	res.render('login');
});


app.post('/register',async (req, res) => {
	const user = await User.findOne({username : req.body.username});

	if(user) return res.status(400).send("User already registered");
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
	const newUser = await User.create(req.body);

	 res.status(201).send(newUser);

});

app.post('/login',passport.authenticate('local',{failureRedirect:'/register',successRedirect:'/'}), (req, res) => {
	
});

// app.get('/testing', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
// 	res.render('testing');
// });


