const User = require('../models/user-model');
const jwt = require('jsonwebtoken');
const newMessageHandler = require('./new-message-handler');

module.exports = (io) => {

	io.use( async (socket, next) => {
		const options = { expiresIn: appConfig.jwt.expiry, issuer: appConfig.jwt.issuer };
		const result = jwt.verify(socket.handshake.auth.token, appConfig.jwt.secret, options);
        authUser = await User.findOne({ _id: result.id });
		if (authUser) {
			next();
		}
		else {
			const err = new Error("Unauthenticated");
			err.data = { content: "Wrong token" };
			next(err);
		}
	});

	const onConnection = (socket) => {
		console.log('new user connected');
		newMessageHandler(io, socket);		
	}

	io.on('connection', onConnection);

};