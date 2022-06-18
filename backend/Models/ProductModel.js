const mongoose  = require("mongoose");

const productSchema = new mongoose.Schema({
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
    ],
    user : {
        type : mongoose.Schema.ObjectId,
        ref : "User",
        required : true
    },
    updated_by : [
        {
            user : {
                type : mongoose.Schema.ObjectId,
                ref : "User",
                default : null
            },
            updatedAt : {
                type : Date,
                default : Date.now()
            }
        },
    ]
},
{
    timestamps : true
})

module.exports = mongoose.model('Product', productSchema);
