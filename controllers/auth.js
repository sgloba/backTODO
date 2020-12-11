const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const userModel = require('../models/user');

passport.use(
    'signup',
    new localStrategy(
        {
            usernameField: 'username',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try {
                const user = await userModel.create({email, username, password});

                return done(null, user);
            } catch (err) {
                done(err);
            }
        }
    )
);

passport.use(
    'login',
    new localStrategy(
        {
            usernameField: 'username',
            passwordField: 'password'
        },
        async (username, password, done) => {
            try {
                const user = await userModel.findOne({username});

                if(!user) {
                    return done(null, false, {message: 'User not found'});
                }

                const validate = await user.isValidPassword(password);

                if(!validate) {
                    return done(null, false, {message: 'Wrong password'});
                }
                return done(null, user, {message: 'Logged if successful'});
            } catch (err) {
                return done(err)
            }
        }
    )
)