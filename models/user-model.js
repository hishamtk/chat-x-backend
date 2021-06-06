const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String
    }, 
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        required: true
    },
    rooms: [
        {
            type: Schema.Types.ObjectId, 
            ref: 'room' 
        }
    ]
});

module.exports = mongoose.model('User', userSchema);
