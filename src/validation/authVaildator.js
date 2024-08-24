const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/serverConfig');
const UnauthorisedError = require('../utils/unauthorisedError');


async function isLoggedIn(req, res, next) {
    const token = req.cookies['authToken'];
   
    
    if(!token) {
        return res.status(401).json({
            success: false,
            data:{},
            error: "Not authenticated",
            message: "No Auth Token provided"
        })
    }
  
    try{
        const decoded = await jwt.verify(token, JWT_SECRET);
    
    if(!decoded){
        throw new UnauthorisedError();
    }
    
    req.user = {
        email : decoded.email,
        id: decoded.id,
        role : decoded.role
    }
    next()
    } catch(error){
        if(error.name === 'TokenExpiredError'){
            res.cookie("authToken", "",{
                httpOnly: true,
                secure: false,
                maxAge: 7 * 24 * 60 * 60 * 1000
                
            });
            return res.status(200).json({
                success : true,
                message: 'logged out  successfully',
                data: {},
                error: {}
            })
        }
        return res.status(401).json({
            success: false,
            data: {},
            error: "Not authenticated",
            message: "Invalid Token provided"
        });
    }

    //if reached here, then user is authenticated allow then to access the api
  
}

// * This function checks if the authenticated user is an admin ar not ?
// * Because we will call is Admin after isLoggedIn thats why we will recieve user details
async function isAdmin(req, res, next){
   const loggedInUser = req.user;
   if(loggedInUser.role === 'ADMIN'){
     next()
   }else{
   return res.status(401).json({
    success: false,
    data: {},
    message: "You are not authorised for the action",
    error: {
        statusCode: 401,
        reason: "Unauthorised user for this action"
    }
   })
}
}
module.exports = {
    isLoggedIn, 
    isAdmin
}