import multer from "multer";
import path from "path";


const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cd(null,"/uploads")
    },

    filename:function(req,res,cd){
        cb(null, Date.now() + "-" + file.originalname);
    }
    
})

export default sentimentMiddleware;
