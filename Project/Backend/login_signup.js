const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("../../models/User");
const cors = require("cors");

var jsonParser = bodyParser.json()

router.use(jsonParser);

const corsOptions ={
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
      },
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

router.use(cors());

// var urlencodedParser = bodyParser.urlencoded({ extended: false })  

router.post('/login', async (req,res) => {
    console.log("Got")
    console.log(req.body);
    const emailExist = await User.findOne({email: req.body.email});
    console.log(emailExist);
    if(emailExist){
        if(emailExist.password == req.body.password){
            // res.redirect('http://localhost:3000');
            return res.json({...emailExist ,success : true});
        }else{
            return res.send("Wrong Password");
        }
    }else{
        return res.send("Wrong Email");
    }
    res.send(req.body);
});

router.post('/signup', async (req,res)=>{
    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist) return res.status(500).send("Email exist");

    console.log(req.body);
    console.log("F");

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    });
    user.save().then((result) => {
        return res.json({...user ,success : true});
    }).catch(err => res.status(300).send(err));
});

module.exports = router;