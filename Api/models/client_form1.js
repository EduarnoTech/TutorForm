const mongoose=require('mongoose');

const client=new mongoose.Schema({
        
        description:{
            type:String,
            default:null
            
        },
        email:{
            type:String,
            default:null
            
        },
        // whatsapp:{
        //     type:Number,
        //     default:null
            
        // },
        deadline:{
            type: String, 
            default:null,
            min:Date.now
        },
        date:{
            type: Date, 
            default:Date.now
        },
        subject:{
            type:String,
            default:null
        
        },
        quesFile:{
            type:String,
            default:null
        },
        refMaterial:{
            type:String,
            default:null
        }
        
});
module.exports=mongoose.model('client30',client);