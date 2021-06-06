const mongoose = require('mongoose');
require('dotenv').config()
global.appConfig = require('../config');

//replacing default mongoose promie with ES6 Promise as it is depreciated.
mongoose.Promise = global.Promise;

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

//connect to db before start test
before((done) => {

	//connect to database
	const uri = process.env.TEST_DB_HOST + ':' + process.env.TEST_DB_PORT + '/' + process.env.TEST_DB_NAME;
	mongoose.connect('mongodb://' + uri);

	mongoose.connection.once('open', function () {
		console.log('connection has been made..');
		done();
	}).on('error', function (error) {
		console.log(error);
	});
});

after(() => {
	mongoose.connection.close();
})
