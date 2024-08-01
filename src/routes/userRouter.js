//Resourse - user
const express = require('express');
const { createUser } = require('../controllers/userController');


//we have to intialise a router object to add routes in a new file
//Routers are used for segregating your routes in different modules
const userRouter = express.Router();


userRouter.post('/', createUser) 
userRouter.get('/', (req, res)=>{
    res.send("hii")
} )

module.exports = userRouter;