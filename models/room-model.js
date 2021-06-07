const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    ]
});

module.exports = mongoose.model('Room', roomSchema);
