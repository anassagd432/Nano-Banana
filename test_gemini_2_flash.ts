
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

async function test() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    try {
        console.log("Generating image with Gemini 2.0 Flash Exp...");
        const result = await model.generateContent("Generate a cute robot toy image");
        console.log("Response structure keys:", Object.keys(result.response));

        // potential image handling
        // console.log("Text:", result.response.text()); // might fail if only image
    } catch (e: any) {
        console.error("Error:", e.message);
    }
}

test();
