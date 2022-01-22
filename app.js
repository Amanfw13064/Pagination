const express=require('express')

const productController=require('./controller/productController')

const userController=require('./controller/userController')

const app=express()

app.use(express.json())

app.use('/product',productController)

app.use('/user',userController)

module.exports=app