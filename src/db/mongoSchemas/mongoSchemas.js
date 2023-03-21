const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        username:{type:String,required:true,unique:true},
        password:{type:String,required:true},
        email:{type:String,required:true,unique:true},
        direction:{type:String,required:true},
        age:{type:Number,required:true},
        cel:{type:Number,required:true},
        image:{type:String,required:true}
    }
)
const ordersSchema = new mongoose.Schema(
    {
        products:{type:Array,required:true},
        orderId:{type:Number,required:true},
        timestamp:{type:Number,required:true},
        state:{type:String,required:true},
        email:{type:String,required:true},
    })
const messagesSchema = new mongoose.Schema(
    {
        email:{type:String,required:true,unique:true},
        timestamp:{type:Number},
        body:{type:String,required:true},
    })
const cartSchema = new mongoose.Schema(
    {
        id:{type:String,required:true},
        timestamp:{trype:Number},
        products:{type:[],required:true}
    }
)

const producSchema = new mongoose.Schema(
    {
        name:{type:String,required:true},
        price:{type:Number,required:true},
        category:{type:String,required:true},
        platform:{type:String,required:true},
        description:{type:String,required:true},
        code:{type:Number,required:true},
        url:{type:String,required:true},
        stock:{type:Number,required:true},
    }
)

module.exports={
    userSchema,
    ordersSchema,
    messagesSchema,
    cartSchema,
    producSchema,}