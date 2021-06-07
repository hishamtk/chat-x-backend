const { checkSchema } = require('express-validator');
const User = require('../models/user-model')
const Room = require('../models/room-model')

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
    members: {
        notEmpty: {
            errorMessage: 'Members required',
            bail: true
        },
        isArray: true,
        bail: true,
        customSanitizer: {
            options: (value) => {
                let sanitizedValue = value.filter(x => x != authUser.id);
                return sanitizedValue;
            },
        },
        custom: {
            options: (value) => {
                value = value.filter(x => x != authUser.id);
                if (value.length == 0) {
                    throw new Error('Invalid members');
                }

                return User.countDocuments({ _id: { $in: value } }).then(count => {
                    if (count != value.length) {
                        return Promise.reject('Members does not exist');
                    }
                })
            },
        }
    },
});