const mongoose = require('mongoose')
const { Schema } = mongoose


const articleSchema = new Schema({
    name:{
        type: String
    },
    email:{
        type: String
    },
    message:{
        type: String
    },
    role:{
        type: String
    },
    location:{
        type: String
    },
    pincode:{
        type: String
    },
    createdBy:{
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    createdAt:{
        type: Date,
        default: Date.now 
    }
},{strict:false})


module.exports = mongoose.model('article', articleSchema)