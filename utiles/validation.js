const formatErrors=(errorsArray)=>{
    return errorsArray().map((err)=>{
        return{
            message:err.msg,
            feild:err.param,
        }
    })
}

module.exports={formatErrors}