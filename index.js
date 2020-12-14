const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const app = express()

require('./controllers/auth')

mongoose.Promise = global.Promise;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const port = 4444
const connectionString = 'mongodb+srv://user:user@cluster0.a8nxy.mongodb.net/Cluster0?retryWrites=true&w=majority'



app.use(cors());

app.use(cookieParser());
app.use(bodyParser());
app.use(passport.initialize());

passport.authenticate('jwt', { session: false })


app.listen(port, () => {
    console.log('listen on_: ', + port)
})
app.use('/api', require('./routes'));

mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((req, res) => {
        console.log('db connected')
    })
    .catch(err => console.error(err))



