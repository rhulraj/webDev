const express = require('express');
const { login, logOut } = require('../controllers/authContoller');



//we have to intialise a router object to add routes in a new file
//Routers are used for segregating your routes in different modules
const authRouter = express.Router();


authRouter.post('/login', login);
authRouter.post('/logout', logOut);

module.exports = authRouter;