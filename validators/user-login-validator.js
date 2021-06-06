const { checkSchema } = require('express-validator');
const User = require('../models/user-model')

module.exports = checkSchema({
    email: {
        notEmpty: {
            errorMessage: 'Email is required',
        },
        isEmail: true,
        custom: {
            options: (value) => {
                return User.findOne({ email: value }).then(user => {
                    if (Object.is(user, null)) {
                        return Promise.reject('No account associated with this email');
                    }
                })
            }
        }
    },
    password: {
        notEmpty: {
            errorMessage: 'Password is required',
        },
    },
});