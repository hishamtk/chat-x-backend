const { validationResult } = require('express-validator');

module.exports = validationResult.withDefaults({
    formatter: error => {
        return {
            msg: error.msg,
        };
    },
});