// const express = require('express');

// const app = express();

// app.set('view engine','ejs');	

// app.listen(3000);

// app.get('/',(req,res) => {
// 	//res.send('<p> home page </p> ');
// 	//res.sendfile('./views/index.html',{root : __dirname});
// 	res.render(   )

// });

// app.get('/about',(req,res) => {
// 	res.send('<p> home page </p> ');

// });

// //redirect thing 
// app.get('/about-us',(req,res) => {
// 	res.redirect('/about');
// });
// //for rest
// app.use((req,res) => {
// 	res.status(404).sendFile('./views/error.html',{root : __dirname})
// });  

const express = require('express');
const http = require('http');
const bcrypt = require('bcrypt');
const path = require("path");
const bodyParser = require('body-parser');
const { isLength } = require('lodash');
const users = require('./data').userDB;
const app = express();
const server = http.createServer(app);
const mongoose = require('mongoose');
const dbURL = 'mongodb+srv://202001449:ITPROJECT_69@cluster0.dtdhh6b.mongodb.net/firstdb?retryWrites=true&w=majority'
mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true})
	.then((result) => app.listen(3000))
	.catch((err) => console.log(err));
app.use(express.urlencoded({extended: true}));
app.use(express.static('./views',{root: __dirname}));



app.get('/',(req,res) => {
    res.sendFile('./views/index.html',{root: __dirname});
});
//get login.html page
app.get('/login.html',(req,res) => {
    res.sendFile('./views/login.html',{root: __dirname});
});
//get registration.html page
app.get('/registration.html',(req,res) => {
    res.sendFile('./views/registration.html',{root: __dirname});
});

//get test.html only if user is logged in
// app.get('/test.html', passport.authenticate('bearer', { session: false }), (req, res) => {
//     res.sendFile('./views/test.html',{root: __dirname});
// });

app.post('/register', async (req, res) => {
    try{
        let foundUser = users.find((data) => req.body.email === data.email);
        if (!foundUser){

			let hashPassword = await bcrypt.hash(req.body.password, 10);
            //check password length
            if(req.body.password.length < 8){
                res.send("<div align ='center'><h2>Password must be at least 8 characters</h2></div><br><br><div align='center'><a href='./registration.html'>Register again</a></div>");
            }
            //check if password contains a special character
            else if(!req.body.password.match(/[!@#$%^&*(),.?":{}|<>]/)){
                res.send("<div align ='center'><h2>Password must contain a special character</h2></div><br><br><div align='center'><a href='./registration.html'>Register again</a></div>");
            }
            //check if password contains a number
            else if(!req.body.password.match(/[0-9]/)){
                res.send("<div align ='center'><h2>Password must contain a number</h2></div><br><br><div align='center'><a href='./registration.html'>Register again</a></div>");
            }
            else{

                console.log(typeof req.body.password);
                console.log(req.body.password.length);
                
                let newUser = {
                    id: Date.now(),
                    username: req.body.username,
                    email: req.body.email,
                    password: hashPassword,
                };

                users.push(newUser);
                console.log('User list', users);
                console.log(users);
                res.send("<div align ='center'><h2>Registration successful</h2></div><br><br><div align='center'><a href='./login.html'>login</a></div><br><br><div align='center'><a href='./registration.html'>Register another user</a></div>");
                console.log(users);
            }
            
		
        } 
		else{
            res.send("<div align ='center'><h2>Email already used</h2></div><br><br><div align='center'><a href='./registration.html'>Register again</a></div>");
        }
    } catch{
        res.send("Internal server error");
    }
});

app.post('/login', async (req, res) => {
    try{
        let foundUser = users.find((data) => req.body.email === data.email);
        if (foundUser) {
    
            let submittedPass = req.body.password; 
            let storedPass = foundUser.password; 
    
            const passwordMatch = await bcrypt.compare(submittedPass, storedPass);
            if (passwordMatch) {
                let usrname = foundUser.username;
                res.send(`<div align ='center'><h2>login successful</h2></div><br><br><br><div align ='center'><h3>Hello ${usrname}</h3></div><br><br><div align='center'><a href='./login.html'>logout</a></div>`);
            } else {
                res.send("<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align ='center'><a href='./login.html'>login again</a></div>");
            }
        }
        else {
    
            let fakePass = `$2b$$10$ifgfgfgfgfgfgfggfgfgfggggfgfgfga`;
            await bcrypt.compare(req.body.password, fakePass);
    
            res.send("<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align='center'><a href='./login.html'>login again<a><div>");
        }
    } catch{
        res.send("Internal server error");
    }
});


