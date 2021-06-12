const Message = require('../models/message-model');
const Room = require('../models/room-model');

module.exports = (io, socket) => {

    const handler = async (payload) => {

        try
        {
            const {roomId, msg} = payload;
            socket.join(roomId);

            const newMessage = new Message({
                roomId: roomId,
                senderId: authUser.id,
                mediaType: 'text',
                body: msg
            });

            await newMessage.save();
            await Room.updateOne({_id: roomId}, {latestMessage: newMessage});
            socket.to(roomId).emit('new_message', msg);
        }
        catch (err) {
            throw err;
        }
    }

    socket.on('new_message', handler);
}