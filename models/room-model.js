const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Message = require('./message-model');

const roomSchema = new Schema({
    name: {
        type: String
    },
    description: String,
    type: {
        type: String,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId, 
        ref: 'user',
        required: true
    },
    admins: [
        {
            type: Schema.Types.ObjectId, 
            ref: 'user',
            required: true
        }
    ],
    users: [
        {
            type: Schema.Types.ObjectId, 
            ref: 'user'
        }
    ],
    latestMessage: { type: Message.schema }
});

module.exports = mongoose.model('Room', roomSchema);
