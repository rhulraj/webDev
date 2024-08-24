const UserRepository = require("../repositories/userRepository");
const AppError = require("../utils/appError");
const UserService = require("../services/userService")

 async function createUser(req, res){
 
    const userService = new UserService(new UserRepository())
    
    
    try{
    const response = await userService.registerUser(req.body);
    return res.json({
        message : "Successful register the user",
        success : true,
        data: response,
        error:{}
    });
} catch(err){
    if(err instanceof AppError) {
    return res.status(err.statusCode).json({
        success: false,
        message: err.message,
        data: {},
        error: err
    })
    }
    console.log(err)
    return res.status(500).json({
        success: false,
        message: "Something went wrong",
        data: {},
        error: err
    })
   }
}
module.exports = {
                  createUser
                }