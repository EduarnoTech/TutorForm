const {google} =require('googleapis');
const path=require('path')
const fs=require('fs')
const dotenv=require('dotenv')

dotenv.config('../config/config.env')
const CLIENT_ID=process.env.CLIENT_ID
const CLIENT_SECRET=process.env.CLIENT_SECRET
const REDIRECT_URI=process.env.REDIRECT_URI
const REFRESH_TOKEN=process.env.REFRESH_TOKEN

const oauth2client=new google.auth.OAuth2(
    CLIENT_ID,CLIENT_SECRET,REDIRECT_URI
)
 oauth2client.setCredentials({refresh_token:REFRESH_TOKEN})

 const drive=google.drive({
     version:'v3',
     auth:oauth2client
 })
 const filePath=path.join(__dirname,'refMaterial.jpg')

 const uploadFile= async (req,res)=>{
    
         const response=await drive.files.create({
         requestBody:{
             name:'refMaterial.jpg',
             mimeType:'image/jpg'
         },
         media:{
            mimeType:'image/jpg',
            body:fs.createReadStream(filePath)
        }
        

         });
         try{
         console.log(response.data)
     }catch(err){
        console.log("DRIVE HAVE SOME ERROR")

     }
 }
 module.exports = uploadFile;