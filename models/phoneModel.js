const mongoose=require('mongoose');
const phoneSchema=new mongoose.Schema({
    brand:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    colors:{
        type:[String],
        default:[]
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    }

})
mongoose.model('phone',phoneSchema);