const mongoose=require('mongoose');

const liveSession=new mongoose.Schema({
        
        description:{
            type:String,
            default:null
            
        },
     
        deadline:{
            type: String, 
            default:null,
            min:Date.now
        },
        email:{
            type:String,
            default:null
            
        },
        dates:{
            type: String, 
            default:null,
            min:Date.now
        },
        subject:{
            type:String,
            default:null
        
        },
        refMaterial:{
            type:String,
            default:null
        },
        date:{
            type: Date, 
            default:Date.now
        }
        
});
module.exports=mongoose.model('client31',liveSession);