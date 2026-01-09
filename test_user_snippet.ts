
import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';
import * as fs from "node:fs";

dotenv.config();

async function main() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("No API Key found");
        return;
    }

    // Pass key explicitly if needed, though sdk might check env.
    // The user snippet had empty constructor: new GoogleGenAI({})
    console.log("Initializing GoogleGenAI...");
    const ai = new GoogleGenAI({ key: apiKey });

    const prompt = "Create a picture of a nano banana dish in a fancy restaurant with a Gemini theme";

    console.log("Generating content...");
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-image",
            contents: prompt,
        });

        console.log("Candidates:", response.candidates ? response.candidates.length : 0);

        if (response.candidates && response.candidates[0].content.parts) {
            for (const part of response.candidates[0].content.parts) {
                if (part.text) {
                    console.log("Text part:", part.text);
                } else if (part.inlineData) {
                    console.log("Image data found!");
                    const imageData = part.inlineData.data;
                    const buffer = Buffer.from(imageData, "base64");
                    fs.writeFileSync("gemini-native-image.png", buffer);
                    console.log("Image saved as gemini-native-image.png");
                }
            }
        }
    } catch (err: any) {
        console.error("Generation failed:", err);
        if (err.response) {
            console.error("Error response:", JSON.stringify(err.response, null, 2));
        }
    }
}

main();
