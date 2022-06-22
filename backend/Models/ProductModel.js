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
            user : {
                type : mongoose.Schema.ObjectId,
                ref : "user",
                required : true
            },
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

productSchema.pre("save", async function(next) {
    if(!this.isModified("reviews"))
    {
        next();
    }
    this.numOfReviews = this.reviews.length;
    const ratingSum = this.reviews.reduce((sum, next) => {
        return sum + next.rating;
    }, 0);
    this.ratings = (Number(this.numOfReviews) === 0) ? 0 : ratingSum / this.numOfReviews;
    next();
})
module.exports = mongoose.model('Product', productSchema);
