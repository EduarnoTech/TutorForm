const mongoose = require("mongoose");
 
const TutorSchema = new mongoose.Schema(
    {
        tutor_id:{
            type: String,
            unique: true,
            default: null
          },
        name: {
            type: String
        },
        wa_name: {
            type: String
        },
        highest_degree: {
            type: String
        },
        academic_info: {
            type: Array
        },
        Bank:{
            acc_no:String,
            ifsc_code:String,
            upi_id:String
        },
        contact_id:{
            type: String,
            unique: true,
            default: null
          },
        fund_upi_id:{
            type: String,
            unique: true,
            default: null
          },
        fund_bank_id:{
            type: String,
            unique: true,
            default: null
          },
       
        dept: {
            type: String
        },
        subjects: {
            type: Array
        },
        software_skills:{
            type: Array
        },
      
        wa_id:{
            type: String,
            unique: true,
            default: null
          },
        email:{
            type: String,
            unique: true,
            default: null
          }
       
      },
      {timestamps: true}
);
 
module.exports = mongoose.model("Tutor", TutorSchema);