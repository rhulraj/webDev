const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : "User"
    },
    items: [
        {
            product:{
            type : mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
            },
            qauntity:{
                type: Number,
                required: true,
                default: 1
            }
        }
    ],
    totalPrice: {
        type : Number,
        required : true
    },
    status : {
        type :String,
        enum: ["ORDERED", "CANCELLED", "DELEIVERED", "PROCESSING", "OUT_FOR_DELEVERY"]
    }, address:{
       type : String,
       minLength : [10, "Address should be of atleast 10 character"]
    },
    paymentMethod: {
        type: String,
        enum: ["ONLINE", "CASH"],
        default: "CASH"
    }
}, {
    timestamps: true
});

const Order = mongoose.model("Order", orderSchema);

module.exports =Order;