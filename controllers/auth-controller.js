const apiValidationErrorFormatter = require('../validators/validation-formatter')
const User = require('../models/user-model');
const bcrypt = require('bcrypt');

exports.register = async (req, res, next) => {
    
    const errors = apiValidationErrorFormatter(req);
    
    if (errors.isEmpty() == false) {
        return res.status(422).json({ errors: errors.mapped() });
    }

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, appConfig.bcrypt.saltingRounds),
        status: 'active'
    });

    try {
        await user.save();
    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            msg: "Oops, something is not right"
        })
    }

    res.status(200).send({
        msg: "Successfully registered",
    });

};