const { checkSchema } = require('express-validator');
const User = require('../models/user-model')
const Room = require('../models/room-model')

module.exports = checkSchema({
    partner: {
        notEmpty: {
            errorMessage: 'Partner is required',
        },
        custom: {
            options: (value) => {
                if (value == authUser.id) {
                    throw new Error('Invalid partner');
                }
            },
            options: (value) => {
                return User.findOne({ _id: value }).then(user => {
                    if (Object.is(user, null)) {
                        return Promise.reject('Partner does not exist');
                    }
                })
            },
            options: (value) => {
                return Room.findOne({ users: { $all: [authUser.id, value] } }).then(room => {
                    if (room) {
                        return Promise.reject('Room already exist');
                    }
                })
            }
        }
    },
});