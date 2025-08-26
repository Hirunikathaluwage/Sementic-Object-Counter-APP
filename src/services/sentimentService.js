import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config()

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const analyseImage = async(imagePath)=> {
    try{
      const buffer = fs.readFileSync(imagePath);    //read image and convert it to a base64 
      const base64Data  = buffer.toString("base64");

      const mimeType = "image/png";
       const input = `
      Look at this image and return only valid JSON with:
      - scene: a short description of what the image shows
      - mood: the overall feeling or sentiment (happy, sad, calm, energetic, neutral)
      - tags: array of important objects, people, animals, or scene details`;

      
      const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });  

      const result = await model.generateContent({
        model:"gemini-1.5-flash",
        contents:[
          {
            role:"user",
            parts:[
              {text:input},
              {inlineData:{mimeType,data:base64Data}}
            ]
          },
        ],
        generationConfig: { responseMimeType: "application/json" },

      });

       return JSON.parse(result.response.candidates[0].content.parts[0].text);

    }catch(error){
      console.error("Error in analyzing", error.message);
      throw new Error("Image object analysing faliure");

    }  

};