const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const userSchema=new mongoose.Schema({
    email:{
        type: String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    favourites:{
        type:[mongoose.Schema.Types.ObjectId],
        default:[]
    },
    cart:{
        type:[mongoose.Schema.Types.ObjectId],
        default:[]

    }
  
}) 
userSchema.pre('save',function(next){
    const user=this;
    if(!user.isModified('password')){
        return next();
    }
    bcrypt.genSalt(10,(err,salt)=>{
        if(err){
            return next(err)
        }
        bcrypt.hash(user.password,salt,(err,hash)=>{
            if(err){
                return next(err)
            }
            user.password=hash;
            next();
        })
    })
})
userSchema.methods.comparePasswords=function comparePasswords(passW){
    return new Promise((resolve,reject)=>{
        bcrypt.compare(passW,this.password,(err,isMatch)=>{
            if(isMatch){
                return resolve(true)
            }
           else{
                return reject(err)
            }
        })
    })
}
mongoose.model('user',userSchema);