const mongoose=require('mongoose');
const dotenv=require('dotenv');

dotenv.config({path:'./config.env'});



    const mongoconnect= async ()=>{
        const connect= await mongoose.connect(process.env.MONGO_URL);
    console.log(`connected to MONGO DB ${process.env.MONGO_URL}`);


}
// catch(err){
//     console.log("iissssssssssss",err);
// }

module.exports=mongoconnect;