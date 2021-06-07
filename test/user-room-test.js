const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../models/user-model')
const Room = require('../models/room-model')

describe.only('user room', function() {
    
    before(async () => {
        const users = [
            {name: 'alex', email: 'alex@test.com', password: '123456789', status: 'active'},
            {name: 'dany', email: 'john@test.com', password: '123456789', status: 'active'},
            {name: 'dany', email: 'dany@test.com', password: '123456789', status: 'active'},
            {name: 'thomas', email: 'thomas@test.com', password: '123456789', status: 'active'},
        ];

        const CollectionList = await (await mongoose.connection.db.listCollections().toArray()).map(x => x.name);
        
        if (CollectionList.indexOf('users') != -1) {
            await mongoose.connection.db.dropCollection('users'); 
        }
        if (CollectionList.indexOf('rooms') != -1) {
            await mongoose.connection.db.dropCollection('rooms'); 
        }

        return User.insertMany(users);
    });

    it('creating a private chat', async function () {
        const user1 = await User.findOne({email: 'alex@test.com'});
        const user2 = await User.findOne({email: 'john@test.com'});

        const room = new Room({
            type: 'private',
            createdBy: user1.id,
            admins: [user1.id],
            users: [user1.id, user2.id]
        });

        await room.save();
        await User.updateMany({_id: { $in: [user1.id, user2.id] } }, {$addToSet : {rooms: [room.id]} });
        
        assert(room.isNew === false);
    });

    it('creating a group chat', async function () {
        const user1 = await User.findOne({email: 'alex@test.com'});
        const user2 = await User.findOne({email: 'john@test.com'});
        const user3 = await User.findOne({email: 'dany@test.com'});
        const user4 = await User.findOne({email: 'thomas@test.com'});

        const room = new Room({
            name: 'node devs',
            description: 'for sharing tips and tricks of nodejs',
            type: 'group',
            createdBy: user1.id,
            admins: [user1.id],
            users: [user1.id, user2.id, user3.id, user4.id]
        });

        await room.save();
        await User.updateMany(
            {_id: { $in: [user1.id, user2.id, user3.id, user4.id] } }, 
            {$addToSet : {rooms: [room.id]} });
        
        assert(room.isNew === false);
    });

});
