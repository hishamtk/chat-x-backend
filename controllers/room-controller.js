const User = require('../models/user-model');
const Room = require('../models/room-model');
const apiValidationErrorFormatter = require('../validators/validation-formatter');

exports.createPrivate = async (req, res, next) => {
    
    const errors = apiValidationErrorFormatter(req);
    if (errors.isEmpty() == false) {
        return res.status(422).json({ errors: errors.mapped() });
    }

    try 
    {
        const partner = await User.findOne({_id: req.body.partner});
        const room = new Room({
            type: 'private',
            createdBy: authUser.id,
            admins: [authUser.id],
            users: [authUser.id, partner.id]
        });
        await room.save();
        await User.updateMany({_id: { $in: [authUser.id, partner.id] } }, {$addToSet : {rooms: [room.id]} });

        res.status(200).send({msg: 'Successfully created private room', data: { roomId: room.id } });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({msg: 'Oops, something is not right'})
    }
};

exports.createGroup = async (req, res, next) => {
    
    const errors = apiValidationErrorFormatter(req);
    if (errors.isEmpty() == false) {
        return res.status(422).json({ errors: errors.mapped() });
    }
    
    try 
    {
        const {partners, name, description} = req.body;
        const room = new Room({
            name: name,
            description: description == undefined ? '' : description,
            type: 'group',
            createdBy: authUser.id,
            admins: [authUser.id],
            users: partners
        });
        const members = [...new Set([authUser.id, ...partners])];
        await room.save();
        await User.updateMany({_id: { $in: members } }, {$addToSet : {rooms: [room.id]} });

        res.status(200).send({msg: 'Successfully created group room', data: { roomId: room.id } });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({msg: 'Oops, something is not right'})
    }
};
