import { analyseImage} from "../services/sentimentService.js";

export const imageAnalyse = async(req,res) => {
    try{
        if(!req.file){
            return res.status(400).json({success:false, message:"No image uploaded"});
        }

        const imagePath = req.file.path;
        const results = await analyseImage(imagePath);
        res.json({success:true, results});

    }catch(error){
        res.status(500).json({success:false,message:error.message});
    }

};
