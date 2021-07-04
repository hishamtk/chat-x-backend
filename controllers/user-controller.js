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

exports.search = async (req, res, next) => {

    try 
    {
        const { term } = req.query;
        const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
        const searchRgx = rgx(term);

        const users = await User.aggregate()
                                .match({
                                    $or: [
                                        { name: { $regex: searchRgx, $options: "i" } },
                                        { email: { $regex: searchRgx, $options: "i" } },
                                    ],
                                })
                                .project({name: 1, email: 1});

        res.status(200).send({
            msg: "Users",
            data: users
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