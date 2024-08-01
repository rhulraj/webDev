const UserRepository = require("../repositories/userRepository")
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
} catch(error){
    return res.json({
     message : error.message,
     success : false,
     data: {},
     error:error
    })
}
}
module.exports = {
                  createUser
                }