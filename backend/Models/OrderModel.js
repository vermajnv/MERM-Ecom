const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    shippingInfo : {
        address : {
            type : String,
            required : true
        },
        city : {
            type : String,
            required : true
        },
        state : {
            type : String,
            required : true
        },
        country : {
            type : String,
            required : true
        },
        pinCode : {
            type : Number,
            required : true
        },
        phoneNo : {
            type : Number,
            required : true
        }
    },
    orderItems : [
        {
            product : {
                type : mongoose.Schema.ObjectId,
                ref : "Product",
                default : null
            },
            name : {
                type : String,
                required : true
            },
            price : {
                type : Number,
                required : true
            },
            quantity : {
                Type : Number,
                default : 0
            },
            image : {
                type : String,
                required : true
            }
        }
    ],
    user : {
        type : mongoose.Schema.ObjectId,
        ref : "User",
        default : null
    },
    paymentInfo : {
        id : {
            type : String,
            required : true
        },
        status : {
            type : String,
            required : true
        },
        paidAt : {
            type : Date,
            default : null,
        }
    },
    status : {
        type : String,
        default : "Processing",
    },
    itemsPrice : {
        type : Number,
        default : 0,
        required : true
    },
    taxPrice : {
        type : Number,
        default : 0,
        required : true
    },
    shippingPrice : {
        type : Number,
        default : 0,
        required : true
    },
    totalPrice : {
        type : Number,
        default : 0,
        required : true
    },
    deliveredAt : {
        type : Date
    }
},
{
    timestamps : true
});

orderSchema.pre('save', async function(next) {
    if (!this.isModified("paymentInfo")) {
        next();
    }

    this.paymentInfo.paidAt = Date.now();
    next();
})
module.exports = mongoose.model('Order', orderSchema);