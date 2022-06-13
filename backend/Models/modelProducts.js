const mongoose  = require("mongoose");

const productSchema = mongoose.Schema({
    name : {
        type : String,
        required : [true, "Please enter product name"],
        trim : true
    },
    description : {
        type : String,
        required : [true, "Please enter product description"]
    },
    price : {
        type : Number,
        required : [true, "Please enter price"],
        maxLength : [6, "Price cannot exceeds 6 characters"]
    },
    ratings : {
        type : Number,
        default :  0
    },
    images : [
        {
            public_id : {
                type : String,
                required : true
            },
            url : {
                type : String,
                required : true
            }
        }
    ],
    category : {
        type : String,
        required : [true, "Please enter product category"],
    },
    stock : {
        type : Number,
        required : [true, "Please enter product Stock"],
        maxLength : [4, "Cannot exceeds than 4 four characters"],
        default : 1
    },
    numOfReviews : {
        type : Number,
        default : 0,
    },
    reviews : [
        {
            name : {
                type : String, 
                required : true
            }, 
            rating : {
                type : Number,
                required : true
            },
            comment : {
                type : String,
                required : true
            }  
        }
    ]
},
{
    timestamps : true
})

module.exports = mongoose.model('Product', productSchema);
