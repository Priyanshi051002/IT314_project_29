const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const dbURL = 'mongodb+srv://202001449:ITPROJECT_69@cluster0.dtdhh6b.mongodb.net/passport?retryWrites=true&w=majority'
mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true})
	.then((result) => console.log('connected to db'))
	.catch((err) => console.log(err));

