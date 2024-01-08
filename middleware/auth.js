const { expressjwt } = require('express-jwt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

require('dotenv').config()



/**
 * GET TOKEN
 */
const getToken = async (req, res, next) => {
    const { authorization } = req.headers;
    

    if(authorization){
        const [type, token] = authorization.split(' ');
        const decoded = jwt.verify(token, process.env.SECRET) ;
        req.user = await User.findById(decoded.id).select('-name');
        return type === "Bearer" ? token: null;
    } else {
        return null;
    }
}


/**
 * AUTH
 */
const auth = expressjwt({
    secret: process.env.SECRET,
    algorithms: ['HS256'],
    userProperty: 'user',
    getToken
})


/**
 * PAYLOAD IS ADMIN
 */
const admin = (req, res, next) => {
    try {
        if(req.user && req.user.isAdmin){
            next();
       }
       else{
           throw new Error('Not Authorized as an admin') 
       }
    } catch (error) {
        res.status(401).json({success: false, errorMSG: error.message})
    }
    
}


module.exports = {admin, auth};