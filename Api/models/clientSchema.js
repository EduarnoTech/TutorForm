const mongoose = require("mongoose");
 
 
 
  const ClientSchema = new mongoose.Schema({
    client_id:{
        type:String,
        unique:true,
        // sparse:true,
        
    },    
    whatsapp:{
        type:String,
        
        default:null
    },
    client_name: String,
    university:{
      type:String,
      default:null
    },
    semester:{
      type:String,
      default:null
    },
    branch: String,
    timezone:{type:String,
    default:null},
    email:{
        type:String,
        unique:true,
        default:null
    },
    socialmedia:{
      platform:String,
      username:{
        type:String,
        default:null
    }
 
    }
  });
 
 
module.exports = mongoose.model("clientss",ClientSchema);
