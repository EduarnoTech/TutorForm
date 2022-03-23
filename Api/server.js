const express=require('express');
// const route=require("./router/route")
const mongoose=require('mongoose');
const cors=require("cors")
const dotenv=require('dotenv');
const app= express();
const mongoconnect=require('./config/db')
// var bodyparser=require('body-parser');



dotenv.config({path:'./config/config.env'})
// .uappse(express.bodyParser());

mongoconnect();






const client=require('./router/client');
const tutor=require('./router/tutor');



app.use(express.json());

app.use(cors());
app.use('/client',client);
app.use('/tutor',tutor);

app.use('/upload',express.static('uploads/up1'));



// app.use(bodyparser.urlencoded({ extended: true }));

const PORT =process.env.PORT||5000;


//mongoose.connect("mongodb+srv://sivay_1:<password>@cluster0.xifqt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")

const Server=app.listen(PORT,
  console.log( `SUCEESSFULLY LOGIN IN ${process.env.PORT} IN ${process.env.NODE_ENV} ENVIRONMENT`)
);
// app.use(express.json());
process.on(`handle unhandled rejections`,(err,pormise)=>{
    console.log(`Error: ${err.message}`);
    Server.close(()=>process.exit(1));
})

