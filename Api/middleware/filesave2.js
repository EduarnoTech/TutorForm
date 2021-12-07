const multer=require('multer');
const path=require('path');

var storage=multer.memoryStorage(
    {
        destination: function(req, file, callback) {
         callback(null, "");
        },
    filename:function(req,file,cb){
        let ext=path.extname(file.originalname)
        cb(null,Date.now()+ext)
        console.log({fileName:file.originalname})
    }
}
);

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