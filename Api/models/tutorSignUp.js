const mongoose=require('mongoose');
const bcrypt =require('bcryptjs');


    const tutorForm1=new mongoose.Schema({
            
            tutor_id:{
                type:String,
                default :null
            },    
            email:{
                type:String,
                unique:true,
                default:null
                
            },
            username:{
                type:String,
                default:null
                
            },
            password:{
                type:String,
                
            },
            highest_degree:{
                type:String,
                default :null
            },
           
            university:{
                type:String,
                default :null
            },
            skills:{
                type:Array,
                default :null
            },
            // other_skill,
            best_subjects:{
                type:Array,
                default :null
            },
            software_skills:{
                type:Array,
                default:null
            },
            country_and_code:{
                type:String,
                default:null
            },
            whatsapp_no:{
                type:String,
                default:null
            },
           phone_no:{
                type:String,
                default:null
            },
            highestDegreeFile:{
                type:Array,
                default:null
            },
            
            branch:{
                type:String,
                default:null
                
            },
            pan_name:{
                type :String,
                default:null
            },
            pan_number:{
                type:String,
                default:null
            },
            pan_file:{
                type:Array,
                default:null
            },
            account_name:{
                type:String,
                default:null
    
            },
            account_number:{
                type:String,
                default:null
            },
            ifsc:{
                type:String,
                default:null
            },
            UPI:{
                type:String,
                default:null
            },
            fundId_bank:{
                type:String,
                default:null
            },
            fundId_upi:{
                type:String,
                default:null
            }
                   
});

tutorForm1.pre('save',async function(){
    const salt= await bcrypt.genSalt(10);
    console.log("bcrypt sign up working")
    this.password = await bcrypt.hash(this.password,salt);
});

// signUp.methods.getSignedJwtToken=function(){
//     return jwt.sign({id: this._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE});
// }



tutorForm1.methods.matchPassword =async function(enteredpassword){
    console.log("bcrypt sign in working")
    return await bcrypt.compare(enteredpassword,this.password);
}


module.exports=mongoose.model('tutorForm1',tutorForm1);