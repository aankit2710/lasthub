const mongoose = require('mongoose')
const { Schema } = mongoose


const orderSchema = new Schema({
    order_from:{
        type: String
    },
    delivery_date:{
        type: String
    },
    customer_name:{
        type: String
    },
    customer_phone:{
        type: String
    },
    customer_city:{
        type: String
    },
    pincode:{
        type: String
    },
    customer_area:{
        type: String
    },
    customer_address:{
        type: String
    },
    isPaid:{
        type: Boolean,
        default: false
    },
    amount:{
        type: String
    },
    reason:{
        type: String
    },
    order_status:{
        type: String,
        enum: ["Delivered", "Undelivered"],
        default: "Undelivered",
    },
    delivery_agent_id:{
        type: String,
    },
    delivery_boy:{
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    createdBy:{
        type: String
    },
    createdAt:{
        type: Date,
        default: Date.now 
    }
},{strict:false})


module.exports = mongoose.model('order', orderSchema)