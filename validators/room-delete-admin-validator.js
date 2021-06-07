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
    member: {
        notEmpty: {
            errorMessage: 'Member required',
            bail: true
        },
        isString: true,
        bail: true,
        custom: {
            options: (value) => {
                return User.findOne({ _id: value }).then(user => {
                    if (Object.is(user, null)) {
                        return Promise.reject('Member does not exist');
                    }
                })
            },
        }
    },
});