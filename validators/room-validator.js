const { checkSchema } = require('express-validator');
const Room = require('../models/room-model');

module.exports = checkSchema({
    id: {
        custom: {
            options: (value) => {
                return Room.findOne({ _id: value }).then(room => {
                    if (Object.is(room, null)) {
                        return Promise.reject('Room does not exist');
                    }
                    if (room.type == 'private') {
                        return Promise.reject('Room is not a group');
                    }
                })
            }
        }
    },
    name: {
        notEmpty: {
            errorMessage: 'Name is required',
        },
        isString: true,
    },
    description: {
        isString: true,
        isLength: {
            errorMessage: 'Description can contain a maximum of 255 characters only',
            options: { max: 255 },
        },
    }
});