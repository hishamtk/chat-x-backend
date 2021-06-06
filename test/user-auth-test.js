const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../models/user-model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

describe('user auth', function() {
    
    before((done) => {
        mongoose.connection.db.dropCollection('users', () => {
            done();
        });
    });

    it('registering new user', async function () {
        const user = new User({
            name: "alex",
            email: "alex@mail.com",
            password: await bcrypt.hash("123456789", appConfig.bcrypt.saltingRounds),
            status: 'active'
        });
        
        await user.save();

        assert(user.isNew === false);
    });

    it('logging an user', async function () {
        User.findOne({email: 'alex@mail.com'}).then((user) => {
            bcrypt.compare('123456789', user.password).then((valid) => {
                assert(valid === true);
            });
        })
    });

    it('jwt', async function () {
        const user = await User.findOne();
        const payload = { id: user._id};
        const options = { expiresIn: appConfig.jwt.expiry, issuer: appConfig.jwt.issuer };
        const secret = appConfig.jwt.secret;
        const token = jwt.sign(payload, secret, options);
        // console.log(token);
      
        try {
            const decoded = jwt.verify(token, secret);
            assert(user._id == decoded.id);
        }
        catch (err) {
            // TokenExpiredError
            console.log(err.name);
        }
    });

});
