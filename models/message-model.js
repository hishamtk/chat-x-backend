const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    roomId: {
        type: Schema.Types.ObjectId, 
        ref: 'room'
    },
    senderId: { 
        type: Schema.Types.ObjectId, 
        ref: 'user'
    },
    mediaType: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Message', messageSchema);
