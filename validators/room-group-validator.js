const { checkSchema } = require('express-validator');
const User = require('../models/user-model')
const Room = require('../models/room-model')

module.exports = checkSchema({
    partners: {
        notEmpty: {
            errorMessage: 'Partner is required',
        },
        bail: true,
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
                    throw new Error('Invalid parntners');
                }

                return User.countDocuments({ _id: { $in: value } }).then(count => {
                    if (count != value.length) {
                        return Promise.reject('Partner does not exist');
                    }
                })
            },
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