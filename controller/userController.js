const express=require('express')

const router=express.Router();

const User=require('../model/userModel')

router.post('',async(req,res)=>{
    try{
        const item=await User.create(req.body)
        return res.send(item)
    }
    catch(err)
    {
        return res.status(500).send(err.message)
    }
})

router.get('',async(req,res)=>{
    try{
        const item=await User.find().lean().exec()
        return res.send(item)
    }
    catch(err){
        return res.status(500).send(err.message)
    }
})

module.exports=router