import express from 'express';
import dotenv from 'dotenv';
import sentimentRoute from './routes/sentimentRoute.js';

dotenv.config();
const app=express();

const PORT = process.env.PORT ||5000;

app.listen(PORT,() =>{

   console.log("Server Started",{PORT});

});


app.use("/api/sentiment",sentimentRoute);