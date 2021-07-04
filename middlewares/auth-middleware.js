const jwt = require('jsonwebtoken');
const User = require('../models/user-model');

const handler = async (req, res, next) => {

    const authorizationHeaader = req.headers.authorization;

    if (authorizationHeaader == undefined) {
        return  res.status(401).send({ msg: 'Unauthenticated'})
    }
    
    const token = req.headers.authorization// Bearer <token>
    const options = { expiresIn: appConfig.jwt.expiry, issuer: appConfig.jwt.issuer };

    try 
    {
        const result = jwt.verify(token, appConfig.jwt.secret, options);
        authUser = await User.findOne({_id: result.id});

        next();
    } 
    catch (err) 
    {
        console.log(err);
        if (err.name == 'TokenExpiredError') {
           return  res.status(401).send({ msg: 'Token Expired'});
        }
          res.status(500).send({msg: 'Oops, something is not right'});
    }
};

module.exports = handler;