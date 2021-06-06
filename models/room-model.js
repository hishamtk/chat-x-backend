const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    name: {
        type: String
    },
    type: {
        type: String,
        required: true
    },
    users: [
        {
            type: Schema.Types.ObjectId, 
            ref: 'user'
        }
    ]
});

module.exports = mongoose.model('Room', roomSchema);
