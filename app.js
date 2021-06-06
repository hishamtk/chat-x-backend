const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
require('dotenv').config()
global.appConfig = require('./config');

const userApiRouter = require('./routes/user-api');

//replacing default mongoose promie with ES6 Promise as it is depreciated.
mongoose.Promise = global.Promise;

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME);

mongoose.connection.once('open', () => {
    console.log('connection has been made..');
}).on('error', (error) => {
    console.log(error);
});

app.use(bodyParser.json())

app.use('/api/', userApiRouter);

app.use((req, res, next) => {
    return res.status(404).send({ msg: 'Requested resounce not found.' });
});

app.listen(process.env.APP_PORT);
console.log('Server listening at port http://localhost:' + process.env.APP_PORT);