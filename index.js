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

const { PORT=3000, LOCAL_ADDRESS='0.0.0.0' } = process.env

const connectionString = 'mongodb+srv://user:user@cluster0.a8nxy.mongodb.net/Cluster0?retryWrites=true&w=majority'



app.use(cors());

app.use(cookieParser());
app.use(bodyParser());
app.use(passport.initialize());

passport.authenticate('jwt', { session: false })


app.listen(PORT, LOCAL_ADDRESS, () => {
    console.log('server listening at', PORT);
});

app.use('/api', require('./routes'));

mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((req, res) => {
        console.log('db connected')
    })
    .catch(err => console.error(err))



