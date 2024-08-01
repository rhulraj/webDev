class UserService {

    constructor(_userRepository) {

        //in this argument we will expect userRepository object
        this.userRepository = _userRepository
    }

   async registerUser(userDetails){
        //it will create a brand new user in the db
        //1. we need to check if the user with this email and mobile number already exists or not
        const user = await this.userRepository.findUser({
            mobileNumber : userDetails.mobileNumber,
            email : userDetails.email
        })
        if(user) {
            //if we find a user
            throw { reason : 'User with the given email and mobile number already exist', statusCode: 400}
        }
        //2. if not then the create the user in the database
        const newUser = await this.userRepository.createUser({
            firstName : userDetails.firstName,
            lastName : userDetails.lastName,
            mobileNumber: userDetails.mobileNumber,
            email: userDetails.email,
            password: userDetails.password,
        });
        if(!newUser){
            throw {reason : "something went wrong, cannot create user", statusCode: 500}
        }
        // 3 return the user

        return newUser
    }
}
module.exports =UserService;