const mongoose=require('mongoose');
const jwt =require('jsonwebtoken');
const User=mongoose.model('user');
module.exports=(req,res,next)=>{
const {authorization}=req.headers;
if(!authorization){
    return res.status(401).send('you must be loged in')
}
const token =authorization.replace("Bearer ","");
jwt.verify(token,"hatlijat",async(err,payload)=>{
    if(err){
        return res.status(401).send("you must be loged in")
    }
    const {userId}=payload;
    const user=await User.findById(userId);
    req.user=user,
    next();
})
}