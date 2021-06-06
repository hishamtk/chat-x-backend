const { checkSchema } = require('express-validator');
const User = require('../models/user-model')

module.exports = checkSchema({
    name: {
        notEmpty: {
            errorMessage: 'Name is required',
        },
    },
    email: {
        notEmpty: {
            errorMessage: 'Email is required',
        },
        isEmail: true,
        custom: {
            options: (value) => {
                return User.findOne({ email: value }).then(user => {
                    if (user) {
                        return Promise.reject('Email already in use');
                    }
                })
            }
        }
    },
    password: {
        notEmpty: {
            errorMessage: 'Password is required',
        },
        isLength: {
            errorMessage: 'Password should be at least 8 chars long',
            options: { min: 8 },
        },
    },
});