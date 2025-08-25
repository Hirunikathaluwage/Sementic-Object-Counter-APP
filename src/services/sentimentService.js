import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config()

const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);

export const analyseImage = async(imagePath)=> {
    try{
      const buffer = fs.readFileSync(imagePath);    //read image and convert it to a base64 
      const base64Data  = buffer.toString("base64");

      const mimeType = "image/png/";
      const input = "How many objects are in this image?";
      
      const result = await ai.models.generateContent({
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
        generationConfig: { mimeType:"application/json"},

      });

      return JSON.parse(result.responseId.text)

    }catch(error){
      console.error("Error in analyzing", error.message);
      throw new Error("Image object analysing faliure");

    }  

};