const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');


const {validateRegisterInput , validateLoginInput} = require('../../util/validators');
const User = require('../../models/User');
const { SECRET_KEY } = require('../../config');



function generateToken(res) {
        const token = jwt.sign({
            id: res.id,
            email: res.email,
            username: res.username

        }, SECRET_KEY, { expiresIn: '1h' });

    return token;
}

module.exports = {
    Mutation: {
        async login(_, { username, password }) {
            const { errors, valid } = validateLoginInput(username, password);
            const user = await User.findOne({ username });
  
            if (!user) {
                errors.general = 'User not found';
                throw new UserInputError('User not found', { errors });
            }

            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }
   
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                errors.general = 'Wrong Credentials';
                throw new UserInputError('Wrong Credentials', { errors });
            }

            const token = generateToken(user);
            return {
                ...user._doc,
                id: user._id,
                token
            };
        },

        async register(_, 
            { 
                registerInput: { username, email, password, confirmPassword } 
            }
            ) {
            //Validate user data
            const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword);
            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }

            //Make sure user doesn't already exist
            const user = await User.findOne({username});
            if (user) {
                throw new UserInputError('Username is taken', {
                    errors: {
                        username: 'This username is taken'
                    }
                });
            }

            // Hash password and create an auth token
            password = await bcrypt.hash(password, 12);

            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            });

            const res = await newUser.save();
   
            const token = generateToken(res);
            

            return {
                ...res._doc,
                id: res._id,
                token
            };
        }

        
    }
};



// parent , args , context , info