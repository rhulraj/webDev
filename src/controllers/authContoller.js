const { loginUser } = require("../services/authService");


async function logOut(req, res){
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
async function login(req, res){
   
    try{
    const loginPayload = req.body;
    const response = await loginUser(loginPayload)
     
    res.cookie("authToken", response, {
        httpOnly: true,
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000
        
    }) 

    return res.status(200).json({
        success : true,
        message: 'logged in successfully',
        data: {},
        error: {}
    })
    } catch(err){
        return res.status(501).json({
            success : false,
            message: err.message,
            data: {},
            error: err
    });
    };
}
module.exports = {
    login, 
    logOut
}