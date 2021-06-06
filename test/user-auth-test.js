const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../models/user-model')
const bcrypt = require('bcrypt');

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

});
