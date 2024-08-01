const mongoose = require('mongoose');
const serverConfig = require('./serverConfig')

async function connectDB(){
    try {
        await mongoose.connect(serverConfig.DB_URL)
        console.log("successfully connected to the mongo db server ....")
    } catch(error) {
        console.log(error)
    }
}
 module.exports = connectDB