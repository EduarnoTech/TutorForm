const mongoose=require('mongoose');
const bcrypt =require('bcryptjs');

const signUp=new mongoose.Schema({
        
        username:{
            type:String,
            default:null
            
        },
     
        email:{
            type:String,
            default:null
        },
        phone:{
            type: Number, 
            default:null,
        },
        password:{
            type:String,
            default:null
        
        },
        university:{
            type:String,
            default:null
        
        },
        dateOfBirth:{
            type:String,
            default:null
        
        },
        watsNumber:{
            type:String,
            default:null
        
        },
        timezone:{
            type:String,
            default:null
        
        }
        
});

signUp.pre('save',async function(){
    const salt= await bcrypt.genSalt(10);
    console.log("bcrypt sign up working")
    this.password = await bcrypt.hash(this.password,salt);
});

// signUp.methods.getSignedJwtToken=function(){
//     return jwt.sign({id: this._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE});
// }



signUp.methods.matchPassword =async function(enteredpassword){
    console.log("bcrypt sign in working")
    return await bcrypt.compare(enteredpassword,this.password);
}


module.exports=mongoose.model('client32',signUp);