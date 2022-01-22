const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    name:{type:String,required:true},
    price:{type:String,required:true},
    email:String,
    user_id:{type:mongoose.Schema.Types.ObjectId,ref:('user'),required:true},
})

module.exports=mongoose.model('product',productSchema)