const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const userModel = require('../models/user');

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(
    'signup',
    new localStrategy(
        {
            usernameField: 'username',
            passwordField: 'password'
        },
        async (username, password, done) => {
            try {
                const user = await userModel.create({username, password});

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
                console.log('contorller.auth login')
                const user = await userModel.findOne({username});

                if(!user) {
                    return done(null, false, {message: 'User not found'});
                }

                const validate = await user.isValidPassword(password);

                if(!validate) {
                    return done(null, false, {message: 'Wrong password'});
                }
                return done(null, user, {message: 'Logged in successful'});
            } catch (err) {
                return done(err)
            }
        }
    )
)

passport.use(
    new JWTstrategy(
        {
            secretOrKey: 'TOP_SECRET',
            jwtFromRequest: ExtractJWT.fromHeader(('secret_token'))
        },
        async (token, done) => {
            try {
                return done(null, token.user);
            } catch (error) {
                done(error);
            }
        }
    )
);