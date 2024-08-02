const AppError = require("./appError");

class notFoundError extends AppError {
    constructor(resourse){
      super(`Not able to find  ${resourse} `, 404)
    }
}

module.exports = notFoundError;