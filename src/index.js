const express = require('express');
const cookieParser = require("cookie-parser");
const serverConfig = require('./config/serverConfig');
const connectDB = require('./config/dbConfig');
const userRouter = require('./routes/userRouter');
const cartRouter = require('./routes/cartRouter');
const authRouter = require('./routes/authRoute');
const { isLoggedIn } = require('./validation/authVaildator');

const app = express();

app.use(cookieParser())
//deserealise the url data
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended : true }));

// routing middleware
//if the req route starts with / users then the hadle it using userRouter
app.use('/users', userRouter); // connects the router to the server
app.use('/carts', cartRouter);
app.use('/auth', authRouter);



app.get('/ping', isLoggedIn, (req, res) => {
      console.log(req.body)
      console.log(req.cookies);
      return res.json({message : "pong"})
})

app.listen(serverConfig.PORT, async() =>{
      await connectDB()
      console.log(`Server started at port ${serverConfig.PORT}`); 
})

//34.5.12.8:5500 -> Socket address