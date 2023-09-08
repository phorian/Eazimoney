const User = require('../../models/User');
const { ApolloError } = require('apollo-server-errors');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

module.exports = {
    Mutation: {
        async registerUser(_, {registerInput: {username, email, password} }) {
           //Check if old user exists
           const oldUser = await User.findone({email});

           //Throw error if uer exists

           if (oldUser) {
            throw new ApolloError('User with this email already exists')
       }
           //Encrypt password for security

           var encryptpwd = await bcrypt.hash(password, 10);

           //Mongoose model

           const newUser = new User({

                username: username,
                email: email.toLowerCase(),
                password: encryptpwd
           });

           //create JWT

           const token = jwt.sign(
                {user_id: newUser._id, email },
                {
                    expiresIn: "30m"
                }
           );

           newUser.token = token;

           //Save User in mongoDB

           const res = await newUser.save();
           id: res.id,
           ...res._doc


        },

        async loginUser(_, {loginInput: {email, password} }) {
            //See if user exist

            const user = await User.findone({email});

            //check if password is correct
            if(user && (await bcrypt.compare(password, user.password))){
                //Create New token
                const token = jwt.sign(
                    {user_id: newUser._id, email },
                    {
                        expiresIn: "30m"
                    }
               );

                // Attach token to user model
               user.token = token;

               return{
                id: user.id,
                ...user._doc
               }
            } else {
                  //If user doesnt exist, throw error
                throw new ApolloError('Incorrect password');
            }
        }
    },

    
    Query: {
        user: (_, {ID}) => User.findById(ID)
    }
}