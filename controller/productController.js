const express=require('express')

const {body,validationResult}=require('express-validator')

const router=express.Router();

const Product=require('../model/postModel')

const User=require('../model/userModel')

// const {formatErrors}=require('../utiles/validation')

router.post('',body('name').isLength({min:3}).withMessage("name is required"),body('email').isEmail(),
body('price').notEmpty().withMessage('price should not empty').custom(value=>{
    if(value<=0)
    {
        throw new Error('Enter value Greater then 0')
    }
    return true
})
,body('user_id').notEmpty().withMessage('user id should not empty').custom(async(value)=>{
    const user=await User.findById(value).lean().exec()
    if(!user) {
        return Promise.reject('user does not exsist')
    }
    
})
,async(req,res)=>{
    try{  
        const errors=validationResult(req);
        if(!errors.isEmpty())
        {
            // const newError=errors.array().map((err)=>{
            //     return{
            //         message:err.msg,
            //         feild:err.param,
            //     }
            // })  
            return res.status(400).json({errors:errors.array()})
        }
        const product=await Product.create(req.body)
        return res.status(200).send(product)
    }
    catch(err){
        return res.status(500).send(err.message)
    }
})

router.get('',async(req,res)=>{
    try{
        const page=+req.query.page||1;

        const size=+req.query.size||30;

        const skip=(page-1)*size

        const totalPage=Math.ceil((await Product.find().count())/size)
        const product=await Product.find().skip(skip).limit(size).lean().exec()
        return res.status(200).send({product,totalPage});
    }
    catch(err){
        return res.status(500).send(err.message)
    }
})

router.patch('/:id',body('name').isEmpty().withMessage('name required'),
body('user_id').isEmpty().withMessage('user id must be provided').custom(async(value,{req})=>{
    try{
        const user=await User.findById(value).lean().exec()
        if(!user) throw new Error("user does not exist")
        
        const product=await Product.findById(req.params.id).lean().exec()
        if(!product) throw new Error("product does not exist")

        if(!product.user_id.equals(user._id))
            return Promise.reject('this user not allowed to update product')
            return true
    }
        catch(err){
            return res.status(400).send(err.message)
        }
})
,async(req,res)=>{
    try{
        const item=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec()
        return res.send(item)
    }
    catch(err){
        return res.status(500).send(err.message)
    }
})

module.exports=router;