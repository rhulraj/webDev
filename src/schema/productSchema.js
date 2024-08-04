const mongoose  = require('mongoose');

const productSchema = new mongoose.Schema({
    productName : {
        type: String,
        required : [true, "Product name is required"],
        minLnegth : [5, "Product name must be atleast 5 characters"],
        trim : true
    },
    description : {
        type : String,
        minLength : [5, "Product name must be atleast 5 characters"]
    },
    productImage : {
        type : String
    },
    price : {
        type :Number,
        required: [true, "Product price is required"]
    },
    category : {
        type : String,
        enum : ['veg', 'nonveg', 'drinks', 'sides'],
        default :'veg'
    },
    inStock:{
        type : Boolean,
        required: [true, "In stock  status is required"],
        default : true
    }, 
    quantity:{
        type: Number,
        required : [true, "Quantitiy is required"],
        default: 10
    }
}, {
    timestamps : true
})

const Product  =  mongoose.model('Product', productSchema);

module.exports = Product;