import express from "express";
import upload from "../middleware/sentimentMiddleware.js";
import { imageAnalyse } from "../controllers/sentimentController.js";

const router = express.Router();

router.post('/', upload.single('image'),imageAnalyse);


export default router;