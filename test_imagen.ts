
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

async function test() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
    try {
        // Try getting the model and calling generateContent (standard Gemini way)
        // Sometimes for Imagen it is 'predict' or different, but let's see if the SDK abstracts it
        const model = genAI.getGenerativeModel({ model: "imagen-3.0-generate-002" });

        console.log("Attempting generation...");
        // Imagen 3 via Gemini API typically expects a specific prompt structure or just text
        const result = await model.generateContent("A cute toy robot");
        console.log("Result:", JSON.stringify(result, null, 2));
    } catch (e: any) {
        console.error("Standard generateContent failed:", e.message);

        // Try fallback or check if there is a 'generateImages' on the SDK instance if we cast it?
        // Or maybe checking the 'genAI' object for other methods?
    }
}

test();
