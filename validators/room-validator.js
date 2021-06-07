const { checkSchema } = require('express-validator');

module.exports = checkSchema({
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