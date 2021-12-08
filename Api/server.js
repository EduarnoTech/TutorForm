const express=require('express');
const mongoose=require('mongoose');
const cors=require("cors")
const dotenv=require('dotenv');
const app= express();
const mongoconnect=require('./config/db')





dotenv.config({path:'./config/config.env'})


app.use(cors())
mongoconnect();

const regForm=require('./router/client');



app.use(express.json());


app.use('/tutor',regForm);


// app.use('/upload',express.static('uploads/up1'));


const PORT =process.env.PORT||5000;



const Server=app.listen(PORT,
  console.log( `SUCEESSFULLY LOGIN IN ${process.env.PORT} IN ${process.env.NODE_ENV} ENVIRONMENT`)
);
// app.use(express.json());
process.on(`handle unhandled rejections`,(err,pormise)=>{
    console.log(`Error: ${err.message}`);
    Server.close(()=>process.exit(1));
})

