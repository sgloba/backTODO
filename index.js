const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const localStrategy = require('passport-local').Strategy
const app = express()

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const port = 4444
const connectionString = 'mongodb+srv://user:user@cluster0.a8nxy.mongodb.net/Cluster0?retryWrites=true&w=majority'

// https://www.digitalocean.com/community/tutorials/api-authentication-with-json-web-tokensjwt-and-passport



app.use(cors());

app.use(cookieParser());
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());



app.listen(port, () => {
    console.log('listen on_: ', + port)
})
app.use('/api', require('./routes'));

mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((req, res) => {
        console.log('db connected')
    })
    .catch(err => console.error(err))