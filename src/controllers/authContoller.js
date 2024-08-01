const { loginUser } = require("../services/authService");

async function login(req, res){
   
    try{
    const loginPayload = req.body;
    const response = await loginUser(loginPayload)
     
    console.log(response)
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
    login
}