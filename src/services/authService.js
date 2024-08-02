const UserRepository = require("../repositories/userRepository");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_EXPIRY, JWT_SECRET} = require('../config/serverConfig')

async function loginUser(authDetails){
    const email = authDetails.email;
    const plainPassword = authDetails.password;
    const UserRepo = new UserRepository()
    // 1 .CHECK IF THERE IS A REGISTERED USER WITH THE GIVEN EMAIL
    const user = await UserRepo.findUser({email});
    if(!user) {
        throw {message: "No user found with the given email", statusCode: 404};
    }
    // 2. if the user found we need to compare plainPassword with hashed passsword
    const isPasswordVlidated = await bcrypt.compare(plainPassword, user.password);
    if(!isPasswordVlidated){
        throw{ message: 'Invalid password , please try again', statusCode : 401};
    }
    const userRole = user.role ? user.role : "User";
    // 3 . If the password is validated, create a token and return it
    const token = jwt.sign({email :user.email, id: user._id, role: userRole}, JWT_SECRET, {
        expiresIn: JWT_EXPIRY
    })
    return token
}

module.exports = {
    loginUser
}