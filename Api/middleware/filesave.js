const multer=require('multer');
const path=require('path');

var storage=multer.diskStorage({
    destination:function(req,file,cb){
        if(file.fieldname==="panFile"){
        cb(null,'uploads/panFile/')
        console.log({filein:file})
        }
        else if(file.fieldname==="highestDegreeFile"){
            cb(null,'uploads/highestDegreeFile/')
            console.log({filein:file})
            }

    },
    filename:function(req,file,cb){
        // console.log({fileNamenew:file})
        let ext=path.extname(file.originalname)
        cb(null,Date.now()+ext)
    }
});

var upload=multer({
    storage:storage,
    fileFilter:function(req,file,callback){
        if(
            file.mimetype=='application/pdf' ||
            file.mimetype=='application/zip' ||
            file.mimetype=='image/jpg' ||
            file.mimetype=='image/jpeg'||
            file.mimetype=='image/png' 

        ){
            callback(null,true);
        }
        else{
            console.log("only pdf,doc,png and jpg file is valid");
            callback(null,false);
        }
    },
    limits:{
        fileSize:1024*1024*2
    }
})

module.exports=upload;
