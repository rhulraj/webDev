const User = require('../schema/userSchema')
const BadRequestError = require("../utils/badRequest")
const InternalServerError = require("../utils/internalServerError")
class UserRepository{


    async findUser(parameters){
        try{
        const response = await User.findOne({  ...parameters })
        return response;
        } catch(error) {
            console.log(error)
        }
    }

    async createUser(userDetails) {
        try{
        const response = await User.create(userDetails);
        return response;
        } catch(error){
            if(error.name === 'ValidationError'){
                const errorMessagelist= Object.keys(error.errors).map((property) => {
                   return error.errors[property].message;
                 })
                 throw new BadRequestError(errorMessagelist);
             }
             console.log(error);
             throw new InternalServerError();
        }
    }
}

module.exports = UserRepository;