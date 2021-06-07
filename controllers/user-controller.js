const User = require('../models/user-model');
const mongoose = require('mongoose');

exports.listRooms = async (req, res, next) => {

    try 
    {
        const page = req.query.page ? req.query.page : 1;
        const limit = 1;
        const skip = page == 1 ? 0 : (limit * page - 1);
        
        const result = await User.aggregate()
                            .match({ _id: mongoose.Types.ObjectId(authUser.id) })
                            .lookup({ 
                                from: 'rooms', as: 'rooms', 
                                pipeline: [{ $skip: skip }, {$limit: limit} ]
                            });
        
        res.status(200).send({
            msg: "User rooms",
            data: result[0].rooms
        });        
    }
    catch (err) 
    {
        console.log(err);
        res.status(500).send({
            msg: "Oops, something is not right"
        })
    }
};