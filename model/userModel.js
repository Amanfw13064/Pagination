const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:String,
})
module.exports=mongoose.model('user',userSchema)
