const apiValidationErrorFormatter = require('../validators/validation-formatter')
const User = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

exports.login = async (req, res, next) => {
    
    const errors = apiValidationErrorFormatter(req);
    if (errors.isEmpty() == false) {
        return res.status(422).json({ errors: errors.mapped() });
    }
    
    const {email, password} = req.body;
    
    try 
    {
        let user = await User.findOne({email: email});
        let valid = await bcrypt.compare(password, user.password);
        if (valid == false) {
            res.status(422).json({errors: { password: 'Wrong password' } });
        }
        
        const payload = { id: user._id};
        const options = { expiresIn: appConfig.jwt.expiry, issuer: appConfig.jwt.issuer };
        const token = jwt.sign(payload, appConfig.jwt.secret, options);
        
        res.status(200).send({
            msg: "Successfully logged in",
            accessToken: token,
            user: {id: user.id, name: user.name, email: user.email}
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            msg: "Oops, something is not right"
        })
    }
};